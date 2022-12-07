import { FetchBigTradeParams } from '@app/apis/admin/big-trade';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import { PaginatedInfo, bigTrade } from '@shared/types';
import { ActionType, BigTradePageAction } from '../actions';

/** BigTradesPage Redux state */
export interface BigTradePageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  bigTradeLists: bigTrade[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchBigTradesLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchBigTradeParams: FetchBigTradeParams;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: ModalContentType | null;

  /** 是否成功撈取資料 */
  isFetchBigTradeSuccess: boolean | null;
}

/** BigTradesPage Redux initial state */
const initialState: BigTradePageReduxState = {
  isInitPageSuccess: null,
  bigTradeLists: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchBigTradesLoading: false,
  currentFetchBigTradeParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    remitterId: '',
    remitterName: '',
    remitterPhone: '',
    customerAddress: '',
    beneficiaryId: '',
    beneficiary: '',
    remitTimeStart: '',
    remitTimeEnd: '',
  },
  isShowModal: false,
  modalContentType: null,
  isFetchBigTradeSuccess: null,
};

/** BigTradesPage Reducer */
export const bigTradePageReducer = (state = initialState, action: BigTradePageAction): BigTradePageReduxState => {
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
      return { ...state, isInitPageSuccess: true };
    }

    /** 初始頁面 - 失敗 */
    case ActionType.INIT_PAGE_FAILURE: {
      return { ...state, isInitPageSuccess: false };
    }

    /** 取得帳號資料 */
    case ActionType.FETCH_BIGTRADES: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchBigTradeParams: params,
        isFetchBigTradesLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_BIGTRADES_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        bigTradeLists: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchBigTradesLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_BIGTRADES_FAILURE: {
      return {
        ...state,
        bigTradeLists: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchBigTradeParams.page,
          pageSize: state.currentFetchBigTradeParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchBigTradesLoading: false,
      };
    }

    default:
      return state;
  }
};
