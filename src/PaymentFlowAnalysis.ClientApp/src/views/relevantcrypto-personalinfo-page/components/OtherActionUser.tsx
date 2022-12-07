import { FormGroup, Input, Label } from '@app/components/form';
import { Modal } from '@app/components/modal';
import { useForm } from '@app/hooks';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import React, { FormEvent, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { fetchCreateWallerAddressSearchActionCreator } from '../actions';
import { ActionUserModalForm } from '../RelevantCryptoPersonalInfoPage';

export default function OtherActionUserModal(from: any) {
  const [show, setShow] = useState(false);

  /** 案件案號 */
  //const userFile = useSelector((state: AppState) => state.userFile.userFile);

  /** 是否正在取得交易調閱資料 */
  const isFetchRelevantCryptoPersonalInfoLoading = useSelector(
    (state: AppState) => state.pages.RelevantCryptoPersonalInfo.isFetchRelevantCryptoPersonalInfoLoading,
  );

  /** 拋查是否成功 */
  const isCreateWallerAddressSearchSuccess = useSelector(
    (state: AppState) => state.pages.RelevantCryptoPersonalInfo.isCreateWallerAddressSearchSuccess,
  );

  /** 關閉modal */
  const handleClose = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };
  /** 開啟modal */
  const handleShow = (e: FormEvent) => {
    e.preventDefault();
    setShow(true);
  };

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<ActionUserModalForm>({
    caseNo: { initialValue: '', validate: () => ({}) },
    actionUserId: { initialValue: '', validate: () => ({}) },
  });

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 執行代拋查 */
  const handleCreateSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const info = from.prop.search_info.toString().replaceAll('\n', '');
      if (formData.caseNo == '') {
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
          caseNo: formData.caseNo,
          caseName: '',
          queryConditionType: '1',
          queryConditionInfo: from.prop.search_info,
          searchType: 2,
          actionUserId: formData.actionUserId,
        }),
      );
    },

    [dispatch, formData, from],
  );

  //#region Effects
  /** 若拋查成功，關閉modal */
  useEffect(() => {
    if (isCreateWallerAddressSearchSuccess) {
      setShow(false);
    }
  }, [isCreateWallerAddressSearchSuccess]);
  //#endregion Effects
  return (
    <>
      <button onClick={handleShow} className="btn btn-primary btn-width-lg" disabled={isFetchRelevantCryptoPersonalInfoLoading}>
        開啟代拋查
      </button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>代拋查</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label htmlFor="AccountID">案號</Label>
            <Input
              type="text"
              id="CaseNo"
              name="CaseNo"
              value={formData.caseNo}
              onChange={(e) => updateFormData({ caseNo: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="Name">人事五碼</Label>
            <Input
              type="text"
              id="ActionUserId"
              name="ActionUserId"
              value={formData.actionUserId}
              onChange={(e) => updateFormData({ actionUserId: e.target.value })}
            />
          </FormGroup>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary btn-width-lg" style={{ marginBottom: '10px' }} onClick={handleClose}>
            取消
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-width-lg"
            style={{ marginBottom: '10px' }}
            onClick={handleCreateSearch}
          >
            代拋查
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
