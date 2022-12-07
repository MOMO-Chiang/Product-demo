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
import { DatePicker, FormGroup, Input, Label } from '@app/components/form';
import { PageContainer, PageHeader, PageTitle } from '@app/components/page';
import { SearchCard } from '@app/components/search-card';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { useNavigation } from '@modules/router';
import { DEFAULT_PAGE, PAGE_SIZE_OPTIONS } from '@shared/constants';
import { bankAccountInfo } from '@shared/types';
import { check } from 'prettier';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBankAccountInfosActionCreator,
  hideModalActionCreator,
  resetPageStateActionCreator,
  exportExcelActionCreator,
  parseCsvActionCreator,
  exportOdsActionCreator,
  isAccountMarkActionCreator,
} from './actions';

/** DataTable 欄位名稱 */
export type bankAccountInfoTableField = keyof bankAccountInfo;

/** SearchCard Form */
export type SearchCardForm = {
  /** 銀行帳號 */
  accountId: string;
  /** 身分證帳號 */
  idCardNumber: string;
  /** 戶名 */
  accountName: string;
  /** 行動電話 */
  mobilePhone: string;
  /** 開戶日期(起) */
  accountOpeningDateStart: string;
  /** 開戶日期(迄) */
  accountOpeningDateEnd: string;
  /** 是否顯示本案相關帳戶 */
  isAccountMark: string;
};

