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
import { PersonalPhoneShowModalData, PersonalPictureShowModalData } from '@shared/types';
import React from 'react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showPictureListActionCreator } from '../actions';

/** DataTable 欄位名稱 */
export type RelevantCryptoPersonalInfoPictureTableField = keyof PersonalPictureShowModalData;

export default function SearchPictureModal(props: any) {
  /** modal開關 */
  const [show, setShow] = useState(false);

  /** TableColumns 欄位設定 */
  const [PictureTableColumns] = useState([{ field: 'subPath', name: '照片' }]);

  /** 關閉modal */
  const handleClose = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };

  /** 當前取得搜尋條件資料 */
  const CryptoPersonalSearchPictureParams = useSelector(
    (state: AppState) => state.pages.RelevantCryptoPersonalInfo.CryptoPersonalSearchPictureParams,
  );

  /** Picture資料 */
  const PictureData = useSelector((state: AppState) => state.pages.RelevantCryptoPersonalInfo.PictureData);

  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.RelevantCryptoPersonalInfo.paginatedPictureInfo);

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 開啟modal */
  const handleShow = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setShow(true);
      dispatch(showPictureListActionCreator(props.PersonalInfoId, CryptoPersonalSearchPictureParams));
    },
    [dispatch],
  );

  /** 處理分頁大小變換事件 */
  const handlePageSizeChange: PageSizeSelectChangeFunc = useCallback(
    (pageSize) => {
      dispatch(
        showPictureListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchPictureParams,
          page: DEFAULT_PAGE,
          pageSize: Number(pageSize),
        }),
      );
    },
    [dispatch, CryptoPersonalSearchPictureParams],
  );

  /** 處理 DataTable 欄位排序變換事件 */
  const handleSortedColumnChange: SortChangeFunc = useCallback(
    (field, sortedType) => {
      dispatch(
        showPictureListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchPictureParams,
          page: DEFAULT_PAGE,
          sortedType,
          sortedColumn: field,
        }),
      );
    },
    [dispatch, CryptoPersonalSearchPictureParams],
  );

  /** 處理 DataTable 換頁事件 */
  const handlePageChange: PaginatedButtonClickFunc = useCallback(
    (nextPage) => {
      dispatch(
        showPictureListActionCreator(props.PersonalInfoId, {
          ...CryptoPersonalSearchPictureParams,
          page: nextPage,
        }),
      );
    },
    [dispatch, CryptoPersonalSearchPictureParams],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<PersonalPictureShowModalData, RelevantCryptoPersonalInfoPictureTableField> = ({
    field,
    data,
  }) => {
    if (field === 'subPath') {
      return (
        <DataColumn>
          <img className="card-img-top" src={data.subPath} style={{ width: '128px', height: '128px' }} />
        </DataColumn>
      );
    }
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
      <img
        className="card-img-top"
        src={props.Data}
        style={{ width: '128px', height: '128px', cursor: 'pointer' }}
        onClick={handleShow}
      ></img>
      <Modal show={show} dialogClassName="modal-md">
        <Modal.Header>
          <Modal.Title>照片列表</Modal.Title>
          <Modal.CloseButton onClick={handleClose}></Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          {/* Table Card */}
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <DataTable
                columns={PictureTableColumns}
                data={PictureData}
                onSortChange={handleSortedColumnChange}
                sortedColumn={CryptoPersonalSearchPictureParams.sortedColumn}
                sortedType={CryptoPersonalSearchPictureParams.sortedType}
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
