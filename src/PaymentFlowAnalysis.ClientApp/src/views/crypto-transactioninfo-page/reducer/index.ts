import {
  FetchCryptoPersonalSearchHistoryParams,
  FetchCryptoTransactionInfosParams,
} from '@app/apis/admin/crypto-transaction-info';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { ModalContentType, SortedType } from '@shared/enums';
import {
  CryptoQueryMaster,
  CryptoTransactionInfo,
  PaginatedInfo,
  PersonalDetailNumberShowModalData,
  SelectOptionConfig,
} from '@shared/types';
import { ActionType, CryptoTransactionInfoPageAction } from '../actions';

/** CryptoTransactionInfoPage Redux state */
export interface CryptoTransactionInfoPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 交易調閱資料 */
  cryptoTransactionInfo: CryptoTransactionInfo[];

  /** 交易歷史調閱資料 */
  HistorycryptoTransactionInfo: CryptoQueryMaster[];

  /** 分頁資料 */
  paginatedInfo: PaginatedInfo;

  /** 是否正在取得交易調閱資料 */
  isFetchCryptoTransactionInfoLoading: boolean;

  /** 當前取得交易調閱資料的搜尋條件資料 */
  currentFetchCryptoTransactionInfoParams: FetchCryptoTransactionInfosParams;

  /** 當前取得交易歷史調閱資料的搜尋條件資料 */
  currentFetchCryptoTransactionInfoHistoryParams: FetchCryptoPersonalSearchHistoryParams;

  /** 是否成功撈取資料 */
  isFetchSysUserListSuccess: boolean | null;

  /** 下拉選單 */
  CurrencyOptions: SelectOptionConfig[];

  /** 是否成功取得歷史資料 */
  isFetchFetchCryptoTransactionInfoHistorySuccess: boolean | null;

  /** 是否成功拋查 */
  isCreateTransactionInfoSearchSuccess: boolean | null;

  /** 拋查成功訊息 */
  CreateSearchMsg: string;

  /** 取得調閱單號彈窗資料 */
  DetailNumberData: PersonalDetailNumberShowModalData;

  /** 當前Modal交易調閱資料 */
  //currentModalSysUserList: FetchCryptoTransactionInfoResponse | null;
}

/** 預設下拉選單 */
const DEFAULT_OPTION = [{ text: '--- 請選擇 ---', value: '' }];

/** 預設拋查條件下拉選單 */
const DEFAULT_OPTIONS = [
  { text: 'BTC', value: 'BTC' },
  { text: 'ETH', value: 'ETH' },
];

/** CryptoTransactionInfoPage Redux initial state */
const initialState: CryptoTransactionInfoPageReduxState = {
  isInitPageSuccess: null,
  cryptoTransactionInfo: [],
  HistorycryptoTransactionInfo: [],
  paginatedInfo: {
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  isFetchCryptoTransactionInfoLoading: false,
  currentFetchCryptoTransactionInfoParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: 'queryOrderTime',
    sortedType: SortedType.DESC,
    txID: '',
    account: '',
    bankCode: '',
    brunchCode: '',
    currency: '',
    amountMin: '',
    amountMax: '',
    transactionTimeStart: '',
    transactionTimeEnd: '',
    caseNo: '',
    searchType: 3,
    queryUserId: '',
    orderMasterNumber: '',
  },
  currentFetchCryptoTransactionInfoHistoryParams: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: 'queryOrderTime',
    sortedType: SortedType.DESC,
    CaseNo: '',
    searchType: 2,
    queryUserId: '',
  },
  isFetchSysUserListSuccess: null,
  CurrencyOptions: DEFAULT_OPTION.concat(DEFAULT_OPTIONS),
  isCreateTransactionInfoSearchSuccess: null,
  isFetchFetchCryptoTransactionInfoHistorySuccess: null,
  CreateSearchMsg: '',
  DetailNumberData: {
    orderDetailNumber: '',
    queryName: '',
    queryPhone: '',
    queryEmail: '',
    queryRank: '',
    queryUnit: '',
    projectCategory: '',
  },
  //currentModalSysUserList: null,
};

/** CryptoTransactionInfoPage Reducer */
export const CryptoTransactionInfoPageReducer = (
  state = initialState,
  action: CryptoTransactionInfoPageAction,
): CryptoTransactionInfoPageReduxState => {
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

    /** 取得交易調閱資料 */
    case ActionType.FETCH_CRYPTOTRANSACTIONINFOS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchCryptoTransactionInfoParams: params,
        isFetchCryptoTransactionInfoLoading: true,
      };
    }

    /** 取得交易調閱資料 - 成功 */
    case ActionType.FETCH_CRYPTOTRANSACTIONINFOS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        cryptoTransactionInfo: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchCryptoTransactionInfoLoading: false,
      };
    }

    /** 取得交易調閱資料 - 失敗 */
    case ActionType.FETCH_CRYPTOTRANSACTIONINFOS_FAILURE: {
      return {
        ...state,
        cryptoTransactionInfo: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchCryptoTransactionInfoParams.page,
          pageSize: state.currentFetchCryptoTransactionInfoParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchCryptoTransactionInfoLoading: false,
      };
    }

    /** 取得交易歷史調閱資料 */
    case ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS: {
      const { params } = action.payload;
      return {
        ...state,
        currentFetchCryptoTransactionInfoHistoryParams: params,
        isFetchCryptoTransactionInfoLoading: true,
        isFetchFetchCryptoTransactionInfoHistorySuccess: null,
      };
    }

    /** 取得交易歷史調閱資料 - 成功 */
    case ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        HistorycryptoTransactionInfo: response.data,
        paginatedInfo: response.paginatedInfo,
        isFetchCryptoTransactionInfoLoading: false,
        isFetchFetchCryptoTransactionInfoHistorySuccess: true,
      };
    }

    /** 取得交易歷史調閱資料 - 失敗 */
    case ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS_FAILURE: {
      return {
        ...state,
        HistorycryptoTransactionInfo: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchCryptoTransactionInfoParams.page,
          pageSize: state.currentFetchCryptoTransactionInfoParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isFetchCryptoTransactionInfoLoading: false,
        isFetchFetchCryptoTransactionInfoHistorySuccess: false,
      };
    }

    /** 執行拋查資料 */
    case ActionType.FETCH_CREATETRANSACTIONSEARCH: {
      return { ...state, isCreateTransactionInfoSearchSuccess: null, isFetchCryptoTransactionInfoLoading: true };
    }

    /** 執行拋查資料 - 成功 */
    case ActionType.FETCH_CREATETRANSACTIONSEARCH_SUCCESS: {
      const { response } = action.payload;
      return {
        ...state,
        CreateSearchMsg: response,
        isCreateTransactionInfoSearchSuccess: true,
        isFetchCryptoTransactionInfoLoading: false,
      };
    }

    /** 執行拋查資料 - 失敗 */
    case ActionType.FETCH_CREATETRANSACTIONSEARCH_FAILURE: {
      return {
        ...state,
        //CryptoQueryMaster: [],
        paginatedInfo: {
          ...state.paginatedInfo,
          page: state.currentFetchCryptoTransactionInfoParams.page,
          pageSize: state.currentFetchCryptoTransactionInfoParams.pageSize,
          pageCount: initialState.paginatedInfo.pageCount,
        },
        isCreateTransactionInfoSearchSuccess: false,
        isFetchCryptoTransactionInfoLoading: false,
      };
    }

    /** 顯示DetailNumber Modal */
    case ActionType.SHOW_DETAILNUMBER_MODAL: {
      return {
        ...state,
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

    default:
      return state;
  }
};
