import { FetchCryptoWallertInfoReceiveParams } from '@app/apis/admin/crypto-wallertinfo-receive';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import { PaginatedInfo, cryptoWallertInfoReceive, SelectOptionConfig } from '@shared/types';
import { ActionType, CryptoWallertInfoReceivePageAction } from '../actions';

/** CryptoWallertInfoReceivesPage Redux state */
export interface CryptoWallertInfoReceivePageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  cryptoWallertInfoReceiveLists: cryptoWallertInfoReceive[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchCryptoWallertInfoReceivesLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchCryptoWallertInfoReceiveParams: FetchCryptoWallertInfoReceiveParams;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: ModalContentType | null;

  /** 是否成功撈取資料 */
  isFetchCryptoWallertInfoReceiveSuccess: boolean | null;

  /** 取得 */
  ExchangeTypeCodeOptions: SelectOptionConfig[];
}

/** 預設下拉選單 */
const DEFAULT_OPTIONS = [{ text: '--- 請選擇 ---', value: '' }];
/** CryptoWallertInfoReceivesPage Redux initial state */
const initialState: CryptoWallertInfoReceivePageReduxState = {
  isInitPageSuccess: null,
  cryptoWallertInfoReceiveLists: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchCryptoWallertInfoReceivesLoading: false,
  currentFetchCryptoWallertInfoReceiveParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: 'createTime',
    sortedType: SortedType.DESC,
    accountId: '',
    idCardNumber: '',
    accountName: '',
    mobilePhone: '',
    accountOpeningDateStart: '',
    accountOpeningDateEnd: '',
  },
  isShowModal: false,
  modalContentType: null,
  isFetchCryptoWallertInfoReceiveSuccess: null,
  ExchangeTypeCodeOptions: DEFAULT_OPTIONS,
};

/** CryptoWallertInfoReceivesPage Reducer */
export const cryptoWallertInfoReceivePageReducer = (
  state = initialState,
  action: CryptoWallertInfoReceivePageAction,
): CryptoWallertInfoReceivePageReduxState => {
  switch (action.type) {
    /**重置 Page State */
    case ActionType.RESET_PAGE_STATE: {
      return initialState;
    }

    /** 初始頁面 */
    case ActionType.INIT_PAGE: {
      return { ...state, isInitPageSuccess: null };
    }

    /** 初始頁面 - 成功 */
    case ActionType.INIT_PAGE_SUCCESS: {
      const { ExchangeTypeCodeOptions } = action.payload;
      return { ...state, isInitPageSuccess: true, ExchangeTypeCodeOptions: DEFAULT_OPTIONS.concat(ExchangeTypeCodeOptions) };
    }

    /** 初始頁面 - 失敗 */
    case ActionType.INIT_PAGE_FAILURE: {
      return { ...state, isInitPageSuccess: false };
    }

    /** 取得帳號資料 */
    case ActionType.FETCH_CRYPTOWALLERTINFORECEIVES: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchCryptoWallertInfoReceiveParams: params,
        isFetchCryptoWallertInfoReceivesLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_CRYPTOWALLERTINFORECEIVES_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        cryptoWallertInfoReceiveLists: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchCryptoWallertInfoReceivesLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_CRYPTOWALLERTINFORECEIVES_FAILURE: {
      return {
        ...state,
        cryptoWallertInfoReceiveLists: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchCryptoWallertInfoReceiveParams.page,
          pageSize: state.currentFetchCryptoWallertInfoReceiveParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchCryptoWallertInfoReceivesLoading: false,
      };
    }

    default:
      return state;
  }
};
