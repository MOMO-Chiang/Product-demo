import { SortedType, AdminPermission } from '@shared/enums';

/** 分頁資料 */
export type PaginatedInfo = {
  /** 當前頁數 */
  page: number;
  /** 分頁大小 */
  pageSize: number;
  /** 總頁數 */
  totalPage: number;
  /** 當頁資料筆數 */
  pageCount: number;
  /** 總資料筆數 */
  totalCount: number;
};

/** API 分頁資料 Response */
export type APIPaginatedResponse<T> = {
  /** 分頁資訊 */
  paginatedInfo: PaginatedInfo;
  /** 資料 */
  data: T;
};

export type APIPaginatedQueryParams = {
  page: number;
  pageSize: number;
  sortedColumn: string;
  sortedType: SortedType;
  isAll?: boolean;
};

export type SysUserList = {
  /** 使用者帳號 */
  userId: string;
  /** 使用者名稱 */
  orderUserName: string;
  /** 單位代碼 */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
  /** 電子信箱 */
  orderUserEmail: string;
  /** 連絡電話 */
  orderUserPhone: string;
  /** 有效 */
  isValid: boolean;
  /** 調閱人職稱 */
  orderUserRank: string;
  /** 調閱人任職單位(洗錢防制處) */
  orderUserUnit: string;
  /** 刑事案類(刑事調查) */
  orderUserProjectCategory: string;
  /** 建立時間 */
  createTime: string;
  /** 最後異動人員帳號 */
  updateUserId: string;
  /** 最後異動人員名稱 */
  updateUserName: string;
  /** 最後異動時間 */
  updateTime: string;
  /** 明細資料 */
  detailData: string;
};

export type bankAccountInfo = {
  /** seq */
  seq: string;
  /** 案號 */
  caseNo: string;
  /** 案名 */
  caseName: string;
  /** 使用者帳號 */
  personalId: string;
  /** 身分證字號 */
  idCardNumber: string;
  /** 開戶行總分支機構代碼 */
  bankBranchCode: string;
  /** 存款種類 */
  accountType: string;
  /** 幣別 */
  currencyType: string;
  /** 戶名 */
  accountName: string;
  /** 住家電話 */
  localPhone: string;
  /** 行動電話 */
  mobilePhone: string;
  /** 戶籍地址 */
  residenceAddress: string;
  /** 通訊地址 */
  mailingAddresses: string;
  /** 銀行帳號 */
  accountId: string;
  /** 資料提供日 */
  dataProvidedDate_Cov: string;
  /** 開戶日 */
  accountOpeningDate_Cov: string;
  /** 結清日 */
  accountClosingDate_Cov: string;
  /** 資料提供日結餘 */
  accountBalance: string;
  /** 備註 */
  remark: string;
  /** 建立時間 */
  createTime: string;
  /** 本案相關帳戶 */
  isAccountMark: string;
};

export type cryptoWallertInfoReceive = {
  /** uid */
  uid: string;
  /** 資料機構來源資料代碼 */
  exchangeTypeCode: string;
  /** 資料機構來源資料 */
  exchangeTypeCodeStr: string;
  /** 錢包地址 */
  walletAddress: string;
  /** 錢包地址發行時間 */
  publishTime_Cov: string;
  /** 幣別 */
  currencyType: string;
  /** 錢包地址分配時間 */
  distributionTime_Cov: string;
  /** 是否為熱錢包 */
  hotWallet: string;
  /** 是否為接收資料 */
  isDataSync: string;
  /** 資料接收時間 */
  createTime: string;
};

export type BlackAccount = {
  /** 資料來源代號 */
  exchangeTypeCode: string;
  /** 資料來源 */
  exchangeTypeCodeStr: string;
  /** 風險類別代號 */
  risklevel: string;
  /** 風險類別 */
  risklevelStr: string;
  /** 身分證字號 */
  idCardNum: string;
  /** 錢包幣別 */
  currencyType: string;
  /** 錢包地址 */
  walletAddress: string;
  /** 電話號碼 */
  userPhone: string;
  /** 電子信箱 */
  userEmail: string;
  /** ip位置 */
  userIP: string;
  /** 網址 */
  url: string;
  /** 備註 */
  remark: string;
  /** 資料更新時間 */
  updateTime: string;
  /** 有效 */
  isValid: boolean;
};

