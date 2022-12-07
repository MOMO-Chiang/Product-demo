import React, { ChangeEvent, useCallback, useState } from 'react';
import { getLoginInfo, clearLoginInfo } from '@shared/auth';
import { RouteURL, useNavigation } from '@modules/router';
import { UserFileSelector } from '@modules/userFileSelector';
import { NavbarMenu } from '@modules/navbarMenu/NavbarMenu';

export type NavbarProps = {
  onMenuBtnClick?: () => any;
};

export const Navbar: React.FC<NavbarProps> = ({ onMenuBtnClick }) => {
  return (
    <div className="navbar nrg-admin-navbar-wrapper">
      <nav className="navbar nrg-admin-navbar">
        <div className="container-fluid">
          <div className="navbar-nav">
            <a className="nav-link menu-btn" onClick={() => onMenuBtnClick && onMenuBtnClick()}>
              <i className="fas fa-bars" />
            </a>
            <UserFileSelector></UserFileSelector>
          </div>
          <NavbarMenu></NavbarMenu>
        </div>
      </nav>
    </div>
  );
};
