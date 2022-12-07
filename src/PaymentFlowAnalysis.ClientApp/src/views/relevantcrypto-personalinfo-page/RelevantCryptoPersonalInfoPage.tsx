import { Card } from '@app/components/card';
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
import { FormGroup, Input, Label, Select } from '@app/components/form';
import { CryptoCard } from '@app/components/crypto-card';
import { PageContainer, PageHeader, PageTitle } from '@app/components/page';
import { SearchCard } from '@app/components/search-card';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { useNavigation } from '@modules/router';
import { DEFAULT_PAGE, PAGE_SIZE_OPTIONS, RELEVANT_CRYPTO_PERSONAL_INFO_STORAGE_KEY } from '@shared/constants';
import { CryptoPersonalInfo, CryptoQueryMaster } from '@shared/types';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  exportExcelActionCreator,
  exportOdsActionCreator,
  fetchCreateWallerAddressSearchActionCreator,
  fetchOrderNumberListActionCreator,
  initPageActionCreator,
} from './actions';
import { AgencyType, SexualType } from '@shared/enums';
import SearchHistoryModal from './components/SearchHistory';
import OtherActionUserModal from './components/OtherActionUser';
import CodeMirror from '@uiw/react-codemirror';
import SearchDetailNumberModal from './components/SearchDetailNumber';
import SearchIPModal from './components/SearchIP';
import SearchWallerAddressModal from './components/SearchWallerAddress';
import SearchPhoneModal from './components/SearchPhone';
import SearchPictureModal from './components/SearchPicture';
import Swal from 'sweetalert2';
import odsSvg from '@shared/assets/images/ods_icon.svg';
import excelSvg from '@shared/assets/images/excel_icon.svg';
import { CaseMarkIcon } from './components/CaseMarkIcon';

/** DataTable 欄位名稱 */
export type RelevantCryptoPersonalInfoTableField = keyof CryptoQueryMaster;
export type CryptoDetailTableField = keyof CryptoPersonalInfo;

/** SearchCard Form */
export type SearchCardForm = {
  /** 身分證字號 */
  idCardNum: string;
  /** 交易所帳號 */
  accountID: string;
  /** 姓名 */
  name: string;
  /** 手機 */
  phone: string;
  /** 電子信箱 */
  email: string;
  /** 銀行帳號 */
  bankAccount: string;
  /** 錢包地址 */
  wallerAddress: string;
  /** 拋查條件選項 */
  queryConditionType: string;
  /** 拋查內容 */
  search_info: string;
  /** 調閱主序號 */
  orderMasterNumber: string;
  /** 案號 */
  caseNo: string;
  /** 是否顯示本案相關帳戶 */
  isCaseMark: string;
};

/** SearchCard Form */
export type ActionUserModalForm = {
  /** 案號 */
  caseNo: string;
  /** 代拋查人事五碼 */
  actionUserId: string;
};

