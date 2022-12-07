import { AdminHttpRequestError, UserFilesAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { UserFile } from '@shared/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, FetchUserFilesAction, fetchUserFilesFailureActionCreator, fetchUserFilesSuccessActionCreator } from '.';

/** 初始頁面 */
function* fetchUserFiles(action: FetchUserFilesAction) {
  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    const userFiles: UserFile[] = yield call(UserFilesAPI.fetchUserFiles);

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));
    yield put(fetchUserFilesSuccessActionCreator(userFiles));
  } catch (error) {
    const err = error as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '案件撈取失敗',
      text: `[${err.status}]\n${err.message}`,
      showCancelButton: false,
    });

    yield put(fetchUserFilesFailureActionCreator());
  }
}

/** userFile RootSaga */
export function* userFileSaga() {
  yield all([takeEvery(ActionType.FETCH_USERFILES, fetchUserFiles)]);
}
