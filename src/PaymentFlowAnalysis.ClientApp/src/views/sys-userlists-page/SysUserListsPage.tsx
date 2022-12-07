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
import { FormGroup, Input, Label } from '@app/components/form';
import { PageContainer, PageHeader, PageTitle } from '@app/components/page';
import { SearchCard } from '@app/components/search-card';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { useNavigation } from '@modules/router';
import { DEFAULT_PAGE, PAGE_SIZE_OPTIONS } from '@shared/constants';
import { SysUserList } from '@shared/types';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  expandDetailActionCreator, //展開明細Action
  deleteSysUserListActionCreator,
  fetchSysUserListsActionCreator,
  hideModalActionCreator,
  resetPageStateActionCreator,
  showCreateModalActionCreator,
  showEditModalActionCreator,
} from './actions';
import { ModalForm } from './components/ModalForms';

/** DataTable 欄位名稱 */
export type SysUserListTableField = keyof (SysUserList & {
  actions: string;
});

/** SearchCard Form */
export type SearchCardForm = {
  /** 使用者帳號 */
  userId: string;
  /** 使用者名稱 */
  orderUserName: string;
  /** 單位代碼 */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
  /** 電子信箱 */
  orderUserEmail: string;
  /** 連絡電話 */
  orderUserPhone: string;
};

