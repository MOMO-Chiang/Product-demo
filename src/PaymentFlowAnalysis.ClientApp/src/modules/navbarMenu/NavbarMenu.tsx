import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/store';
import { clearLoginInfo, getLoginInfo } from '@shared/auth';
import avatarImg from '@shared/assets/images/avatar.png';
import { RouteURL, useNavigation } from '@modules/router';
import {
  fetchNotificationsActionCreator,
  fetchNotificationUnReadCountActionCreator,
  showEditModalActionCreator,
  showNotificationModalActionCreator,
  updateNotificationReadActionCreator,
} from './actions';
import { ModalForm } from './components/ModalForms';
import { hideModalActionCreator } from './actions';

function getUid() {
  const loginInfo = getLoginInfo();
  return (loginInfo && loginInfo.userInfo.uid) || '';
}

export const NavbarMenu = () => {
  const [uid] = useState(getUid());

  /** 更新帳號是否成功 */
  const isUpdateSysUserListSuccess = useSelector((state: AppState) => state.navbarMenu.isUpdateSysUserListSuccess);

  /** 未讀數量 */
  const unreadNotificationCount = useSelector((state: AppState) => state.navbarMenu.unreadNotificationCount);

  /** 當前取得通知資料的搜尋條件資料 */
  const currentFetchNotificationInfosParams = useSelector(
    (state: AppState) => state.navbarMenu.currentFetchNotificationInfosParams,
  );

  const navigation = useNavigation();

  const handleLogout = () => {
    // 清除登入資訊
    clearLoginInfo();
    // 導至登入頁面
    navigation.replace(RouteURL.LOGIN);
  };

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 處理編輯事件 */
  const handleSysUserListEvent = useCallback(() => {
    dispatch(showEditModalActionCreator());
  }, [dispatch]);

  /** 處理通知事件 */
  const handleNotificationEvent = useCallback(() => {
    dispatch(showNotificationModalActionCreator());
    dispatch(fetchNotificationsActionCreator(currentFetchNotificationInfosParams));
  }, [dispatch, currentFetchNotificationInfosParams]);

  /** 初始撈取未讀通知數量 */
  useEffect(() => {
    dispatch(fetchNotificationUnReadCountActionCreator());
  }, [dispatch]);

  /** 更新成功 */
  useEffect(() => {
    if (isUpdateSysUserListSuccess) {
      dispatch(hideModalActionCreator());
    }
  }, [isUpdateSysUserListSuccess]);

  return (
    <>
      <ul className="navbar-nav">
        <li className="nav-item pe-2">
          {unreadNotificationCount ? (
            <span className="badge bg-danger">{unreadNotificationCount}</span>
          ) : (
            <span className="badge"></span>
          )}
          <i className="fas fa-bell fa-2x" onClick={() => handleNotificationEvent()}></i>
        </li>
        <li className="nav-item">
          <img className="avatar" src={avatarImg} alt="avatar" width="30" onClick={() => handleSysUserListEvent()} />
          <span className="username">{uid}</span>
        </li>
      </ul>
      <ModalForm></ModalForm>
    </>
    // <div className="navbar-nav">
    //   <div className="nav-item dropdown user-dropdown">
    //     <a className="nav-link dropdown-toggle" id="navbarUserDropdownMenuLink" role="button" data-bs-toggle="dropdown">
    //       <span className="username">{username}</span>
    //       <img className="avatar" src={avatarImg} alt="avatar" />
    //     </a>
    //     <ul className="dropdown-menu" aria-labelledby="navbarUserDropdownMenuLink">
    //       <li>
    //         <a className="dropdown-item" onClick={handleLogout}>
    //           登出
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};
