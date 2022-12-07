import { FetchBlackAccountResponse, FetchBlackAccountsParams } from '@app/apis/admin/black-account';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { BlackAccountModalContentType, ModalContentType, SortedType } from '@shared/enums';
import {
  PaginatedInfo,
  BlackAccount,
  SelectOptionConfig,
  BlackAccountPhoneShowModalData,
  BlackAccountEmailShowModalData,
  BlackAccountIPShowModalData,
} from '@shared/types';
import { ActionType, BlackAccountsPageAction } from '../actions';

/** BlackAccountsPage Redux state */
export interface BlackAccountsPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  blackAccounts: BlackAccount[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchBlackAccountsLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchBlackAccountsParams: FetchBlackAccountsParams;

  /** 是否刪除成功 */
  isDeleteBlackAccountSuccess: boolean | null;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: BlackAccountModalContentType | null;

  /** 當前Modal帳號Id */
  currentModalUserId: string | null;

  /** 是否成功撈取資料 */
  isFetchBlackAccountSuccess: boolean | null;

  /** 當前Modal帳號資料 */
  currentModalBlackAccount: FetchBlackAccountResponse | null;

  /** 是否新增成功 */
  isCreateBlackAccountSuccess: boolean | null;

  /** 是否更新成功 */
  isUpdateBlackAccountSuccess: boolean | null;

  /** 取得 */
  RiskLevelOptions: SelectOptionConfig[];

  /** 取得電話彈窗資料 */
  phoneData: BlackAccountPhoneShowModalData[];

  /** 取得信箱彈窗資料 */
  emailData: BlackAccountEmailShowModalData[];

  /** 取得ip彈窗資料 */
  ipData: BlackAccountIPShowModalData[];
}

/** 預設下拉選單 */
const DEFAULT_OPTIONS = [{ text: '--- 請選擇 ---', value: '99' }];
/** BlackAccountsPage Redux initial state */
const initialState: BlackAccountsPageReduxState = {
  isInitPageSuccess: null,
  blackAccounts: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchBlackAccountsLoading: false,
  currentFetchBlackAccountsParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    idCardNum: '',
    walletAddress: '',
    phone: '',
    email: '',
    iP: '',
    url: '',
    remark: '',
  },
  isDeleteBlackAccountSuccess: null,
  isShowModal: false,
  modalContentType: null,
  currentModalUserId: null,
  isFetchBlackAccountSuccess: null,
  currentModalBlackAccount: null,
  isUpdateBlackAccountSuccess: null,
  isCreateBlackAccountSuccess: null,
  RiskLevelOptions: DEFAULT_OPTIONS,
  phoneData: [],
  emailData: [],
  ipData: [],
};

/** BlackAccountsPage Reducer */
export const blackAccountsPageReducer = (
  state = initialState,
  action: BlackAccountsPageAction,
): BlackAccountsPageReduxState => {
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
      const { RiskLevelOptions } = action.payload;
      return { ...state, isInitPageSuccess: true, RiskLevelOptions: DEFAULT_OPTIONS.concat(RiskLevelOptions) };
    }

    /** 初始頁面 - 失敗 */
    case ActionType.INIT_PAGE_FAILURE: {
      return { ...state, isInitPageSuccess: false };
    }

    /** 取得帳號資料 */
    case ActionType.FETCH_BLACKACCOUNTS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchBlackAccountsParams: params,
        isFetchBlackAccountsLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_BLACKACCOUNTS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        blackAccounts: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchBlackAccountsLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_BLACKACCOUNTS_FAILURE: {
      return {
        ...state,
        blackAccounts: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchBlackAccountsParams.page,
          pageSize: state.currentFetchBlackAccountsParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchBlackAccountsLoading: false,
      };
    }

    /** 取得單一帳號資料 */
    case ActionType.FETCH_BLACKACCOUNT: {
      return { ...state, isFetchBlackAccountSuccess: null };
    }

    /** 取得單一帳號資料 - 成功 */
    case ActionType.FETCH_BLACKACCOUNT_SUCCESS: {
      return {
        ...state,
        currentModalBlackAccount: action.payload.response,
        isFetchBlackAccountSuccess: true,
      };
    }

    /** 取得單一帳號資料 - 失敗 */
    case ActionType.FETCH_BLACKACCOUNT_FAILURE: {
      return {
        ...state,
        currentModalBlackAccount: null,
        isFetchBlackAccountSuccess: false,
      };
    }

    /** 新增帳號資料 */
    case ActionType.CREATE_BLACKACCOUNT: {
      return { ...state, isCreateBlackAccountSuccess: null };
    }

    /** 新增帳號資料 - 成功 */
    case ActionType.CREATE_BLACKACCOUNT_SUCCESS: {
      return { ...state, isCreateBlackAccountSuccess: true };
    }

    /** 新增帳號資料 - 失敗 */
    case ActionType.CREATE_BLACKACCOUNT_FAILURE: {
      return { ...state, isCreateBlackAccountSuccess: false };
    }

    /** 更新帳號資料 */
    case ActionType.UPDATE_BLACKACCOUNT: {
      return { ...state, isUpdateBlackAccountSuccess: null };
    }

    /** 更新帳號資料 - 成功 */
    case ActionType.UPDATE_BLACKACCOUNT_SUCCESS: {
      return { ...state, isUpdateBlackAccountSuccess: true };
    }

    /** 更新帳號資料 - 失敗 */
    case ActionType.UPDATE_BLACKACCOUNT_FAILURE: {
      return { ...state, isUpdateBlackAccountSuccess: false };
    }

    /** 隱藏Modal */
    case ActionType.HIDE_MODAL: {
      return {
        ...state,
        isShowModal: false,
        modalContentType: null,
        currentModalUserId: null,
        isFetchBlackAccountSuccess: null,
        currentModalBlackAccount: null,
        isUpdateBlackAccountSuccess: null,
        isCreateBlackAccountSuccess: null,
      };
    }

    /** 顯示新增Modal */
    case ActionType.SHOW_CREATE_MODAL: {
      return {
        ...state,
        isShowModal: true,
        modalContentType: BlackAccountModalContentType.CREATE,
      };
    }

    /** 顯示更新Modal */
    case ActionType.SHOW_EDIT_MODAL: {
      return {
        ...state,
        isShowModal: true,
        modalContentType: BlackAccountModalContentType.EDIT,
        currentModalUserId: action.payload.walletAddress,
      };
    }

    /** 顯示電話Modal */
    case ActionType.SHOW_PHONE_MODAL: {
      return {
        ...state,
        isShowModal: true,
        modalContentType: BlackAccountModalContentType.PHONE,
        currentModalUserId: action.payload.walletAddress,
      };
    }

    /** 顯示信箱Modal */
    case ActionType.SHOW_EMAIL_MODAL: {
      return {
        ...state,
        isShowModal: true,
        modalContentType: BlackAccountModalContentType.EMAIL,
        currentModalUserId: action.payload.walletAddress,
      };
    }

    /** 顯示ipModal */
    case ActionType.SHOW_IP_MODAL: {
      return {
        ...state,
        isShowModal: true,
        modalContentType: BlackAccountModalContentType.IP,
        currentModalUserId: action.payload.walletAddress,
      };
    }

    /** 顯示電話Modal - 成功 */
    case ActionType.SHOW_PHONE_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        phoneData: response,
      };
    }

    /** 顯示電話Modal - 成功 */
    case ActionType.SHOW_EMAIL_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        emailData: response,
      };
    }

    /** 顯示電話Modal - 成功 */
    case ActionType.SHOW_IP_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        ipData: response,
      };
    }

    default:
      return state;
  }
};
