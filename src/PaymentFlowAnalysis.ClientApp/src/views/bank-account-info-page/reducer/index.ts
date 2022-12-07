import { FetchBankAccountInfoParams } from '@app/apis/admin/bank-account-info';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import { PaginatedInfo, bankAccountInfo } from '@shared/types';
import { ActionType, BankAccountInfoPageAction } from '../actions';

/** BankAccountInfosPage Redux state */
export interface BankAccountInfoPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  bankAccountInfoLists: bankAccountInfo[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchBankAccountInfosLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchBankAccountInfoParams: FetchBankAccountInfoParams;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: ModalContentType | null;

  /** 是否成功撈取資料 */
  isFetchBankAccountInfoSuccess: boolean | null;

  /** 更新本案相關帳戶是否成功 */
  isAccountMarkSuccess: boolean | null;
}

/** BankAccountInfosPage Redux initial state */
const initialState: BankAccountInfoPageReduxState = {
  isInitPageSuccess: null,
  bankAccountInfoLists: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchBankAccountInfosLoading: false,
  currentFetchBankAccountInfoParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    accountId: '',
    idCardNumber: '',
    accountName: '',
    mobilePhone: '',
    accountOpeningDateStart: '',
    accountOpeningDateEnd: '',
    isAccountMark: '',
  },
  isShowModal: false,
  modalContentType: null,
  isFetchBankAccountInfoSuccess: null,
  isAccountMarkSuccess: null,
};

/** BankAccountInfosPage Reducer */
export const bankAccountInfoPageReducer = (
  state = initialState,
  action: BankAccountInfoPageAction,
): BankAccountInfoPageReduxState => {
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
    case ActionType.FETCH_BANKACCOUNTINFOS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchBankAccountInfoParams: params,
        isFetchBankAccountInfosLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_BANKACCOUNTINFOS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        bankAccountInfoLists: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchBankAccountInfosLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_BANKACCOUNTINFOS_FAILURE: {
      return {
        ...state,
        bankAccountInfoLists: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchBankAccountInfoParams.page,
          pageSize: state.currentFetchBankAccountInfoParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchBankAccountInfosLoading: false,
      };
    }

    /** 更新本案相關帳號 - 成功 */
    case ActionType.IS_ACCOUNT_MARK_SUCCESS: {
      return {
        ...state,
        isAccountMarkSuccess: true,
      };
    }

    default:
      return state;
  }
};
