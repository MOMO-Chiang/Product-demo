import { Card } from '@app/components/card';
import {
  DataColumn,
  DataTable,
  PageSizeSelectChangeFunc,
  PaginatedButtonClickFunc,
  Pagination,
  RenderColumnFunc,
  RenderDetailColumnFunc,
  SortChangeFunc,
} from '@app/components/data-table';
import { Modal } from '@app/components/modal';
import { PageContainer, PageHeader, PageTitle } from '@app/components/page';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { DEFAULT_PAGE } from '@shared/constants';
import { QueryConditionType, QueryStatusType } from '@shared/enums';
import { CryptoQueryDetail, CryptoQueryMaster } from '@shared/types';
import React from 'react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoryOrderNumberListActionCreator } from '../actions';

/** DataTable 欄位名稱 */
export type CryptoPersonalInfoTableField = keyof CryptoQueryMaster;
export type CryptoPersonalInfoHistoryTableField = keyof CryptoQueryDetail;

export default function SearchHistoryModal() {
  /** modal開關 */
  const [show, setShow] = useState(false);

  /** HistoryTableColumns 欄位設定 */
  const [HistoryTableColumns] = useState([
    //{ field: 'seq', name: '展開圖示', isSortable: false },
    { field: 'queryOrderTime', name: '調閱時間' },
    { field: 'orderMasterNumber', name: '調閱主序號', isPrimary: true },
    { field: 'caseNo', name: '案號' },
    { field: 'caseName', name: '案名' },
    { field: 'orderDetailCount', name: '資料回覆/調閱筆數' },
    { field: 'queryConditionType', name: '拋查條件' },
    /** 當有明細資料需要顯示時，isDetail值請設定為true(可選) **/
    { field: 'detailData', name: '明細資料', isSortable: false, isDetail: true },
  ]);

  const [DetaildataTableColumns] = useState([
    { field: 'OrderMasterNumber', name: '調閱主序號', isPrimary: true },
    { field: 'OrderDetailNumber', name: '調閱單號' },
    { field: 'RequestAgency', name: '交易所' },
    { field: 'QueryConditionType', name: '拋查條件' },
    { field: 'QueryValue', name: '拋查值' },
    { field: 'QueryStatus', name: '拋查狀態' },
    { field: 'QueryOrderTime', name: '調閱時間' },
  ]);

  /** 關閉modal */
  const handleClose = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };

  /** 當前取得調閱單號的搜尋條件資料 */
  const currentFetchCryptoPersonalSearchHistoryParams = useSelector(
    (state: AppState) => state.pages.CryptoPersonalInfo.currentFetchCryptoPersonalSearchHistoryParams,
  );

  /** 歷史調閱資料 */
  const CryptoPersonalSearchHistory = useSelector(
    (state: AppState) => state.pages.CryptoPersonalInfo.CryptoPersonalSearchHistory,
  );

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.CryptoPersonalInfo.paginatedInfo);

  /** 是否成功撈回歷史調閱資料 */
  const isFetchCryptoPersonalSearchHistorySuccess = useSelector(
    (state: AppState) => state.pages.CryptoPersonalInfo.isFetchCryptoPersonalSearchHistorySuccess,
  );

  /** 是否正在調閱主序號資料 */
  const isFetchOrderMasterListsLoading = useSelector(
    (state: AppState) => state.pages.CryptoPersonalInfo.isFetchOrderMasterListsLoading,
  );

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 開啟modal */
  const handleShow = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setShow(true);
      dispatch(fetchHistoryOrderNumberListActionCreator(currentFetchCryptoPersonalSearchHistoryParams));
    },
    [dispatch],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        fetchHistoryOrderNumberListActionCreator({
          ...currentFetchCryptoPersonalSearchHistoryParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, currentFetchCryptoPersonalSearchHistoryParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        fetchHistoryOrderNumberListActionCreator({
          ...currentFetchCryptoPersonalSearchHistoryParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, currentFetchCryptoPersonalSearchHistoryParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        fetchHistoryOrderNumberListActionCreator({
          ...currentFetchCryptoPersonalSearchHistoryParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, currentFetchCryptoPersonalSearchHistoryParams],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<CryptoQueryMaster, CryptoPersonalInfoTableField> = ({ field, data }) => {
    if (field === 'orderDetailCount') {
      if (data.queryStatusCount == data[field]) {
        return <DataColumn style={{ color: 'lightgreen' }}>{data.queryStatusCount + '/' + data[field]}</DataColumn>;
      } else {
        return <DataColumn style={{ color: 'red' }}>{data.queryStatusCount + '/' + data[field]}</DataColumn>;
      }
    }
    return <DataColumn>{data[field]}</DataColumn>;
  };

  /** render明細表資料 */
  const renderDetailColumn: RenderDetailColumnFunc<CryptoQueryDetail, CryptoPersonalInfoHistoryTableField> = ({
    field,
    data,
    cidx,
  }) => {
    switch (field) {
      default:
        return data[field];
    }
  };

  //#region Effects
  useEffect(() => {
    // 載入畫面時
    return () => {
      // 重置頁面 State
    };
  }, [dispatch]);

  return (
    <>
      <button
        onClick={handleShow}
        className="btn btn-primary btn-width-lg"
        style={{ marginBottom: '10px' }}
        disabled={isFetchOrderMasterListsLoading}
      >
        拋查歷史紀錄
      </button>

      <Modal show={show} dialogClassName="modal-xl">
        <Modal.Header>
          <Modal.Title>交易所拋查紀錄</Modal.Title>
          <Modal.CloseButton onClick={handleClose}></Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          {/* Table Card */}
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <DataTable
                columns={HistoryTableColumns}
                DetailColumn={DetaildataTableColumns}
                data={CryptoPersonalSearchHistory}
                onSortChange={handleSortedColumnChange}
                sortedColumn={currentFetchCryptoPersonalSearchHistoryParams.sortedColumn}
                sortedType={currentFetchCryptoPersonalSearchHistoryParams.sortedType}
                renderColumn={renderColumn}
                renderDetailColumn={renderDetailColumn}
                keyExtractor={(item: CryptoQueryMaster) => item.orderMasterNumber}
                isLoading={isFetchOrderMasterListsLoading}
              />
            </Card.Body>
            <Card.Footer>
              <Pagination
                page={paginatedInfo.page}
                totalPage={paginatedInfo.totalPage}
                pageSize={paginatedInfo.pageSize}
                totalCount={paginatedInfo.totalCount}
                onPaginatedButtonClick={handlePageChange}
                disabled={isFetchOrderMasterListsLoading}
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
