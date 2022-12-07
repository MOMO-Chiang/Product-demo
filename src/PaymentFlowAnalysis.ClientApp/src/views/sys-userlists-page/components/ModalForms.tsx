import React, { useCallback, useEffect } from 'react';
import { Modal } from '@app/components/modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/store';
import { SysUserListEdit } from './SysUserListEdit';
import { ModalContentType } from '@shared/enums';

export const ModalForm = () => {
  const isShowModal = useSelector((state: AppState) => state.pages.sysUserLists.isShowModal);

  /** modal內容型態 */
  const modalContentType = useSelector((state: AppState) => state.pages.sysUserLists.modalContentType);

  return (
    <Modal show={isShowModal} dialogClassName="modal-lg">
      {(() => {
        switch (modalContentType) {
          // case ModalContentType.CREATE:
          //   return <SysUserListCreate></SysUserListCreate>;
          case ModalContentType.EDIT:
            return <SysUserListEdit></SysUserListEdit>;
          default:
            return <></>;
        }
      })()}
    </Modal>
  );
};