/** 「模板頁面」元件 */
export const SysUserListsPage = () => {
  //#region Hooks

  /** DataTable 欄位設定  */
  const [dataTableColumns] = useState([
    { field: 'actions', name: '操作', isSortable: false },
    { field: 'userId', name: '使用者帳號', isPrimary: true },
    { field: 'unitCode', name: '單位代碼' },
    { field: 'unitName', name: '單位名稱' },
    { field: 'isValid', name: '有效' },
    { field: 'orderUserName', name: '使用者名稱' },
    { field: 'orderUserPhone', name: '連絡電話' },
    { field: 'orderUserEmail', name: '電子信箱' },
    { field: 'orderUserRank', name: '調閱人職稱' },
    { field: 'orderUserUnit', name: '調閱人任職單位' },
    { field: 'orderUserProjectCategory', name: '刑事案類' },
    { field: 'createTime', name: '建立時間' },
    { field: 'updateUserId', name: '最後異動人員帳號' },
    { field: 'updateUserName', name: '最後異動人員名稱' },
    { field: 'updateTime', name: '最後異動時間' },
    /** 當有明細資料需要顯示時，isDetail值請設定為true(可選) **/
    { field: 'detailData', name: '明細資料', isSortable: false, isDetail: false },
  ]);

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    userId: { initialValue: '', validate: () => ({}) },
    orderUserName: { initialValue: '', validate: () => ({}) },
    unitCode: { initialValue: '', validate: () => ({}) },
    unitName: { initialValue: '', validate: () => ({}) },
    orderUserEmail: { initialValue: '', validate: () => ({}) },
    orderUserPhone: { initialValue: '', validate: () => ({}) },
  });

  /** 當前取得帳號資料的搜尋條件資料 */
  const currentFetchSysUserListsParams = useSelector(
    (state: AppState) => state.pages.sysUserLists.currentFetchSysUserListsParams,
  );

  /** 帳號資料 */
  const sysUserLists = useSelector((state: AppState) => state.pages.sysUserLists.sysUserLists);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.sysUserLists.paginatedInfo);

  /** 是否正在取得帳號資料 */
  const isFetchSysUserListsLoading = useSelector((state: AppState) => state.pages.sysUserLists.isFetchSysUserListsLoading);

  /** 新增帳號是否成功 */
  const isCreateSysUserListSuccess = useSelector((state: AppState) => state.pages.sysUserLists.isCreateSysUserListSuccess);

  /** 更新帳號是否成功 */
  const isUpdateSysUserListSuccess = useSelector((state: AppState) => state.pages.sysUserLists.isUpdateSysUserListSuccess);

  /** 是否刪除成功 */
  const isDeleteSysUserListSuccess = useSelector((state: AppState) => state.pages.sysUserLists.isDeleteSysUserListSuccess);

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
        fetchSysUserListsActionCreator({
          ...currentFetchSysUserListsParams,
          ...formData,
          page: DEFAULT_PAGE,
        }),
      );
    },
    [dispatch, formData, currentFetchSysUserListsParams],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        fetchSysUserListsActionCreator({
          ...currentFetchSysUserListsParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, currentFetchSysUserListsParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        fetchSysUserListsActionCreator({
          ...currentFetchSysUserListsParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, currentFetchSysUserListsParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        fetchSysUserListsActionCreator({
          ...currentFetchSysUserListsParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, currentFetchSysUserListsParams],
  );

  /** 展開明細事件 */
  const handleExpandDetailClick = useCallback(
    (key: string, isCheck: boolean) => dispatch(expandDetailActionCreator(key, isCheck)),
    [dispatch],
  );

  /** 處理新增帳號 */
  const handleCreateEvent = useCallback(() => {
    dispatch(showCreateModalActionCreator());
  }, [dispatch]);

  /** 處理編輯事件 */
  const handleEditEvent = useCallback(
    (userId) => {
      dispatch(showEditModalActionCreator(userId));
    },
    [dispatch],
  );

  /** 刪除帳號 */
  const deleteSysUserList = useCallback(
    async (userId) => {
      const isConfirmed = await Alert.show({
        type: Alert.AlertType.Warning,
        title: '確定要刪除此帳號?',
      });

      if (isConfirmed) {
        dispatch(deleteSysUserListActionCreator(userId));
      }
    },
    [dispatch],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<SysUserList, SysUserListTableField> = ({ field, data }) => {
    if (field === 'actions') {
      return (
        <DataColumn>
          <button type="button" className="btn btn-warning btn-sm me-2" onClick={() => handleEditEvent(data.userId)}>
            <i className="fas fa-pen" />
          </button>
          {/* <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteSysUserList(data.userId)}>
            <i className="fas fa-trash" />
          </button> */}
        </DataColumn>
      );
    }
    if (field === 'isValid') {
      switch (data.isValid) {
        case true:
          return <DataColumn>有效</DataColumn>;
        case false:
          return <DataColumn>無效</DataColumn>;
        default:
          return <DataColumn></DataColumn>;
      }
    }

    return <DataColumn>{data[field]}</DataColumn>;
  };

  //#region Effects
  useEffect(() => {
    // 載入畫面時，取得帳號列表
    dispatch(fetchSysUserListsActionCreator(currentFetchSysUserListsParams));

    return () => {
      // 重置頁面 State
      dispatch(resetPageStateActionCreator());
    };
  }, [dispatch]);

  /** 新增成功，重新取得列表資料 */
  useEffect(() => {
    if (isCreateSysUserListSuccess) {
      dispatch(hideModalActionCreator());
      dispatch(fetchSysUserListsActionCreator(currentFetchSysUserListsParams));
    }
  }, [isCreateSysUserListSuccess, currentFetchSysUserListsParams]);

  /** 更新成功，重新取得列表資料 */
  useEffect(() => {
    if (isUpdateSysUserListSuccess) {
      dispatch(hideModalActionCreator());
      dispatch(fetchSysUserListsActionCreator(currentFetchSysUserListsParams));
    }
  }, [isUpdateSysUserListSuccess, currentFetchSysUserListsParams]);

  /** 刪除成功後，重新取得列表資料 */
  useEffect(() => {
    if (isDeleteSysUserListSuccess) {
      dispatch(fetchSysUserListsActionCreator(currentFetchSysUserListsParams));
    }
  }, [isDeleteSysUserListSuccess, currentFetchSysUserListsParams]);

  //#endregion Effects

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>使用者帳號管理</PageTitle>
      </PageHeader>

      {/* Search Card */}
      <SearchCard>
        <form className="container-fluid" onSubmit={handleSearchFormSubmit}>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userId">使用者帳號</Label>
                <Input
                  type="text"
                  id="userId"
                  name="userId"
                  onChange={(e) => updateFormData({ userId: e.target.value })}
                  value={formData.userId}
                  disabled={isFetchSysUserListsLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="orderUserName">使用者名稱</Label>
                <Input
                  type="text"
                  id="orderUserName"
                  name="orderUserName"
                  onChange={(e) => updateFormData({ orderUserName: e.target.value })}
                  value={formData.orderUserName}
                  disabled={isFetchSysUserListsLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="unitCode">單位代碼</Label>
                <Input
                  type="text"
                  id="unitCode"
                  name="unitCode"
                  onChange={(e) => updateFormData({ unitCode: e.target.value })}
                  value={formData.unitCode}
                  disabled={isFetchSysUserListsLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="unitName">單位名稱</Label>
                <Input
                  type="text"
                  id="unitName"
                  name="unitName"
                  onChange={(e) => updateFormData({ unitName: e.target.value })}
                  value={formData.unitName}
                  disabled={isFetchSysUserListsLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="orderUserEmail">電子信箱</Label>
                <Input
                  type="text"
                  id="orderUserEmail"
                  name="orderUserEmail"
                  onChange={(e) => updateFormData({ orderUserEmail: e.target.value })}
                  value={formData.orderUserEmail}
                  disabled={isFetchSysUserListsLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="orderUserPhone">連絡電話</Label>
                <Input
                  type="text"
                  id="orderUserPhone"
                  name="orderUserPhone"
                  onChange={(e) => updateFormData({ orderUserPhone: e.target.value })}
                  value={formData.orderUserPhone}
                  disabled={isFetchSysUserListsLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary btn-width-xlg" disabled={isFetchSysUserListsLoading}>
                搜尋
              </button>
            </div>
          </div>
        </form>
      </SearchCard>

      {/* Table Card */}
      <Card>
        <Card.Header>
          <PageSizeSelect options={PAGE_SIZE_OPTIONS} onChange={handlePageSizeChange} value={String(paginatedInfo.pageSize)} />
          {/* <button type="button" className="btn btn-primary btn-width-lg" onClick={handleCreateEvent}>
            新增
          </button> */}
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={dataTableColumns}
            data={sysUserLists}
            onSortChange={handleSortedColumnChange}
            sortedColumn={currentFetchSysUserListsParams.sortedColumn}
            sortedType={currentFetchSysUserListsParams.sortedType}
            renderColumn={renderColumn}
            keyExtractor={(item: SysUserList) => item.userId}
            isLoading={isFetchSysUserListsLoading}
          />
        </Card.Body>
        <Card.Footer>
          <Pagination
            page={paginatedInfo.page}
            totalPage={paginatedInfo.totalPage}
            pageSize={paginatedInfo.pageSize}
            totalCount={paginatedInfo.totalCount}
            onPaginatedButtonClick={handlePageChange}
            disabled={isFetchSysUserListsLoading}
          />
        </Card.Footer>
      </Card>
      <ModalForm></ModalForm>
    </PageContainer>
  );
};
