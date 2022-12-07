import { FetchNotificationInfosParams } from '@app/apis/admin/notificationInfo';
import { FetchSysUserListResponse } from '@app/apis/admin/sys-userlists';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { NavbarModalContentType, SortedType } from '@shared/enums';
import { NotificationInfo, PaginatedInfo } from '@shared/types';
import { ActionType, NavbarMenuPageAction } from './actions';

/** NavbarMenu Redux state */
export interface NavbarMenuReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 是否顯示Modal */
  isShowModal: boolean;

  /** modal內容型態 */
  navbarModalContentType: NavbarModalContentType | null;

  /** 當前Modal帳號Id */
  currentModalUserId: string | null;

  /** 是否成功撈取資料 */
  isFetchSysUserListSuccess: boolean | null;

  /** 當前Modal帳號資料 */
  currentModalSysUserList: FetchSysUserListResponse | null;

  /** 是否更新成功 */
  isUpdateSysUserListSuccess: boolean | null;

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 當前取得通知資料的搜尋條件資料 */
  currentFetchNotificationInfosParams: FetchNotificationInfosParams;

  /** 通知內容 */
  notifications: NotificationInfo[];

  /** 是否正在撈取通知資料 */
  isFetchNotificationInfosLoading: boolean | false;

  /** 未讀通知數量 */
  unreadNotificationCount: number | null;
}

/** navbarMenu Redux initial state */
const initialState: NavbarMenuReduxState = {
  isInitPageSuccess: null,
  isShowModal: false,
  navbarModalContentType: null,
  currentModalUserId: null,
  isFetchSysUserListSuccess: null,
  currentModalSysUserList: null,
  isUpdateSysUserListSuccess: null,
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: 5,
  },
  currentFetchNotificationInfosParams: {
    page: DEFAULT_PAGE,
    pageSize: 5,
    sortedColumn: 'createTime',
    sortedType: SortedType.DESC,
  },
  notifications: [],
  isFetchNotificationInfosLoading: false,
  unreadNotificationCount: null,
};

/** navbarMenu Reducer */
export const navbarMenuReducer = (state = initialState, action: NavbarMenuPageAction): NavbarMenuReduxState => {
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
        currentModalUserId: action.payload.response.userId,
      };
    }

    /** 取得單一帳號資料 - 失敗 */
    case ActionType.FETCH_SYSUSERLIST_FAILURE: {
      return {
        ...state,
        currentModalSysUserList: null,
        isFetchSysUserListSuccess: false,
        currentModalUserId: null,
      };
    }

    /** 取得未讀通知數量 */
    case ActionType.FETCH_NOTIFICATION_UNREAD_COUNT: {
      return {
        ...state,
        unreadNotificationCount: null,
      };
    }

    /** 取得未讀通知數量 - 成功 */
    case ActionType.FETCH_NOTIFICATION_UNREAD_COUNT_SUCCESS: {
      return {
        ...state,
        unreadNotificationCount: action.payload.response,
      };
    }

    /** 取得未讀通知數量 - 失敗 */
    case ActionType.FETCH_NOTIFICATION_UNREAD_COUNT_FAILURE: {
      return {
        ...state,
        unreadNotificationCount: null,
      };
    }

    /** 取得通知內容 */
    case ActionType.FETCH_NOTIFICATIONS: {
      const { params } = action.payload;
      return {
        ...state,
        notifications: [],
        isFetchNotificationInfosLoading: true,
        currentFetchNotificationInfosParams: params,
      };
    }

    /** 取得通知內容 - 成功 */
    case ActionType.FETCH_NOTIFICATIONS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        notifications: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchNotificationInfosLoading: false,
      };
    }

    /** 取得通知內容 - 失敗 */
    case ActionType.FETCH_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        notifications: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchNotificationInfosParams.page,
          pageSize: state.currentFetchNotificationInfosParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchNotificationInfosLoading: false,
      };
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

    /** 隱藏Modal */
    case ActionType.HIDE_MODAL: {
      return {
        ...state,
        isShowModal: false,
        navbarModalContentType: null,
        currentModalUserId: null,
        isFetchSysUserListSuccess: null,
        currentModalSysUserList: null,
        isUpdateSysUserListSuccess: null,
      };
    }

    /** 顯示更新Modal */
    case ActionType.SHOW_SYSUSERLIST_MODAL: {
      return {
        ...state,
        isShowModal: true,
        navbarModalContentType: NavbarModalContentType.SYSUSERLIST,
      };
    }

    /** 顯示通知Modal */
    case ActionType.SHOW_NOTIFICATION_MODAL: {
      return {
        ...state,
        isShowModal: true,
        navbarModalContentType: NavbarModalContentType.NOTIFICATION,
      };
    }

    default:
      return state;
  }
};
