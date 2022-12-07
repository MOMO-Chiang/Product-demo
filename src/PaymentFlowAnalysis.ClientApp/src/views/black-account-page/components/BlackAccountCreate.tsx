import { ErrorMessage, FormGroup, Input, Label, Select } from '@app/components/form';
import { Modal } from '@app/components/modal';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import React, { FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlackAccountActionCreator, hideModalActionCreator } from '../actions';

/** 新增表單 type */
type CreationForm = {
  /** 風險類別 */
  risklevel: string;
  /** 身分證字號 */
  idCardNum: string;
  /** 錢包幣別 */
  currencyType: string;
  /** 錢包地址 */
  walletAddress: string;
  /** 電話號碼 */
  userPhone: string;
  /** 電子信箱 */
  userEmail: string;
  /** ip位置 */
  userIP: string;
  /** 網址 */
  url: string;
  /** 備註 */
  remark: string;
};

/** 驗證表單 Hook */
const useValidationForm = () => {
  /** Form 欄位資料 */
  const { formData, validator, validateAll, updateFormData } = useForm<CreationForm>({
    risklevel: {
      initialValue: '',
      validate: () => ({}),
    },
    idCardNum: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入身分證字號' } : {}),
    },
    currencyType: {
      initialValue: '',
      validate: () => ({}),
    },
    walletAddress: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入錢包地址' } : {}),
    },
    userPhone: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入電話' } : {}),
    },
    userEmail: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入信箱' } : {}),
    },
    userIP: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入ip位置' } : {}),
    },
    url: {
      initialValue: '',
      validate: () => ({}),
    },
    remark: {
      initialValue: '',
      validate: () => ({}),
    },
  });

  return { formData, validator, validateAll, updateFormData };
};

export const BlackAccountCreate = () => {
  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** Form 欄位資料 */
  const { formData, validator, validateAll, updateFormData } = useValidationForm();

  /** 表單 submit 事件 */
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // 檢核所有欄位
      const { isValid } = validateAll();

      // 檢核通過就更新資料
      if (isValid) {
        dispatch(
          createBlackAccountActionCreator({
            risklevel: formData.risklevel,
            idCardNum: formData.idCardNum,
            currencyType: formData.currencyType,
            walletAddress: formData.walletAddress,
            userPhone: formData.userPhone,
            userEmail: formData.userEmail,
            userIP: formData.userIP,
            url: formData.url,
            remark: formData.remark,
            isValid: true,
            exchangeTypeCode: '',
            updateTime: '',
            risklevelStr: '',
            exchangeTypeCodeStr: '',
          }),
        );
      }
    },
    [dispatch, formData],
  );

  /** 隱藏Modal */
  const hideModal = useCallback(() => {
    dispatch(hideModalActionCreator());
  }, [dispatch]);

  /** 風險類別下拉選單 */
  const RisklevelOptions = useSelector((state: AppState) => state.pages.blackAccounts.RiskLevelOptions);
  return (
    <>
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>黑名單帳戶(新增)</Modal.Title>
          <Modal.CloseButton onClick={hideModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="exchangeTypeCode">資料來源</Label>
                <Input type="text" id="exchangeTypeCode" name="exchangeTypeCode" value="調查局" disabled />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="risklevel">風險類別</Label>
                <Select
                  id="risklevel"
                  name="risklevel"
                  options={RisklevelOptions}
                  onChange={(e) => updateFormData({ risklevel: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userName">身分證字號</Label>
                <Input
                  type="text"
                  id="idCardNum"
                  name="idCardNum"
                  onChange={(e) => updateFormData({ idCardNum: e.target.value })}
                  value={formData.idCardNum}
                />
                {validator.idCardNum.errors.required && <ErrorMessage>{validator.idCardNum.errors.required}</ErrorMessage>}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="currencyType">錢包幣別</Label>
                <Input
                  type="text"
                  id="currencyType"
                  name="currencyType"
                  onChange={(e) => updateFormData({ currencyType: e.target.value })}
                  value={formData.currencyType}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="walletAddress">錢包地址</Label>
                <Input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  onChange={(e) => updateFormData({ walletAddress: e.target.value })}
                  value={formData.walletAddress}
                />
                {validator.walletAddress.errors.required && (
                  <ErrorMessage>{validator.walletAddress.errors.required}</ErrorMessage>
                )}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userPhone">電話號碼</Label>
                <Input
                  type="text"
                  id="userPhone"
                  name="userPhone"
                  onChange={(e) => updateFormData({ userPhone: e.target.value })}
                  value={formData.userPhone}
                />
                {validator.userPhone.errors.required && <ErrorMessage>{validator.userPhone.errors.required}</ErrorMessage>}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userEmail">電子信箱</Label>
                <Input
                  type="text"
                  id="userEmail"
                  name="userEmail"
                  onChange={(e) => updateFormData({ userEmail: e.target.value })}
                  value={formData.userEmail}
                />
                {validator.userEmail.errors.required && <ErrorMessage>{validator.userEmail.errors.required}</ErrorMessage>}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userIP">ip位置</Label>
                <Input
                  type="text"
                  id="userIP"
                  name="userIP"
                  onChange={(e) => updateFormData({ userIP: e.target.value })}
                  value={formData.userIP}
                />
                {validator.userIP.errors.required && <ErrorMessage>{validator.userIP.errors.required}</ErrorMessage>}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="url">網址</Label>
                <Input
                  type="text"
                  id="url"
                  name="url"
                  onChange={(e) => updateFormData({ url: e.target.value })}
                  value={formData.url}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="remark">備註</Label>
                <Input
                  type="text"
                  id="remark"
                  name="remark"
                  onChange={(e) => updateFormData({ remark: e.target.value })}
                  value={formData.remark}
                />
              </FormGroup>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light btn-width-lg" onClick={hideModal}>
            取消
          </button>
          <button type="submit" className="btn btn-primary btn-width-lg me-2">
            新增黑名單
          </button>
        </Modal.Footer>
      </form>
    </>
  );
};
