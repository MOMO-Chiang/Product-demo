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
  beneficiaryAccount: string;
  /** 帳號種類 */
  beneficiaryAccountType: string;
  /** 幣別 */
  beneficiaryCurrency: string;
  /** 數量 */
  inwardsAmount: string;
  /** 銀行代碼 */
  beneficiaryBank: string;
  /** 銀行名稱 */
  beneficiaryBankName: string;
  /** 分行代碼 */
  beneficiaryBranch: string;
  /** 分行名稱 */
  beneficiaryBranchName: string;
};

export default function CashInModal(props: any) {
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
    beneficiaryAccount: { initialValue: '', validate: () => ({}) },
    beneficiaryAccountType: { initialValue: '', validate: () => ({}) },
    beneficiaryCurrency: { initialValue: '', validate: () => ({}) },
    inwardsAmount: { initialValue: '', validate: () => ({}) },
    beneficiaryBank: { initialValue: '', validate: () => ({}) },
    beneficiaryBankName: { initialValue: '', validate: () => ({}) },
    beneficiaryBranch: { initialValue: '', validate: () => ({}) },
    beneficiaryBranchName: { initialValue: '', validate: () => ({}) },
  });

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 開啟modal */
  const handleShow = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log(props);
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
        beneficiaryAccount: props.data.BeneficiaryAccount || '',
        beneficiaryAccountType: props.data.BeneficiaryAccountType || '',
        beneficiaryCurrency: props.data.BeneficiaryCurrency || '',
        inwardsAmount: props.data.InwardsAmount || '',
        beneficiaryBank: props.data.BeneficiaryBank || '',
        beneficiaryBankName: props.data.BeneficiaryBankName || '',
        beneficiaryBranch: props.data.BeneficiaryBranch || '',
        beneficiaryBranchName: props.data.BeneficiaryBranchName || '',
      });
    }
  }, [props.data]);

  return (
    <>
      <a style={{ color: 'var(--bs-link-color)', cursor: 'pointer' }} onClick={handleShow}>
        {props.Name}
      </a>
      <Modal show={show} dialogClassName="modal-xl">
        <Modal.Header>
          <Modal.Title>轉入帳戶</Modal.Title>
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
                    <Label htmlFor="beneficiaryAccount">帳號</Label>
                    <Input
                      type="text"
                      id="beneficiaryAccount"
                      name="beneficiaryAccount"
                      onChange={(e) => updateFormData({ beneficiaryAccount: e.target.value })}
                      value={formData.beneficiaryAccount}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="beneficiaryAccountType">帳號種類</Label>
                    <Input
                      type="text"
                      id="beneficiaryAccountType"
                      name="beneficiaryAccountType"
                      onChange={(e) => updateFormData({ beneficiaryAccountType: e.target.value })}
                      value={formData.beneficiaryAccountType}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="beneficiaryCurrency">幣別</Label>
                    <Input
                      type="text"
                      id="orderUserRank"
                      name="orderUserRank"
                      onChange={(e) => updateFormData({ beneficiaryCurrency: e.target.value })}
                      value={formData.beneficiaryCurrency}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="inwardsAmount">數量</Label>
                    <Input
                      type="text"
                      id="inwardsAmount"
                      name="inwardsAmount"
                      onChange={(e) => updateFormData({ inwardsAmount: e.target.value })}
                      value={formData.inwardsAmount}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="beneficiaryBank">銀行代碼</Label>
                    <Input
                      type="text"
                      id="beneficiaryBank"
                      name="beneficiaryBank"
                      onChange={(e) => updateFormData({ beneficiaryBank: e.target.value })}
                      value={formData.beneficiaryBank}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="beneficiaryBankName">銀行名稱</Label>
                    <Input
                      type="text"
                      id="beneficiaryBankName"
                      name="beneficiaryBankName"
                      onChange={(e) => updateFormData({ beneficiaryBankName: e.target.value })}
                      value={formData.beneficiaryBankName}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="beneficiaryBranch">分行代碼</Label>
                    <Input
                      type="text"
                      id="beneficiaryBranch"
                      name="beneficiaryBranch"
                      onChange={(e) => updateFormData({ beneficiaryBranch: e.target.value })}
                      value={formData.beneficiaryBranch}
                      disabled
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="beneficiaryBranchName">分行名稱</Label>
                    <Input
                      type="text"
                      id="beneficiaryBranchName"
                      name="beneficiaryBranchName"
                      onChange={(e) => updateFormData({ beneficiaryBranchName: e.target.value })}
                      value={formData.beneficiaryBranchName}
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
