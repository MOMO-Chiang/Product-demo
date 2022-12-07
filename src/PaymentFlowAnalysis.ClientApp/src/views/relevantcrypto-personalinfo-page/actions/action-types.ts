import {
  FetchOrderNumberListParams,
  FetchOrderNumberListResponse,
  CreateSearchParams,
  CreateSearchResponse,
  CryptoPersonalSearchParams,
  FetchIPShowModalResponse,
  FetchWallerAddressShowModalResponse,
  FetchPhoneShowModalResponse,
  FetchPictureShowModalResponse,
  FetchDetailNumberShowModalResponse,
  FetchCryptoPersonalSearchHistoryParams,
} from '@app/apis/admin/relevant-crypto-personal-info';
import { Action, PayloadAction } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@RelevantCryptoPersonalInfoPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@RelevantCryptoPersonalInfoPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@RelevantCryptoPersonalInfoPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@RelevantCryptoPersonalInfoPage/INIT_PAGE_FAILURE',

  /** 取得調閱單號資料 */
  FETCH_ORDERNUMBERLIST = '@RelevantCryptoPersonalInfoPage/FETCH_ORDERNUMBERLIST',

  /** 取得調閱單號資料 - 成功 */
  FETCH_ORDERNUMBERLIST_SUCCESS = '@RelevantCryptoPersonalInfoPage/FETCH_ORDERNUMBERLIST_SUCCESS',

  /** 取得調閱單號資料 - 失敗 */
  FETCH_ORDERNUMBERLIST_FAILURE = '@RelevantCryptoPersonalInfoPage/FETCH_ORDERNUMBERLIST_FAILURE',

  /** 取得歷史調閱單號資料 */
  FETCH_HISTORYORDERNUMBERLIST = '@RelevantCryptoPersonalInfoPage/FETCH_HISTORYORDERNUMBERLIST',

  /** 取得歷史調閱單號資料 - 成功 */
  FETCH_HISTORYORDERNUMBERLIST_SUCCESS = '@RelevantCryptoPersonalInfoPage/FETCH_HISTORYORDERNUMBERLIST_SUCCESS',

  /** 取得歷史調閱單號資料 - 失敗 */
  FETCH_HISTORYORDERNUMBERLIST_FAILURE = '@RelevantCryptoPersonalInfoPage/FETCH_HISTORYORDERNUMBERLIST_FAILURE',

  /** 執行拋查 */
  FETCH_CREATEWALLERADDRESSSEARCH = '@RelevantCryptoPersonalInfoPage/FETCH_CREATEWALLERADDRESSSEARCH',

  /** 執行拋查 - 成功 */
  FETCH_CREATEWALLERADDRESSSEARCH_SUCCESS = '@RelevantCryptoPersonalInfoPage/FETCH_CREATEWALLERADDRESSSEARCH_SUCCESS',

  /** 執行拋查 - 失敗 */
  FETCH_CREATEWALLERADDRESSSEARCH_FAILURE = '@RelevantCryptoPersonalInfoPage/FETCH_CREATEWALLERADDRESSSEARCH_FAILURE',

  /** 顯示電話 */
  SHOW_PHONE_MODAL = '@RelevantCryptoPersonalInfoPage/SHOW_PHONE_MODAL',

  /** 顯示錢包 */
  SHOW_WALLERADDRESS_MODAL = '@RelevantCryptoPersonalInfoPage/SHOW_WALLERADDRESS_MODAL',

  /** 顯示ip */
  SHOW_IP_MODAL = '@RelevantCryptoPersonalInfoPage/SHOW_IP_MODAL',

  /** 顯示照片 */
  SHOW_PICTURE_MODAL = '@RelevantCryptoPersonalInfoPage/SHOW_PICTURE_MODAL',

  /** 顯示DetailNumber */
  SHOW_DETAILNUMBER_MODAL = '@RelevantCryptoPersonalInfoPage/SHOW_DETAILNUMBER_MODAL',

  /** 顯示電話成功 */
  SHOW_PHONE_MODAL_SUCCESS = '@RelevantCryptoPersonalInfoPage/SHOW_PHONE_MODAL_SUCCESS',

  /** 顯示錢包成功 */
  SHOW_WALLERADDRESS_MODAL_SUCCESS = '@RelevantCryptoPersonalInfoPage/SHOW_WALLERADDRESS_MODAL_SUCCESS',

  /** 顯示ip成功 */
  SHOW_IP_MODAL_SUCCESS = '@RelevantCryptoPersonalInfoPage/SHOW_IP_MODAL_SUCCESS',

  /** 顯示照片成功 */
  SHOW_PICTURE_MODAL_SUCCESS = '@RelevantCryptoPersonalInfoPage/SHOW_PICTURE_MODAL_SUCCESS',

  /** 顯示DetailNumber成功 */
  SHOW_DETAILNUMBER_MODAL_SUCCESS = '@RelevantCryptoPersonalInfoPage/SHOW_DETAILNUMBER_MODAL_SUCCESS',

  /** 本案相關帳戶 */
  IS_CASE_MARK = '@RelevantCryptoPersonalInfoPage/IS_CASE_MARK',

  /** 本案相關帳戶 - 成功 */
  IS_CASE_MARK_SUCCESS = '@RelevantCryptoPersonalInfoPage/IS_CASE_MARK_SUCCESS',

  /** 匯出excel */
  EXPORT_EXCEL = '@RelevantCryptoPersonalInfoPage/EXPORT_EXCEL',

  /** 匯出ods */
  EXPORT_ODS = '@RelevantCryptoPersonalInfoPage/EXPORT_ODS',
}

