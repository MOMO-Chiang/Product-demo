import { all, takeEvery } from 'redux-saga/effects';
import { ActionType, InitPageAction } from '../actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/** TemplatePage RootSaga */
export function* templatePageRootSaga() {
  yield all([takeEvery(ActionType.INIT_PAGE, initPage)]);
}
