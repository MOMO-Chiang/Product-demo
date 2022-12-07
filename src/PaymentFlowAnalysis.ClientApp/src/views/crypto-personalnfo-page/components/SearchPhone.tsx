import { Card } from '@app/components/card';
import {
  DataColumn,
  DataTable,
  PageSizeSelectChangeFunc,
  PaginatedButtonClickFunc,
  Pagination,
  RenderColumnFunc,
  SortChangeFunc,
} from '@app/components/data-table';
import { Modal } from '@app/components/modal';
import { PageContainer, PageHeader, PageTitle } from '@app/components/page';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { DEFAULT_PAGE } from '@shared/constants';
import { PersonalPhoneShowModalData } from '@shared/types';
import React from 'react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryOrderNumberListActionCreator, showPhoneListActionCreator } from '../actions';

/** DataTable 欄位名稱 */
export type CryptoPersonalInfoPhoneTableField = keyof PersonalPhoneShowModalData;

export default function SearchPhoneModal(props: any) {
  /** modal開關 */
  const [show, setShow] = useState(false);

  /** TableColumns 欄位設定 */
  const [PhoneTableColumns] = useState([
    { field: 'phone', name: '個人電話' },
    { field: 'createTime', name: '資料建立時間' },
  ]);

  /** 關閉modal */
  const handleClose = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };

  /** 當前取得搜尋條件資料 */
  const CryptoPersonalSearchPhoneParams = useSelector(
    (state: AppState) => state.pages.CryptoPersonalInfo.CryptoPersonalSearchPhoneParams,
  );

  /** 電話資料 */
  const phoneData = useSelector((state: AppState) => state.pages.CryptoPersonalInfo.phoneData);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.CryptoPersonalInfo.paginatedPhoneInfo);

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 開啟modal */
  const handleShow = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setShow(true);
      dispatch(showPhoneListActionCreator(props.PersonalInfoId, CryptoPersonalSearchPhoneParams));
    },
    [dispatch],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        showPhoneListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchPhoneParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, CryptoPersonalSearchPhoneParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        showPhoneListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchPhoneParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, CryptoPersonalSearchPhoneParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        showPhoneListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchPhoneParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, CryptoPersonalSearchPhoneParams],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<PersonalPhoneShowModalData, CryptoPersonalInfoPhoneTableField> = ({ field, data }) => {
    return <DataColumn>{data[field]}</DataColumn>;
  };

  //#region Effects
  useEffect(() => {
    // 載入畫面時，取得電話資料
    return () => {
      // 重置頁面 State
    };
  }, [dispatch]);

  return (
    <>
      <a style={{ color: 'var(--bs-link-color)', cursor: 'pointer' }} onClick={handleShow}>
        {!props.Data
          ? ''
          : props.Data.split(',').length > 2
          ? props.Data.split(',')[0] + ',' + props.Data.split(',')[1] + '...'
          : props.Data}
      </a>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>電話列表</Modal.Title>
          <Modal.CloseButton onClick={handleClose}></Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          {/* Table Card */}
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <DataTable
                columns={PhoneTableColumns}
                data={phoneData}
                onSortChange={handleSortedColumnChange}
                sortedColumn={CryptoPersonalSearchPhoneParams.sortedColumn}
                sortedType={CryptoPersonalSearchPhoneParams.sortedType}
                renderColumn={renderColumn}
                keyExtractor={(item: PersonalPhoneShowModalData, index) => index.toString()}
              />
            </Card.Body>
            <Card.Footer>
              <Pagination
                page={paginatedInfo.page}
                totalPage={paginatedInfo.totalPage}
                pageSize={paginatedInfo.pageSize}
                totalCount={paginatedInfo.totalCount}
                onPaginatedButtonClick={handlePageChange}
              />
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary btn-width-lg" style={{ marginBottom: '10px' }} onClick={handleClose}>
            取消
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
