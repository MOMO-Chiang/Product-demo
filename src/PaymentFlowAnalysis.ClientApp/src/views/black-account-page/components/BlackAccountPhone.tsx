import { DataColumn, DataTable, RenderColumnFunc } from '@app/components/data-table';
import { Modal } from '@app/components/modal';
import { AppState } from '@app/store';
import { SortedType } from '@shared/enums';
import { BlackAccount, BlackAccountPhoneShowModalData } from '@shared/types';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModalActionCreator } from '../actions';

/** DataTable 欄位名稱 */
export type BlackAccountTableField = keyof BlackAccountPhoneShowModalData;
export const BlackAccountPhone = () => {
  /** DataTable 欄位設定 */
  const [dataTableColumns] = useState([
    { field: 'phone', name: '個人電話' },
    { field: 'updateTime', name: '資料更新時間' },
  ]);
  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 帳號資料 */
  const phoneData = useSelector((state: AppState) => state.pages.blackAccounts.phoneData);

  /** 隱藏Modal */
  const hideModal = useCallback(() => {
    dispatch(hideModalActionCreator());
  }, [dispatch]);

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<BlackAccountPhoneShowModalData, BlackAccountTableField> = ({ field, data }) => {
    return <DataColumn>{data[field]}</DataColumn>;
  };
  return (
    <>
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>電話列表</Modal.Title>
          <Modal.CloseButton onClick={hideModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      <Modal.Body>
        <DataTable
          columns={dataTableColumns}
          data={phoneData}
          sortedColumn={''}
          sortedType={SortedType.ASC}
          renderColumn={renderColumn}
          keyExtractor={(item: BlackAccountPhoneShowModalData, index) => index.toString()}
        />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
};
