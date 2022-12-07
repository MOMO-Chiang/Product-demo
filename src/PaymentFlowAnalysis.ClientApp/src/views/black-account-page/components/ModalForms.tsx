import React, { useCallback, useEffect } from 'react';
import { Modal } from '@app/components/modal';
import { hideModalActionCreator } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/store';
import { BlackAccountCreate } from './BlackAccountCreate';
import { BlackAccountEdit } from './BlackAccountEdit';
import { BlackAccountModalContentType, ModalContentType } from '@shared/enums';
import { BlackAccountPhone } from './BlackAccountPhone';
import { BlackAccountEmail } from './BlackAccountEmail';
import { BlackAccountIP } from './BlackAccountIP';

export const ModalForm = () => {
  const isShowModal = useSelector((state: AppState) => state.pages.blackAccounts.isShowModal);

  /** modal內容型態 */
  const modalContentType = useSelector((state: AppState) => state.pages.blackAccounts.modalContentType);

  return (
    <Modal show={isShowModal}>
      {(() => {
        switch (modalContentType) {
          case BlackAccountModalContentType.CREATE:
            return <BlackAccountCreate></BlackAccountCreate>;
          case BlackAccountModalContentType.EDIT:
            return <BlackAccountEdit></BlackAccountEdit>;
          case BlackAccountModalContentType.PHONE:
            return <BlackAccountPhone></BlackAccountPhone>;
          case BlackAccountModalContentType.EMAIL:
            return <BlackAccountEmail></BlackAccountEmail>;
          case BlackAccountModalContentType.IP:
            return <BlackAccountIP></BlackAccountIP>;
          default:
            return <></>;
        }
      })()}
    </Modal>
  );
};
