import {
  FetchOrderNumberListParams,
  FetchOrderNumberListResponse,
  CreateSearchParams,
  CreateSearchResponse,
  CryptoPersonalSearchParams,
  FetchCryptoPersonalSearchHistoryParams,
} from '@app/apis/admin/relevant-crypto-personal-info';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import {
  PaginatedInfo,
  CryptoPersonalInfo,
  SelectOptionConfig,
  CryptoQueryMaster,
  PersonalPhoneShowModalData,
  PersonalWallerAddressShowModalData,
  PersonalIPShowModalData,
  PersonalPictureShowModalData,
  PersonalDetailNumberShowModalData,
} from '@shared/types';
import { tr } from 'date-fns/locale';
import { ActionType, RelevantCryptoPersonalInfoPageAction } from '../actions';

/** RelevantCryptoPersonalInfoPage Redux state */
export interface RelevantCryptoPersonalInfoReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 相關帳戶調閱資料 */
  RelevantCryptoPersonalInfo: CryptoQueryMaster[];

  /** 相關帳戶調閱資料 */
  HistoryRelevantCryptoPersonalInfo: CryptoQueryMaster[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 電話分頁資料 */
  paginatedPhoneInfo: PaginatedInfo;

  /** IP分頁資料 */
  paginatedIPInfo: PaginatedInfo;

  /** 錢包分頁資料 */
  paginatedWallerAddressInfo: PaginatedInfo;

  /** 照片分頁資料 */
  paginatedPictureInfo: PaginatedInfo;

  /** 是否正在取得帳號資料 */
  isFetchRelevantCryptoPersonalInfoLoading: boolean;

  /** 當前取得調閱單號資料的搜尋條件資料 */
  currentFetchOrderNumberListParams: FetchOrderNumberListParams;

  /** 當前取得拋查歷史紀錄資料的搜尋條件資料 */
  currentFetchCryptoPersonalSearchHistoryParams: FetchCryptoPersonalSearchHistoryParams;

  /** 當前取得IP列表的搜尋條件資料 */
  CryptoPersonalSearchIPParams: CryptoPersonalSearchParams;

  /** 當前取得錢包列表的搜尋條件資料 */
  CryptoPersonalSearchWallerAddressParams: CryptoPersonalSearchParams;

  /** 當前取得電話列表的搜尋條件資料 */
  CryptoPersonalSearchPhoneParams: CryptoPersonalSearchParams;

  /** 當前取得照片列表的搜尋條件資料 */
  CryptoPersonalSearchPictureParams: CryptoPersonalSearchParams;

  /** 是否成功撈取資料 */
  isFetchRelevantCryptoPersonalInfoSuccess: boolean | null;

  /** 是否成功取得歷史資料 */
  isFetchFetchRelevantCryptoPersonalInfoHistorySuccess: boolean | null;

  /** 是否成功拋查 */
  isCreateWallerAddressSearchSuccess: boolean | null;

  /** 當前Modal帳號資料 */
  currentModalRelevantCryptoPersonalInfo: FetchOrderNumberListResponse | null;

  /** 拋查成功訊息 */
  CreateSearchMsg: string;

  /** 取得電話彈窗資料 */
  phoneData: PersonalPhoneShowModalData[];

  /** 取得錢包彈窗資料 */
  wallerAddressData: PersonalWallerAddressShowModalData[];

  /** 取得IP彈窗資料 */
  IPData: PersonalIPShowModalData[];

  /** 取得照片彈窗資料 */
  PictureData: PersonalPictureShowModalData[];

  /** 取得調閱單號彈窗資料 */
  DetailNumberData: PersonalDetailNumberShowModalData;

  /** 更新本案相關帳戶是否成功 */
  isCaseMarkSuccess: boolean | null;
}

/** RelevantCryptoPersonalInfoPage Redux initial state */
const initialState: RelevantCryptoPersonalInfoReduxState = {
  isInitPageSuccess: null,
  RelevantCryptoPersonalInfo: [],
  HistoryRelevantCryptoPersonalInfo: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  paginatedPhoneInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  paginatedIPInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  paginatedWallerAddressInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  paginatedPictureInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchRelevantCryptoPersonalInfoLoading: false,
  currentFetchOrderNumberListParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: 'queryOrderTime',
    sortedType: SortedType.DESC,
    idCardNum: '',
    accountID: '',
    name: '',
    phone: '',
    email: '',
    bankAccount: '',
    wallerAddress: '',
    caseNo: '',
    searchType: 2,
    queryUserId: '',
    orderMasterNumber: '',
  },
  currentFetchCryptoPersonalSearchHistoryParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: 'queryOrderTime',
    sortedType: SortedType.DESC,
    CaseNo: '',
    searchType: 2,
    queryUserId: '',
  },
  CryptoPersonalSearchIPParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
  },
  CryptoPersonalSearchPhoneParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
  },
  CryptoPersonalSearchWallerAddressParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
  },
  CryptoPersonalSearchPictureParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
  },
  isFetchRelevantCryptoPersonalInfoSuccess: null,
  isFetchFetchRelevantCryptoPersonalInfoHistorySuccess: null,
  isCreateWallerAddressSearchSuccess: null,
  currentModalRelevantCryptoPersonalInfo: null,
  CreateSearchMsg: '',
  phoneData: [],
  wallerAddressData: [],
  IPData: [],
  PictureData: [],
  DetailNumberData: {
    orderDetailNumber: '',
    queryName: '',
    queryPhone: '',
    queryEmail: '',
    queryRank: '',
    queryUnit: '',
    projectCategory: '',
  },
  isCaseMarkSuccess: null,
};

