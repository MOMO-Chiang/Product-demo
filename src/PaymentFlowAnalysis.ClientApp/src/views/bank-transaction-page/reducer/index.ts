import { FetchBankTransactionParams } from '@app/apis/admin/bank-transaction';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import { PaginatedInfo, bankTransaction, bankTransactionDetail } from '@shared/types';
import { ActionType, BankTransactionPageAction } from '../actions';

/** BankTransactionsPage Redux state */
export interface BankTransactionPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  bankTransactionLists: bankTransaction[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchBankTransactionsLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchBankTransactionParams: FetchBankTransactionParams;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: ModalContentType | null;

  /** 是否成功撈取資料 */
  isFetchBankTransactionSuccess: boolean | null;
}

/** BankTransactionsPage Redux initial state */
const initialState: BankTransactionPageReduxState = {
  isInitPageSuccess: null,
  bankTransactionLists: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchBankTransactionsLoading: false,
  currentFetchBankTransactionParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    idCardNumber: '',
    transactionAccountId: '',
    transactionBank: '',
    transactionSummary: '',
    transactionTimeStart: '',
    transactionTimeEnd: '',
  },
  isShowModal: false,
  modalContentType: null,
  isFetchBankTransactionSuccess: null,
};

/** BankTransactionsPage Reducer */
export const bankTransactionPageReducer = (
  state = initialState,
  action: BankTransactionPageAction,
): BankTransactionPageReduxState => {
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
    case ActionType.FETCH_BANKTRANSACTIONS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchBankTransactionParams: params,
        isFetchBankTransactionsLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_BANKTRANSACTIONS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        bankTransactionLists: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchBankTransactionsLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_BANKTRANSACTIONS_FAILURE: {
      return {
        ...state,
        bankTransactionLists: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchBankTransactionParams.page,
          pageSize: state.currentFetchBankTransactionParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchBankTransactionsLoading: false,
      };
    }

    default:
      return state;
  }
};