/** 「模板頁面」元件 */
export const BankAccountInfoListsPage = () => {
  //#region Hooks

  /** DataTable 欄位設定 */
  const [dataTableColumns] = useState([
    { field: 'isAccountMark', name: '本案相關帳戶', isSortable: false },
    { field: 'accountId', name: '銀行帳號', isPrimary: true },
    { field: 'idCardNumber', name: '身分證字號' },
    { field: 'bankBranchCode', name: '開戶行總分支機構代碼' },
    { field: 'accountType', name: '存款種類' },
    { field: 'currencyType', name: '幣別' },
    { field: 'accountName', name: '戶名' },
    { field: 'localPhone', name: '住家電話' },
    { field: 'mobilePhone', name: '行動電話' },
    { field: 'residenceAddress', name: '戶籍地址' },
    { field: 'mailingAddresses', name: '通訊地址' },
    { field: 'dataProvidedDate_Cov', name: '資料提供日' },
    { field: 'accountOpeningDate_Cov', name: '開戶日' },
    { field: 'accountClosingDate_Cov', name: '結清日' },
    { field: 'accountBalance', name: '資料提供日結餘' },
    { field: 'remark', name: '備註' },
  ]);

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    accountId: { initialValue: '', validate: () => ({}) },
    idCardNumber: { initialValue: '', validate: () => ({}) },
    accountName: { initialValue: '', validate: () => ({}) },
    mobilePhone: { initialValue: '', validate: () => ({}) },
    accountOpeningDateStart: { initialValue: '', validate: () => ({}) },
    accountOpeningDateEnd: { initialValue: '', validate: () => ({}) },
    isAccountMark: { initialValue: '', validate: () => ({}) },
  });

  /** 當前取得帳號資料的搜尋條件資料 */
  const currentFetchBankAccountInfoParams = useSelector(
    (state: AppState) => state.pages.bankAccountInfo.currentFetchBankAccountInfoParams,
  );

  /** 取得案號 */
  const caseno = useSelector((state: AppState) => state.userFile.userFile);

  /** 取得案名 */
  const casename = useSelector((state: AppState) => state.userFile.userFileNameOptions).filter((x) => {
    return x.value == caseno;
  })[0].text;
  /** 帳號資料 */
  const bankAccountInfo = useSelector((state: AppState) => state.pages.bankAccountInfo.bankAccountInfoLists);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.bankAccountInfo.paginatedInfo);

  /** 是否正在取得帳號資料 */
  const isFetchBankAccountInfosLoading = useSelector(
    (state: AppState) => state.pages.bankAccountInfo.isFetchBankAccountInfosLoading,
  );

  /** 本案相關帳戶更新是否成功 */
  const isAccountMarkSuccess = useSelector((state: AppState) => state.pages.bankAccountInfo.isAccountMarkSuccess);

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
        fetchBankAccountInfosActionCreator({
          ...currentFetchBankAccountInfoParams,
          ...formData,
          page: DEFAULT_PAGE,
        }),
      );
    },
    [dispatch, formData, currentFetchBankAccountInfoParams],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        fetchBankAccountInfosActionCreator({
          ...currentFetchBankAccountInfoParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, currentFetchBankAccountInfoParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        fetchBankAccountInfosActionCreator({
          ...currentFetchBankAccountInfoParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, currentFetchBankAccountInfoParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        fetchBankAccountInfosActionCreator({
          ...currentFetchBankAccountInfoParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, currentFetchBankAccountInfoParams],
  );

  /** 匯出開戶資料excel */
  const exportBankAccountInfoexcel = useCallback(() => {
    dispatch(exportExcelActionCreator({ ...currentFetchBankAccountInfoParams }));
  }, [dispatch, currentFetchBankAccountInfoParams]);

  /** 匯出開戶資料ods */
  const exportBankAccountInfoods = useCallback(() => {
    dispatch(exportOdsActionCreator({ ...currentFetchBankAccountInfoParams }));
  }, [dispatch, currentFetchBankAccountInfoParams]);

  /** 本案相關帳戶 */
  const handleIsAccountMark = useCallback(
    (seq, isAccountMark) => {
      dispatch(isAccountMarkActionCreator(seq, isAccountMark));
    },
    [dispatch],
  );
  /** 上傳CSV事件 */
  const handleUploadCsv = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('caseno', caseno);
        formData.append('casename', casename);
        dispatch(parseCsvActionCreator(formData));
        e.target.value = '';
      }
    },
    [dispatch, caseno, casename],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<bankAccountInfo, bankAccountInfoTableField> = ({ field, data }) => {
    if (field === 'isAccountMark' && data.isAccountMark) {
      return (
        <DataColumn>
          <div
            style={{ width: '30px', height: '30px', margin: 'auto', cursor: 'pointer', fill: 'rgb(11, 94, 215)' }}
            onClick={() => handleIsAccountMark(data.seq, data.isAccountMark)}
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-hj1pze"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="PersonSearchIcon"
            >
              <circle cx="10" cy="8" r="4"></circle>
              <path d="M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
            </svg>
          </div>
        </DataColumn>
      );
    } else if (field === 'isAccountMark') {
      return (
        <DataColumn>
          <div
            style={{ width: '30px', height: '30px', margin: 'auto', cursor: 'pointer', fill: 'rgb(85, 85, 85)' }}
            onClick={() => handleIsAccountMark(data.seq, data.isAccountMark)}
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-suy6hi"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="RemoveIcon"
            >
              <path d="M19 13H5v-2h14v2z"></path>
            </svg>
          </div>
        </DataColumn>
      );
    }
    return <DataColumn>{data[field]}</DataColumn>;
  };

  //#region Effects
  useEffect(() => {
    // 載入畫面時，取得帳號列表
    dispatch(fetchBankAccountInfosActionCreator(currentFetchBankAccountInfoParams));

    return () => {
      // 重置頁面 State
      dispatch(resetPageStateActionCreator());
    };
  }, [dispatch]);

  /** 更新成功，重新取得列表資料 */
  useEffect(() => {
    if (isAccountMarkSuccess) {
      dispatch(fetchBankAccountInfosActionCreator(currentFetchBankAccountInfoParams));
    }
  }, [isAccountMarkSuccess, currentFetchBankAccountInfoParams]);

  //#endregion Effects

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>開戶資料</PageTitle>
      </PageHeader>

      {/* Search Card */}
      <SearchCard>
        <form className="container-fluid" onSubmit={handleSearchFormSubmit}>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <FormGroup>
                <Label htmlFor="accountId">銀行帳號</Label>
                <Input
                  type="text"
                  id="accountId"
                  name="accountId"
                  onChange={(e) => updateFormData({ accountId: e.target.value })}
                  value={formData.accountId}
                  disabled={isFetchBankAccountInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <FormGroup>
                <Label htmlFor="idCardNumber">身分證字號</Label>
                <Input
                  type="text"
                  id="idCardNumber"
                  name="idCardNumber"
                  onChange={(e) => updateFormData({ idCardNumber: e.target.value })}
                  value={formData.idCardNumber}
                  disabled={isFetchBankAccountInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <FormGroup>
                <Label htmlFor="accountName">戶名</Label>
                <Input
                  type="text"
                  id="accountName"
                  name="accountName"
                  onChange={(e) => updateFormData({ accountName: e.target.value })}
                  value={formData.accountName}
                  disabled={isFetchBankAccountInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <FormGroup>
                <Label htmlFor="mobilePhone">行動電話</Label>
                <Input
                  type="text"
                  id="mobilePhone"
                  name="mobilePhone"
                  onChange={(e) => updateFormData({ mobilePhone: e.target.value })}
                  value={formData.mobilePhone}
                  disabled={isFetchBankAccountInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <FormGroup>
                <Label htmlFor="accountOpeningDateStart">開戶日期(起)</Label>
                <DatePicker
                  id="accountOpeningDateStart"
                  name="accountOpeningDateStart"
                  onChange={(e) => updateFormData({ accountOpeningDateStart: e })}
                  value={formData.accountOpeningDateStart}
                  disabled={isFetchBankAccountInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <FormGroup>
                <Label htmlFor="accountOpeningDateEnd">開戶日期(迄)</Label>
                <DatePicker
                  id="accountOpeningDateEnd"
                  name="accountOpeningDateEnd"
                  onChange={(e) => updateFormData({ accountOpeningDateEnd: e })}
                  value={formData.accountOpeningDateEnd}
                  disabled={isFetchBankAccountInfosLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  只顯示本案相關帳戶
                </span>
                <span className="input-group-text">
                  <input
                    aria-label="Checkbox for following text input"
                    type="checkbox"
                    className="form-check-input"
                    id="isAccountMark"
                    name="isAccountMark"
                    onChange={(e) => updateFormData({ isAccountMark: e.target.checked ? '1' : '0' })}
                  />
                </span>
              </div>
              <button type="submit" className="btn btn-primary btn-width-xlg" disabled={isFetchBankAccountInfosLoading}>
                開戶資料查詢
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
            <input id="uploadFile" type="file" className="btn-check" onChange={handleUploadCsv}></input>
            <label className="btn btn-primary btn-width-lg" htmlFor="uploadFile" style={{ marginRight: '15px' }}>
              <i className="fas fa-upload"></i> .CSV資料匯入
            </label>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNMTUuNTMzNjkzNSwxLjM2MDc4NjU2IEwxNC4zMDkxOTM0LDAgTDQuNjYxNjQ4NjEsMCBDMy45NjU4NzI1OSwwIDMuNjk3NDUwMjIsMC41MTYyNDA2NDUgMy42OTc0NTAyMiwwLjkxODk0MDg4MiBMMy42OTc0NTAyMiw0LjU0OTkwNDk1IEw1LjA1MDIyMTQ3LDQuNTQ5OTA0OTUgTDUuMDUwMjIxNDcsMS42NTIzMTE5MSBDNS4wNTAyMjE0NywxLjQ5NzY0MzA5IDUuMTc5NzI2NDIsMS4zNjgzMTUwNiA1LjMzMDEyNTc3LDEuMzY4MzE1MDYgTDEyLjIzMjY5OTIsMS4zNjgzMTUwNiBDMTIuMzg0ODY2NiwxLjM2ODMxNTA2IDEyLjQ2MDcyNzUsMS4zOTUzNjA3NyAxMi40NjA3Mjc1LDEuNTE5NTExODMgTDEyLjQ2MDcyNzUsNi4zMzk3NDkzNSBMMTcuMzc0MzM2LDYuMzM5NzQ5MzUgQzE3LjU2NzQyOTMsNi4zMzk3NDkzNSAxNy42NDIxOSw2LjQzOTEwNTU5IDE3LjY0MjE5LDYuNTg2NDk3OTEgTDE3LjY0MjE5LDE4LjM1NTEzNzkgQzE3LjY0MjE5LDE4LjYwMTgzNzIgMTcuNTQyNzY0OSwxOC42MzkxMzQ4IDE3LjM5MjM2NTYsMTguNjM5MTM0OCBMNS4zMzAxMjU3NywxOC42MzkxMzQ4IEM1LjE3ODQxNDIxLDE4LjYzOTEzNDggNS4wNTAyMjE0NywxOC41MDcxMDU0IDUuMDUwMjIxNDcsMTguMzU1MTM3OSBMNS4wNTAyMjE0NywxNy4yNzk3NTI5IEwzLjcwNTg1MTk1LDE3LjI3OTc1MjkgTDMuNzA1ODUxOTUsMTguOTc0NjUxMiBDMy42ODgzMDM1NywxOS41NzQwNzYyIDQuMDA4Mjk0NzIsMjAgNC42NjE2NDg2MSwyMCBMMTguMDYwNzk2NCwyMCBDMTguNzYwNzQ4NCwyMCAxOSwxOS40OTI4OTUgMTksMTkuMDMxMDUzIEwxOSw2LjQ0Mzk2NTU4IEwxOSw1LjE4NjY3MDQ4IEwxOC42NTA0OTU3LDQuODA3MjAwNjcgTDE1LjUzMzY5MzUsMS4zNjA3ODY1NiBaIE0xMy44MzYxMjY2LDEuNTE5NTExODMgTDE0LjIyMjYxNzMsMS45NTM1MjcyOCBMMTYuODE4NzQzNyw0LjgwNzIwMDY3IEwxNi45NjE3Njc0LDQuOTgwMDM4NzMgTDE0LjMwOTE5MzQsNC45ODAwMzg3MyBDMTQuMTA4ODc2Myw0Ljk4MDAzODczIDEzLjk4MjEzODgsNC45NDY5Njg3NyAxMy45Mjg5ODA5LDQuODgwODI4ODYgQzEzLjg3NTgyMzEsNC44MTQ2ODg5NCAxMy44NDQ4NzE2LDQuNzEwMTcwODYgMTMuODM2MTI2Niw0LjU2NzI3NDYxIEwxMy44MzYxMjY2LDEuNTE5NTExODMgWiBNMTIuNzQ1MTU1LDEwLjY2NzM4ODcgTDE3LjMyMjg3MjMsMTAuNjY3Mzg4NyBMMTcuMzIyODcyMywxMi4wMDA4MDI3IEwxMi43NDUxNTUsMTIuMDAwODAyNyBMMTIuNzQ1MTU1LDEwLjY2NzM4ODcgWiBNMTIuNzQ1MTU1LDguMDAwNTM1MTEgTDE3LjMyMjg3MjMsOC4wMDA1MzUxMSBMMTcuMzIyODcyMyw5LjMzMzk0OTA2IEwxMi43NDUxNTUsOS4zMzM5NDkwNiBMMTIuNzQ1MTU1LDguMDAwNTM1MTEgWiBNMTIuNzQ1MTU1LDEzLjMzNDI0MjMgTDE3LjMyMjg3MjMsMTMuMzM0MjQyMyBMMTcuMzIyODcyMywxNC42Njc2NTYzIEwxMi43NDUxNTUsMTQuNjY3NjU2MyBMMTIuNzQ1MTU1LDEzLjMzNDI0MjMgWiBNMSw1LjYyNTczMDggTDEsMTYuMjkzMTE5NSBMMTEuNDY0NzQxNywxNi4yOTMxMTk1IEwxMS40NjQ3NDE3LDUuNjI1NzMwOCBMMSw1LjYyNTczMDggWiBNNi4yMzMwMTQzNSwxMS44MzAxMzE5IEw1LjU5MjEwMTEzLDEyLjgwNzUxNDIgTDYuMjMzMDE0MzUsMTIuODA3NTE0MiBMNi4yMzMwMTQzNSwxMy45OTk2MzczIEwzLjAxNTUyODAxLDEzLjk5OTYzNzMgTDUuMzUxNDg3MzksMTAuNDkxMzY2OCBMMy4yODIzNjA2OSw3LjMzMzgyODE0IEw1LjAxMDEzNjM3LDcuMzMzODI4MTQgTDYuMjM0MzUxOCw5LjE2OTk2NzE5IEw3LjQ1NzI1NTAxLDcuMzMzODI4MTQgTDkuMTgzNjkzMjUsNy4zMzM4MjgxNCBMNy4xMTE5NDIxMywxMC40OTAwNTQ3IEw5LjQ0OTIxMzcyLDEzLjk5OTYzNzMgTDcuNjU2MDU0NywxMy45OTk2MzczIEw2LjIzMzAxNDM1LDExLjgzMDEzMTkgWiIvPg0KPC9zdmc+DQo="
              className="jsx-2310615273"
              onClick={exportBankAccountInfoexcel}
              style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer' }}
            ></img>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjU1MC44MDFweCIgaGVpZ2h0PSI1NTAuODAxcHgiIHZpZXdCb3g9IjAgMCA1NTAuODAxIDU1MC44MDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU1MC44MDEgNTUwLjgwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNMjgzLjIxNSw0MTYuMzE3Yy01Ljk0OCwwLTkuNzk4LDAuNTE3LTEyLjA3NiwxLjA0NHY3Ny4xNzJjMi4yNzgsMC41MjcsNS45NTksMC41MjcsOS4yODEsMC41MjcNCgkJCWMyNC4xNTIsMC4xNzksMzkuODk5LTEzLjEyMSwzOS44OTktNDEuMjk3QzMyMC40OTgsNDI5LjI2OSwzMDYuMTQ1LDQxNi4zMTcsMjgzLjIxNSw0MTYuMzE3eiIvPg0KCQk8cGF0aCBmaWxsPSJncmVlbiIgZD0iTTE3MC4xNTMsNDE1Ljk1OWMtMTguMDI1LDAtMjguNTE2LDE3LjE0OC0yOC41MTYsNDAuMDc4YzAsMjMuMDk4LDEwLjg0OCwzOS4zNzEsMjguNjk1LDM5LjM3MQ0KCQkJYzE4LjAyNCwwLDI4LjM1LTE3LjE0OSwyOC4zNS00MC4wNjdDMTk4LjY4Miw0MzQuMTYyLDE4OC41MzEsNDE1Ljk1OSwxNzAuMTUzLDQxNS45NTl6Ii8+DQoJCTxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNNDc1LjA4NCwxMzEuOTkyYy0wLjAyMS0yLjUzMS0wLjgyOC01LjAyMS0yLjU2Mi02Ljk5M0wzNjYuMzI0LDMuNjk0Yy0wLjAzMS0wLjAzMS0wLjA2Mi0wLjA0NS0wLjA4NC0wLjA3Ng0KCQkJYy0wLjYzMy0wLjcwNy0xLjM3MS0xLjI5NS0yLjE1MS0xLjgwNGMtMC4yMzItMC4xNTUtMC40NjQtMC4yODUtMC43MDctMC40MjJjLTAuNjc1LTAuMzY2LTEuMzkyLTAuNjc1LTIuMTMtMC44OTYNCgkJCWMtMC4yMDEtMC4wNTMtMC4zOC0wLjEzNS0wLjU4LTAuMTg4QzM1OS44NywwLjExOSwzNTkuMDM3LDAsMzU4LjE5MywwSDk3LjJDODUuMjgyLDAsNzUuNiw5LjY5Myw3NS42LDIxLjYwMXY1MDcuNg0KCQkJYzAsMTEuOTA3LDkuNjgyLDIxLjYwMSwyMS42LDIxLjYwMUg0NTMuNmMxMS45MDgsMCwyMS42MDEtOS42OTMsMjEuNjAxLTIxLjYwMVYxMzMuMTk3DQoJCQlDNDc1LjIsMTMyLjc5Niw0NzUuMTM3LDEzMi4zOTgsNDc1LjA4NCwxMzEuOTkyeiBNMTY4LjkyOSw1MTYuNTg2Yy0zNC45OTIsMC01NS40NjgtMjYuNDMtNTUuNDY4LTYwLjAyMQ0KCQkJYzAtMzUuMzU0LDIyLjU3NS02MS43NzMsNTcuNDAxLTYxLjc3M2MzNi4yMTgsMCw1NS45OSwyNy4xMjcsNTUuOTksNTkuNjY5QzIyNi44NTMsNDkzLjEzLDIwMy40MDcsNTE2LjU4NiwxNjguOTI5LDUxNi41ODZ6DQoJCQkgTTMyOS4wNjIsNTAwLjY2Yy0xMi40MjQsMTAuMzI2LTMxLjMxMywxNS4yMi01NC40MTksMTUuMjJjLTEzLjgyNSwwLTIzLjYyLTAuODc2LTMwLjI2Ny0xLjc1MVYzOTguMjkzDQoJCQljOS43OTUtMS41NzIsMjIuNTczLTIuNDU4LDM2LjA1NC0yLjQ1OGMyMi4zOTIsMCwzNi45MjUsNC4wMTksNDguMjg5LDEyLjU5M2MxMi4yNSw5LjExOCwxOS45NDksMjMuNjI1LDE5Ljk0OSw0NC40NjYNCgkJCUMzNDguNjY5LDQ3NS40NjQsMzQwLjQ0Miw0OTEuMDMxLDMyOS4wNjIsNTAwLjY2eiBNMzk1LjA1NSw1MTYuNDE4Yy0xMy40NzQsMC0yNi43NzktMy41MTMtMzMuNDI0LTcuMTgzbDUuNDIyLTIyLjA1NA0KCQkJYzcuMTc3LDMuNjgxLDE4LjIwMyw3LjM1MiwyOS41NzgsNy4zNTJjMTIuMjYxLDAsMTguNzI3LTUuMDczLDE4LjcyNy0xMi43NzJjMC03LjM1Mi01LjYwMS0xMS41NDktMTkuNzc1LTE2LjYyMg0KCQkJYy0xOS41OTctNi44MjQtMzIuMzc0LTE3LjY3MS0zMi4zNzQtMzQuODI2YzAtMjAuMTIzLDE2LjgwMS0zNS41MjEsNDQuNjI5LTM1LjUyMWMxMy4zLDAsMjMuMDkzLDIuOCwzMC4xMDEsNS45NTRsLTUuOTUzLDIxLjUxNg0KCQkJYy00LjcyNi0yLjI3My0xMy4xMjYtNS41OS0yNC42OC01LjU5Yy0xMS41NDksMC0xNy4xNDksNS4yNTItMTcuMTQ5LDExLjM3NGMwLDcuNTI1LDYuNjQ5LDEwLjg0MywyMS44OCwxNi42MTENCgkJCWMyMC44MjQsNy42OTksMzAuNjI4LDE4LjU1OCwzMC42MjgsMzUuMTg1QzQ0Mi42NTIsNDk5LjYwNSw0MjcuNDIzLDUxNi40MTgsMzk1LjA1NSw1MTYuNDE4eiBNNDUzLjYsMzY2Ljc0N0g5Ny4yVjIxLjYwMWgyNTAuMTkyDQoJCQl2MTEwLjUxYzAsNS45Nyw0Ljg0MiwxMC44LDEwLjgwMSwxMC44SDQ1My42VjM2Ni43NDd6Ii8+DQoJCTxwYXRoIGZpbGw9ImdyZWVuIiBkPSJNMTQ5LjcwNSwxNTQuNzQ0djE3MS4wMDdoMjUxLjM5M1YxNTQuNzQ0SDE0OS43MDV6IE0zODUuNzUyLDMxMC4zNjNoLTg0Ljk1NXYtMTcuNTM5aDg0Ljk1NVYzMTAuMzYzTDM4NS43NTIsMzEwLjM2M3oNCgkJCSBNMjk2LjQwOSwzMTAuMzYzaC00MS4wOTl2LTE3LjUzOWg0MS4wOTlWMzEwLjM2M3ogTTI1MC45MjEsMzEwLjM2M2gtMzguMzY3di0xNy41MzloMzguMzY3VjMxMC4zNjN6IE0yMDguMTY5LDMxMC4zNjNoLTQzLjExOA0KCQkJdi0xNy41MzloNDMuMTE4VjMxMC4zNjN6IE0zMDAuNzk3LDIwMi4zODJoODQuOTU1djE5LjczaC04NC45NTVWMjAyLjM4MnogTTMwMC43OTcsMjI2LjUwNWg4NC45NTV2MTcuOTA2aC04NC45NTVWMjI2LjUwNXoNCgkJCSBNMzAwLjc5NywyNDguODAxaDg0Ljk1NXYxOS43MjFoLTg0Ljk1NVYyNDguODAxeiBNMzg1Ljc1MiwyNzIuOTExdjE1LjUyNWgtODQuOTU1di0xNS41MjVIMzg1Ljc1MnogTTI1NS4zMDYsMTcyLjI4M2g0MS4xMDQNCgkJCXYyNS43MjRoLTQxLjEwNFYxNzIuMjgzeiBNMjU1LjMwNiwyMDIuMzgyaDQxLjEwNHYxOS43M2gtNDEuMTA0VjIwMi4zODJ6IE0yNTUuMzA2LDIyNi41MDVoNDEuMTA0djE3LjkwNmgtNDEuMTA0VjIyNi41MDV6DQoJCQkgTTI1NS4zMDYsMjQ4LjgwMWg0MS4xMDR2MTkuNzIxaC00MS4xMDRWMjQ4LjgwMXogTTI5Ni40MDksMjcyLjkxMXYxNS41MjVoLTQxLjA5OXYtMTUuNTI1SDI5Ni40MDl6IE0yMTIuNTQ5LDIwMi4zODJoMzguMzY3DQoJCQl2MTkuNzNoLTM4LjM2N1YyMDIuMzgyeiBNMjEyLjU0OSwyMjYuNTA1aDM4LjM2N3YxNy45MDZoLTM4LjM2N1YyMjYuNTA1eiBNMjEyLjU0OSwyNDguODAxaDM4LjM2N3YxOS43MjFoLTM4LjM2N1YyNDguODAxeg0KCQkJIE0yNTAuOTIxLDI3Mi45MTF2MTUuNTI1aC0zOC4zNjd2LTE1LjUyNUgyNTAuOTIxeiBNMTY1LjA0NSwxNzIuMjgzaDQzLjExOHYyNS43MjRoLTQzLjExOFYxNzIuMjgzeiBNMTY1LjA0NSwyMDIuMzgyaDQzLjExOA0KCQkJdjE5LjczaC00My4xMThWMjAyLjM4MnogTTE2NS4wNDUsMjI2LjUwNWg0My4xMTh2MTcuOTA2aC00My4xMThWMjI2LjUwNXogTTE2NS4wNDUsMjQ4LjgwMWg0My4xMTh2MTkuNzIxaC00My4xMThWMjQ4LjgwMXoNCgkJCSBNMjA4LjE2OSwyNzIuOTExdjE1LjUyNWgtNDMuMTE4di0xNS41MjVIMjA4LjE2OXoiLz4NCgk8L2c+DQo8L2c+DQoNCjwvc3ZnPg0K"
              className="jsx-2310615273"
              onClick={exportBankAccountInfoods}
              style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer' }}
            ></img>
          </div>
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={dataTableColumns}
            data={bankAccountInfo}
            onSortChange={handleSortedColumnChange}
            sortedColumn={currentFetchBankAccountInfoParams.sortedColumn}
            sortedType={currentFetchBankAccountInfoParams.sortedType}
            renderColumn={renderColumn}
            keyExtractor={(item: bankAccountInfo) => item.seq}
            isLoading={isFetchBankAccountInfosLoading}
          />
        </Card.Body>
        <Card.Footer>
          <Pagination
            page={paginatedInfo.page}
            totalPage={paginatedInfo.totalPage}
            pageSize={paginatedInfo.pageSize}
            totalCount={paginatedInfo.totalCount}
            onPaginatedButtonClick={handlePageChange}
            disabled={isFetchBankAccountInfosLoading}
          />
        </Card.Footer>
      </Card>
    </PageContainer>
  );
};
