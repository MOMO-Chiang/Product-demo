import {
  CreateSearchParams,
  CreateSearchResponse,
  CryptoPersonalSearchParams,
  FetchCryptoPersonalSearchHistoryParams,
  FetchDetailNumberShowModalResponse,
  FetchIPShowModalResponse,
  FetchOrderNumberListParams,
  FetchOrderNumberListResponse,
  FetchPhoneShowModalResponse,
  FetchPictureShowModalResponse,
  FetchWallerAddressShowModalResponse,
} from '@app/apis/admin/relevant-crypto-personal-info';
import {
  ActionType,
  FetchOrderNumberListAction,
  FetchOrderNumberListSuccessAction,
  FetchOrderNumberListFailureAction,
  FetchHistoryOrderNumberListAction,
  FetchHistoryOrderNumberListSuccessAction,
  FetchHistoryOrderNumberListFailureAction,
  RelevantCryptoPersonalInfoPageAction,
  fetchCreateWallerAddressSearchAction,
  FetchCreateWallerAddressSearchSuccessAction,
  FetchCreateWallerAddressSearchFailureAction,
  ShowPhoneModalAction,
  ShowWallerAddressModalAction,
  ShowIPModalAction,
  ShowPictureModalAction,
  ShowDetailNumberModalAction,
  ShowPhoneModalSuccessAction,
  ShowWallerAddressModalSuccessAction,
  ShowIPModalSuccessAction,
  ShowPictureModalSuccessAction,
  ShowDetailNumberModalSuccessAction,
  IsCaseMarkAction,
  IsCaseMarkSuccessAction,
  ExportExcelAction,
  ExportOdsAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): RelevantCryptoPersonalInfoPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): RelevantCryptoPersonalInfoPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): RelevantCryptoPersonalInfoPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): RelevantCryptoPersonalInfoPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得調閱主序號資料 */
export const fetchOrderNumberListActionCreator = (params: FetchOrderNumberListParams): FetchOrderNumberListAction => ({
  type: ActionType.FETCH_ORDERNUMBERLIST,
  payload: { params },
});

/** 取得調閱主序號資料 - 成功 */
export const fetchOrderNumberListSuccessActionCreator = (
  response: FetchOrderNumberListResponse,
): FetchOrderNumberListSuccessAction => ({
  type: ActionType.FETCH_ORDERNUMBERLIST_SUCCESS,
  payload: { response },
});

/** 取得調閱主序號資料 - 失敗 */
export const fetchOrderNumberListFailureActionCreator = (): FetchOrderNumberListFailureAction => ({
  type: ActionType.FETCH_ORDERNUMBERLIST_FAILURE,
});

/** 取得歷史調閱主序號資料 */
export const fetchHistoryOrderNumberListActionCreator = (
  params: FetchCryptoPersonalSearchHistoryParams,
): FetchHistoryOrderNumberListAction => ({
  type: ActionType.FETCH_HISTORYORDERNUMBERLIST,
  payload: { params },
});

/** 取得歷史調閱主序號資料 - 成功 */
export const fetchHistoryOrderNumberListSuccessActionCreator = (
  response: FetchOrderNumberListResponse,
): FetchHistoryOrderNumberListSuccessAction => ({
  type: ActionType.FETCH_HISTORYORDERNUMBERLIST_SUCCESS,
  payload: { response },
});

/** 取得歷史調閱主序號資料 - 失敗 */
export const fetchHistoryOrderNumberListFailureActionCreator = (): FetchHistoryOrderNumberListFailureAction => ({
  type: ActionType.FETCH_HISTORYORDERNUMBERLIST_FAILURE,
});

/** 執行拋查 */
export const fetchCreateWallerAddressSearchActionCreator = (
  params: CreateSearchParams,
): fetchCreateWallerAddressSearchAction => ({
  type: ActionType.FETCH_CREATEWALLERADDRESSSEARCH,
  payload: { params },
});