/** RelevantCryptoPersonalInfoPage Action */
export type RelevantCryptoPersonalInfoPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchOrderNumberListAction
  | FetchOrderNumberListSuccessAction
  | FetchOrderNumberListFailureAction
  | FetchHistoryOrderNumberListAction
  | FetchHistoryOrderNumberListSuccessAction
  | FetchHistoryOrderNumberListFailureAction
  | fetchCreateWallerAddressSearchAction
  | FetchCreateWallerAddressSearchSuccessAction
  | FetchCreateWallerAddressSearchFailureAction
  | ShowPhoneModalAction
  | ShowWallerAddressModalAction
  | ShowIPModalAction
  | ShowPictureModalAction
  | ShowDetailNumberModalAction
  | ShowPhoneModalSuccessAction
  | ShowWallerAddressModalSuccessAction
  | ShowIPModalSuccessAction
  | ShowPictureModalSuccessAction
  | ShowDetailNumberModalSuccessAction
  | IsCaseMarkSuccessAction
  | ExportExcelAction
  | ExportOdsAction;

/**重置 Page State */
export interface ResetPageStateAction {
  type: ActionType.RESET_PAGE_STATE;
}

/** 初始頁面 */
export interface InitPageAction {
  type: ActionType.INIT_PAGE;
}

/** 初始頁面 - 成功 */
export interface InitPageSuccessAction {
  type: ActionType.INIT_PAGE_SUCCESS;
}

/** 初始頁面 - 失敗 */
export interface InitPageFailureAction {
  type: ActionType.INIT_PAGE_FAILURE;
}

/** 取得調閱單號資料 */
export interface FetchOrderNumberListAction {
  type: ActionType.FETCH_ORDERNUMBERLIST;
  payload: { params: FetchOrderNumberListParams };
}

/** 取得調閱單號資料 - 成功 */
export interface FetchOrderNumberListSuccessAction {
  type: ActionType.FETCH_ORDERNUMBERLIST_SUCCESS;
  payload: { response: FetchOrderNumberListResponse };
}

/** 取得調閱單號資料 - 失敗 */
export interface FetchOrderNumberListFailureAction {
  type: ActionType.FETCH_ORDERNUMBERLIST_FAILURE;
}

/** 取得歷史調閱單號資料 */
export interface FetchHistoryOrderNumberListAction {
  type: ActionType.FETCH_HISTORYORDERNUMBERLIST;
  payload: { params: FetchCryptoPersonalSearchHistoryParams };
}

