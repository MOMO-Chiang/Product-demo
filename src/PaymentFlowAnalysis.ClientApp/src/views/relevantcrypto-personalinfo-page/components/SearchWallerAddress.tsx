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
import { PersonalWallerAddressShowModalData, PersonalPhoneShowModalData } from '@shared/types';
import React from 'react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showWallerAddressListActionCreator } from '../actions';

/** DataTable 欄位名稱 */
export type RelevantCryptoPersonalInfoWallerAddressTableField = keyof PersonalWallerAddressShowModalData;

export default function SearchWallerAddressModal(props: any) {
  /** modal開關 */
  const [show, setShow] = useState(false);

  /** TableColumns 欄位設定 */
  const [WallerAddressTableColumns] = useState([
    { field: 'wallerAddress', name: '錢包地址' },
    { field: 'currencyType', name: '幣別' },
    { field: 'property', name: '數量' },
  ]);

  /** 關閉modal */
  const handleClose = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };

  /** 當前取得搜尋條件資料 */
  const CryptoPersonalSearchWallerAddressParams = useSelector(
    (state: AppState) => state.pages.RelevantCryptoPersonalInfo.CryptoPersonalSearchWallerAddressParams,
  );

  /** WallerAddress資料 */
  const WallerAddressData = useSelector((state: AppState) => state.pages.RelevantCryptoPersonalInfo.wallerAddressData);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.RelevantCryptoPersonalInfo.paginatedWallerAddressInfo);

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 開啟modal */
  const handleShow = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setShow(true);
      dispatch(showWallerAddressListActionCreator(props.PersonalInfoId, CryptoPersonalSearchWallerAddressParams));
    },
    [dispatch],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        showWallerAddressListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchWallerAddressParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, CryptoPersonalSearchWallerAddressParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        showWallerAddressListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchWallerAddressParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, CryptoPersonalSearchWallerAddressParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        showWallerAddressListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchWallerAddressParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, CryptoPersonalSearchWallerAddressParams],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<
    PersonalWallerAddressShowModalData,
    RelevantCryptoPersonalInfoWallerAddressTableField
  > = ({ field, data }) => {
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
      <Modal show={show} dialogClassName="modal-lg">
        <Modal.Header>
          <Modal.Title>錢包列表</Modal.Title>
          <Modal.CloseButton onClick={handleClose}></Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          {/* Table Card */}
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <DataTable
                columns={WallerAddressTableColumns}
                data={WallerAddressData}
                onSortChange={handleSortedColumnChange}
                sortedColumn={CryptoPersonalSearchWallerAddressParams.sortedColumn}
                sortedType={CryptoPersonalSearchWallerAddressParams.sortedType}
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
