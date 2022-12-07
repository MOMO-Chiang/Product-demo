import { ErrorMessage, FormGroup, Input, Label } from '@app/components/form';
import { Modal } from '@app/components/modal';
import { useForm } from '@app/hooks';
import React, { FormEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createSysUserListActionCreator, hideModalActionCreator } from '../actions';

/** 新增表單 type */
type CreationForm = {
  /** 使用者帳號 */
  userId: string;
  /** 使用者名稱 */
  userName: string;
  /** 單位代碼 */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
  /** 電子信箱 */
  userEmail: string;
  /** 連絡電話 */
  userPhone: string;
};

/** 驗證表單 Hook */
const useValidationForm = () => {
  /** Form 欄位資料 */
  const { formData, validator, validateAll, updateFormData } = useForm<CreationForm>({
    userId: {
      initialValue: '',
      validate: ({ value }) => (!value ? { required: '請輸入帳號' } : {}),
    },
    userName: {
      initialValue: '',
      validate: () => ({}),
    },
    unitCode: {
      initialValue: '',
      validate: () => ({}),
    },
    unitName: {
      initialValue: '',
      validate: () => ({}),
    },
    userEmail: {
      initialValue: '',
      validate: () => ({}),
    },
    userPhone: {
      initialValue: '',
      validate: () => ({}),
    },
  });

  return { formData, validator, validateAll, updateFormData };
};

export const SysUserListCreate = () => {
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
        // dispatch(
        //   createSysUserListActionCreator({
        //     userId: formData.userId,
        //     userName: formData.userName,
        //     userEmail: formData.userEmail,
        //     userPhone: formData.userPhone,
        //     unitCode: formData.unitCode,
        //     unitName: formData.unitName,
        //     isValid: true,
        //     createTime: '',
        //     updateTime: '',
        //     updateUserName: '',
        //     updateUserId: '',
        //     detailData: '',
        //   }),
        // );
      }
    },
    [dispatch, formData],
  );

  /** 隱藏Modal */
  const hideModal = useCallback(() => {
    dispatch(hideModalActionCreator());
  }, [dispatch]);

  return (
    <>
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>使用者帳號(新增)</Modal.Title>
          <Modal.CloseButton onClick={hideModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
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
                />
                {validator.userId.errors.required && <ErrorMessage>{validator.userId.errors.required}</ErrorMessage>}
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userName">使用者名稱</Label>
                <Input
                  type="text"
                  id="userName"
                  name="userName"
                  onChange={(e) => updateFormData({ userName: e.target.value })}
                  value={formData.userName}
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
                />
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
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userPhone">連絡電話</Label>
                <Input
                  type="text"
                  id="userPhone"
                  name="userPhone"
                  onChange={(e) => updateFormData({ userPhone: e.target.value })}
                  value={formData.userPhone}
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
            新增
          </button>
        </Modal.Footer>
      </form>
    </>
  );
};
