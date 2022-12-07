import { FetchSysUserListResponse, FetchSysUserListsParams } from '@app/apis/admin/sys-userlists';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import { PaginatedInfo, SysUserList } from '@shared/types';
import { ActionType, SysUserListsPageAction } from '../actions';

/** SysUserListsPage Redux state */
export interface SysUserListsPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 帳號資料 */
  sysUserLists: SysUserList[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchSysUserListsLoading: boolean;

  /** 當前取得帳號資料的搜尋條件資料 */
  currentFetchSysUserListsParams: FetchSysUserListsParams;

  /** 是否刪除成功 */
  isDeleteSysUserListSuccess: boolean | null;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  modalContentType: ModalContentType | null;

  /** 當前Modal帳號Id */
  currentModalUserId: string | null;

  /** 是否成功撈取資料 */
  isFetchSysUserListSuccess: boolean | null;

  /** 當前Modal帳號資料 */
  currentModalSysUserList: FetchSysUserListResponse | null;

  /** 是否新增成功 */
  isCreateSysUserListSuccess: boolean | null;

  /** 是否更新成功 */
  isUpdateSysUserListSuccess: boolean | null;
}

/** SysUserListsPage Redux initial state */
const initialState: SysUserListsPageReduxState = {
  isInitPageSuccess: null,
  sysUserLists: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchSysUserListsLoading: false,
  currentFetchSysUserListsParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    userId: '',
    orderUserName: '',
    unitCode: '',
    unitName: '',
    orderUserEmail: '',
    orderUserPhone: '',
  },
  isDeleteSysUserListSuccess: null,
  isShowModal: false,
  modalContentType: null,
  currentModalUserId: null,
  isFetchSysUserListSuccess: null,
  currentModalSysUserList: null,
  isUpdateSysUserListSuccess: null,
  isCreateSysUserListSuccess: null,
};

/** SysUserListsPage Reducer */
export const sysUserListsPageReducer = (state = initialState, action: SysUserListsPageAction): SysUserListsPageReduxState => {
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
    case ActionType.FETCH_SYSUSERLISTS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchSysUserListsParams: params,
        isFetchSysUserListsLoading: true,
      };
    }

    /** 取得帳號資料 - 成功 */
    case ActionType.FETCH_SYSUSERLISTS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        sysUserLists: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchSysUserListsLoading: false,
      };
    }

    /** 取得帳號資料 - 失敗 */
    case ActionType.FETCH_SYSUSERLISTS_FAILURE: {
      return {
        ...state,
        sysUserLists: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchSysUserListsParams.page,
          pageSize: state.currentFetchSysUserListsParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchSysUserListsLoading: false,
      };
    }

    /** 取得單一帳號資料 */
    case ActionType.FETCH_SYSUSERLIST: {
      return { ...state, isFetchSysUserListSuccess: null };
    }

    /** 取得單一帳號資料 - 成功 */
    case ActionType.FETCH_SYSUSERLIST_SUCCESS: {
      return {
        ...state,
        currentModalSysUserList: action.payload.response,
        isFetchSysUserListSuccess: true,
      };
    }

    /** 取得單一帳號資料 - 失敗 */
    case ActionType.FETCH_SYSUSERLIST_FAILURE: {
      return {
        ...state,
        currentModalSysUserList: null,
        isFetchSysUserListSuccess: false,
      };
    }

    /** 新增帳號資料 */
    case ActionType.CREATE_SYSUSERLIST: {
      return { ...state, isCreateSysUserListSuccess: null };
    }

    /** 新增帳號資料 - 成功 */
    case ActionType.CREATE_SYSUSERLIST_SUCCESS: {
      return { ...state, isCreateSysUserListSuccess: true };
    }

    /** 新增帳號資料 - 失敗 */
    case ActionType.CREATE_SYSUSERLIST_FAILURE: {
      return { ...state, isCreateSysUserListSuccess: false };
    }

    /** 更新帳號資料 */
    case ActionType.UPDATE_SYSUSERLIST: {
      return { ...state, isUpdateSysUserListSuccess: null };
    }

    /** 更新帳號資料 - 成功 */
    case ActionType.UPDATE_SYSUSERLIST_SUCCESS: {
      return { ...state, isUpdateSysUserListSuccess: true };
    }

    /** 更新帳號資料 - 失敗 */
    case ActionType.UPDATE_SYSUSERLIST_FAILURE: {
      return { ...state, isUpdateSysUserListSuccess: false };
    }

    /** 刪除帳號資料 */
    case ActionType.DELETE_SYSUSERLIST: {
      return { ...state, isDeleteSysUserListSuccess: null };
    }

    /** 刪除帳號資料 - 成功 */
    case ActionType.DELETE_SYSUSERLIST_SUCCESS: {
      return { ...state, isDeleteSysUserListSuccess: true };
    }

    /** 刪除帳號資料 - 失敗 */
    case ActionType.DELETE_SYSUSERLIST_FAILURE: {
      return { ...state, isDeleteSysUserListSuccess: false };
    }

    /** 隱藏Modal */
    case ActionType.HIDE_MODAL: {
      return {
        ...state,
        isShowModal: false,
        modalContentType: null,
        currentModalUserId: null,
        isFetchSysUserListSuccess: null,
        currentModalSysUserList: null,
        isUpdateSysUserListSuccess: null,
        isCreateSysUserListSuccess: null,
      };
    }

    /** 顯示新增Modal */
    case ActionType.SHOW_CREATE_MODAL: {
      return {
        ...state,
        isShowModal: true,
        modalContentType: ModalContentType.CREATE,
      };
    }

    /** 顯示更新Modal */
    case ActionType.SHOW_EDIT_MODAL: {
      return {
        ...state,
        isShowModal: true,
        modalContentType: ModalContentType.EDIT,
        currentModalUserId: action.payload.userId,
      };
    }

    default:
      return state;
  }
};
