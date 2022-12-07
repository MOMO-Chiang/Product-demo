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

/** SearchCard Form */
export type SearchCardForm = {
  /** 交易種類 */
  transactionType: string;
  /** 帳號 */
  remittanceAccount: string;
  /** 帳號種類 */
  remittanceAccountType: string;
  /** 幣別 */
  remittanceCurrency: string;
  /** 數量 */
  outwardsaAmount: string;
  /** 銀行代碼 */
  remittanceBank: string;
  /** 銀行名稱 */
  remittanceBankName: string;
  /** 分行代碼 */
  remittanceBranch: string;
  /** 分行名稱 */
  remittanceBranchName: string;
};

export default function CashOutModal(props: any) {
  /** modal開關 */
  const [show, setShow] = useState(false);

  /** 關閉modal */
  const handleClose = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };

  /** Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    transactionType: { initialValue: '', validate: () => ({}) },
    remittanceAccount: { initialValue: '', validate: () => ({}) },
    remittanceAccountType: { initialValue: '', validate: () => ({}) },
    remittanceCurrency: { initialValue: '', validate: () => ({}) },
    outwardsaAmount: { initialValue: '', validate: () => ({}) },
    remittanceBank: { initialValue: '', validate: () => ({}) },
    remittanceBankName: { initialValue: '', validate: () => ({}) },
    remittanceBranch: { initialValue: '', validate: () => ({}) },
    remittanceBranchName: { initialValue: '', validate: () => ({}) },
  });

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 開啟modal */
  const handleShow = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setShow(true);
    },
    [dispatch],
  );

  //#region Effects
  useEffect(() => {
    if (props.data) {
      // 更新表單資料
      updateFormData({
        transactionType: props.data.TransactionType || '',
        remittanceAccount: props.data.RemittanceAccount || '',
        remittanceAccountType: props.data.RemittanceAccountType || '',
        remittanceCurrency: props.data.RemittanceCurrency || '',
        outwardsaAmount: props.data.OutwardsaAmount || '',
        remittanceBank: props.data.RemittanceBank || '',
        remittanceBankName: props.data.RemittanceBankName || '',
        remittanceBranch: props.data.RemittanceBranch || '',
        remittanceBranchName: props.data.RemittanceBranchName || '',
      });
    }
  }, [props.data]);

  return (
    <>
      <a style={{ color: 'var(--bs-link-color)', cursor: 'pointer' }} onClick={handleShow}>
        {props.Name}
      </a>
      {'->'}
      <Modal show={show} dialogClassName="modal-xl">
        <Modal.Header>
          <Modal.Title>來源帳戶</Modal.Title>
          <Modal.CloseButton onClick={handleClose}></Modal.CloseButton>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="transactionType">交易種類</Label>
                    <Input
                      type="text"
                      id="transactionType"
                      name="transactionType"
                      onChange={(e) => updateFormData({ transactionType: e.target.value })}
                      value={formData.transactionType}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="remittanceAccount">帳號</Label>
                    <Input
                      type="text"
                      id="remittanceAccount"
                      name="remittanceAccount"
                      onChange={(e) => updateFormData({ remittanceAccount: e.target.value })}
                      value={formData.remittanceAccount}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="remittanceAccountType">帳號種類</Label>
                    <Input
                      type="text"
                      id="remittanceAccountType"
                      name="remittanceAccountType"
                      onChange={(e) => updateFormData({ remittanceAccountType: e.target.value })}
                      value={formData.remittanceAccountType}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="remittanceCurrency">幣別</Label>
                    <Input
                      type="text"
                      id="orderUserRank"
                      name="orderUserRank"
                      onChange={(e) => updateFormData({ remittanceCurrency: e.target.value })}
                      value={formData.remittanceCurrency}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="outwardsaAmount">數量</Label>
                    <Input
                      type="text"
                      id="outwardsaAmount"
                      name="outwardsaAmount"
                      onChange={(e) => updateFormData({ outwardsaAmount: e.target.value })}
                      value={formData.outwardsaAmount}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="remittanceBank">銀行代碼</Label>
                    <Input
                      type="text"
                      id="remittanceBank"
                      name="remittanceBank"
                      onChange={(e) => updateFormData({ remittanceBank: e.target.value })}
                      value={formData.remittanceBank}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="remittanceBankName">銀行名稱</Label>
                    <Input
                      type="text"
                      id="remittanceBankName"
                      name="remittanceBankName"
                      onChange={(e) => updateFormData({ remittanceBankName: e.target.value })}
                      value={formData.remittanceBankName}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="remittanceBranch">分行代碼</Label>
                    <Input
                      type="text"
                      id="remittanceBranch"
                      name="remittanceBranch"
                      onChange={(e) => updateFormData({ remittanceBranch: e.target.value })}
                      value={formData.remittanceBranch}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="remittanceBranchName">分行名稱</Label>
                    <Input
                      type="text"
                      id="remittanceBranchName"
                      name="remittanceBranchName"
                      onChange={(e) => updateFormData({ remittanceBranchName: e.target.value })}
                      value={formData.remittanceBranchName}
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