export type bankSafeDepositBox = {
  /** seq */
  seq: string;
  /** 對應GUID */
  bankDepositBoxSeq: string;
  /** 身分證字號 */
  idCardNumber: string;
  /** 出租行總分支機構代碼 */
  bankBranchCode: string;
  /** 承租種類 */
  boxRentType: string;
  /** 承租人 */
  renter: string;
  /** 市內電話 */
  localPhone: string;
  /** 行動電話 */
  mobilePhone: string;
  /** 戶籍地址 */
  residenceAddress: string;
  /** 通訊地址 */
  mailingAddress: string;
  /** 箱號或室號 */
  boxNumber: string;
  /** 資料提供日 */
  dataProvidedTime_Cov: string;
  /** 承租日 */
  rentDate_Cov: string;
  /** 退租日 */
  leaseCancellationDate_Cov: string;
  /** 備註 */
  remark: string;
  /** 本案相關帳戶 */
  isAccountMark: string;
};

export type bigTrade = {
  /** seq */
  seq: string;
  /** 大額序號 */
  bigTradeId: string;
  /** 客戶帳號 */
  customerAccountId: string;
  /** 客戶名稱 */
  customerName: string;
  /** 開戶日期 */
  openAccountDate: string;
  /** 客戶統編 */
  customerId: string;
  /** 交易人姓名 */
  remitterName: string;
  /** 交易人統編 */
  remitterId: string;
  /** 交易人電話 */
  remitterPhone: string;
  /** 交易時間 */
  remitTime: string;
  /** 交易金額 */
  remitAmount: string;
  /** 交易行 */
  remitBank: string;
  /** 交易種類 */
  remitType: string;
  /** 受款人 */
  beneficiary: string;
  /** 受款帳號 */
  beneficiaryAccountId: string;
  /** 備註 */
  memo: string;
  /** 申報時間 */
  declarationTime: string;
  /** 客戶電話 */
  customerPhone: string;
  /** 客戶地址 */
  customerAddress: string;
};

export type cryptoQuery = {
  /** 自動序號 */
  seq: string;
  /** 調閱時間 */
  queryOrderTime: string;
  /** 調閱人人事五碼 */
  queryUserId: string;
  /** 交易所 */
  requestAgency: string;
  /** 查詢條件 */
  queryConditionType: string;
  /** 拋查值 */
  queryValue: string;
  /** 拋查狀態 */
  queryStatus: string;
  /** 主調閱單號 */
  orderMasterNumber: string;
  /** 調閱單號 */
  orderDetailNumber: string;
  /** 調閱人姓名 */
  queryName: string;
  /** 調閱人電話 */
  queryPhone: string;
  /** 調閱人Email */
  queryEmail: string;
  /** 調閱人職稱 */
  queryRank: string;
  /** 調閱人任職單位 */
  queryUnit: string;
  /** 刑事案類 */
  projectCategory: string;
  /** 調閱來源種類 */
  searchType: string;
};

export type BlackAccountPhoneShowModalData = {
  /** 電話 */
  phone: string;
  /** 資料更新時間 */
  updateTime: string;
};

export type BlackAccountEmailShowModalData = {
  /** 信箱 */
  Email: string;
  /** 資料更新時間 */
  updateTime: string;
};

export type BlackAccountIPShowModalData = {
  /** IP */
  IP: string;
  /** 資料更新時間 */
  updateTime: string;
};

/** 下拉選單資料 */
export type Options = {
  /** 顯示資料*/
  text: string;
  /** 值 */
  value: string;
};

/** 登入使用者資訊 */
export interface AuthLoginUserInfo {
  /** user id */
  uid: string;
  /** username */
  username: string;
}

/** 登入資訊 */
export interface AuthLoginInfo {
  /** Token */
  token: string;
  /** 到期時間戳 */
  expires: number;
  /** 登入使用者資訊 */
  userInfo: AuthLoginUserInfo;
  /** 權限資料 */
  permissions: AdminPermissionMap;
  /** 案件清單 */
  //userFiles: UserFile[];
}

export type AdminPermissionMap<P = typeof AdminPermission> = {
  [K in keyof P]: boolean;
};

export interface UserFile {
  handManID: string;