/** 「模板頁面」元件 */
export const RelevantCryptoPersonalInfoPage = () => {
  //#region Hooks

  /** 案件案號 */
  const CaseNo = useSelector((state: AppState) => state.userFile.userFile);

  /** MasterdataTable 欄位設定 */
  const [MasterdataTableColumns] = useState([
    //{ field: 'seq', name: '展開圖示', isSortable: false },
    { field: 'queryOrderTime', name: '調閱時間' },
    { field: 'orderMasterNumber', name: '調閱主序號', isPrimary: true },
    { field: 'caseNo', name: '案號' },
    { field: 'caseName', name: '案名' },
    { field: 'orderDetailCount', name: '資料回覆/調閱筆數' },
    /** 當有明細資料需要顯示時，isDetail值請設定為true(可選) **/
    { field: 'detailData', name: '明細資料', isSortable: false, isDetail: true },
  ]);

  /** DataTable 欄位設定 */
  const [DetaildataTableColumns] = useState([
    { field: 'IsCaseMark', name: '本案標記', isCheck: true },
    { field: 'PictureSubPath', name: '照片列表', isImage: true },
    { field: 'IdCardNum', name: '身分證字號', isPrimary: true },
    { field: 'Name', name: '姓名' },
    { field: 'ExchangeTypeCode', name: '交易所' },
    { field: 'AccountID', name: '交易所帳號' },
    { field: 'WallerAddress', name: '錢包地址' },
    { field: 'Phone', name: '電話列表' },
    { field: 'Email', name: '電子信箱' },
    { field: 'IP', name: '登入IP列表' },
    { field: 'Sexual_Cov', name: '性別' },
    { field: 'Birthday_Cov', name: '生日' },
    { field: 'Address', name: '通訊地址' },
    { field: 'RegisterDate_Cov', name: '帳號註冊時間' },
    { field: 'TotalProperty', name: '總資產價值(台幣)' },
    { field: 'BankName', name: '銀行代碼' },
    { field: 'Bank_Name', name: '銀行名稱' },
    { field: 'Branch', name: '銀行分支機構代碼' },
    { field: 'BranchName', name: '銀行分支機構名稱' },
    { field: 'BankAccount', name: '銀行帳號' },
    { field: 'Verifiedbank', name: '認證銀行代碼' },
    { field: 'VerifiedbankName', name: '認證銀行名稱' },
    { field: 'VerifyDate_Cov', name: '認證日期' },
    { field: 'OrderNumber', name: '調閱單號' },
    { field: 'CreateTime', name: '資料建立時間' },
  ]);

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    idCardNum: { initialValue: '', validate: () => ({}) },
    accountID: { initialValue: '', validate: () => ({}) },
    name: { initialValue: '', validate: () => ({}) },
    phone: { initialValue: '', validate: () => ({}) },
    email: { initialValue: '', validate: () => ({}) },
    bankAccount: { initialValue: '', validate: () => ({}) },
    wallerAddress: { initialValue: '', validate: () => ({}) },
    queryConditionType: { initialValue: '', validate: () => ({}) },
    search_info: { initialValue: '', validate: () => ({}) },
    orderMasterNumber: { initialValue: '', validate: () => ({}) },
    caseNo: { initialValue: CaseNo, validate: () => ({}) },
    isCaseMark: { initialValue: '', validate: () => ({}) },
  });

  /** 當前取得調閱主序號的搜尋條件資料 */
  const currentFetchOrderNumberListsParams = useSelector(
    (state: AppState) => state.pages.RelevantCryptoPersonalInfo.currentFetchOrderNumberListParams,
  );

  /** 相關帳戶個資調閱資料 */
  const RelevantCryptoPersonalInfo = useSelector(
    (state: AppState) => state.pages.RelevantCryptoPersonalInfo.RelevantCryptoPersonalInfo,
  );

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.RelevantCryptoPersonalInfo.paginatedInfo);

  /** 是否正在取得調閱資料 */
  const isFetchRelevantCryptoPersonalInfoLoading = useSelector(
    (state: AppState) => state.pages.RelevantCryptoPersonalInfo.isFetchRelevantCryptoPersonalInfoLoading,
  );

  /** 拋查成功訊息 */
  const CreateSearchMsg = useSelector((state: AppState) => state.pages.RelevantCryptoPersonalInfo.CreateSearchMsg);

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** Navigation */
  const navigation = useNavigation();

  //#endregion Hooks

  /** 搜尋按鈕事件 */
  const handleSearchFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      //updateFormData({ caseNo: CaseNo });
      dispatch(
        fetchOrderNumberListActionCreator({
          ...currentFetchOrderNumberListsParams,
          ...formData,
          caseNo: CaseNo,
          page: DEFAULT_PAGE,
        }),
      );
    },
    [dispatch, formData, currentFetchOrderNumberListsParams, CaseNo],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        fetchOrderNumberListActionCreator({
          ...currentFetchOrderNumberListsParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, currentFetchOrderNumberListsParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        fetchOrderNumberListActionCreator({
          ...currentFetchOrderNumberListsParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, currentFetchOrderNumberListsParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        fetchOrderNumberListActionCreator({
          ...currentFetchOrderNumberListsParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, currentFetchOrderNumberListsParams],
  );

  /** 匯出excel */
  const exportOrderNumberListExcel = useCallback(() => {
    dispatch(exportExcelActionCreator(currentFetchOrderNumberListsParams));
  }, [dispatch, currentFetchOrderNumberListsParams]);

  /** 匯出excel */
  const exportOrderNumberListOds = useCallback(() => {
    dispatch(exportOdsActionCreator(currentFetchOrderNumberListsParams));
  }, [dispatch, currentFetchOrderNumberListsParams]);

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
      if (info == '') {
        Alert.show({
          type: Alert.AlertType.Warning,
          title: `請輸入拋查內容`,
          showCancelButton: false,
        });
        return;
      }
      dispatch(
        fetchCreateWallerAddressSearchActionCreator({
          caseNo: CaseNo,
          caseName: '',
          queryConditionType: '1',
          queryConditionInfo: formData.search_info,
          searchType: 2,
          actionUserId: null,
        }),
      );
    },
    [dispatch, formData, CaseNo],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<CryptoQueryMaster, RelevantCryptoPersonalInfoTableField> = ({ field, data }) => {
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
  const renderDetailColumn: RenderDetailColumnFunc<CryptoPersonalInfo, CryptoDetailTableField> = ({ field, data, cidx }) => {
    switch (field) {
      case 'IsCaseMark':
        return <CaseMarkIcon id={'icon-' + cidx} PersonalInfoId={data.PersonalInfoId} value={data[field]} />;
        break;
      case 'PictureSubPath':
        return <SearchPictureModal PersonalInfoId={data.PersonalInfoId} Data={data[field]} />;
        break;
      case 'Sexual_Cov':
        return SexualType.male === data[field] ? '男' : '女';
        break;
      case 'WallerAddress':
        return <SearchWallerAddressModal PersonalInfoId={data.PersonalInfoId} Data={data[field]} />;
        break;
      case 'Phone':
        return <SearchPhoneModal PersonalInfoId={data.PersonalInfoId} Data={data[field]} />;
        break;
      case 'IP':
        return <SearchIPModal PersonalInfoId={data.PersonalInfoId} Data={data[field]} />;
        break;
      case 'OrderNumber':
        return <SearchDetailNumberModal Seq={data.Seq} Data={data[field]} />;
        break;

      default:
        return data[field];
    }
  };

  /** textarea */
  const textarea_onChange = useCallback((value, viewUpdate) => {
    updateFormData({ search_info: value });
  }, []);

  //#region Effects
  useEffect(() => {
    // 載入畫面時，取得調閱單號列表
    const orderMasterNumber = localStorage.getItem(RELEVANT_CRYPTO_PERSONAL_INFO_STORAGE_KEY);
    if (orderMasterNumber === null) {
      dispatch(fetchOrderNumberListActionCreator(currentFetchOrderNumberListsParams));
    } else {
      let params = {
        ...currentFetchOrderNumberListsParams,
        orderMasterNumber: orderMasterNumber,
      };
      updateFormData({ orderMasterNumber });

      dispatch(fetchOrderNumberListActionCreator(params));
    }
    setTimeout(() => {
      localStorage.removeItem(RELEVANT_CRYPTO_PERSONAL_INFO_STORAGE_KEY);
    }, 100);

    return () => {
      // 重置頁面 State
    };
  }, [dispatch, currentFetchOrderNumberListsParams]);

  //#endregion Effects

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>相關帳戶個資調閱</PageTitle>
      </PageHeader>
      {/* Crypto Card */}
      <CryptoCard title={'交易所拋查(個資資訊)'}>
        <form className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-2 col-md-3 col-lg-3">
              <FormGroup>
                <Label>交易所拋查條件</Label>
                <Label
                  style={{
                    background: '#e9ecef',
                    border: '1px solid #ced4da',
                    borderRadius: '0.25rem',
                    fontWeight: '400',
                    padding: '0.375rem 0.75rem',
                    alignItems: 'center',
                    width: '210px',
                  }}
                >
                  錢包地址
                </Label>
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
                    disabled={isFetchRelevantCryptoPersonalInfoLoading}
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
      <CryptoCard title={'相關交易個資'}>
        <form className="container-fluid" onSubmit={handleSearchFormSubmit}>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="IdCardNum">身分證字號</Label>
                <Input
                  type="text"
                  id="idCardNum"
                  name="idCardNum"
                  onChange={(e) => updateFormData({ idCardNum: e.target.value })}
                  value={formData.idCardNum}
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="AccountID">交易所帳號</Label>
                <Input
                  type="text"
                  id="accountID"
                  name="accountID"
                  onChange={(e) => updateFormData({ accountID: e.target.value })}
                  value={formData.accountID}
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="Name">交易所帳號姓名</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  value={formData.name}
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="phone">交易所帳號手機</Label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  value={formData.phone}
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="email">交易所帳號信箱</Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  value={formData.email}
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="bankAccount">銀行帳號</Label>
                <Input
                  type="text"
                  id="bankAccount"
                  name="bankAccount"
                  onChange={(e) => updateFormData({ bankAccount: e.target.value })}
                  value={formData.bankAccount}
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="wallerAddress">錢包地址</Label>
                <Input
                  type="text"
                  id="wallerAddress"
                  name="wallerAddress"
                  onChange={(e) => updateFormData({ wallerAddress: e.target.value })}
                  value={formData.wallerAddress}
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
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
                  disabled={isFetchRelevantCryptoPersonalInfoLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              {/* <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  只顯示本案相關帳戶
                </span>
                <span className="input-group-text">
                  <input
                    aria-label="Checkbox for following text input"
                    type="checkbox"
                    className="form-check-input"
                    id="isCaseMark"
                    name="isCaseMark"
                    onChange={(e) => updateFormData({ isCaseMark: e.target.checked ? '1' : '0' })}
                  />
                </span>
              </div> */}
              <button
                type="submit"
                className="btn btn-primary btn-width-xlg"
                disabled={isFetchRelevantCryptoPersonalInfoLoading}
              >
                個資查詢
              </button>
              <img
                src={odsSvg}
                onClick={exportOrderNumberListOds}
                style={{ width: '40px', height: '40px', marginRight: '10px', cursor: 'pointer', float: 'right' }}
              ></img>
              <img
                src={excelSvg}
                onClick={exportOrderNumberListExcel}
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
            columns={MasterdataTableColumns}
            DetailColumn={DetaildataTableColumns}
            data={RelevantCryptoPersonalInfo}
            onSortChange={handleSortedColumnChange}
            sortedColumn={currentFetchOrderNumberListsParams.sortedColumn}
            sortedType={currentFetchOrderNumberListsParams.sortedType}
            renderColumn={renderColumn}
            renderDetailColumn={renderDetailColumn}
            keyExtractor={(item: CryptoQueryMaster) => item.orderMasterNumber}
            isLoading={isFetchRelevantCryptoPersonalInfoLoading}
          />
        </Card.Body>
        <Card.Footer>
          <Pagination
            page={paginatedInfo.page}
            totalPage={paginatedInfo.totalPage}
            pageSize={paginatedInfo.pageSize}
            totalCount={paginatedInfo.totalCount}
            onPaginatedButtonClick={handlePageChange}
            disabled={isFetchRelevantCryptoPersonalInfoLoading}
          />
        </Card.Footer>
      </Card>
    </PageContainer>
  );
};
