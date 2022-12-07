import { Checkbox, ErrorMessage, FormGroup, Input, Label } from '@app/components/form';
import { Modal } from '@app/components/modal';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSysUserListActionCreator, hideModalActionCreator, updateSysUserListActionCreator } from '../actions';

/** 更新新表單 type */
type HeaderInfo = {
  /** 使用者帳號 */
  userId: string;
  /** 單位代碼 */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
};

/** 更新新表單 type */
type UpdateForm = {
  /** 調閱者姓名 */
  orderUserName: string;
  /** 連絡電話 */
  orderUserPhone: string;
  /** 電子信箱 */
  orderUserEmail: string;
  /** 職稱 */
  orderUserRank: string;
  /** 任職單位 */
  orderUserUnit: string;
  /** 刑事案類 */
  orderUserProjectCategory: string;
  /** 有效 */
  isValid: boolean;
};

/** 驗證表單 Hook */
const useValidationForm = () => {
  /** Form 欄位資料 */
  const { formData, validator, validateAll, updateFormData } = useForm<UpdateForm>({
    orderUserName: {
      initialValue: '',
      validate: () => ({}),
    },
    orderUserPhone: {
      initialValue: '',
      validate: () => ({}),
    },
    orderUserEmail: {
      initialValue: '',
      validate: () => ({}),
    },
    orderUserRank: {
      initialValue: '',
      validate: () => ({}),
    },
    orderUserUnit: {
      initialValue: '',
      validate: () => ({}),
    },
    orderUserProjectCategory: {
      initialValue: '',
      validate: () => ({}),
    },
    isValid: {
      initialValue: true,
      validate: () => ({}),
    },
  });

  return { formData, validator, validateAll, updateFormData };
};

export const SysUserListEdit = () => {
  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 是否成功撈取資料 */
  const isFetchSysUserListSuccess = useSelector((state: AppState) => state.navbarMenu.isFetchSysUserListSuccess);

  /** 當前的資料 id */
  const currentModalUserId = useSelector((state: AppState) => state.navbarMenu.currentModalUserId) as string;

  /** 當前的資料 */
  const currentModalSysUserList = useSelector((state: AppState) => state.navbarMenu.currentModalSysUserList);

  /** Form 欄位資料 */
  const { formData, validator, validateAll, updateFormData } = useValidationForm();

  const [headerInfo, setHeaderInfo] = useState<HeaderInfo>({
    /** 使用者帳號 */
    userId: '',
    /** 單位代碼 */
    unitCode: '',
    /** 單位名稱 */
    unitName: '',
  });

  /** 表單 submit 事件 */
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // 檢核所有欄位
      const { isValid } = validateAll();

      // 檢核通過就更新資料
      if (isValid) {
        dispatch(
          updateSysUserListActionCreator(currentModalUserId, {
            orderUserName: formData.orderUserName,
            orderUserEmail: formData.orderUserEmail,
            orderUserPhone: formData.orderUserPhone,
            orderUserRank: formData.orderUserRank,
            orderUserUnit: formData.orderUserUnit,
            orderUserProjectCategory: formData.orderUserProjectCategory,
            isValid: formData.isValid,
          }),
        );
      }
    },
    [dispatch, currentModalUserId, formData],
  );

  /** 隱藏Modal */
  const hideModal = useCallback(() => {
    dispatch(hideModalActionCreator());
  }, [dispatch]);

  /** 初始撈取帳號資料 */
  useEffect(() => {
    dispatch(fetchSysUserListActionCreator());
  }, [dispatch]);

  /** 初始頁面失敗，關閉Modal，回列表頁面 */
  useEffect(() => {
    if (isFetchSysUserListSuccess === false) {
      dispatch(hideModalActionCreator());
    }
  }, [isFetchSysUserListSuccess]);

  /** 取得當前的資料成功後，合併至表單資料 */
  useEffect(() => {
    if (currentModalSysUserList) {
      // 更新表單資料
      updateFormData({
        orderUserName: currentModalSysUserList.orderUserName || '',
        orderUserEmail: currentModalSysUserList.orderUserEmail || '',
        orderUserPhone: currentModalSysUserList.orderUserPhone || '',
        orderUserRank: currentModalSysUserList.orderUserRank || '',
        orderUserUnit: currentModalSysUserList.orderUserUnit || '',
        orderUserProjectCategory: currentModalSysUserList.orderUserProjectCategory || '',
        //預設值為true?
        isValid: currentModalSysUserList.isValid === null ? true : currentModalSysUserList.isValid,
      });
      setHeaderInfo({
        userId: currentModalSysUserList.userId || '',
        unitCode: currentModalSysUserList.unitCode || '',
        unitName: currentModalSysUserList.unitName || '',
      });
    }
  }, [currentModalSysUserList]);

  return (
    <>
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>使用者帳號(修改)</Modal.Title>
          <Modal.CloseButton onClick={hideModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userId">使用者帳號</Label>
                <Input type="text" id="userId" name="userId" value={headerInfo.userId} disabled />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="unitCode">單位代碼</Label>
                <Input type="text" id="unitCode" name="unitCode" value={headerInfo.unitCode} disabled />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="unitName">單位名稱</Label>
                <Input type="text" id="unitName" name="unitName" value={headerInfo.unitName} disabled />
              </FormGroup>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">虛擬貨幣交易所-申請調閱基本資料</div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="orderUserName">使用者名稱</Label>
                    <Input
                      type="text"
                      id="orderUserName"
                      name="orderUserName"
                      onChange={(e) => updateFormData({ orderUserName: e.target.value })}
                      value={formData.orderUserName}
                    />
                    {validator.orderUserName.errors.required && (
                      <ErrorMessage>{validator.orderUserName.errors.required}</ErrorMessage>
                    )}
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
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="orderUserRank">職稱</Label>
                    <Input
                      type="text"
                      id="orderUserRank"
                      name="orderUserRank"
                      onChange={(e) => updateFormData({ orderUserRank: e.target.value })}
                      value={formData.orderUserRank}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="orderUserUnit">任職單位</Label>
                    <Input
                      type="text"
                      id="orderUserUnit"
                      name="orderUserUnit"
                      onChange={(e) => updateFormData({ orderUserUnit: e.target.value })}
                      value={formData.orderUserUnit}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="orderUserProjectCategory">刑事案類</Label>
                    <Input
                      type="text"
                      id="orderUserProjectCategory"
                      name="orderUserProjectCategory"
                      onChange={(e) => updateFormData({ orderUserProjectCategory: e.target.value })}
                      value={formData.orderUserProjectCategory}
                    />
                  </FormGroup>
                </div>
                {/* <div className="col-12 col-sm-4">
                  <FormGroup>
                    <Checkbox
                      name="isValid"
                      labeltext="帳號有效"
                      onChange={(e) => {
                        updateFormData({ isValid: e.target.checked });
                      }}
                      checked={formData.isValid}
                    />
                  </FormGroup>
                </div> */}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light btn-width-lg" onClick={hideModal}>
            取消
          </button>
          <button type="submit" className="btn btn-primary btn-width-lg me-2">
            更新
          </button>
        </Modal.Footer>
      </form>
    </>
  );
};
