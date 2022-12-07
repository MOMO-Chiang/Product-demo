import { FetchCryptoQueryParams } from '@app/apis/admin/crypto-query';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import { PaginatedInfo, cryptoQuery, SelectOptionConfig } from '@shared/types';
import { ActionType, CryptoQueryPageAction } from '../actions';

/** CryptoQuerysPage Redux state */
export interface CryptoQueryPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  cryptoQueryLists: cryptoQuery[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchCryptoQuerysLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchCryptoQueryParams: FetchCryptoQueryParams;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: ModalContentType | null;

  /** 是否成功撈取資料 */
  isFetchCryptoQuerySuccess: boolean | null;

  /** 取得目標機構下拉選單 */
  ExchangeTypeCodeOptions: SelectOptionConfig[];

  /** 取得拋查條件下拉選單 */
  QueryConditionCodeOptions: SelectOptionConfig[];
}

/** 預設下拉選單 */
const DEFAULT_OPTIONS = [{ text: '--- 請選擇 ---', value: '' }];
/** CryptoQuerysPage Redux initial state */
const initialState: CryptoQueryPageReduxState = {
  isInitPageSuccess: null,
  cryptoQueryLists: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchCryptoQuerysLoading: false,
  currentFetchCryptoQueryParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    queryUserId: '',
    requestAgency: '',
    queryConditionType: '',
    queryValue: '',
    orderDetailNumber: '',
    queryOrderTimeStart: '',
    queryOrderTimeEnd: '',
  },
  isShowModal: false,
  modalContentType: null,
  isFetchCryptoQuerySuccess: null,
  ExchangeTypeCodeOptions: DEFAULT_OPTIONS,
  QueryConditionCodeOptions: DEFAULT_OPTIONS,
};

/** CryptoQuerysPage Reducer */
export const cryptoQueryPageReducer = (state = initialState, action: CryptoQueryPageAction): CryptoQueryPageReduxState => {
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
      const { ExchangeTypeCodeOptions, QueryConditionCodeOptions } = action.payload;
      return {
        ...state,
        isInitPageSuccess: true,
        ExchangeTypeCodeOptions: DEFAULT_OPTIONS.concat(ExchangeTypeCodeOptions),
        QueryConditionCodeOptions: DEFAULT_OPTIONS.concat(QueryConditionCodeOptions),
      };
    }

    /** 初始頁面 - 失敗 */
    case ActionType.INIT_PAGE_FAILURE: {
      return { ...state, isInitPageSuccess: false };
    }

    /** 取得帳號資料 */
    case ActionType.FETCH_CRYPTOQUERYS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchCryptoQueryParams: params,
        isFetchCryptoQuerysLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_CRYPTOQUERYS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        cryptoQueryLists: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchCryptoQuerysLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_CRYPTOQUERYS_FAILURE: {
      return {
        ...state,
        cryptoQueryLists: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchCryptoQueryParams.page,
          pageSize: state.currentFetchCryptoQueryParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchCryptoQuerysLoading: false,
      };
    }

    default:
      return state;
  }
};
