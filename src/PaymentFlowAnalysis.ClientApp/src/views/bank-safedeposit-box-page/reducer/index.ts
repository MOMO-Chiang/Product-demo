import { FetchBankSafeDepositBoxParams } from '@app/apis/admin/bank-safedeposit-box';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import { PaginatedInfo, bankSafeDepositBox } from '@shared/types';
import { ActionType, BankSafeDepositBoxPageAction } from '../actions';

/** BankSafeDepositBoxsPage Redux state */
export interface BankSafeDepositBoxPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  bankSafeDepositBoxLists: bankSafeDepositBox[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchBankSafeDepositBoxsLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchBankSafeDepositBoxParams: FetchBankSafeDepositBoxParams;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: ModalContentType | null;

  /** 是否成功撈取資料 */
  isFetchBankSafeDepositBoxSuccess: boolean | null;
}

/** BankSafeDepositBoxsPage Redux initial state */
const initialState: BankSafeDepositBoxPageReduxState = {
  isInitPageSuccess: null,
  bankSafeDepositBoxLists: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchBankSafeDepositBoxsLoading: false,
  currentFetchBankSafeDepositBoxParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    idCardNumber: '',
    renter: '',
    mobilePhone: '',
    boxNumber: '',
    rentDateStart: '',
    rentDateEnd: '',
    leaseCancellationDateStart: '',
    leaseCancellationDateEnd: '',
    keyWord: '',
    isAccountMark: '',
  },
  isShowModal: false,
  modalContentType: null,
  isFetchBankSafeDepositBoxSuccess: null,
};

/** BankSafeDepositBoxsPage Reducer */
export const bankSafeDepositBoxPageReducer = (
  state = initialState,
  action: BankSafeDepositBoxPageAction,
): BankSafeDepositBoxPageReduxState => {
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
    case ActionType.FETCH_BANKSAFEDEPOSITBOXS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchBankSafeDepositBoxParams: params,
        isFetchBankSafeDepositBoxsLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_BANKSAFEDEPOSITBOXS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        bankSafeDepositBoxLists: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchBankSafeDepositBoxsLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_BANKSAFEDEPOSITBOXS_FAILURE: {
      return {
        ...state,
        bankSafeDepositBoxLists: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchBankSafeDepositBoxParams.page,
          pageSize: state.currentFetchBankSafeDepositBoxParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchBankSafeDepositBoxsLoading: false,
      };
    }

    default:
      return state;
  }
};
