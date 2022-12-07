//#region 分頁設定
/** true 的 string 值: '1' */
export const TRUE_STRING = '1';
/** false 的 string 值: '0' */
export const FALSE_STRING = '0';

/** 預設分頁大小 */
export const DEFAULT_PAGE_SIZE = 10;

/** 預設頁碼 */
export const DEFAULT_PAGE = 1;

/** 預設頁碼資料筆數 */
export const DEFAULT_PAGE_COUNT = 0;

/** 預設總頁數 */
export const DEFAULT_TOTAL_PAGE = 1;

/** 預設總筆數 */
export const DEFAULT_TOTAL_PAGE_COUNT = 0;

/** 分頁下拉選單值 */
export const PAGE_SIZE_OPTIONS = [
  { value: '10', text: '10' },
  { value: '15', text: '15' },
  { value: '30', text: '30' },
  { value: '50', text: '50' },
];
//#endregion

export const ALL_OPTION_VALUE = '';
export const YES_OPTION_VALUE = TRUE_STRING;
export const NO_OPTION_VALUE = FALSE_STRING;

export const ALL_OPTION = { value: ALL_OPTION_VALUE, text: '全部' };
export const YES_OPTION = { value: YES_OPTION_VALUE, text: '是' };
export const NO_OPTION = { value: NO_OPTION_VALUE, text: '否' };

/** [全部, 否, 是] 下拉選單 */
export const ALL_NO_YES_OPTIONS = [ALL_OPTION, NO_OPTION, YES_OPTION];

/** [否,是] 下拉選單 */
export const NO_YES_OPTIONS = [NO_OPTION, YES_OPTION];

/** [是,否] 下拉選單 */
export const YES_NO_OPTIONS = [YES_OPTION, NO_OPTION];

/** 跳轉網址白名單 */
export const REFERRER_WHITELIST = ['192.168.88.5', '192.168.88.3', '192.168.88.2', '192.168.88.1', '10.39.17.35'];

/** CRYPTO_PERSONAL_INFO查詢條件 儲存至 LocalStorge 的 KEY */
export const CRYPTO_PERSONAL_INFO_STORAGE_KEY = 'crypto-personal-info-queryparameter';

/** RELEVANT_CRYPTO_PERSONAL_INFO查詢條件 儲存至 LocalStorge 的 KEY */
export const RELEVANT_CRYPTO_PERSONAL_INFO_STORAGE_KEY = 'relevant-crypto-personal-info-queryparameter';

/** CRYPTO_TRANSACTION_INFO查詢條件 儲存至 LocalStorge 的 KEY */
export const CRYPTO_TRANSACTION_INFO_STORAGE_KEY = 'crypto-transaction-info-queryparameter';
