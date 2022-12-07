import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { AdminPermission } from '@shared/enums';
import { getUserPermissions } from '@shared/auth';
import { RouteURL, useNavigation } from '@modules/router';
import mjibImg from '@shared/assets/images/mjib2.png';
import { useSelector } from 'react-redux';
import { AppState } from '@app/store';

/** Menu 設定物件 */
export type MenuConfig = {
  /** 識別 id (唯一值) */
  id: string;
  /** 顯示標題 */
  title: string;
  /** 路徑 */
  path?: string;
  /** Sub Menu */
  subMenu?: MenuConfig[];
  /** 權限 */
  permissionKey?: keyof typeof AdminPermission;
};

/** NavLink component props */
export type NavLinkProps = {
  /** menu 識別 id (唯一值) */
  id: string;
  /** 路徑 */
  path?: string;
  /** active 狀態，true 代表為當前頁面 */
  active: boolean;
  /** 路由切換時的回調事件 */
  onNavigate?: (id: string) => any;
  /** components */
  children?: React.ReactNode | null;

  subpaths?: string[];
};

/** Sidebar component props */
export type SidebarProps = {
  /** 是否開啟 Sidebar */
  open: boolean;
  /** Menu 設定 */
  menuConfigs: MenuConfig[];
  /** 關閉事件 */
  onClose?: () => any;
};

/**
 * NavLink Component
 * @returns NavLink
 */
export const NavLink: React.FC<NavLinkProps> = ({ id, path, children, active, onNavigate, subpaths }) => {
  const navigation = useNavigation();
  const [isMenuOpen, SetIsMenuOpen] = useState(false);
  const current = useSelector((state: AppState) => state.router.current);
  if (path) {
    return (
      <a
        className={cx('nav-link', { active: active })}
        onClick={() => {
          navigation.push(path);

          if (onNavigate) {
            onNavigate(id);
          }
        }}
      >
        {children}
      </a>
    );
  }

  useEffect(() => {
    if (subpaths?.some((x) => x === current?.pathname)) {
      SetIsMenuOpen(true);
    }
  }, [current?.pathname]);

  return (
    <a
      className={cx('nav-link', { open: isMenuOpen })}
      onClick={() => {
        SetIsMenuOpen(!isMenuOpen);
      }}
    >
      {children}
    </a>
  );
};

/**
 * Sidebar Component
 * @returns Sidebar
 */
export const Sidebar: React.FC<SidebarProps> = ({ menuConfigs, open, onClose }) => {
  const navigation = useNavigation();
  const current = useSelector((state: AppState) => state.router.current);
  const [permissions] = useState(getUserPermissions());
  const [activeId, setActiveId] = useState('');
  const handleNavigate = (id: string) => {
    setActiveId(id);

    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <div className={cx('nrg-admin-sidebar-wrapper', { open })}>
        <aside className="nrg-admin-sidebar">
          {/* Header */}
          <div className="nrg-admin-sidebar-header">
            <img src={mjibImg} alt="mjib" className="logo" />
            <div className="nrg-admin-sidebar-brand">
              <a className="nrg-admin-sidebar-brand-text" onClick={() => navigation.push(RouteURL.HOME)}>
                資金清查AI系統
              </a>
            </div>
            <a className="btn btn-link nrg-admin-sidebar-btn-close" onClick={() => onClose && onClose()}>
              <i className="fas fa-times" />
            </a>
          </div>

          {/* Content */}
          <div className="nrg-admin-sidebar-content">
            <ul className="nav nrg-admin-menu">
              {menuConfigs.map((menuCfg) => {
                /** 是否有 subMenu 的設定 */
                const hasSubMenu = menuCfg.subMenu;
                /** 是否有 Menu 權限 */
                const hasMenuPermission = menuCfg.permissionKey ? permissions[menuCfg.permissionKey] : true;
                /** 有權限的 SubMenu 列表 */
                const subMenu = menuCfg.subMenu
                  ? menuCfg.subMenu.filter((sm) => (sm.permissionKey ? permissions[sm.permissionKey] : true))
                  : [];

                /** 是否顯示 Menu */
                const showMenu = hasSubMenu ? subMenu.length > 0 : hasMenuPermission;

                return (
                  showMenu && (
                    <li
                      key={menuCfg.id}
                      className={cx('nav-item', {
                        'has-sub-menu': hasSubMenu,
                      })}
                    >
                      <NavLink
                        id={menuCfg.id}
                        path={menuCfg.path}
                        active={menuCfg.subMenu ? menuCfg.subMenu?.some((x) => x.path === current?.pathname) : false}
                        onNavigate={handleNavigate}
                        subpaths={menuCfg.subMenu ? menuCfg.subMenu?.map((x) => x.path || '') : ([] as string[])}
                      >
                        <i className="nav-icon fas fa-list-ul fa-fw nav-link-icon" />
                        <span className="nav-link-text">{menuCfg.title}</span>
                        {hasSubMenu && <i className="fas fa-angle-right nav-link-icon-arrow" />}
                      </NavLink>
                      {hasSubMenu && (
                        <ul className="nav nrg-admin-sub-menu">
                          {subMenu.map((subMenuCfg) => (
                            <li key={subMenuCfg.id} className="nav-item">
                              <NavLink
                                id={subMenuCfg.id}
                                path={subMenuCfg.path}
                                active={subMenuCfg.path === current?.pathname}
                                onNavigate={handleNavigate}
                              >
                                <i className="nav-icon far fa-circle nav-link-icon" />
                                <span className="nav-link-text">{subMenuCfg.title}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
      <div className={cx('nrg-admin-sidebar-dimmer', { active: open })} onClick={() => onClose && onClose()} />
    </>
  );
};
