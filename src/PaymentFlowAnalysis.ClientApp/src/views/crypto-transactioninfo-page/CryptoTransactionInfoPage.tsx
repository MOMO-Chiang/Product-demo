import { Card } from '@app/components/card';
import { CryptoCard } from '@app/components/crypto-card';
import {
  DataColumn,
  DataTable,
  PageSizeSelect,
  PageSizeSelectChangeFunc,
  PaginatedButtonClickFunc,
  Pagination,
  RenderColumnFunc,
  RenderDetailColumnFunc,
  SortChangeFunc,
} from '@app/components/data-table';
import { DatePicker, ErrorMessage, FormGroup, Input, Label, Select } from '@app/components/form';
import { PageContainer, PageHeader, PageTitle } from '@app/components/page';
import { SearchCard } from '@app/components/search-card';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { useNavigation } from '@modules/router';
import { CRYPTO_TRANSACTION_INFO_STORAGE_KEY, DEFAULT_PAGE, PAGE_SIZE_OPTIONS } from '@shared/constants';
import { CryptoQueryDetail, CryptoQueryMaster, CryptoTransactionInfo } from '@shared/types';
import { fetchCreatePersonalSearchActionCreator } from '@views/crypto-personalnfo-page/actions';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  expandDetailActionCreator, //展開明細Action
  exportExcelActionCreator,
  exportOdsActionCreator,
  // fetchCryptoTransactionInfoActionCreator,
  fetchCryptoTransactionInfosActionCreator,
  initPageActionCreator,
  resetPageStateActionCreator,
} from './actions';
//import { ModalForm } from './components/ModalForms';
import CodeMirror from '@uiw/react-codemirror';
import OtherActionUserModal from './components/OtherActionUser';
import SearchHistoryModal from './components/SearchHistory';
import odsSvg from '@shared/assets/images/ods_icon.svg';
import excelSvg from '@shared/assets/images/excel_icon.svg';
import CashOutModal from './components/CashOut';
import CashInModal from './components/CashIn';
import SearchDetailNumberModal from './components/SearchDetailNumber';

/** DataTable 欄位名稱 */
export type CryptoTransactionInfoTableField = keyof CryptoQueryMaster;
export type CryptoTransactionInfoDetailTableField = keyof CryptoTransactionInfo;

/** SearchCard Form */
export type SearchCardForm = {
  /** txID */
  txID: string;
  /** 帳戶 */
  account: string;
  /** 銀行代碼 */
  bankCode: string;
  /** 分行代碼 */
  brunchCode: string;
  /** 幣別 */
  currency: string;
  /** 數量(最低) */
  amountMin: string;
  /** 數量(最高) */
  amountMax: string;
  /** 交易日期(起) */
  transactionTimeStart: string;
  /** 交易日期(迄) */
  transactionTimeEnd: string;
  /** 拋查條件選項 */
  queryConditionType: string;
  /** 拋查內容 */
  search_info: string;
  /** 調閱主序號 */
  orderMasterNumber: string;
};

/** SearchCard Form */
export type ActionUserModalForm = {
  /** 案號 */
  caseNo: string;
  /** 代拋查人事五碼 */
  actionUserId: string;
};

