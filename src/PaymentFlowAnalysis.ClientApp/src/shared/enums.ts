/** 排序類別 */
export enum SortedType {
  /** DESC: 1 */
  DESC = 1,
  /** ASC: -1 */
  ASC = -1,
}

/** 權限表 */
export enum AdminPermission {
  /** 使用者帳號管理 */
  sysUserListManagement = 'sysUserListManagement',
  /** 開戶帳號 */
  bankAccountInfoManagement = 'bankAccountInfoManagement',
  /** 定期接收帳戶資料 */
  cryptoWallertInfoReceiveManagement = 'cryptoWallertInfoReceiveManagement',
  /** 黑名單資料交換 */
  blackAccountManagement = 'blackAccountManagement',
  /** 保險箱資料 */
  bankSafeDepositBoxManagement = 'bankSafeDepositBoxManagement',
  /** 大額交易 */
  bigTradeManagement = 'bigTradeManagement',
  /** 交易明細 */
  bankTransactionManagement = 'bankTransactionManagement',
  /** 使用者調閱紀錄 */
  cryptoQueryManagement = 'cryptoQueryManagement',
}

/** Modal內容型態 */
export enum ModalContentType {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

/** 黑名單Modal內容型態 */
export enum BlackAccountModalContentType {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  IP = 'IP',
}

/** 交易所種類 */
export enum AgencyType {
  ACE = '1',
  MaiCoin = '2',
  BitoPro = '3',
  BITGIN = '4',
}

/** 性別 */
export enum SexualType {
  male = '1',
  female = '2',
}

/** 交易所種類 */
export enum LoginType {
  WEB = '1',
  APP = '2',
}

/** 拋查狀態 */
export enum QueryStatusType {
  WAIT = '1',
  SUCCESS = '2',
  FAIL = '3',
}

/** NavbarModal內容型態 */
export enum NavbarModalContentType {
  SYSUSERLIST = 'SYSUSERLIST',
  NOTIFICATION = 'NOTIFICATION',
}

/** 調閱來源種類 */
export enum SearchType {
  /** 個資調閱 */
  PersonalInfo = 1,
  /** 相關交易個資調閱=錢包反查 */
  WalletAddress = 2,
  /** 交易資料調閱 */
  TransactionInfo = 3,
}

/** 查詢條件 */
export enum QueryConditionType {
  /** 錢包地址 */
  WalletAddress = 1,
  /** 交易所帳號 */
  InternalAccount = 2,
  /** 超商交易序號 */
  TransactionSquence = 3,
  /** 身分證字號 */
  IdCardNumber = 4,
  /** 銀行帳號 */
  BankAccount = 5,
  /** 區塊鏈交易序號TxID */
  TxID = 6,
  /** 交易所帳號手機號碼 */
  Phone = 7,
  /** 交易所帳號電子信箱 */
  Email = 8,
}