  fileNo: string;

  systemName: string;

  fileName: string;

  handMan: string;

  unitcode: string;

  unitname: string;

  outHandMan: string;

  outHandManID: string;

  outunit: string;

  outUnitN: string;

  cexeresult: string;

  createtime: string;

  requesterID: string;

  requesterName: string;
}

/** 調閱主序號 */
export type CryptoQueryMaster = {
  seq: string;
  /** 案號 */
  caseNo: string;
  /** 案名 */
  caseName: string;
  /** 調閱主序號 */
  orderMasterNumber: string;
  /** 調閱筆數 */
  orderDetailCount: number;
  /** 調閱筆數 */
  requestAgency: number;
  /** 拋查類別 */
  queryConditionType: number;
  /** 調閱時間 */
  queryOrderTime: string;

  queryUserId: string;

  queryName: string;

  queryPhone: string;

  queryEmail: string;

  queryRank: string;

  queryUnit: string;

  projectCategory: string;

  searchType: number;

  actionUserId: string;

  queryStatusCount: number;

  /** 調閱明細 */
  detailData: string;
};

/** 調閱主序號 */
export type CryptoQueryDetail = {
  Seq: string;
  /** 調閱時間 */
  QueryOrderTime: string;
  /** 調閱人人事五碼 */
  queryUserId: string;
  /** 交易所 */
  RequestAgency: string;
  /** 查詢條件 */
  QueryConditionType: string;
  /** 拋查值-查詢的內容 */
  QueryValue: string;
  /** 拋查狀態 */
  QueryStatus: string;
  /** 主調閱單號 */
  OrderMasterNumber: string;
  /** 調閱單號 */
  OrderDetailNumber: string;
  /** 調閱人姓名 */
  queryName: string;
  /** 調閱人電話 */
  queryPhone: string;
  /** 調閱人Email */
  queryEmail: string;
  /** 調閱人職稱 */
  queryRank: string;
  /** 調閱人任職單位(洗錢防制處) */
  queryUnit: string;
  /** 刑事案類(刑事調查) */
  projectCategory: string;
  // /** 調閱來源種類*/
  // searchType: number;
};

/** 調閱主序號Modal */
export type PersonalDetailNumberShowModalData = {
  // seq: string;
  // /** 調閱時間 */
  // QueryOrderTime: string;
  // /** 調閱人人事五碼 */
  // queryUserId: string;
  // /** 交易所 */
  // RequestAgency: string;
  // /** 查詢條件 */
  // QueryConditionType: string;
  // /** 拋查值-查詢的內容 */
  // QueryValue: string;
  // /** 拋查狀態 */
  // QueryStatus: string;
  // /** 主調閱單號 */
  // OrderMasterNumber: string;
  /** 調閱單號 */
  orderDetailNumber: string;
  /** 調閱人姓名 */
  queryName: string;
  /** 調閱人電話 */
  queryPhone: string;
  /** 調閱人Email */
  queryEmail: string;
  /** 調閱人職稱 */
  queryRank: string;
  /** 調閱人任職單位(洗錢防制處) */
  queryUnit: string;
  /** 刑事案類(刑事調查) */
  projectCategory: string;
  // /** 調閱來源種類*/
  // searchType: number;
};

export type PersonalPhoneShowModalData = {
  /** 電話 */
  phone: string;
  /** 資料建立時間 */
  createTime: string;
};

export type PersonalWallerAddressShowModalData = {
  /** 錢包地址 */
  wallerAddress: string;
  /** 幣別 */
  currencyType: string;
  /** 數量 */
  property: string;
};

export type PersonalIPShowModalData = {
  /** IP */
  IP: string;
  /** 登入時間 */
  loginTime_Cov: string;
  /** 登入類別 */
  loginType: string;
  /** 國別 */
  country: string;
};

export type PersonalPictureShowModalData = {
  /** 照片 */
  subPath: string;
};