/** 執行拋查 - 成功 */
export const fetchCreateWallerAddressSearchSuccessActionCreator = (
  response: CreateSearchResponse,
): FetchCreateWallerAddressSearchSuccessAction => ({
  type: ActionType.FETCH_CREATEWALLERADDRESSSEARCH_SUCCESS,
  payload: { response },
});

/** 執行拋查 - 失敗 */
export const fetchCreateWallerAddressSearchFailureActionCreator = (): FetchCreateWallerAddressSearchFailureAction => ({
  type: ActionType.FETCH_CREATEWALLERADDRESSSEARCH_FAILURE,
});

/** 顯示電話Modal */
export const showPhoneListActionCreator = (
  PersonalInfoId: string,
  params: CryptoPersonalSearchParams,
): ShowPhoneModalAction => ({
  type: ActionType.SHOW_PHONE_MODAL,
  payload: { PersonalInfoId, params },
});

/** 顯示錢包Modal */
export const showWallerAddressListActionCreator = (
  PersonalInfoId: string,
  params: CryptoPersonalSearchParams,
): ShowWallerAddressModalAction => ({
  type: ActionType.SHOW_WALLERADDRESS_MODAL,
  payload: { PersonalInfoId, params },
});

/** 顯示ipModal */
export const showIPListActionCreator = (PersonalInfoId: string, params: CryptoPersonalSearchParams): ShowIPModalAction => ({
  type: ActionType.SHOW_IP_MODAL,
  payload: { PersonalInfoId, params },
});

/** 顯示DetailNumberModal */
export const showDetailNumberListActionCreator = (Seq: string): ShowDetailNumberModalAction => ({
  type: ActionType.SHOW_DETAILNUMBER_MODAL,
  payload: { Seq },
});

/** 顯示照片Modal */
export const showPictureListActionCreator = (
  PersonalInfoId: string,
  params: CryptoPersonalSearchParams,
): ShowPictureModalAction => ({
  type: ActionType.SHOW_PICTURE_MODAL,
  payload: { PersonalInfoId, params },
});

/** 取得電話資料 - 成功 */
export const showPhoneListSuccessActionCreator = (response: FetchPhoneShowModalResponse): ShowPhoneModalSuccessAction => ({
  type: ActionType.SHOW_PHONE_MODAL_SUCCESS,
  payload: { response },
});

/** 取得錢包資料 - 成功 */
export const showWallerAddressListSuccessActionCreator = (
  response: FetchWallerAddressShowModalResponse,
): ShowWallerAddressModalSuccessAction => ({
  type: ActionType.SHOW_WALLERADDRESS_MODAL_SUCCESS,
  payload: { response },
});

/** 取得ip資料 - 成功 */
export const showIPListSuccessActionCreator = (response: FetchIPShowModalResponse): ShowIPModalSuccessAction => ({
  type: ActionType.SHOW_IP_MODAL_SUCCESS,
  payload: { response },
});

/** 取得照片資料 - 成功 */
export const showPictureListSuccessActionCreator = (
  response: FetchPictureShowModalResponse,
): ShowPictureModalSuccessAction => ({
  type: ActionType.SHOW_PICTURE_MODAL_SUCCESS,
  payload: { response },
});

/** 取得DetailNumber資料 - 成功 */
export const showDetailNumberListSuccessActionCreator = (
  response: FetchDetailNumberShowModalResponse,
): ShowDetailNumberModalSuccessAction => ({
  type: ActionType.SHOW_DETAILNUMBER_MODAL_SUCCESS,
  payload: { response },
});

/** 本案相關帳戶 */
export const isCaseMarkActionCreator = (personalInfoId: string, isCaseMark: boolean): IsCaseMarkAction => ({
  type: ActionType.IS_CASE_MARK,
  payload: { personalInfoId, isCaseMark },
});

/** 本案相關帳戶 */
export const isCaseMarkSuccessActionCreator = (): IsCaseMarkSuccessAction => ({
  type: ActionType.IS_CASE_MARK_SUCCESS,
});

/** 匯出excel */
export const exportExcelActionCreator = (params: FetchOrderNumberListParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchOrderNumberListParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});
