import { Card } from '@app/components/card';
import {
  DataColumn,
  DataTable,
  PageSizeSelect,
  PageSizeSelectChangeFunc,
  PaginatedButtonClickFunc,
  Pagination,
  RenderColumnFunc,
  SortChangeFunc,
} from '@app/components/data-table';
import { DatePicker, FormGroup, Input, Label, Select } from '@app/components/form';
import { PageContainer, PageHeader, PageTitle } from '@app/components/page';
import { SearchCard } from '@app/components/search-card';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { useNavigation } from '@modules/router';
import { DEFAULT_PAGE, PAGE_SIZE_OPTIONS } from '@shared/constants';
import { cryptoQuery } from '@shared/types';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCryptoQuerysActionCreator,
  hideModalActionCreator,
  resetPageStateActionCreator,
  showCreateModalActionCreator,
  showEditModalActionCreator,
  exportExcelActionCreator,
  exportOdsActionCreator,
  initPageActionCreator,
} from './actions';

/** DataTable 欄位名稱 */
export type cryptoQueryTableField = keyof (cryptoQuery & {
  actions: string;
});

/** SearchCard Form */
export type SearchCardForm = {
  /** 調閱人人事五碼 */
  queryUserId: string;
  /** 交易所 */
  requestAgency: string;
  /** 拋查條件 */
  queryConditionType: string;
  /** 拋查值 */
  queryValue: string;
  /** 調閱單號 */
  orderDetailNumber: string;
  /** 拋查日期(起) */
  queryOrderTimeStart: string;
  /** 拋查日期(迄) */
  queryOrderTimeEnd: string;
};

