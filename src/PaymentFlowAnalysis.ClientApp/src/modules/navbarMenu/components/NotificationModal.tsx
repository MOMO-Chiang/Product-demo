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
import { AppState } from '@app/store';
import { RouteURL, useNavigation } from '@modules/router';
import {
  CRYPTO_PERSONAL_INFO_STORAGE_KEY,
  CRYPTO_TRANSACTION_INFO_STORAGE_KEY,
  DEFAULT_PAGE,
  RELEVANT_CRYPTO_PERSONAL_INFO_STORAGE_KEY,
} from '@shared/constants';
import { SearchType, SortedType } from '@shared/enums';
import { NotificationInfo } from '@shared/types';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationsActionCreator, hideModalActionCreator } from '..';

/** DataTable 欄位名稱 */
type NotificationTableField = keyof NotificationInfo;

export const NotificationModal = () => {
  /** tableColumns 欄位設定 */
  const [tableColumns] = useState([
    { field: 'seq', name: '主鍵', isPrimary: true, isHidden: true },
    { field: 'createTime', name: '通知時間' },
    { field: 'message', name: '通知內容', isPrimary: true },
  ]);

  /** 通知內容 */
  const notifications = useSelector((state: AppState) => state.navbarMenu.notifications);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.navbarMenu.paginatedInfo);

  /** 是否正在撈取通知資料 */
  const isFetchNotificationInfosLoading = useSelector((state: AppState) => state.navbarMenu.isFetchNotificationInfosLoading);

  /** 分頁資訊資料 */
  const currentFetchNotificationInfosParams = useSelector(
    (state: AppState) => state.navbarMenu.currentFetchNotificationInfosParams,
  );

  /** Redux dispatch function */
  const dispatch = useDispatch();

  const navigation = useNavigation();

  /** 隱藏Modal */
  const hideModal = useCallback(() => {
    dispatch(hideModalActionCreator());
  }, [dispatch]);

  const handleRedirectURL = useCallback(
    (orderMasterNumber: string, queryParameter: any) => {
      //const queryString: string = new URLSearchParams(JSON.parse(queryParameter)).toString();
      if (!queryParameter.hasOwnProperty('searchType')) return;

      switch (queryParameter.searchType as number) {
        case SearchType.PersonalInfo:
          localStorage.setItem(CRYPTO_PERSONAL_INFO_STORAGE_KEY, orderMasterNumber);
          navigation.push(RouteURL.CRYPTO_PERSONAL_INFO);
          break;
        case SearchType.WalletAddress:
          localStorage.setItem(RELEVANT_CRYPTO_PERSONAL_INFO_STORAGE_KEY, orderMasterNumber);
          navigation.push(RouteURL.RELEVANT_CRYPTO_PERSONAL_INFO);
          break;
        case SearchType.TransactionInfo:
          localStorage.setItem(CRYPTO_TRANSACTION_INFO_STORAGE_KEY, orderMasterNumber);
          navigation.push(RouteURL.CRYPTO_TRANSACTION_INFO);
          break;
        default:
          break;
      }

      dispatch(hideModalActionCreator());
    },
    [dispatch],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        fetchNotificationsActionCreator({
          ...currentFetchNotificationInfosParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, currentFetchNotificationInfosParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        fetchNotificationsActionCreator({
          ...currentFetchNotificationInfosParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, currentFetchNotificationInfosParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        fetchNotificationsActionCreator({
          ...currentFetchNotificationInfosParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, currentFetchNotificationInfosParams],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<NotificationInfo, NotificationTableField> = ({ field, data }) => {
    if (field === 'message') {
      const regExp = new RegExp('(.*)({orderNo})(.*)', 'g');
      const matchArray = regExp.exec(data.message);

      return matchArray === null ? (
        <DataColumn></DataColumn>
      ) : (
        <DataColumn>
          {matchArray[1]}
          <a
            href="#"
            className="link-primary pe-auto"
            onClick={() => handleRedirectURL(data.orderMasterNumber, data.queryParameter)}
          >
            調閱主序號:{data.orderMasterNumber}
          </a>
          {matchArray[3]}
        </DataColumn>
      );
    }
    if (field === 'createTime' && !data.isRead) {
      return (
        <DataColumn>
          {data[field]}
          {<span className="badge bg-danger ms-2">New</span>}
        </DataColumn>
      );
    }

    return <DataColumn>{data[field]}</DataColumn>;
  };

  // /** 初始撈取通知內容 */
  // useEffect(() => {
  //   dispatch(fetchNotificationsActionCreator());
  // }, [dispatch]);

  return (
    <>
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>通知</Modal.Title>
          <Modal.CloseButton onClick={hideModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      <Modal.Body className="vh-75">
        <Card>
          {/* <Card.Header>
            <PageSizeSelect
              options={PAGE_SIZE_OPTIONS}
              onChange={handlePageSizeChange}
              value={String(paginatedInfo.pageSize)}
            />
          </Card.Header> */}
          <Card.Body>
            <DataTable
              tableClassName="nrg-data-table-wrap"
              columns={tableColumns}
              data={notifications}
              onSortChange={handleSortedColumnChange}
              sortedColumn={''}
              sortedType={SortedType.ASC}
              renderColumn={renderColumn}
              keyExtractor={(item: NotificationInfo) => item.notificationSeq}
              isLoading={isFetchNotificationInfosLoading}
            />
          </Card.Body>
          <Card.Footer>
            <Pagination
              page={paginatedInfo.page}
              totalPage={paginatedInfo.totalPage}
              pageSize={paginatedInfo.pageSize}
              totalCount={paginatedInfo.totalCount}
              onPaginatedButtonClick={handlePageChange}
              disabled={isFetchNotificationInfosLoading}
            />
          </Card.Footer>
        </Card>
      </Modal.Body>
    </>
  );
};
