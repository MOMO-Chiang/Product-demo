import React from 'react';
import { Modal } from '@app/components/modal';
import { useSelector } from 'react-redux';
import { AppState } from '@app/store';
import { NavbarModalContentType } from '@shared/enums';
import { SysUserListEdit } from './SysUserListEdit';
import { NotificationModal } from './NotificationModal';

export const ModalForm = () => {
  const isShowModal = useSelector((state: AppState) => state.navbarMenu.isShowModal);

  /** modal內容型態 */
  const navbarModalContentType = useSelector((state: AppState) => state.navbarMenu.navbarModalContentType);

  return (
    <Modal show={isShowModal} dialogClassName="modal-lg">
      {(() => {
        switch (navbarModalContentType) {
          case NavbarModalContentType.NOTIFICATION:
            return <NotificationModal></NotificationModal>;
          case NavbarModalContentType.SYSUSERLIST:
            return <SysUserListEdit></SysUserListEdit>;
          default:
            return <></>;
        }
      })()}
    </Modal>
  );
};