/** 「模板頁面」元件 */
export const CryptoQueryPage = () => {
  //#region Hooks

  /** DataTable 欄位設定 */
  const [dataTableColumns] = useState([
    { field: 'queryOrderTime', name: '調閱時間' },
    { field: 'queryUserId', name: '調閱人人事五碼' },
    { field: 'requestAgency', name: '目標機構' },
    { field: 'queryConditionType', name: '拋查條件' },
    { field: 'queryValue', name: '拋查值' },
    { field: 'queryStatus', name: '拋查狀態' },
    { field: 'orderDetailNumber', name: '調閱單號' },
    { field: 'queryName', name: '調閱人姓名' },
    { field: 'queryPhone', name: '調閱人電話' },
    { field: 'queryEmail', name: '調閱人Email' },
    { field: 'queryRank', name: '調閱人職稱' },
    { field: 'queryUnit', name: '調閱人任職單位' },
    { field: 'projectCategory', name: '刑事案類' },
  ]);

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    queryUserId: { initialValue: '', validate: () => ({}) },
    requestAgency: { initialValue: '', validate: () => ({}) },
    queryConditionType: { initialValue: '', validate: () => ({}) },
    queryValue: { initialValue: '', validate: () => ({}) },
    orderDetailNumber: { initialValue: '', validate: () => ({}) },
    queryOrderTimeStart: { initialValue: '', validate: () => ({}) },
    queryOrderTimeEnd: { initialValue: '', validate: () => ({}) },
  });

  /** 當前取得帳號資料的搜尋條件資料 */
  const currentFetchCryptoQueryParams = useSelector((state: AppState) => state.pages.cryptoQuery.currentFetchCryptoQueryParams);

  /** 帳號資料 */
  const cryptoQuery = useSelector((state: AppState) => state.pages.cryptoQuery.cryptoQueryLists);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.cryptoQuery.paginatedInfo);

  /** 是否正在取得帳號資料 */
  const isFetchCryptoQuerysLoading = useSelector((state: AppState) => state.pages.cryptoQuery.isFetchCryptoQuerysLoading);

  /** 資料來源機構下拉選單 */
  const ExchangeTypeCodeOptions = useSelector((state: AppState) => state.pages.cryptoQuery.ExchangeTypeCodeOptions);

  /** 拋查條件下拉選單 */
  const QueryConditionCodeOptions = useSelector((state: AppState) => state.pages.cryptoQuery.QueryConditionCodeOptions);

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** Navigation */
  const navigation = useNavigation();

  //#endregion Hooks

  /** 搜尋按鈕事件 */
  const handleSearchFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        fetchCryptoQuerysActionCreator({
          ...currentFetchCryptoQueryParams,
          ...formData,
          page: DEFAULT_PAGE,
        }),
      );
    },
    [dispatch, formData, currentFetchCryptoQueryParams],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        fetchCryptoQuerysActionCreator({
          ...currentFetchCryptoQueryParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, currentFetchCryptoQueryParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        fetchCryptoQuerysActionCreator({
          ...currentFetchCryptoQueryParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, currentFetchCryptoQueryParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        fetchCryptoQuerysActionCreator({
          ...currentFetchCryptoQueryParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, currentFetchCryptoQueryParams],
  );

  /** 匯出定期接收帳戶資料excel */
  const exportCryptoQueryexcel = useCallback(() => {
    dispatch(exportExcelActionCreator({ ...currentFetchCryptoQueryParams }));
  }, [dispatch, currentFetchCryptoQueryParams]);

  /** 匯出定期接收帳戶資料資料ods */
  const exportCryptoQueryods = useCallback(() => {
    dispatch(exportOdsActionCreator({ ...currentFetchCryptoQueryParams }));
  }, [dispatch, currentFetchCryptoQueryParams]);

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<cryptoQuery, cryptoQueryTableField> = ({ field, data }) => {
    if (field === 'actions') {
      return (
        <DataColumn>
          <button type="button" className="btn btn-warning btn-sm me-2">
            <i className="fas fa-pen" />
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            <i className="fas fa-trash" />
          </button>
        </DataColumn>
      );
    }

    return <DataColumn>{data[field]}</DataColumn>;
  };

  //#region Effects
  useEffect(() => {
    // 載入畫面時，取得帳號列表
    dispatch(fetchCryptoQuerysActionCreator(currentFetchCryptoQueryParams));

    // 初始頁面資料
    dispatch(initPageActionCreator());
    return () => {
      // 重置頁面 State
      dispatch(resetPageStateActionCreator());
    };
  }, [dispatch]);

  //#endregion Effects

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>使用者調閱紀錄</PageTitle>
      </PageHeader>

      {/* Search Card */}
      <SearchCard>
        <form className="container-fluid" onSubmit={handleSearchFormSubmit}>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="queryUserId">人事五碼</Label>
                <Input
                  type="text"
                  id="queryUserId"
                  name="queryUserId"
                  onChange={(e) => updateFormData({ queryUserId: e.target.value })}
                  value={formData.queryUserId}
                  disabled={isFetchCryptoQuerysLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="requestAgency">目標機構</Label>
                <Select
                  id="requestAgency"
                  name="requestAgency"
                  options={ExchangeTypeCodeOptions}
                  onChange={(e) => updateFormData({ requestAgency: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="orderDetailNumber">調閱單號</Label>
                <Input
                  type="text"
                  id="orderDetailNumber"
                  name="orderDetailNumber"
                  onChange={(e) => updateFormData({ orderDetailNumber: e.target.value })}
                  value={formData.orderDetailNumber}
                  disabled={isFetchCryptoQuerysLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="queryConditionType">拋查條件</Label>
                <Select
                  id="queryConditionType"
                  name="queryConditionType"
                  options={QueryConditionCodeOptions}
                  onChange={(e) => updateFormData({ queryConditionType: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="queryValue">拋查值</Label>
                <Input
                  type="text"
                  id="queryValue"
                  name="queryValue"
                  onChange={(e) => updateFormData({ queryValue: e.target.value })}
                  value={formData.queryValue}
                  disabled={isFetchCryptoQuerysLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="queryOrderTimeStart">調閱日期(起)</Label>
                <DatePicker
                  id="queryOrderTimeStart"
                  name="queryOrderTimeStart"
                  onChange={(date) => updateFormData({ queryOrderTimeStart: date })}
                  value={formData.queryOrderTimeStart}
                  disabled={isFetchCryptoQuerysLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="queryOrderTimeEnd">調閱日期(迄)</Label>
                <DatePicker
                  id="queryOrderTimeEnd"
                  name="queryOrderTimeEnd"
                  onChange={(date) => updateFormData({ queryOrderTimeEnd: date })}
                  value={formData.queryOrderTimeEnd}
                  disabled={isFetchCryptoQuerysLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary btn-width-xlg" disabled={isFetchCryptoQuerysLoading}>
                紀錄查詢
              </button>
            </div>
          </div>
        </form>
      </SearchCard>

      {/* Table Card */}
      <Card>
        <Card.Header>
          <PageSizeSelect options={PAGE_SIZE_OPTIONS} onChange={handlePageSizeChange} value={String(paginatedInfo.pageSize)} />
          <div>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNMTUuNTMzNjkzNSwxLjM2MDc4NjU2IEwxNC4zMDkxOTM0LDAgTDQuNjYxNjQ4NjEsMCBDMy45NjU4NzI1OSwwIDMuNjk3NDUwMjIsMC41MTYyNDA2NDUgMy42OTc0NTAyMiwwLjkxODk0MDg4MiBMMy42OTc0NTAyMiw0LjU0OTkwNDk1IEw1LjA1MDIyMTQ3LDQuNTQ5OTA0OTUgTDUuMDUwMjIxNDcsMS42NTIzMTE5MSBDNS4wNTAyMjE0NywxLjQ5NzY0MzA5IDUuMTc5NzI2NDIsMS4zNjgzMTUwNiA1LjMzMDEyNTc3LDEuMzY4MzE1MDYgTDEyLjIzMjY5OTIsMS4zNjgzMTUwNiBDMTIuMzg0ODY2NiwxLjM2ODMxNTA2IDEyLjQ2MDcyNzUsMS4zOTUzNjA3NyAxMi40NjA3Mjc1LDEuNTE5NTExODMgTDEyLjQ2MDcyNzUsNi4zMzk3NDkzNSBMMTcuMzc0MzM2LDYuMzM5NzQ5MzUgQzE3LjU2NzQyOTMsNi4zMzk3NDkzNSAxNy42NDIxOSw2LjQzOTEwNTU5IDE3LjY0MjE5LDYuNTg2NDk3OTEgTDE3LjY0MjE5LDE4LjM1NTEzNzkgQzE3LjY0MjE5LDE4LjYwMTgzNzIgMTcuNTQyNzY0OSwxOC42MzkxMzQ4IDE3LjM5MjM2NTYsMTguNjM5MTM0OCBMNS4zMzAxMjU3NywxOC42MzkxMzQ4IEM1LjE3ODQxNDIxLDE4LjYzOTEzNDggNS4wNTAyMjE0NywxOC41MDcxMDU0IDUuMDUwMjIxNDcsMTguMzU1MTM3OSBMNS4wNTAyMjE0NywxNy4yNzk3NTI5IEwzLjcwNTg1MTk1LDE3LjI3OTc1MjkgTDMuNzA1ODUxOTUsMTguOTc0NjUxMiBDMy42ODgzMDM1NywxOS41NzQwNzYyIDQuMDA4Mjk0NzIsMjAgNC42NjE2NDg2MSwyMCBMMTguMDYwNzk2NCwyMCBDMTguNzYwNzQ4NCwyMCAxOSwxOS40OTI4OTUgMTksMTkuMDMxMDUzIEwxOSw2LjQ0Mzk2NTU4IEwxOSw1LjE4NjY3MDQ4IEwxOC42NTA0OTU3LDQuODA3MjAwNjcgTDE1LjUzMzY5MzUsMS4zNjA3ODY1NiBaIE0xMy44MzYxMjY2LDEuNTE5NTExODMgTDE0LjIyMjYxNzMsMS45NTM1MjcyOCBMMTYuODE4NzQzNyw0LjgwNzIwMDY3IEwxNi45NjE3Njc0LDQuOTgwMDM4NzMgTDE0LjMwOTE5MzQsNC45ODAwMzg3MyBDMTQuMTA4ODc2Myw0Ljk4MDAzODczIDEzLjk4MjEzODgsNC45NDY5Njg3NyAxMy45Mjg5ODA5LDQuODgwODI4ODYgQzEzLjg3NTgyMzEsNC44MTQ2ODg5NCAxMy44NDQ4NzE2LDQuNzEwMTcwODYgMTMuODM2MTI2Niw0LjU2NzI3NDYxIEwxMy44MzYxMjY2LDEuNTE5NTExODMgWiBNMTIuNzQ1MTU1LDEwLjY2NzM4ODcgTDE3LjMyMjg3MjMsMTAuNjY3Mzg4NyBMMTcuMzIyODcyMywxMi4wMDA4MDI3IEwxMi43NDUxNTUsMTIuMDAwODAyNyBMMTIuNzQ1MTU1LDEwLjY2NzM4ODcgWiBNMTIuNzQ1MTU1LDguMDAwNTM1MTEgTDE3LjMyMjg3MjMsOC4wMDA1MzUxMSBMMTcuMzIyODcyMyw5LjMzMzk0OTA2IEwxMi43NDUxNTUsOS4zMzM5NDkwNiBMMTIuNzQ1MTU1LDguMDAwNTM1MTEgWiBNMTIuNzQ1MTU1LDEzLjMzNDI0MjMgTDE3LjMyMjg3MjMsMTMuMzM0MjQyMyBMMTcuMzIyODcyMywxNC42Njc2NTYzIEwxMi43NDUxNTUsMTQuNjY3NjU2MyBMMTIuNzQ1MTU1LDEzLjMzNDI0MjMgWiBNMSw1LjYyNTczMDggTDEsMTYuMjkzMTE5NSBMMTEuNDY0NzQxNywxNi4yOTMxMTk1IEwxMS40NjQ3NDE3LDUuNjI1NzMwOCBMMSw1LjYyNTczMDggWiBNNi4yMzMwMTQzNSwxMS44MzAxMzE5IEw1LjU5MjEwMTEzLDEyLjgwNzUxNDIgTDYuMjMzMDE0MzUsMTIuODA3NTE0MiBMNi4yMzMwMTQzNSwxMy45OTk2MzczIEwzLjAxNTUyODAxLDEzLjk5OTYzNzMgTDUuMzUxNDg3MzksMTAuNDkxMzY2OCBMMy4yODIzNjA2OSw3LjMzMzgyODE0IEw1LjAxMDEzNjM3LDcuMzMzODI4MTQgTDYuMjM0MzUxOCw5LjE2OTk2NzE5IEw3LjQ1NzI1NTAxLDcuMzMzODI4MTQgTDkuMTgzNjkzMjUsNy4zMzM4MjgxNCBMNy4xMTE5NDIxMywxMC40OTAwNTQ3IEw5LjQ0OTIxMzcyLDEzLjk5OTYzNzMgTDcuNjU2MDU0NywxMy45OTk2MzczIEw2LjIzMzAxNDM1LDExLjgzMDEzMTkgWiIvPg0KPC9zdmc+DQo="
              className="jsx-2310615273"
              onClick={exportCryptoQueryexcel}
              style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer' }}
            ></img>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjU1MC44MDFweCIgaGVpZ2h0PSI1NTAuODAxcHgiIHZpZXdCb3g9IjAgMCA1NTAuODAxIDU1MC44MDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU1MC44MDEgNTUwLjgwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNMjgzLjIxNSw0MTYuMzE3Yy01Ljk0OCwwLTkuNzk4LDAuNTE3LTEyLjA3NiwxLjA0NHY3Ny4xNzJjMi4yNzgsMC41MjcsNS45NTksMC41MjcsOS4yODEsMC41MjcNCgkJCWMyNC4xNTIsMC4xNzksMzkuODk5LTEzLjEyMSwzOS44OTktNDEuMjk3QzMyMC40OTgsNDI5LjI2OSwzMDYuMTQ1LDQxNi4zMTcsMjgzLjIxNSw0MTYuMzE3eiIvPg0KCQk8cGF0aCBmaWxsPSJncmVlbiIgZD0iTTE3MC4xNTMsNDE1Ljk1OWMtMTguMDI1LDAtMjguNTE2LDE3LjE0OC0yOC41MTYsNDAuMDc4YzAsMjMuMDk4LDEwLjg0OCwzOS4zNzEsMjguNjk1LDM5LjM3MQ0KCQkJYzE4LjAyNCwwLDI4LjM1LTE3LjE0OSwyOC4zNS00MC4wNjdDMTk4LjY4Miw0MzQuMTYyLDE4OC41MzEsNDE1Ljk1OSwxNzAuMTUzLDQxNS45NTl6Ii8+DQoJCTxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNNDc1LjA4NCwxMzEuOTkyYy0wLjAyMS0yLjUzMS0wLjgyOC01LjAyMS0yLjU2Mi02Ljk5M0wzNjYuMzI0LDMuNjk0Yy0wLjAzMS0wLjAzMS0wLjA2Mi0wLjA0NS0wLjA4NC0wLjA3Ng0KCQkJYy0wLjYzMy0wLjcwNy0xLjM3MS0xLjI5NS0yLjE1MS0xLjgwNGMtMC4yMzItMC4xNTUtMC40NjQtMC4yODUtMC43MDctMC40MjJjLTAuNjc1LTAuMzY2LTEuMzkyLTAuNjc1LTIuMTMtMC44OTYNCgkJCWMtMC4yMDEtMC4wNTMtMC4zOC0wLjEzNS0wLjU4LTAuMTg4QzM1OS44NywwLjExOSwzNTkuMDM3LDAsMzU4LjE5MywwSDk3LjJDODUuMjgyLDAsNzUuNiw5LjY5Myw3NS42LDIxLjYwMXY1MDcuNg0KCQkJYzAsMTEuOTA3LDkuNjgyLDIxLjYwMSwyMS42LDIxLjYwMUg0NTMuNmMxMS45MDgsMCwyMS42MDEtOS42OTMsMjEuNjAxLTIxLjYwMVYxMzMuMTk3DQoJCQlDNDc1LjIsMTMyLjc5Niw0NzUuMTM3LDEzMi4zOTgsNDc1LjA4NCwxMzEuOTkyeiBNMTY4LjkyOSw1MTYuNTg2Yy0zNC45OTIsMC01NS40NjgtMjYuNDMtNTUuNDY4LTYwLjAyMQ0KCQkJYzAtMzUuMzU0LDIyLjU3NS02MS43NzMsNTcuNDAxLTYxLjc3M2MzNi4yMTgsMCw1NS45OSwyNy4xMjcsNTUuOTksNTkuNjY5QzIyNi44NTMsNDkzLjEzLDIwMy40MDcsNTE2LjU4NiwxNjguOTI5LDUxNi41ODZ6DQoJCQkgTTMyOS4wNjIsNTAwLjY2Yy0xMi40MjQsMTAuMzI2LTMxLjMxMywxNS4yMi01NC40MTksMTUuMjJjLTEzLjgyNSwwLTIzLjYyLTAuODc2LTMwLjI2Ny0xLjc1MVYzOTguMjkzDQoJCQljOS43OTUtMS41NzIsMjIuNTczLTIuNDU4LDM2LjA1NC0yLjQ1OGMyMi4zOTIsMCwzNi45MjUsNC4wMTksNDguMjg5LDEyLjU5M2MxMi4yNSw5LjExOCwxOS45NDksMjMuNjI1LDE5Ljk0OSw0NC40NjYNCgkJCUMzNDguNjY5LDQ3NS40NjQsMzQwLjQ0Miw0OTEuMDMxLDMyOS4wNjIsNTAwLjY2eiBNMzk1LjA1NSw1MTYuNDE4Yy0xMy40NzQsMC0yNi43NzktMy41MTMtMzMuNDI0LTcuMTgzbDUuNDIyLTIyLjA1NA0KCQkJYzcuMTc3LDMuNjgxLDE4LjIwMyw3LjM1MiwyOS41NzgsNy4zNTJjMTIuMjYxLDAsMTguNzI3LTUuMDczLDE4LjcyNy0xMi43NzJjMC03LjM1Mi01LjYwMS0xMS41NDktMTkuNzc1LTE2LjYyMg0KCQkJYy0xOS41OTctNi44MjQtMzIuMzc0LTE3LjY3MS0zMi4zNzQtMzQuODI2YzAtMjAuMTIzLDE2LjgwMS0zNS41MjEsNDQuNjI5LTM1LjUyMWMxMy4zLDAsMjMuMDkzLDIuOCwzMC4xMDEsNS45NTRsLTUuOTUzLDIxLjUxNg0KCQkJYy00LjcyNi0yLjI3My0xMy4xMjYtNS41OS0yNC42OC01LjU5Yy0xMS41NDksMC0xNy4xNDksNS4yNTItMTcuMTQ5LDExLjM3NGMwLDcuNTI1LDYuNjQ5LDEwLjg0MywyMS44OCwxNi42MTENCgkJCWMyMC44MjQsNy42OTksMzAuNjI4LDE4LjU1OCwzMC42MjgsMzUuMTg1QzQ0Mi42NTIsNDk5LjYwNSw0MjcuNDIzLDUxNi40MTgsMzk1LjA1NSw1MTYuNDE4eiBNNDUzLjYsMzY2Ljc0N0g5Ny4yVjIxLjYwMWgyNTAuMTkyDQoJCQl2MTEwLjUxYzAsNS45Nyw0Ljg0MiwxMC44LDEwLjgwMSwxMC44SDQ1My42VjM2Ni43NDd6Ii8+DQoJCTxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNMTQ5LjcwNSwxNTQuNzQ0djE3MS4wMDdoMjUxLjM5M1YxNTQuNzQ0SDE0OS43MDV6IE0zODUuNzUyLDMxMC4zNjNoLTg0Ljk1NXYtMTcuNTM5aDg0Ljk1NVYzMTAuMzYzTDM4NS43NTIsMzEwLjM2M3oNCgkJCSBNMjk2LjQwOSwzMTAuMzYzaC00MS4wOTl2LTE3LjUzOWg0MS4wOTlWMzEwLjM2M3ogTTI1MC45MjEsMzEwLjM2M2gtMzguMzY3di0xNy41MzloMzguMzY3VjMxMC4zNjN6IE0yMDguMTY5LDMxMC4zNjNoLTQzLjExOA0KCQkJdi0xNy41MzloNDMuMTE4VjMxMC4zNjN6IE0zMDAuNzk3LDIwMi4zODJoODQuOTU1djE5LjczaC04NC45NTVWMjAyLjM4MnogTTMwMC43OTcsMjI2LjUwNWg4NC45NTV2MTcuOTA2aC04NC45NTVWMjI2LjUwNXoNCgkJCSBNMzAwLjc5NywyNDguODAxaDg0Ljk1NXYxOS43MjFoLTg0Ljk1NVYyNDguODAxeiBNMzg1Ljc1MiwyNzIuOTExdjE1LjUyNWgtODQuOTU1di0xNS41MjVIMzg1Ljc1MnogTTI1NS4zMDYsMTcyLjI4M2g0MS4xMDQNCgkJCXYyNS43MjRoLTQxLjEwNFYxNzIuMjgzeiBNMjU1LjMwNiwyMDIuMzgyaDQxLjEwNHYxOS43M2gtNDEuMTA0VjIwMi4zODJ6IE0yNTUuMzA2LDIyNi41MDVoNDEuMTA0djE3LjkwNmgtNDEuMTA0VjIyNi41MDV6DQoJCQkgTTI1NS4zMDYsMjQ4LjgwMWg0MS4xMDR2MTkuNzIxaC00MS4xMDRWMjQ4LjgwMXogTTI5Ni40MDksMjcyLjkxMXYxNS41MjVoLTQxLjA5OXYtMTUuNTI1SDI5Ni40MDl6IE0yMTIuNTQ5LDIwMi4zODJoMzguMzY3DQoJCQl2MTkuNzNoLTM4LjM2N1YyMDIuMzgyeiBNMjEyLjU0OSwyMjYuNTA1aDM4LjM2N3YxNy45MDZoLTM4LjM2N1YyMjYuNTA1eiBNMjEyLjU0OSwyNDguODAxaDM4LjM2N3YxOS43MjFoLTM4LjM2N1YyNDguODAxeg0KCQkJIE0yNTAuOTIxLDI3Mi45MTF2MTUuNTI1aC0zOC4zNjd2LTE1LjUyNUgyNTAuOTIxeiBNMTY1LjA0NSwxNzIuMjgzaDQzLjExOHYyNS43MjRoLTQzLjExOFYxNzIuMjgzeiBNMTY1LjA0NSwyMDIuMzgyaDQzLjExOA0KCQkJdjE5LjczaC00My4xMThWMjAyLjM4MnogTTE2NS4wNDUsMjI2LjUwNWg0My4xMTh2MTcuOTA2aC00My4xMThWMjI2LjUwNXogTTE2NS4wNDUsMjQ4LjgwMWg0My4xMTh2MTkuNzIxaC00My4xMThWMjQ4LjgwMXoNCgkJCSBNMjA4LjE2OSwyNzIuOTExdjE1LjUyNWgtNDMuMTE4di0xNS41MjVIMjA4LjE2OXoiLz4NCgk8L2c+DQo8L2c+DQoNCjwvc3ZnPg0K"
              className="jsx-2310615273"
              onClick={exportCryptoQueryods}
              style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer' }}
            ></img>
          </div>
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={dataTableColumns}
            data={cryptoQuery}
            onSortChange={handleSortedColumnChange}
            sortedColumn={currentFetchCryptoQueryParams.sortedColumn}
            sortedType={currentFetchCryptoQueryParams.sortedType}
            renderColumn={renderColumn}
            keyExtractor={(item: cryptoQuery) => item.seq}
            isLoading={isFetchCryptoQuerysLoading}
          />
        </Card.Body>
        <Card.Footer>
          <Pagination
            page={paginatedInfo.page}
            totalPage={paginatedInfo.totalPage}
            pageSize={paginatedInfo.pageSize}
            totalCount={paginatedInfo.totalCount}
            onPaginatedButtonClick={handlePageChange}
            disabled={isFetchCryptoQuerysLoading}
          />
        </Card.Footer>
      </Card>
    </PageContainer>
  );
};
