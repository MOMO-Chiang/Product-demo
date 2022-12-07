import {
  DataColumn,
  DataTable,
  PageSizeSelectChangeFunc,
  PaginatedButtonClickFunc,
  Pagination,
  RenderColumnFunc,
  SortChangeFunc,
} from '@app/components/data-table';
import { FormGroup, Input, Label } from '@app/components/form';
import { Modal } from '@app/components/modal';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { PersonalDetailNumberShowModalData } from '@shared/types';
import React from 'react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showDetailNumberListActionCreator } from '../actions';

/** DataTable 欄位名稱 */
export type CryptoTransactionInfoDetailNumberTableField = keyof PersonalDetailNumberShowModalData;

/** SearchCard Form */
export type SearchCardForm = {
  /** 調閱單號 */
  orderDetailNumber: string;
  /** 調閱人姓名 */
  queryName: string;
  /** 調閱人電話 */
  queryPhone: string;
  /** 調閱人Email */
  queryEmail: string;
  /** 調閱人職稱 */
  queryRank: string;
  /** 調閱人任職單位 */
  queryUnit: string;
  /** 刑事案類 */
  projectCategory: string;
};

export default function SearchDetailNumberModal(props: any) {
  /** modal開關 */
  const [show, setShow] = useState(false);

  /** 關閉modal */
  const handleClose = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };

  /** 當前取得搜尋條件資料 */
  // const CryptoPersonalSearchDetailNumberParams = useSelector(
  //   (state: AppState) => state.pages.CryptoTransactionInfo.CryptoPersonalSearchDetailNumberParams,
  // );

  /** DetailNumber資料 */
  const DetailNumberData = useSelector((state: AppState) => state.pages.CryptoTransactionInfo.DetailNumberData);
  /** 分頁資訊資料 */
  const paginatedInfo = useSelector((state: AppState) => state.pages.CryptoTransactionInfo.paginatedInfo);

  /** Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    orderDetailNumber: { initialValue: '', validate: () => ({}) },
    queryName: { initialValue: '', validate: () => ({}) },
    queryPhone: { initialValue: '', validate: () => ({}) },
    queryEmail: { initialValue: '', validate: () => ({}) },
    queryRank: { initialValue: '', validate: () => ({}) },
    queryUnit: { initialValue: '', validate: () => ({}) },
    projectCategory: { initialValue: '', validate: () => ({}) },
  });

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 開啟modal */
  const handleShow = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setShow(true);
      console.log(props.Seq);
      dispatch(showDetailNumberListActionCreator(props.Seq));
    },
    [dispatch],
  );

  /** Render DataTable Columns */
  const renderColumn: RenderColumnFunc<PersonalDetailNumberShowModalData, CryptoTransactionInfoDetailNumberTableField> = ({
    field,
    data,
  }) => {
    return <DataColumn>{data[field]}</DataColumn>;
  };

  //#region Effects
  useEffect(() => {
    if (DetailNumberData) {
      // 更新表單資料
      updateFormData({
        orderDetailNumber: DetailNumberData.orderDetailNumber || '',
        queryName: DetailNumberData.queryName || '',
        queryPhone: DetailNumberData.queryPhone || '',
        queryEmail: DetailNumberData.queryEmail || '',
        queryRank: DetailNumberData.queryRank || '',
        queryUnit: DetailNumberData.queryUnit || '',
        projectCategory: DetailNumberData.projectCategory || '',
      });
    }
  }, [DetailNumberData]);

  return (
    <>
      <a style={{ color: 'var(--bs-link-color)', cursor: 'pointer' }} onClick={handleShow}>
        {props.Data}
      </a>
      <Modal show={show} dialogClassName="modal-xl">
        <Modal.Header>
          <Modal.Title>調閱單資訊</Modal.Title>
          <Modal.CloseButton onClick={handleClose}></Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="orderDetailNumber">調閱單號</Label>
                    <Input
                      type="text"
                      id="orderDetailNumber"
                      name="orderDetailNumber"
                      onChange={(e) => updateFormData({ orderDetailNumber: e.target.value })}
                      value={formData.orderDetailNumber}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="queryName">調閱人姓名</Label>
                    <Input
                      type="text"
                      id="queryName"
                      name="queryName"
                      onChange={(e) => updateFormData({ queryName: e.target.value })}
                      value={formData.queryName}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="queryPhone">調閱人電話</Label>
                    <Input
                      type="text"
                      id="queryPhone"
                      name="queryPhone"
                      onChange={(e) => updateFormData({ queryPhone: e.target.value })}
                      value={formData.queryPhone}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="queryEmail">調閱人Email</Label>
                    <Input
                      type="text"
                      id="queryEmail"
                      name="queryEmail"
                      onChange={(e) => updateFormData({ queryEmail: e.target.value })}
                      value={formData.queryEmail}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="queryRank">調閱人職稱</Label>
                    <Input
                      type="text"
                      id="queryRank"
                      name="queryRank"
                      onChange={(e) => updateFormData({ queryRank: e.target.value })}
                      value={formData.queryRank}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="queryUnit">調閱人任職單位</Label>
                    <Input
                      type="text"
                      id="queryUnit"
                      name="queryUnit"
                      onChange={(e) => updateFormData({ queryUnit: e.target.value })}
                      value={formData.queryUnit}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="projectCategory">刑事案類</Label>
                    <Input
                      type="text"
                      id="projectCategory"
                      name="projectCategory"
                      onChange={(e) => updateFormData({ projectCategory: e.target.value })}
                      value={formData.projectCategory}
                      disabled
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
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