/** 取得歷史調閱單號資料 - 成功 */
export interface FetchHistoryOrderNumberListSuccessAction {
  type: ActionType.FETCH_HISTORYORDERNUMBERLIST_SUCCESS;
  payload: { response: FetchOrderNumberListResponse };
}

/** 取得歷史調閱單號資料 - 失敗 */
export interface FetchHistoryOrderNumberListFailureAction {
  type: ActionType.FETCH_HISTORYORDERNUMBERLIST_FAILURE;
}

/** 執行拋查 */
export interface fetchCreateWallerAddressSearchAction {
  type: ActionType.FETCH_CREATEWALLERADDRESSSEARCH;
  payload: { params: CreateSearchParams };
}

/** 執行拋查 - 成功 */
export interface FetchCreateWallerAddressSearchSuccessAction {
  type: ActionType.FETCH_CREATEWALLERADDRESSSEARCH_SUCCESS;
  payload: { response: CreateSearchResponse };
}

/** 執行拋查 - 失敗 */
export interface FetchCreateWallerAddressSearchFailureAction {
  type: ActionType.FETCH_CREATEWALLERADDRESSSEARCH_FAILURE;
}

/** 顯示電話Modal */
export interface ShowPhoneModalAction {
  type: ActionType.SHOW_PHONE_MODAL;
  payload: { PersonalInfoId: string; params: CryptoPersonalSearchParams };
}

/** 顯示錢包Modal */
export interface ShowWallerAddressModalAction {
  type: ActionType.SHOW_WALLERADDRESS_MODAL;
  payload: { PersonalInfoId: string; params: CryptoPersonalSearchParams };
}

/** 顯示ipModal */
export interface ShowIPModalAction {
  type: ActionType.SHOW_IP_MODAL;
  payload: { PersonalInfoId: string; params: CryptoPersonalSearchParams };
}

/** 顯示照片Modal */
export interface ShowPictureModalAction {
  type: ActionType.SHOW_PICTURE_MODAL;
  payload: { PersonalInfoId: string; params: CryptoPersonalSearchParams };
}

/** 顯示DetailNumberModal */
export interface ShowDetailNumberModalAction {
  type: ActionType.SHOW_DETAILNUMBER_MODAL;
  payload: { Seq: string };
}

/** 顯示電話Modal成功 */
export interface ShowPhoneModalSuccessAction {
  type: ActionType.SHOW_PHONE_MODAL_SUCCESS;
  payload: { response: FetchPhoneShowModalResponse };
}

/** 顯示錢包Modal成功 */
export interface ShowWallerAddressModalSuccessAction {
  type: ActionType.SHOW_WALLERADDRESS_MODAL_SUCCESS;
  payload: { response: FetchWallerAddressShowModalResponse };
}

/** 顯示ipModal成功 */
export interface ShowIPModalSuccessAction {
  type: ActionType.SHOW_IP_MODAL_SUCCESS;
  payload: { response: FetchIPShowModalResponse };
}

/** 顯示照片Modal成功 */
export interface ShowPictureModalSuccessAction {
  type: ActionType.SHOW_PICTURE_MODAL_SUCCESS;
  payload: { response: FetchPictureShowModalResponse };
}

/** 顯示DetailNumberModal成功 */
export interface ShowDetailNumberModalSuccessAction {
  type: ActionType.SHOW_DETAILNUMBER_MODAL_SUCCESS;
  payload: { response: FetchDetailNumberShowModalResponse };
}

/** 本案相關帳戶 */
export interface IsCaseMarkAction {
  type: ActionType.IS_CASE_MARK;
  payload: { personalInfoId: string; isCaseMark: boolean };
}

/** 本案相關帳戶 - 成功 */
export interface IsCaseMarkSuccessAction {
  type: ActionType.IS_CASE_MARK_SUCCESS;
}

/** 匯出excel */
export interface ExportExcelAction {
  type: ActionType.EXPORT_EXCEL;
  payload: { params: FetchOrderNumberListParams };
}

/** 匯出ods */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchOrderNumberListParams };
}