/** 「模板頁面」元件 */
export const CryptoTransactionInfoPage = () => {
  //#region Hooks

  /** DataTable 欄位設定  */
  const [dataTableColumns] = useState([
    { field: 'queryOrderTime', name: '調閱時間' },
    { field: 'orderMasterNumber', name: '調閱主序號', isPrimary: true },
    { field: 'caseNo', name: '案號' },
    { field: 'caseName', name: '案名' },
    { field: 'orderDetailCount', name: '資料回覆/調閱筆數' },
    /** 當有明細資料需要顯示時，isDetail值請設定為true(可選) **/
    { field: 'detailData', name: '明細資料', isSortable: false, isDetail: true },
  ]);

  /** Detail DataTable 欄位設定
   *  需確認與後端Response的欄位名稱一致(含大小寫)
   *  顯示順序依照此張設定表為準
   */
  const [DetaildataTableColumns] = useState([
    { field: 'TransactionTime_Cov', name: '交易時間' },
    { field: 'TxID', name: '區塊鏈交易序號TxID' },
    { field: 'InternalTxID', name: '內部交易序號', isPrimary: true },
    { field: 'TransactionMode', name: '交易模式' },
    { field: 'TransactionStatus', name: '交易狀態' },
    { field: 'ExchangeTypeCode', name: '資料來源交易所' },
    { field: 'OrderNumber', name: '調閱單號' },
    { field: 'CreateTime', name: '資料建立時間' },
    { field: '', name: '資料修改時間' },
  ]);

  /** SearchCard Form 欄位資料 */
  const { formData, validator, validateAll, updateFormData } = useForm<SearchCardForm>({
    txID: { initialValue: '', validate: () => ({}) },
    account: { initialValue: '', validate: () => ({}) },
    bankCode: { initialValue: '', validate: () => ({}) },
    brunchCode: { initialValue: '', validate: () => ({}) },
    currency: { initialValue: '', validate: () => ({}) },
    amountMin: {
      initialValue: '',
      validate: ({ value }) => {
        if (Number(value) < 0) {
          return { mustEgtZero: '必須大於或等於 0。' };
        }
        return {};
      },
    },
    amountMax: {
      initialValue: '',
      validate: ({ value }) => {
        if (Number(value) < 0) {
          return { mustEgtZero: '必須大於或等於 0。' };
        }

        return {};
      },
    },
    transactionTimeStart: { initialValue: '', validate: () => ({}) },
    transactionTimeEnd: { initialValue: '', validate: () => ({}) },
    queryConditionType: { initialValue: '', validate: () => ({}) },
    search_info: { initialValue: '', validate: () => ({}) },
    orderMasterNumber: { initialValue: '', validate: () => ({}) },
  });

  /** 當前取得交易資料的搜尋條件資料 */
  const currentFetchCryptoTransactionInfosParams = useSelector(
    (state: AppState) => state.pages.CryptoTransactionInfo.currentFetchCryptoTransactionInfoParams,
  );

  /** 交易調閱資料 */
  const cryptoTransactionInfo = useSelector((state: AppState) => state.pages.CryptoTransactionInfo.cryptoTransactionInfo);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.CryptoTransactionInfo.paginatedInfo);

  /** 是否正在取得交易調閱資料 */
  const isFetchCryptoTransactionInfosLoading = useSelector(
    (state: AppState) => state.pages.CryptoTransactionInfo.isFetchCryptoTransactionInfoLoading,
  );

  /** 拋查是否成功 */
  const isCreateTransactionInfoSearchSuccess = useSelector(
    (state: AppState) => state.pages.CryptoTransactionInfo.isCreateTransactionInfoSearchSuccess,
  );

  /** 拋查條件下拉選單 */
  const SearchOptions = useSelector((state: AppState) => state.pages.CryptoPersonalInfo.SearchOptions);

  /** 拋查成功訊息 */
  const CreateSearchMsg = useSelector((state: AppState) => state.pages.CryptoTransactionInfo.CreateSearchMsg);

  /** 幣別下拉選單 */
  const CurrencyOptions = useSelector((state: AppState) => state.pages.CryptoTransactionInfo.CurrencyOptions);

  /** 案件案號 */
  const CaseNo = useSelector((state: AppState) => state.userFile.userFile);

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
        fetchCryptoTransactionInfosActionCreator({
          ...currentFetchCryptoTransactionInfosParams,
          ...formData,
          caseNo: CaseNo,
          page: DEFAULT_PAGE,
        }),
      );
    },
    [dispatch, formData, currentFetchCryptoTransactionInfosParams, CaseNo],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        fetchCryptoTransactionInfosActionCreator({
          ...currentFetchCryptoTransactionInfosParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, currentFetchCryptoTransactionInfosParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        fetchCryptoTransactionInfosActionCreator({
          ...currentFetchCryptoTransactionInfosParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, currentFetchCryptoTransactionInfosParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        fetchCryptoTransactionInfosActionCreator({
          ...currentFetchCryptoTransactionInfosParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, currentFetchCryptoTransactionInfosParams],
  );

  /** 匯出excel */
  const exportCryptoTransactionInfoExcel = useCallback(() => {
    dispatch(exportExcelActionCreator(currentFetchCryptoTransactionInfosParams));
  }, [dispatch, currentFetchCryptoTransactionInfosParams]);

  /** 匯出ods */
  const exportCryptoTransactionInfoOds = useCallback(() => {
    dispatch(exportOdsActionCreator(currentFetchCryptoTransactionInfosParams));
  }, [dispatch, currentFetchCryptoTransactionInfosParams]);

  /** 展開明細事件 */
  const handleExpandDetailClick = useCallback(
    (key: string, isCheck: boolean) => dispatch(expandDetailActionCreator(key, isCheck)),
    [dispatch],
  );

  /** 執行拋查 */
  const handleCreateSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const info = formData.search_info.toString().replaceAll('\n', '');
      if (CaseNo == '') {
        Alert.show({
          type: Alert.AlertType.Warning,
          title: `請選擇案件`,
          showCancelButton: false,
        });
        return;
      }
      if (formData.queryConditionType == '') {
        Alert.show({
          type: Alert.AlertType.Warning,
          title: `請選擇拋查條件`,
          showCancelButton: false,
        });
        return;
      }
      if (info == '') {
        Alert.show({
          type: Alert.AlertType.Warning,
          title: `請輸入拋查內容`,
          showCancelButton: false,
        });
        return;
      }
      dispatch(
        fetchCreatePersonalSearchActionCreator({
          caseNo: CaseNo,
          caseName: '',
          queryConditionType: formData.queryConditionType,
          queryConditionInfo: formData.search_info,
          searchType: 3,
          actionUserId: null,
        }),
      );
    },
    [dispatch, formData, CaseNo],
  );

  /** TextArea */
  const textarea_onChange = useCallback((value, viewUpdate) => {
    updateFormData({ search_info: value });
  }, []);

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<CryptoQueryMaster, CryptoTransactionInfoTableField> = ({ field, data }) => {
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
  const renderDetailColumn: RenderDetailColumnFunc<CryptoTransactionInfo, CryptoTransactionInfoDetailTableField> = ({
    field,
    data,
    cidx,
  }) => {
    switch (field) {
      case 'TransactionMode':
        const [Out, In] = data[field].toString().split('To');
        return (
          <>
            <CashOutModal data={data} Name={Out} />
            <CashInModal data={data} Name={In} />
          </>
        );
        break;
      case 'OrderNumber':
        return <SearchDetailNumberModal Seq={data.Seq} Data={data[field]} />;
        break;
      default:
        return data[field];
    }
  };

  //#region Effects
  useEffect(() => {
    // 載入畫面時，取得交易調閱列表
    const orderMasterNumber = localStorage.getItem(CRYPTO_TRANSACTION_INFO_STORAGE_KEY);
    if (orderMasterNumber === null) {
      dispatch(fetchCryptoTransactionInfosActionCreator(currentFetchCryptoTransactionInfosParams));
    } else {
      const params = {
        ...currentFetchCryptoTransactionInfosParams,
        orderMasterNumber: orderMasterNumber,
      };
      updateFormData({ orderMasterNumber });

      dispatch(fetchCryptoTransactionInfosActionCreator(params));
    }
    setTimeout(() => {
      localStorage.removeItem(CRYPTO_TRANSACTION_INFO_STORAGE_KEY);
    }, 100);

    return () => {
      // 重置頁面 State
      dispatch(resetPageStateActionCreator());
    };
  }, [dispatch, currentFetchCryptoTransactionInfosParams]);

  //#endregion Effects

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>交易調閱資料調閱</PageTitle>
      </PageHeader>

      {/* Crypto Card */}
      <CryptoCard title={'交易調閱所拋查(個資資訊)'}>
        <form className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-2 col-md-3 col-lg-3">
              <FormGroup>
                <Label>交易所拋查條件</Label>
                <Select
                  options={SearchOptions}
                  id="queryConditionType"
                  name="queryConditionType"
                  value={formData.queryConditionType}
                  onChange={(e) => updateFormData({ queryConditionType: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-7 col-md-6 col-lg-6">
              <FormGroup>
                <CodeMirror value="" height="200px" id="search_info" onChange={textarea_onChange} />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-2 col-md-2 col-lg-2">
              <FormGroup>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-primary btn-width-lg"
                    disabled={isFetchCryptoTransactionInfosLoading}
                    style={{ marginBottom: '10px' }}
                    onClick={handleCreateSearch}
                  >
                    執行拋查
                  </button>
                </div>
                <div className="row">
                  <SearchHistoryModal />
                </div>
                <div className="row">
                  <OtherActionUserModal prop={formData} />
                </div>
              </FormGroup>
            </div>
          </div>
        </form>
      </CryptoCard>

      {/* Info Card */}
      <CryptoCard title={'交易資料'}>
        <form className="container-fluid" onSubmit={handleSearchFormSubmit}>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="txID">區塊鏈交易序號TxID</Label>
                <Input
                  type="text"
                  id="txID"
                  name="txID"
                  onChange={(e) => updateFormData({ txID: e.target.value })}
                  value={formData.txID}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="account">帳戶</Label>
                <Input
                  type="text"
                  id="account"
                  name="account"
                  onChange={(e) => updateFormData({ account: e.target.value })}
                  value={formData.account}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="bankCode">銀行代碼</Label>
                <Input
                  type="text"
                  id="bankCode"
                  name="bankCode"
                  onChange={(e) => updateFormData({ bankCode: e.target.value })}
                  value={formData.bankCode}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="brunchCode">分行代碼</Label>
                <Input
                  type="text"
                  id="brunchCode"
                  name="brunchCode"
                  onChange={(e) => updateFormData({ brunchCode: e.target.value })}
                  value={formData.brunchCode}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="orderMasterNumber">調閱主序號</Label>
                <Input
                  type="text"
                  id="orderMasterNumber"
                  name="orderMasterNumber"
                  onChange={(e) => updateFormData({ orderMasterNumber: e.target.value })}
                  value={formData.orderMasterNumber}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="currency">幣別</Label>
                <Select
                  options={CurrencyOptions}
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={(e) => updateFormData({ currency: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="amountMin">數量(最低)</Label>
                <Input
                  type="text"
                  id="amountMin"
                  name="amountMin"
                  onChange={(e) => updateFormData({ amountMin: e.target.value })}
                  value={formData.amountMin}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
                {validator.amountMin.errors.mustEgtZero && (
                  <ErrorMessage>{validator.amountMin.errors.mustEgtZero}</ErrorMessage>
                )}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="amountMax">數量(最高)</Label>
                <Input
                  type="text"
                  id="amountMax"
                  name="amountMax"
                  onChange={(e) => updateFormData({ amountMax: e.target.value })}
                  value={formData.amountMax}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
                {validator.amountMax.errors.mustEgtZero && (
                  <ErrorMessage>{validator.amountMax.errors.mustEgtZero}</ErrorMessage>
                )}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="transactionTimeStart">交易日期(起)</Label>
                <DatePicker
                  id="transactionTimeStart"
                  name="transactionTimeStart"
                  onChange={(date) => updateFormData({ transactionTimeStart: date })}
                  value={formData.transactionTimeStart}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="transactionTimeEnd">交易日期(迄)</Label>
                <DatePicker
                  id="transactionTimeEnd"
                  name="transactionTimeEnd"
                  onChange={(date) => updateFormData({ transactionTimeEnd: date })}
                  value={formData.transactionTimeEnd}
                  disabled={isFetchCryptoTransactionInfosLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary btn-width-xlg" disabled={isFetchCryptoTransactionInfosLoading}>
                交易資料查詢
              </button>
              <img
                src={odsSvg}
                onClick={exportCryptoTransactionInfoOds}
                style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer', float: 'right' }}
              ></img>
              <img
                src={excelSvg}
                onClick={exportCryptoTransactionInfoExcel}
                style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer', float: 'right' }}
              ></img>
            </div>
          </div>
        </form>
      </CryptoCard>

      {/* Table Card */}
      <Card>
        <Card.Header>
          <PageSizeSelect options={PAGE_SIZE_OPTIONS} onChange={handlePageSizeChange} value={String(paginatedInfo.pageSize)} />
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={dataTableColumns}
            data={cryptoTransactionInfo}
            DetailColumn={DetaildataTableColumns}
            onSortChange={handleSortedColumnChange}
            sortedColumn={currentFetchCryptoTransactionInfosParams.sortedColumn}
            sortedType={currentFetchCryptoTransactionInfosParams.sortedType}
            renderColumn={renderColumn}
            renderDetailColumn={renderDetailColumn}
            keyExtractor={(item: CryptoTransactionInfo, index) => index.toString()}
            isLoading={isFetchCryptoTransactionInfosLoading}
          />
        </Card.Body>
        <Card.Footer>
          <Pagination
            page={paginatedInfo.page}
            totalPage={paginatedInfo.totalPage}
            pageSize={paginatedInfo.pageSize}
            totalCount={paginatedInfo.totalCount}
            onPaginatedButtonClick={handlePageChange}
            disabled={isFetchCryptoTransactionInfosLoading}
          />
        </Card.Footer>
      </Card>
    </PageContainer>
  );
};