/** RelevantCryptoPersonalInfoPage Reducer */
export const RelevantCryptoPersonalInfoPageReducer = (
  state = initialState,
  action: RelevantCryptoPersonalInfoPageAction,
): RelevantCryptoPersonalInfoReduxState => {
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

    /** 取得調閱單號資料 */
    case ActionType.FETCH_ORDERNUMBERLIST: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchOrderNumberListParams: params,
        isFetchRelevantCryptoPersonalInfoLoading: true,
      };
    }

    /** 取得調閱單號資料 - 成功 */
    case ActionType.FETCH_ORDERNUMBERLIST_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        RelevantCryptoPersonalInfo: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchRelevantCryptoPersonalInfoLoading: false,
      };
    }

    /** 取得調閱單號資料 - 失敗 */
    case ActionType.FETCH_ORDERNUMBERLIST_FAILURE: {
      return {
        ...state,
        RelevantCryptoPersonalInfo: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchOrderNumberListParams.page,
          pageSize: state.currentFetchOrderNumberListParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchRelevantCryptoPersonalInfoLoading: false,
      };
    }

    /** 取得歷史調閱單號資料 */
    case ActionType.FETCH_HISTORYORDERNUMBERLIST: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchCryptoPersonalSearchHistoryParams: params,
        isFetchRelevantCryptoPersonalInfoLoading: true,
        isFetchFetchRelevantCryptoPersonalInfoHistorySuccess: null,
      };
    }

    /** 取得歷史調閱單號資料 - 成功 */
    case ActionType.FETCH_HISTORYORDERNUMBERLIST_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        HistoryRelevantCryptoPersonalInfo: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchRelevantCryptoPersonalInfoLoading: false,
        isFetchFetchRelevantCryptoPersonalInfoHistorySuccess: true,
      };
    }

    /** 取得歷史調閱單號資料 - 失敗 */
    case ActionType.FETCH_HISTORYORDERNUMBERLIST_FAILURE: {
      return {
        ...state,
        HistoryRelevantCryptoPersonalInfo: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchOrderNumberListParams.page,
          pageSize: state.currentFetchOrderNumberListParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchRelevantCryptoPersonalInfoLoading: false,
        isFetchFetchRelevantCryptoPersonalInfoHistorySuccess: false,
      };
    }

    /** 執行拋查資料 */
    case ActionType.FETCH_CREATEWALLERADDRESSSEARCH: {
      return { ...state, isCreateWallerAddressSearchSuccess: null, isFetchRelevantCryptoPersonalInfoSuccess: true };
    }

    /** 執行拋查資料 - 成功 */
    case ActionType.FETCH_CREATEWALLERADDRESSSEARCH_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        CreateSearchMsg: response,
        isCreateWallerAddressSearchSuccess: true,
        isFetchRelevantCryptoPersonalInfoSuccess: false,
      };
    }

    /** 執行拋查資料 - 失敗 */
    case ActionType.FETCH_CREATEWALLERADDRESSSEARCH_FAILURE: {
      return {
        ...state,
        //CryptoQueryMaster: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchOrderNumberListParams.page,
          pageSize: state.currentFetchOrderNumberListParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isCreateWallerAddressSearchSuccess: false,
        isFetchRelevantCryptoPersonalInfoSuccess: false,
      };
    }

    /** 顯示電話Modal */
    case ActionType.SHOW_PHONE_MODAL: {
      return {
        ...state,
      };
    }

    /** 顯示信箱Modal */
    case ActionType.SHOW_WALLERADDRESS_MODAL: {
      return {
        ...state,
      };
    }

    /** 顯示ipModal */
    case ActionType.SHOW_IP_MODAL: {
      return {
        ...state,
      };
    }

    /** 顯示照片Modal */
    case ActionType.SHOW_PICTURE_MODAL: {
      return {
        ...state,
      };
    }

    /** 顯示DetailNumber Modal */
    case ActionType.SHOW_DETAILNUMBER_MODAL: {
      return {
        ...state,
      };
    }

    /** 顯示電話Modal - 成功 */
    case ActionType.SHOW_PHONE_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        phoneData: response.data,
        paginatedPhoneInfo: response.paginatedInfo,
      };
    }

    /** 顯示錢包Modal - 成功 */
    case ActionType.SHOW_WALLERADDRESS_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        wallerAddressData: response.data,
        paginatedWallerAddressInfo: response.paginatedInfo,
      };
    }

    /** 顯示IP Modal - 成功 */
    case ActionType.SHOW_IP_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        IPData: response.data,
        paginatedIPInfo: response.paginatedInfo,
      };
    }

    /** 顯示照片 Modal - 成功 */
    case ActionType.SHOW_PICTURE_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        PictureData: response.data,
        paginatedPictureInfo: response.paginatedInfo,
      };
    }

    /** 顯示DetailNumberModal - 成功 */
    case ActionType.SHOW_DETAILNUMBER_MODAL_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        DetailNumberData: response,
      };
    }

    /** 更新本案相關帳號 - 成功 */
    case ActionType.IS_CASE_MARK_SUCCESS: {
      return {
        ...state,
        isCaseMarkSuccess: true,
      };
    }

    default:
      return state;
  }
};
