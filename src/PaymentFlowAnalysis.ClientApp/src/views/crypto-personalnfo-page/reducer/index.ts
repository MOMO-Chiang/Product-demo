import {
  CryptoPersonalSearchParams,
  FetchCryptoPersonalSearchHistoryParams,
  FetchOrderNumberListParams,
  FetchOrderNumberListResponse,
} from '@app/apis/admin/crypto-personal-info';
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
  SelectOptionConfig,
  CryptoQueryMaster,
  PersonalPhoneShowModalData,
  PersonalWallerAddressShowModalData,
  PersonalIPShowModalData,
  CryptoQueryDetail,
  PersonalDetailNumberShowModalData,
  PersonalPictureShowModalData,
} from '@shared/types';
import { tr } from 'date-fns/locale';
import { ActionType, CryptoPersonalInfoPageAction } from '../actions';

/** CryptoPersonalInfoPage Redux state */
export interface CryptoPersonalInfoReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 拋查歷史紀錄資料 */
  CryptoPersonalSearchHistory: CryptoQueryMaster[];

  /** 個資調閱 */
  CryptoQueryMaster: CryptoQueryMaster[];

  /** 下拉選單 */
  SearchOptions: SelectOptionConfig[];

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

  /** 是否正在取得個資調閱資料 */
  isFetchOrderMasterListsLoading: boolean;

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

  /** 是否成功取得歷史資料 */
  isFetchCryptoPersonalSearchHistorySuccess: boolean | null;

  /** 是否成功拋查 */
  isCreatePersonalInfoSearchSuccess: boolean | null;

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

/** 預設下拉選單 */
const DEFAULT_OPTION = [{ text: '--- 請選擇 ---', value: '' }];

/** 預設拋查條件下拉選單 */
const DEFAULT_OPTIONS = [
  { text: '錢包地址', value: '1' },
  { text: '交易所帳號', value: '2' },
  { text: '身分證字號', value: '4' },
  { text: '銀行帳號', value: '5' },
  { text: '區塊鏈交易序號TxID', value: '6' },
  { text: '超商交易序號', value: '3' },
  { text: '交易所帳號手機號碼', value: '7' },
  { text: '交易所帳號電子信箱', value: '8' },
];

/** CryptoPersonalInfoPage Redux initial state */
const initialState: CryptoPersonalInfoReduxState = {
  isInitPageSuccess: null,
  CryptoQueryMaster: [],
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
  isFetchOrderMasterListsLoading: false,
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
    searchType: 1,
    queryUserId: '',
    orderMasterNumber: '',
  },
  currentFetchCryptoPersonalSearchHistoryParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: 'queryOrderTime',
    sortedType: SortedType.DESC,
    CaseNo: '',
    searchType: 1,
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
  isFetchCryptoPersonalSearchHistorySuccess: null,
  isCreatePersonalInfoSearchSuccess: null,
  SearchOptions: DEFAULT_OPTION.concat(DEFAULT_OPTIONS),
  CryptoPersonalSearchHistory: [],
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

/** CryptoPersonalInfoPage Reducer */
export const CryptoPersonalInfoPageReducer = (
  state = initialState,
  action: CryptoPersonalInfoPageAction,
): CryptoPersonalInfoReduxState => {
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
        isFetchOrderMasterListsLoading: true,
      };
    }

    /** 取得調閱單號資料 - 成功 */
    case ActionType.FETCH_ORDERNUMBERLIST_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        CryptoQueryMaster: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchOrderMasterListsLoading: false,
      };
    }

    /** 取得調閱單號資料 - 失敗 */
    case ActionType.FETCH_ORDERNUMBERLIST_FAILURE: {
      return {
        ...state,
        CryptoQueryMaster: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchOrderNumberListParams.page,
          pageSize: state.currentFetchOrderNumberListParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchOrderMasterListsLoading: false,
      };
    }

    /** 取得歷史調閱資料 */
    case ActionType.FETCH_HISTORYORDERNUMBERLIST: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchCryptoPersonalSearchHistoryParams: params,
        isFetchCryptoPersonalSearchHistorySuccess: null,
        isFetchOrderMasterListsLoading: true,
      };
    }

    /** 取得歷史調閱資料 - 成功 */
    case ActionType.FETCH_HISTORYORDERNUMBERLIST_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        CryptoPersonalSearchHistory: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchCryptoPersonalSearchHistorySuccess: true,
        isFetchOrderMasterListsLoading: false,
      };
    }

    /** 取得歷史調閱資料 - 失敗 */
    case ActionType.FETCH_HISTORYORDERNUMBERLIST_FAILURE: {
      return {
        ...state,
        CryptoPersonalSearchHistory: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchOrderNumberListParams.page,
          pageSize: state.currentFetchOrderNumberListParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchCryptoPersonalSearchHistorySuccess: false,
        isFetchOrderMasterListsLoading: false,
      };
    }

    /** 執行拋查資料 */
    case ActionType.FETCH_CREATEPERSONALSEARCH: {
      return { ...state, isCreatePersonalInfoSearchSuccess: null, isFetchOrderMasterListsLoading: true };
    }

    /** 執行拋查資料 - 成功 */
    case ActionType.FETCH_CREATEPERSONALSEARCH_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        CreateSearchMsg: response,
        isCreatePersonalInfoSearchSuccess: true,
        isFetchOrderMasterListsLoading: false,
      };
    }

    /** 執行拋查資料 - 失敗 */
    case ActionType.FETCH_CREATEPERSONALSEARCH_FAILURE: {
      return {
        ...state,
        //CryptoQueryMaster: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchOrderNumberListParams.page,
          pageSize: state.currentFetchOrderNumberListParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isCreatePersonalInfoSearchSuccess: false,
        isFetchOrderMasterListsLoading: false,
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
