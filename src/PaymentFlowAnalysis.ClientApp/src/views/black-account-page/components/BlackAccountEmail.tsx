import { DataColumn, DataTable, RenderColumnFunc } from '@app/components/data-table';
import { ErrorMessage, FormGroup, Input, Label, Select } from '@app/components/form';
import { Modal } from '@app/components/modal';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { SortedType } from '@shared/enums';
import { BlackAccountEmailShowModalData } from '@shared/types';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlackAccountActionCreator, hideModalActionCreator, updateBlackAccountActionCreator } from '../actions';

/** DataTable 欄位名稱 */
export type BlackAccountTableField = keyof BlackAccountEmailShowModalData;
export const BlackAccountEmail = () => {
  /** DataTable 欄位設定 */
  const [dataTableColumns] = useState([
    { field: 'email', name: '電子信箱' },
    { field: 'updateTime', name: '資料更新時間' },
  ]);
  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 帳號資料 */
  const emailData = useSelector((state: AppState) => state.pages.blackAccounts.emailData);

  /** 隱藏Modal */
  const hideModal = useCallback(() => {
    dispatch(hideModalActionCreator());
  }, [dispatch]);

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<BlackAccountEmailShowModalData, BlackAccountTableField> = ({ field, data }) => {
    return <DataColumn>{data[field]}</DataColumn>;
  };
  return (
    <>
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>信箱列表</Modal.Title>
          <Modal.CloseButton onClick={hideModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      <Modal.Body>
        <DataTable
          columns={dataTableColumns}
          data={emailData}
          sortedColumn={''}
          sortedType={SortedType.ASC}
          renderColumn={renderColumn}
          keyExtractor={(item: BlackAccountEmailShowModalData, index) => index.toString()}
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
};