/** 交易資料調閱 */
export type CryptoTransactionInfo = {
  Seq: string;
  /** 交易所 */
  ExchangeTypeCode: number;
  /** 調閱單號 */
  OrderNumber: string;
  /** 交易TxID */
  TxID: string;
  /** 內部交易序號 */
  InternalTxID: string;
  /** 交易時間 */
  TransactionTime: string;
  /** 交易種類 */
  TransactionType: string;
  /** 轉出帳戶/內部交易帳號accountID */
  RemittanceAccount: string;
  /** 轉出帳號種類 */
  RemittanceAccountType: string;
  /** 轉出幣別 */
  RemittanceCurrency: string;
  /** 轉出數量 */
  OutwardsaAmount: string;
  /** 轉出銀行代碼/超商名稱(FamilyMart) */
  RemittanceBank: string;
  /** 轉出分行代碼/付款超商分店代碼 */
  RemittanceBranch: string;
  /** 轉入帳戶/內部交易帳號accountID */
  BeneficiaryAccount: string;
  /** 轉入帳號種類 */
  BeneficiaryAccountType: string;
  /** 轉入幣別 */
  BeneficiaryCurrency: string;
  /** 轉入數量 */
  InwardsAmount: string;
  /** 轉入銀行代碼 */
  BeneficiaryBank: string;
  /** 轉入分行代碼 */
  BeneficiaryBranch: string;
  /** 交易狀態 */
  TransactionStatus: number;
  /**  1(虛擬幣->虛擬幣)  2(虛擬幣->法幣) 3(法幣->虛擬幣) */
  TransactionMode: number;
  /** 資料建立時間 */
  CreateTime: string;
};

/** 個資調閱 */
export type CryptoPersonalInfo = {
  Seq: string;

  Uid: string;

  PersonalInfoId: string;
  /** 本案標記 */
  IsCaseMark: boolean;
  /** 照片列表 */
  PictureSubPath: string;
  /** 身分證字號 */
  IdCardNum: string;
  /** 姓名 */
  Name: string;
  /** 交易所 */
  ExchangeTypeCode: string;
  /** 交易所帳號 */
  AccountID: string;
  /** 錢包地址 */
  WallerAddress: string;
  /** 電話列表 */
  Phone: number;
  /** 電子信箱 */
  Email: string;
  /** 登入IP列表 */
  IP: string;
  /** 性別 */
  Sexual_Cov: string;
  /** 生日 */
  Birthday: string;
  /** 通訊地址 */
  Address: string;
  /** 帳號註冊時間 */
  RegisterDate: string;
  /** 總資產價值(台幣) */
  TotalProperty: string;
  /** 銀行代碼 */
  BankName: string;
  /** 銀行分支機構代碼 */
  Branch: string;
  /** 銀行帳號 */
  BankAccount: string;
  /** 認證銀行代碼 */
  Verifiedbank: number;
  /** 認證日期 */
  VerifyDate: string;
  /** 調閱單號 */
  OrderNumber: string;
  /** 資料建立時間 */
  ReceiveTime: string;
};

export type bankTransaction = {
  /** 身分證字號 */
  idCardNumber: string;
  /** 銀行名稱 */
  bankName: string;
  /** 分行名稱 */
  bankBranchName: string;
  /** 帳號 */
  transactionAccountId: string;
  /** 資料建立時間 */
  createTime: string;
  /** 是否取得明細 */
  isFetch: boolean | false;
};

export type bankTransactionDetail = {
  /** seq */
  seq: string;
  /** 帳號 */
  transactionAccountId: string;
  /** 交易序號 */
  transactionId: string;
  /** 交易時間 */
  transactionTime: string;
  /** 交易日期 */
  transactionDate: string;
  /** 交易行 */
  transactionBank: string;
  /** 交易摘要 */
  transactionSummary: string;
  /** 幣別 */
  currencyType: string;
  /** 支出金額 */
  payoutMoneyAmount: string;
  /** 存入金額 */
  depositMoneyAmount: string;
  /** 餘額 */
  balance: string;
  /** ATM或末端機代號 */
  atmDeviceCode: string;
  /** 櫃員代號 */
  bankTellerId: string;
  /** 轉出入行庫代碼及帳號	 */
  bankCodeAccount: string;
  /** 備註 */
  remark: string;
  /** 資料匯入時間 */
  createTime: string;
  /** 檔案MD5 */
  fileMD5: string;
};

export interface NotificationInfo {
  notificationSeq: string;
  createTime: string;
  message: string;
  parameter: string;
  queryParameter: string;
  orderMasterNumber: string;
  isRead: boolean;
}
