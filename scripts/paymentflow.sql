USE [PaymentFlowAnalysis]
GO
/****** Object:  Table [dbo].[BankAccount_Import]    Script Date: 2022/8/29 下午 03:36:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankAccount_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankAccountImportSeq] [uniqueidentifier] NOT NULL,
	[CaseNo] [nvarchar](50) NULL,
	[CaseName] [nvarchar](50) NULL,
	[PersonalId] [nvarchar](50) NULL,
	[BankCode] [nvarchar](30) NULL,
	[OriginCsvFileName] [nvarchar](200) NULL,
	[NewCsvFileName] [nvarchar](max) NULL,
	[SubCsvFilePath] [nvarchar](300) NULL,
	[CreateTime] [datetime] NOT NULL,
	[FileMD5] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_BankAccount_Import] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankAccountDetail_Import]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankAccountDetail_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankAccountImportSeq] [uniqueidentifier] NOT NULL,
	[IdCardNumber] [nvarchar](30) NULL,
	[BankBranchCode] [nvarchar](30) NULL,
	[AccountType] [nvarchar](50) NULL,
	[CurrencyType] [nvarchar](30) NULL,
	[AccountName] [nvarchar](100) NULL,
	[LocalPhone] [nvarchar](50) NULL,
	[MobilePhone] [nvarchar](50) NULL,
	[ResidenceAddress] [nvarchar](max) NULL,
	[MailingAddresses] [nvarchar](max) NULL,
	[AccountId] [nvarchar](50) NULL,
	[DataProvidedDate] [nvarchar](50) NULL,
	[DataProvidedDate_Cov] [date] NULL,
	[AccountOpeningDate] [nvarchar](50) NULL,
	[AccountOpeningDate_Cov] [date] NULL,
	[AccountClosingDate] [nvarchar](50) NULL,
	[AccountClosingDate_Cov] [date] NULL,
	[AccountBalance] [nvarchar](20) NULL,
	[AccountBalance_Cov] [bigint] NULL,
	[Remark] [nvarchar](max) NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_BankAccountDetail_Import] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankCode]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankCode](
	[Seq] [int] IDENTITY(1,1) NOT NULL,
	[BankCode] [nvarchar](30) NULL,
	[BankName] [nvarchar](200) NULL,
	[BankBranchCode] [nvarchar](30) NULL,
	[BankBranchName] [nvarchar](200) NULL,
 CONSTRAINT [PK_BankCode_1] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankCode_allBranch]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankCode_allBranch](
	[Seq] [int] IDENTITY(1,1) NOT NULL,
	[BankCode] [nvarchar](30) NULL,
	[BankBranchCode] [nvarchar](30) NULL,
	[BankBranchName] [nvarchar](200) NULL,
 CONSTRAINT [PK_BankCode] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankCode_HQ]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankCode_HQ](
	[Seq] [int] IDENTITY(1,1) NOT NULL,
	[BankCode] [nvarchar](30) NULL,
	[BankBranchCode] [nvarchar](30) NULL,
	[BankBranchName] [nvarchar](200) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankSafeDepositBox_Import]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankSafeDepositBox_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankDepositBoxSeq] [uniqueidentifier] NOT NULL,
	[CaseNo] [nvarchar](50) NULL,
	[CaseName] [nvarchar](50) NULL,
	[PersonalId] [nvarchar](50) NULL,
	[BankCode] [nvarchar](30) NULL,
	[OriginCsvFileName] [nvarchar](200) NULL,
	[NewCsvFileName] [uniqueidentifier] NULL,
	[SubCsvFilePath] [nvarchar](300) NULL,
	[CreateTime] [datetime] NOT NULL,
	[FileMD5] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__BankSafe__A581A0ED98DE114B] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankSafeDepositBoxDetail_Import]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankSafeDepositBoxDetail_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankDepositBoxSeq] [uniqueidentifier] NOT NULL,
	[IdCardNumber] [nvarchar](30) NULL,
	[BankBranchCode] [nvarchar](50) NULL,
	[BoxRentType] [nvarchar](50) NULL,
	[Renter] [nvarchar](50) NULL,
	[LocalPhone] [nvarchar](50) NULL,
	[MobilePhone] [nvarchar](50) NULL,
	[ResidenceAddress] [nvarchar](255) NULL,
	[MailingAddress] [nvarchar](255) NULL,
	[BoxNumber] [nvarchar](50) NULL,
	[DataProvidedTime] [nvarchar](20) NULL,
	[DataProvidedTime_Cov] [datetime] NULL,
	[RentDate] [nvarchar](20) NULL,
	[RentDate_Cov] [datetime] NULL,
	[LeaseCancellationDate] [nvarchar](20) NULL,
	[LeaseCancellationDate_Cov] [datetime] NULL,
	[Remark] [nvarchar](max) NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK__BankSafe__CA1E3C88D67A7603_copy1] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankTransaction_Import]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankTransaction_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankAccountImportSeq] [uniqueidentifier] NOT NULL,
	[CaseNo] [nvarchar](50) NULL,
	[CaseName] [nvarchar](50) NULL,
	[PersonalId] [nvarchar](50) NULL,
	[BankCode] [nvarchar](30) NULL,
	[OriginCsvFileName] [nvarchar](200) NULL,
	[NewCsvFileName] [nvarchar](max) NULL,
	[SubCsvFilePath] [nvarchar](300) NULL,
	[CreateTime] [datetime] NOT NULL,
	[FileMD5] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_BankTransaction_Import] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankTransactionDetail_Import]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankTransactionDetail_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankTransactionImportSeq] [uniqueidentifier] NOT NULL,
	[IdCardNumber] [nvarchar](30) NULL,
	[TransactionAccountId] [nvarchar](255) NULL,
	[TransactionId] [nvarchar](255) NULL,
	[TransactionDate] [nvarchar](50) NULL,
	[TransactionTime] [nvarchar](50) NULL,
	[TransactionBank] [nvarchar](50) NULL,
	[TransactionSummary] [nvarchar](255) NULL,
	[CurrencyType] [nvarchar](255) NULL,
	[PayoutMoneyAmount] [nvarchar](255) NULL,
	[DepositMoneyAmount] [nvarchar](255) NULL,
	[Balance] [nvarchar](255) NULL,
	[AtmDeviceCode] [nvarchar](255) NULL,
	[BankTellerId] [nvarchar](50) NULL,
	[BankCodeAccount] [nvarchar](255) NULL,
	[Remark] [nvarchar](max) NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_BankTransactionDetail_Import] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BankTransactionInfoImport]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankTransactionInfoImport](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[CaseNo] [nvarchar](50) NULL,
	[CaseName] [nvarchar](50) NULL,
	[PersonalId] [nvarchar](50) NULL,
	[IdCardNumber] [nvarchar](30) NULL,
	[TransactionAccountId] [nvarchar](255) NULL,
	[TransactionId] [nvarchar](255) NULL,
	[TransactionDate] [nvarchar](50) NULL,
	[TransactionTime] [nvarchar](50) NULL,
	[TransactionBank] [nvarchar](50) NULL,
	[TransactionSummary] [nvarchar](255) NULL,
	[CurrencyType] [nvarchar](255) NULL,
	[PayoutMoneyAmount] [nvarchar](255) NULL,
	[DepositMoneyAmount] [nvarchar](255) NULL,
	[Balance] [nvarchar](255) NULL,
	[AtmDeviceCode] [nvarchar](255) NULL,
	[BankTellerId] [nvarchar](50) NULL,
	[BankCodeAccount] [nvarchar](255) NULL,
	[Remark] [nvarchar](max) NULL,
	[CreateTime] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BigTrade_Import]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BigTrade_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankTradeImportSeq] [uniqueidentifier] NOT NULL,
	[CaseNo] [nvarchar](50) NULL,
	[CaseName] [nvarchar](50) NULL,
	[PersonalId] [nvarchar](50) NULL,
	[BankCode] [nvarchar](30) NULL,
	[OriginCsvFileName] [nvarchar](200) NULL,
	[NewCsvFileName] [nvarchar](max) NULL,
	[SubCsvFilePath] [nvarchar](300) NULL,
	[CreateTime] [datetime] NOT NULL,
	[FileMD5] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_BigTrade_Import] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BigTradeDetail_Import]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BigTradeDetail_Import](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[BankTradeImportSeq] [uniqueidentifier] NOT NULL,
	[BigTradeId] [nvarchar](50) NULL,
	[CustomerAccountId] [nvarchar](50) NULL,
	[CustomerName] [nvarchar](50) NULL,
	[CustomerId] [nvarchar](50) NULL,
	[RemitterName] [nvarchar](50) NULL,
	[RemitterId] [nvarchar](50) NULL,
	[RemitterPhone] [nvarchar](50) NULL,
	[RemitTime] [datetime] NULL,
	[RemitAmount] [bigint] NULL,
	[RemitBank] [nvarchar](50) NULL,
	[RemitType] [nvarchar](50) NULL,
	[Beneficiary] [nvarchar](50) NULL,
	[BeneficiaryAccountId] [nvarchar](50) NULL,
	[Memo] [nvarchar](max) NULL,
	[DeclarationTime] [datetime] NULL,
	[CustomerPhone] [nvarchar](50) NULL,
	[CustomerAddress] [nvarchar](200) NULL,
 CONSTRAINT [PK_BigTradeDetail_Import] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BigTradeInfo]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BigTradeInfo](
	[AAA] [nvarchar](50) NULL,
	[BigTradeId] [nvarchar](50) NULL,
	[CustomerAccountId] [nvarchar](50) NULL,
	[CustomerName] [nvarchar](50) NULL,
	[CustomerId] [nvarchar](50) NULL,
	[RemitterName] [nvarchar](50) NULL,
	[RemitterId] [nvarchar](50) NULL,
	[RemitterPhone] [nvarchar](50) NULL,
	[RemitTime] [datetime] NULL,
	[RemitAmount] [bigint] NULL,
	[RemitBank] [nvarchar](50) NULL,
	[RemitType] [nvarchar](50) NULL,
	[Beneficiary] [nvarchar](50) NULL,
	[BeneficiaryAccountId] [nvarchar](50) NULL,
	[Memo] [nvarchar](max) NULL,
	[DeclarationTime] [datetime] NULL,
	[CustomerPhone] [nvarchar](50) NULL,
	[CustomerAddress] [nvarchar](200) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CashflowDiagram]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CashflowDiagram](
	[Seq] [bigint] NOT NULL,
	[CaseNo] [nvarchar](50) NULL,
	[CaseName] [nvarchar](50) NULL,
	[PersonalId] [nvarchar](50) NULL,
	[CashflowDiagramId] [nvarchar](50) NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CashflowDiagram] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoAccountOwner]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoAccountOwner](
	[IdCardNum] [nvarchar](20) NOT NULL,
	[Birthday] [datetime] NULL,
	[Sexual] [int] NULL,
	[LastOrderNumber] [nvarchar](50) NOT NULL,
	[ExchangeTypeCode] [nvarchar](20) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[UpdateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoAccountOwner] PRIMARY KEY CLUSTERED 
(
	[IdCardNum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoAccountOwnerWallet]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoAccountOwnerWallet](
	[LastOrderNumber] [nvarchar](50) NOT NULL,
	[IdCardNum] [nvarchar](20) NOT NULL,
	[WallerAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[UpdateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoAccountOwnerWallet] PRIMARY KEY CLUSTERED 
(
	[WallerAddress] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlackListExchange]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlackListExchange](
	[AAA] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfo]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfo](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[AccountID] [nvarchar](100) NULL,
	[IdCardNum] [nvarchar](20) NULL,
	[Name] [nvarchar](50) NULL,
	[Sexual] [int] NULL,
	[Birthday] [datetime] NULL,
	[TotalProperty] [float] NULL,
	[Email] [nvarchar](100) NULL,
	[Address] [nvarchar](200) NULL,
	[RegisterDate] [datetime] NULL,
	[BankName] [nvarchar](10) NULL,
	[Branch] [nvarchar](10) NULL,
	[BankAccount] [nvarchar](30) NULL,
	[Verifiedbank] [nvarchar](20) NULL,
	[VerifyDate] [datetime] NULL,
	[CreateTime] [datetime] NOT NULL,
	[ReceiveTime] [datetime] NOT NULL,
	[Uid] [bigint] NOT NULL,
	[IsCaseMark] [bit] NOT NULL,
 CONSTRAINT [PK__CryptoPe__C5B69A4A169E2C43] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfo_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfo_API](
	[Uid] [bigint] IDENTITY(1,1) NOT NULL,
	[PersonalInfoId] [nvarchar](100) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[AccountID] [nvarchar](100) NULL,
	[IdCardNum] [nvarchar](20) NULL,
	[Name] [nvarchar](50) NULL,
	[Sexual_Cov] [int] NULL,
	[Birthday] [int] NULL,
	[Birthday_Cov] [datetime] NULL,
	[TotalProperty] [float] NULL,
	[Email] [nvarchar](100) NULL,
	[Address] [nvarchar](200) NULL,
	[RegisterDate] [int] NULL,
	[RegisterDate_Cov] [datetime] NULL,
	[BankName] [nvarchar](10) NULL,
	[Branch] [nvarchar](10) NULL,
	[BankAccount] [nvarchar](30) NULL,
	[Verifiedbank] [nvarchar](20) NULL,
	[VerifyDate] [int] NULL,
	[VerifyDate_Cov] [datetime] NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[IsCaseMark] [bit] NOT NULL,
	[Sexual] [nvarchar](10) NULL,
 CONSTRAINT [PK__CryptoPersonalInfo_API] PRIMARY KEY CLUSTERED 
(
	[Uid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoLoginIPList]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoLoginIPList](
	[Uid] [bigint] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[IP] [nvarchar](50) NOT NULL,
	[LoginTime] [datetime] NULL,
	[LoginType] [int] NULL,
	[Country] [nvarchar](20) NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoPersonalInfoLoginIPList_API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoLoginIPList_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoLoginIPList_API](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[PersonalInfoId] [nvarchar](50) NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[IP] [nvarchar](50) NOT NULL,
	[LoginTime] [int] NULL,
	[LoginTime_Cov] [datetime] NULL,
	[LoginType] [nvarchar](10) NULL,
	[Country] [nvarchar](20) NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[LoginType_Cov] [int] NULL,
 CONSTRAINT [PK_CryptoPersonalInfoLoginIPList_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoPhone]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoPhone](
	[Uid] [bigint] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](30) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK__CryptoPe__C5B69A4AE911304A] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoPhone_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoPhone_API](
	[PersonalInfoId] [nvarchar](50) NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](30) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK__CryptoPersonalInfoPhone_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoPictures]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoPictures](
	[Uid] [bigint] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[Base64Image] [nvarchar](max) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoPersonalInfoPictures_API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoPictures_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoPictures_API](
	[PersonalInfoId] [nvarchar](50) NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[Base64Image] [nvarchar](max) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoPersonalInfoPictures_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoWallet]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoWallet](
	[Uid] [bigint] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[WallerAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NOT NULL,
	[Property] [float] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoPersonalInfoWallet_API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoWallet_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoPersonalInfoWallet_API](
	[PersonalInfoId] [nvarchar](50) NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[WallerAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NOT NULL,
	[Property] [float] NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoPersonalInfoWallet_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoQueryDetail]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoQueryDetail](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[QueryOrderTime] [datetime] NOT NULL,
	[QueryUserId] [nvarchar](10) NOT NULL,
	[RequestAgency] [int] NOT NULL,
	[QueryConditionType] [int] NOT NULL,
	[QueryValue] [nvarchar](100) NOT NULL,
	[QueryStatus] [int] NOT NULL,
	[OrderMasterNumber] [nvarchar](50) NOT NULL,
	[OrderDetailNumber] [nvarchar](50) NOT NULL,
	[QueryName] [nvarchar](20) NULL,
	[QueryPhone] [nvarchar](15) NULL,
	[QueryEmail] [nvarchar](30) NULL,
	[QueryRank] [nvarchar](20) NULL,
	[QueryUnit] [nvarchar](30) NULL,
	[ProjectCategory] [nvarchar](30) NOT NULL,
	[SearchType] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoQueryMaster]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoQueryMaster](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[CaseNo] [nvarchar](50) NOT NULL,
	[CaseName] [nvarchar](50) NOT NULL,
	[OrderMasterNumber] [nvarchar](50) NOT NULL,
	[OrderDetailCount] [int] NOT NULL,
	[RequestAgency] [int] NOT NULL,
	[QueryConditionType] [int] NOT NULL,
	[QueryOrderTime] [datetime] NOT NULL,
	[QueryUserId] [nvarchar](10) NOT NULL,
	[QueryName] [nvarchar](20) NULL,
	[QueryPhone] [nvarchar](15) NULL,
	[QueryEmail] [nvarchar](30) NULL,
	[QueryRank] [nvarchar](20) NULL,
	[QueryUnit] [nvarchar](30) NULL,
	[ProjectCategory] [nvarchar](30) NOT NULL,
	[SearchType] [int] NOT NULL,
	[ActionUserId] [nvarchar](10) NULL,
 CONSTRAINT [PK__CryptoPe__CA1E3C886A4C1E9A_copy1] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoReceiveAccount]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoReceiveAccount](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[FromAgencyType] [int] NOT NULL,
	[ReceivedTime] [datetime] NOT NULL,
	[WalletAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NOT NULL,
	[PublishTimestamp] [datetime] NOT NULL,
	[DistributionTimestamp] [datetime] NOT NULL,
	[HotWallet] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoReceiveAccount] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfo]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoTransactionInfo](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[TxID] [nvarchar](150) NULL,
	[InternalTxID] [nvarchar](100) NULL,
	[TransactionTime] [datetime] NULL,
	[TransactionType] [nvarchar](50) NULL,
	[RemittanceAccount] [nvarchar](50) NULL,
	[RemittanceAccountType] [nvarchar](100) NULL,
	[RemittanceCurrency] [nvarchar](20) NULL,
	[OutwardsaAmount] [float] NULL,
	[RemittanceBank] [nvarchar](50) NULL,
	[RemittanceBranch] [nvarchar](50) NULL,
	[BeneficiaryAccount] [nvarchar](50) NULL,
	[BeneficiaryAccountType] [nvarchar](100) NULL,
	[BeneficiaryCurrency] [nvarchar](20) NULL,
	[InwardsAmount] [float] NULL,
	[BeneficiaryBank] [nvarchar](20) NULL,
	[BeneficiaryBranch] [nvarchar](20) NULL,
	[TransactionStatus] [bit] NULL,
	[TransactionMode] [int] NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoTransactionInfo_1] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfo_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoTransactionInfo_API](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[TransactionInfoId] [nvarchar](50) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoTransactionInfo_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfoCashIn_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoTransactionInfoCashIn_API](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[TransactionInfoId] [nvarchar](50) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[TransactionType] [nvarchar](50) NULL,
	[TransactionSequence] [nvarchar](100) NULL,
	[TransactionTime] [int] NULL,
	[TransactionTime_Cov] [datetime] NULL,
	[RemittanceAccount] [nvarchar](50) NULL,
	[RemittanceCurrency] [nvarchar](20) NULL,
	[OutwardsaAmount] [float] NULL,
	[RemittanceBank] [nvarchar](50) NULL,
	[RemittanceBranch] [nvarchar](50) NULL,
	[BeneficiaryAccount] [nvarchar](100) NULL,
	[BeneficiaryCurrency] [nvarchar](20) NULL,
	[InwardsAmount] [float] NULL,
	[TransactionStatus] [nvarchar](20) NULL,
	[TransactionStatus_Cov] [bit] NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoTransactionInfoCashIn_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfoCashOut_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoTransactionInfoCashOut_API](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[TransactionInfoId] [nvarchar](50) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[TransactionSequence] [nvarchar](150) NULL,
	[TransactionTime] [int] NULL,
	[TransactionTime_Cov] [datetime] NULL,
	[RemittanceAccount] [nvarchar](50) NULL,
	[RemittanceCurrency] [nvarchar](20) NULL,
	[OutwardsaAmount] [float] NULL,
	[BeneficiaryAccount] [nvarchar](100) NULL,
	[BeneficiaryCurrency] [nvarchar](20) NULL,
	[BeneficiaryBank] [nvarchar](20) NULL,
	[BeneficiaryBranch] [nvarchar](20) NULL,
	[InwardsAmount] [float] NULL,
	[TransactionStatus] [nvarchar](20) NULL,
	[TransactionStatus_Cov] [bit] NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoTransactionInfoCashOut_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfoVirtualCash_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoTransactionInfoVirtualCash_API](
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
	[TransactionInfoId] [nvarchar](50) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[OrderNumber] [nvarchar](50) NOT NULL,
	[TxID] [nvarchar](150) NULL,
	[InternalTxID] [nvarchar](100) NULL,
	[TransactionTime] [int] NULL,
	[TransactionTime_Cov] [datetime] NULL,
	[RemittanceAccount] [nvarchar](50) NULL,
	[RemittanceAccountType] [nvarchar](100) NULL,
	[RemittanceCurrency] [nvarchar](20) NULL,
	[OutwardsaAmount] [float] NULL,
	[BeneficiaryAccount] [nvarchar](50) NULL,
	[BeneficiaryAccountType] [nvarchar](100) NULL,
	[BeneficiaryCurrency] [nvarchar](20) NULL,
	[InwardsAmount] [float] NULL,
	[TransactionStatus_Cov] [bit] NULL,
	[TransactionStatus] [nvarchar](20) NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoTransactionInfoVirtualCash_API_2] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoWallertInfoReceive_API]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoWallertInfoReceive_API](
	[Uid] [nvarchar](50) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[WalletAddress] [nvarchar](100) NOT NULL,
	[PublishTime] [int] NULL,
	[PublishTime_Cov] [datetime] NULL,
	[CurrencyType] [nvarchar](20) NULL,
	[DistributionTime] [int] NULL,
	[DistributionTime_Cov] [datetime] NULL,
	[HotWallet] [nvarchar](20) NULL,
	[HotWallet_Cov] [bit] NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoWallertInfoReceive_API] PRIMARY KEY CLUSTERED 
(
	[WalletAddress] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoWalletInfo]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoWalletInfo](
	[AAA] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[data]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[data](
	[userId] [nvarchar](50) NOT NULL,
	[userName] [nvarchar](50) NOT NULL,
	[unitCode] [nvarchar](50) NULL,
	[unitName] [nvarchar](50) NOT NULL,
	[userEmail] [nvarchar](50) NOT NULL,
	[userPhone] [nvarchar](50) NULL,
	[isValid] [nvarchar](50) NULL,
	[createTime] [nvarchar](50) NULL,
	[updateUserId] [nvarchar](50) NOT NULL,
	[updateUserName] [nvarchar](50) NOT NULL,
	[updateTime] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Enumeration]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Enumeration](
	[Category] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NULL,
 CONSTRAINT [PK_Enumeration] PRIMARY KEY CLUSTERED 
(
	[Category] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EnumerationValue]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EnumerationValue](
	[Category] [nvarchar](50) NOT NULL,
	[Value] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NULL,
 CONSTRAINT [PK_EnumerationValue] PRIMARY KEY CLUSTERED 
(
	[Category] ASC,
	[Value] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotificationInfo]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotificationInfo](
	[NotificationSeq] [bigint] IDENTITY(1,1) NOT NULL,
	[Message] [nvarchar](max) NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_NotificationInfo] PRIMARY KEY CLUSTERED 
(
	[NotificationSeq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysAuditUserApiQueryHistory]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysAuditUserApiQueryHistory](
	[AAA] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysCryptoReceivedWalletInfo]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysCryptoReceivedWalletInfo](
	[AAA] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SysUserList]    Script Date: 2022/8/29 下午 03:36:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SysUserList](
	[UserId] [nvarchar](50) NOT NULL,
	[UserName] [nvarchar](50) NULL,
	[UnitCode] [nvarchar](50) NULL,
	[UnitName] [nvarchar](50) NULL,
	[UserEmail] [nvarchar](50) NULL,
	[UserPhone] [nvarchar](50) NULL,
	[IsValid] [bit] NULL,
	[QueryRank] [nvarchar](20) NULL,
	[QueryUnit] [nvarchar](30) NULL,
	[ProjectCategory] [nvarchar](30) NOT NULL,
	[CreateTime] [datetime] NULL,
	[UpdateUserId] [nvarchar](50) NULL,
	[UpdateUserName] [nvarchar](50) NULL,
	[UpdateTime] [datetime] NULL,
 CONSTRAINT [PK_SysUserList] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BankAccount_Import] ADD  CONSTRAINT [DF_BankAccount_Import_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BankAccountDetail_Import] ADD  CONSTRAINT [DF_BankAccountDetail_Import_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BankSafeDepositBox_Import] ADD  CONSTRAINT [DF__BankSafeD__Creat__793DFFAF]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BankSafeDepositBoxDetail_Import] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BankTransaction_Import] ADD  CONSTRAINT [DF_BankTransaction_Import_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BankTransactionDetail_Import] ADD  CONSTRAINT [DF_BankTransactionDetail_Import_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BankTransactionInfoImport] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[BigTrade_Import] ADD  CONSTRAINT [DF_BigTrade_Import_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CashflowDiagram] ADD  CONSTRAINT [DF_CashflowDiagram_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoAccountOwner] ADD  CONSTRAINT [DF_CryptoAccountOwner_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoAccountOwner] ADD  CONSTRAINT [DF_CryptoAccountOwner_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[CryptoAccountOwnerWallet] ADD  CONSTRAINT [DF_CryptoAccountOwnerWallet_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoAccountOwnerWallet] ADD  CONSTRAINT [DF_CryptoAccountOwnerWallet_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo] ADD  DEFAULT ((0)) FOR [IsCaseMark]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo_API] ADD  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo_API] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo_API] ADD  CONSTRAINT [DF_CryptoPersonalInfo_API_IsCaseMark]  DEFAULT ((0)) FOR [IsCaseMark]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoLoginIPList] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoLoginIPList_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerLoginIPList_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoLoginIPList_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerLoginIPList_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPhone] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPhone_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPhone_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPhone_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPhone_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPictures] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPictures_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPictures_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPictures_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPictures_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoWallet] ADD  DEFAULT ((0)) FOR [Property]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoWallet] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoWallet_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerWallet_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoWallet_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerWallet_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoQueryDetail] ADD  DEFAULT (getdate()) FOR [QueryOrderTime]
GO
ALTER TABLE [dbo].[CryptoQueryMaster] ADD  DEFAULT (getdate()) FOR [QueryOrderTime]
GO
ALTER TABLE [dbo].[CryptoReceiveAccount] ADD  CONSTRAINT [DF_CryptoReceiveAccount_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoTransactionInfo] ADD  CONSTRAINT [DF_CryptoTransactionInfoVirtualCash _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoTransactionInfo_API] ADD  CONSTRAINT [DF_CryptoTransactionInfo_API_IsDataSync_1]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoTransactionInfo_API] ADD  CONSTRAINT [DF_CryptoTransactionInfo_API_CreateTime_1]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoTransactionInfoCashIn_API] ADD  CONSTRAINT [DF_CryptoTransactionInfoCashIn _API_IsDataSync_1]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoTransactionInfoCashIn_API] ADD  CONSTRAINT [DF_CryptoTransactionInfoCashIn _API_CreateTime_1]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoTransactionInfoCashOut_API] ADD  CONSTRAINT [DF_CryptoTransactionInfoCashOut _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoTransactionInfoCashOut_API] ADD  CONSTRAINT [DF_CryptoTransactionInfoCashOut _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoTransactionInfoVirtualCash_API] ADD  CONSTRAINT [DF_CryptoTransactionInfoVirtualCash _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoWallertInfoReceive_API] ADD  CONSTRAINT [DF_CryptoWallertInfoReceive_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoWallertInfoReceive_API] ADD  CONSTRAINT [DF_CryptoWallertInfoReceive_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[NotificationInfo] ADD  CONSTRAINT [DF_NotificationInfo_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[SysUserList] ADD  CONSTRAINT [DF_SysUserList_QueryRank]  DEFAULT (N'調查官') FOR [QueryRank]
GO
ALTER TABLE [dbo].[SysUserList] ADD  CONSTRAINT [DF_SysUserList_ProjectCategory]  DEFAULT (N'刑事調查') FOR [ProjectCategory]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號(GUID)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'BankAccountImportSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'CaseName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'PersonalId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'BankCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入原始檔案名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'OriginCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入後新檔案名稱, {GUID}.csv' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'NewCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'csv檔案儲存子路徑' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'SubCsvFilePath'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'檔案的MD5,用來偵測是否重複匯入檔案' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import', @level2type=N'COLUMN',@level2name=N'FileMD5'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'銀行開戶資料匯入主表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccount_Import'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號,對應BankAccountImport' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'BankAccountImportSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證統一編號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'IdCardNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'開戶行總分支機構代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'BankBranchCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'存款種類' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'幣別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'戶名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'住家電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'LocalPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'行動電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'MobilePhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'戶籍地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'ResidenceAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'通訊地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'MailingAddresses'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料提供日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'DataProvidedDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料提供日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'DataProvidedDate_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'開戶日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountOpeningDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'開戶日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountOpeningDate_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'結清日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountClosingDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'結清日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountClosingDate_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料提供日結餘' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountBalance'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料提供日結餘' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'AccountBalance_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'備註' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'Remark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankAccountDetail_Import', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號(GUID)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'BankDepositBoxSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'CaseName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'PersonalId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'BankCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入原始檔案名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'OriginCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入後新檔案名稱 GUID, .csv' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'NewCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'csv檔案儲存子路徑' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'SubCsvFilePath'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'檔案的MD5,用來偵測是否重複匯入檔案' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBox_Import', @level2type=N'COLUMN',@level2name=N'FileMD5'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應GUID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'BankDepositBoxSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證統一編號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'IdCardNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'出租行總分支機構代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'BankBranchCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'承租種類' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'BoxRentType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'承租人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'Renter'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'市內電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'LocalPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'行動電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'MobilePhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'戶籍地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'ResidenceAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'通訊地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'MailingAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'箱號或室號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'BoxNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料提供日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'DataProvidedTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料提供日(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'DataProvidedTime_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'承租日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'RentDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'承租日(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'RentDate_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'退租日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'LeaseCancellationDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'退租日(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'LeaseCancellationDate_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'備註' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'Remark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'BankSafeDepositBoxInfoImport(金融機構調閱回覆-保管箱資料匯入)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankSafeDepositBoxDetail_Import'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號(GUID)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'BankAccountImportSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'CaseName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'PersonalId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'BankCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入原始檔案名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'OriginCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入後新檔案名稱, {GUID}.csv' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'NewCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'csv檔案儲存子路徑' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'SubCsvFilePath'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'檔案的MD5,用來偵測是否重複匯入檔案' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransaction_Import', @level2type=N'COLUMN',@level2name=N'FileMD5'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號,對應BankAccountImport' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'BankTransactionImportSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證統一編號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'IdCardNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'TransactionAccountId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'TransactionId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'TransactionDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'TransactionTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易行' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'TransactionBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易摘要' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'TransactionSummary'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'幣別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'支出金額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'PayoutMoneyAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'存入金額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'DepositMoneyAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'餘額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'Balance'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ATM或端末機代號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'AtmDeviceCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'櫃員代號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'BankTellerId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出入行庫代碼及帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'BankCodeAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'備註' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'Remark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionDetail_Import', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'CaseName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'PersonalId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證統一編號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'IdCardNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'TransactionAccountId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'TransactionId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'TransactionDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'TransactionTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易行' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'TransactionBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易摘要' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'TransactionSummary'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'幣別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'支出金額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'PayoutMoneyAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'存入金額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'DepositMoneyAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'餘額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'Balance'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ATM或端末機代號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'AtmDeviceCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'櫃員代號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'BankTellerId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出入行庫代碼及帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'BankCodeAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'備註' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'Remark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'BankTransactionInfoImport(銀行調閱回覆-交易明細匯入)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BankTransactionInfoImport'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號(GUID)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'BankTradeImportSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'CaseName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'PersonalId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'BankCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入原始檔案名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'OriginCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'匯入後新檔案名稱, {GUID}.csv' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'NewCsvFileName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'csv檔案儲存子路徑' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'SubCsvFilePath'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'檔案的MD5,用來偵測是否重複匯入檔案' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTrade_Import', @level2type=N'COLUMN',@level2name=N'FileMD5'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號(GUID)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'BankTradeImportSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'大額序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'BigTradeId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'CustomerAccountId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'CustomerName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶統編' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'CustomerId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易人姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'RemitterName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易人統編' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'RemitterId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'RemitterPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'RemitTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易金額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'RemitAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易行' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'RemitBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易種類' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'RemitType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'受款人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'Beneficiary'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'受款帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccountId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'備註' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'Memo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'申報時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'DeclarationTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'CustomerPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeDetail_Import', @level2type=N'COLUMN',@level2name=N'CustomerAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'大額序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'BigTradeId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'CustomerAccountId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'CustomerName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶統編' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'CustomerId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易人姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'RemitterName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易人統編' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'RemitterId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'RemitterPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'RemitTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易金額' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'RemitAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易行' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'RemitBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易種類' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'RemitType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'受款人' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'Beneficiary'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'受款帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccountId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'備註' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'Memo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'申報時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'DeclarationTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'CustomerPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'客戶地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BigTradeInfo', @level2type=N'COLUMN',@level2name=N'CustomerAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CashflowDiagram', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CashflowDiagram', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CashflowDiagram', @level2type=N'COLUMN',@level2name=N'CaseName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CashflowDiagram', @level2type=N'COLUMN',@level2name=N'PersonalId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'金流圖代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CashflowDiagram', @level2type=N'COLUMN',@level2name=N'CashflowDiagramId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CashflowDiagram', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwner', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'生日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwner', @level2type=N'COLUMN',@level2name=N'Birthday'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'性別 , 0=男, 1=女, 2=Unknown' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwner', @level2type=N'COLUMN',@level2name=N'Sexual'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'最後更新調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwner', @level2type=N'COLUMN',@level2name=N'LastOrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代碼 , bitpro / .....' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwner', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwner', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料修改時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwner', @level2type=N'COLUMN',@level2name=N'UpdateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'最後更新調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwnerWallet', @level2type=N'COLUMN',@level2name=N'LastOrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwnerWallet', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwnerWallet', @level2type=N'COLUMN',@level2name=N'WallerAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwnerWallet', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwnerWallet', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料修改時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAccountOwnerWallet', @level2type=N'COLUMN',@level2name=N'UpdateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所
    public enum AgencyTypeEnum
    {
        [Remark("ACE")]
        ACE = 1,
        [Remark("MaiCoin")]
        MaiCoin = 2,
        [Remark("BitoPro")]
        BitoPro = 3,
        [Remark("BITGIN")]
        BITGIN = 4
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所內個人帳戶ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'AccountID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'性別
    public enum SexualEnum
    {
        [Remark("男")]
        male = 1,
        [Remark("女")]
        female = 2,
        [Remark("未知")]
        unknown = 3
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Sexual'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'生日' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Birthday'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人總資產，包含各錢包餘額以及幣商平台內餘額以新台幣計算' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'TotalProperty'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電子郵件信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'居住地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Address'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'註冊日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'RegisterDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'BankName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'分行名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Branch'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'銀行帳戶' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'BankAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'認證銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Verifiedbank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'驗證日期' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'VerifyDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料回覆時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'ReceiveTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料對應序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'Uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'本案標記' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo', @level2type=N'COLUMN',@level2name=N'IsCaseMark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個資調閱回覆內容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'唯一序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'PersonalInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代碼 , bitpro / .....
    /// <summary>
    /// 交易所種類
    /// </summary>
    public enum ExchangeTypeEnum
    {
        [Remark("unknown")]
        unknown = 0,
        [Remark("ACE")]
        ACE = 1,
        [Remark("MaiCoin")]
        MaiCoin = 2,
        [Remark("BitoPro")]
        BitoPro = 3,
        [Remark("BITGIN")]
        BITGIN = 4
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所內個人帳戶ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'AccountID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Name'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'性別 , male/female/unknown
    /// <summary>
    /// 性別
    /// </summary>
    public enum SexualEnum
    {
        [Remark("未知")]
        unknown = 0
        [Remark("男")]
        male = 1,
        [Remark("女")]
        female = 2,
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Sexual_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'生日(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Birthday'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'生日(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Birthday_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人總資產，包含各錢包餘額以及幣商平台內餘額以新台幣計算' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'TotalProperty'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電子郵件信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'居住地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Address'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'註冊日期(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'RegisterDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'註冊日期(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'RegisterDate_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'BankName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'分行名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Branch'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'銀行帳戶' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'BankAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'認證銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Verifiedbank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'驗證日期(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'VerifyDate'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'驗證日期(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'VerifyDate_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'本案標記' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'IsCaseMark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'性別 , male/female/unknown' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API', @level2type=N'COLUMN',@level2name=N'Sexual'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回個資調閱結果' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfo_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應CryptoPersonalInfo Uid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'Uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入來源IP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'IP'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'LoginTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入類別,  Web/APP
    public enum LoginTypeEnum
    {
        [Remark("Web")]
        Web = 1,
        [Remark("APP")]
        APP = 2
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'LoginType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'國家英文縮寫' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'Country'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個資調閱返回登入IP 列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'PersonalInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入來源IP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'IP'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入時間(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'LoginTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入時間(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'LoginTime_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入類別,  Web/APP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'LoginType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'國家英文縮寫' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'Country'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'登入類別(轉換過),  Web/APP
    /// <summary>
    /// 登入類別,  Web/APP
    /// </summary>
    public enum LoginTypeEnum
    {
        [Remark("未知")]
        unknown = 0,
        [Remark("Web")]
        Web = 1,
        [Remark("APP")]
        APP = 2
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API', @level2type=N'COLUMN',@level2name=N'LoginType_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回個資調閱結果IP列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoLoginIPList_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應CryptoPersonalInfo Uid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone', @level2type=N'COLUMN',@level2name=N'Uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone', @level2type=N'COLUMN',@level2name=N'Phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個資調閱返回登入電話列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone_API', @level2type=N'COLUMN',@level2name=N'PersonalInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone_API', @level2type=N'COLUMN',@level2name=N'Phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回個資調閱結果電話列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPhone_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應CryptoPersonalInfo Uid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures', @level2type=N'COLUMN',@level2name=N'Uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'照片' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures', @level2type=N'COLUMN',@level2name=N'Base64Image'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個資調閱返回相片列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures_API', @level2type=N'COLUMN',@level2name=N'PersonalInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'照片' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures_API', @level2type=N'COLUMN',@level2name=N'Base64Image'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回個資調閱結果相片列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoPictures_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應CryptoPersonalInfo Uid' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet', @level2type=N'COLUMN',@level2name=N'Uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet', @level2type=N'COLUMN',@level2name=N'WallerAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包虛擬幣數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet', @level2type=N'COLUMN',@level2name=N'Property'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個資調閱回覆錢包地址列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'PersonalInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'WallerAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別, Enumeration.CryptoCurrencyType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包虛擬幣數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'Property'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回個資調閱結果錢包列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoPersonalInfoWallet_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryOrderTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryUserId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所
    public enum AgencyTypeEnum
    {
        [Remark("ACE")]
        ACE = 1,
        [Remark("MaiCoin")]
        MaiCoin = 2,
        [Remark("BitoPro")]
        BitoPro = 3,
        [Remark("BITGIN")]
        BITGIN = 4
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'RequestAgency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'查詢條件
    public enum QueryTypeEnum
    {
        [Remark("walletAddress")]
        walletAddress = 1,
        [Remark("internalAccount")]
        internalAccount = 2,
        [Remark("transactionSquence")]
        transactionSquence = 3,
        [Remark("idCardNumber")]
        idCardNumber = 4,
        [Remark("bankAccount")]
        bankAccount = 5,
        [Remark("TxID")]
        TxID = 6,
        [Remark("phone")]
        phone = 7,
        [Remark("email")]
        email = 8
    }
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryConditionType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'拋查值-查詢的內容' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryValue'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'拋查狀態 
    public enum QueryStatusEnum
    {
        [Remark("等待回覆中")]
        wait= 1,
        [Remark("資料已回覆")]
        success = 2,
        [Remark("拋查執行錯誤")]
        fail = 3
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主調閱單號,此單號用來對應同批查詢的紀錄明細
4802722071113351500
調閱單號明細
MJIB-4802722071113351500-1
MJIB-4802722071113351500-2' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'OrderMasterNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號,會送至交易所' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'OrderDetailNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人Email' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryEmail'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人職稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryRank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人任職單位(洗錢防制處)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'QueryUnit'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'刑事案類(刑事調查)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'ProjectCategory'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱來源種類
    /// <summary>
    /// 調閱類別,  個資調閱 /相關交易個資調閱=錢包反查  /交易資料調閱
    /// </summary>
    public enum QueryInfoTypeEnum
    {
        [Remark("個資調閱")]
        PersonalInfo = 1,
        [Remark("相關交易個資調閱")]  //錢包地址反查
        WalletAddress = 2,
        [Remark("交易資料調閱")]
        TransactionInfo = 3       
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail', @level2type=N'COLUMN',@level2name=N'SearchType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個資資料調閱拋查紀錄Detail' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryDetail'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'CaseNo'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'案名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'CaseName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'主調閱單號,此單號用來對應同批查詢的紀錄明細
4802722071113351500
調閱單號明細
MJIB-4802722071113351500-1
MJIB-4802722071113351500-2' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'OrderMasterNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱筆數' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'OrderDetailCount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所
    public enum AgencyTypeEnum
    {
        [Remark("ACE")]
        ACE = 1,
        [Remark("MaiCoin")]
        MaiCoin = 2,
        [Remark("BitoPro")]
        BitoPro = 3,
        [Remark("BITGIN")]
        BITGIN = 4
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'RequestAgency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'查詢條件
    public enum QueryTypeEnum
    {
        [Remark("walletAddress")]
        walletAddress = 1,
        [Remark("internalAccount")]
        internalAccount = 2,
        [Remark("transactionSquence")]
        transactionSquence = 3,
        [Remark("idCardNumber")]
        idCardNumber = 4,
        [Remark("bankAccount")]
        bankAccount = 5,
        [Remark("TxID")]
        TxID = 6,
        [Remark("phone")]
        phone = 7,
        [Remark("email")]
        email = 8
    }
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryConditionType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryOrderTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryUserId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人姓名' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人Email' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryEmail'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人職稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryRank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人任職單位(洗錢防制處)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'QueryUnit'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'刑事案類(刑事調查)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'ProjectCategory'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱來源種類
    /// <summary>
    /// 調閱類別,  個資調閱 /相關交易個資調閱=錢包反查  /交易資料調閱
    /// </summary>
    public enum QueryInfoTypeEnum
    {
        [Remark("個資調閱")]
        PersonalInfo = 1,
        [Remark("相關交易個資調閱")]  //錢包地址反查
        WalletAddress = 2,
        [Remark("交易資料調閱")]
        TransactionInfo = 3       
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'SearchType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'協助代拋查之人事五碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster', @level2type=N'COLUMN',@level2name=N'ActionUserId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個資資料調閱拋查紀錄Master' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoQueryMaster'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所 AgencyTypeEnum  ACE = 1 ,MaiCoin = 2,BitoPro = 3,BITGIN = 4' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'FromAgencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料接收時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'ReceivedTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址發行時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'PublishTimestamp'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址分配時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'DistributionTimestamp'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否為熱錢包   0 = no ,1=yes' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'HotWallet'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'定期接收帳戶資料' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoReceiveAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所  ACE = 1,MaiCoin = 2, BitoPro = 3,BITGIN = 4' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易TxID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'TxID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'內部交易序號, =InternalTxID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'InternalTxID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'TransactionTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易種類 , ATM or FamilyMart' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'TransactionType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出帳戶/內部交易帳號accountID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'RemittanceAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出帳號種類, 例如:CIB  或公司名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'RemittanceAccountType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出幣別, 例如btc' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'RemittanceCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'OutwardsaAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出銀行代碼/超商名稱(FamilyMart)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'RemittanceBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出分行代碼/付款超商分店代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'RemittanceBranch'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入帳戶/內部交易帳號accountID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入帳號種類, 例如eth 或公司名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccountType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入幣別, 例如eth' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'BeneficiaryCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'InwardsAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'BeneficiaryBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入分行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'BeneficiaryBranch'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易狀態, success or fail' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'TransactionStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N' 1(虛擬幣->虛擬幣)  2(虛擬幣->法幣) 3(法幣->虛擬幣)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'TransactionMode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo_API', @level2type=N'COLUMN',@level2name=N'TransactionInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代碼 , bitpro / .....
    /// <summary>
    /// 交易所種類
    /// </summary>
    public enum ExchangeTypeEnum
    {
        [Remark("unknown")]
        unknown = 0,
        [Remark("ACE")]
        ACE = 1,
        [Remark("MaiCoin")]
        MaiCoin = 2,
        [Remark("BitoPro")]
        BitoPro = 3,
        [Remark("BITGIN")]
        BITGIN = 4
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回交易紀錄調閱結果' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfo_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'TransactionInfo 流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'TransactionInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代碼 , bitpro / .....' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易種類 , ATM or FamilyMart' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'TransactionType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'TransactionSequence'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'TransactionTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'TransactionTime_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'現金轉出帳號/超商繳費可不填' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'RemittanceAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出幣別, 例如ntd' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'RemittanceCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'現金轉出數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'OutwardsaAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出銀行代碼/超商名稱(FamilyMart)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'RemittanceBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出分行代碼/付款超商分店代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'RemittanceBranch'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'虛擬貨幣轉入的錢包地址/虛擬帳戶' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'虛擬貨幣轉入幣別, 例如eth' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'虛擬貨幣轉入數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'InwardsAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易狀態, success or fail(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'TransactionStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易狀態, success or fail(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'TransactionStatus_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回交易紀錄調閱現金轉虛擬貨幣' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashIn_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'TransactionInfo 流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'TransactionInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代碼 , bitpro / .....' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'TransactionSequence'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'TransactionTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'TransactionTime_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'虛擬貨幣轉出的錢包地址/虛擬帳戶ID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'RemittanceAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'虛擬貨幣轉出幣別，例如btc' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'RemittanceCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'虛擬貨幣轉出數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'OutwardsaAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入幣別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入銀行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryBank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入分行代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryBranch'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'虛擬貨幣轉入數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'InwardsAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易狀態, success or fail(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'TransactionStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易狀態, success or fail(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'TransactionStatus_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回交易紀錄調閱虛擬貨幣轉現金' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoCashOut_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'對應序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'TransactionInfoId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代碼 , bitpro / .....' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱單號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'OrderNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易TxID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'TxID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'平台間內部交易TxID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'InternalTxID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'TransactionTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易時間(已轉換)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'TransactionTime_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出帳戶/內部交易帳號accountID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'RemittanceAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出帳號種類, 例如:CIB  或公司名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'RemittanceAccountType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出幣別, 例如btc' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'RemittanceCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉出數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'OutwardsaAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入帳戶/內部交易帳號accountID' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入帳號種類, 例如eth 或公司名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryAccountType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入幣別, 例如eth' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'BeneficiaryCurrency'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'轉入數量' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'InwardsAmount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易狀態, success or fail(已轉換)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'TransactionStatus_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易狀態, success or fail(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'TransactionStatus'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'返回交易紀錄調閱虛擬貨幣交易紀錄' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoTransactionInfoVirtualCash_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'亂數唯一序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'Uid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代碼 , bitpro / .....
    public enum AgencyTypeEnum
    {
        [Remark("ACE")]
        ACE = 1,
        [Remark("MaiCoin")]
        MaiCoin = 2,
        [Remark("BitoPro")]
        BitoPro = 3,
        [Remark("BITGIN")]
        BITGIN = 4
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包發行時間(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'PublishTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包發行時間(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'PublishTime_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別, Enumeration.CryptoCurrencyType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'分配時間(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'DistributionTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'分配時間(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'DistributionTime_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否為熱錢包(原始)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'HotWallet'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否為熱錢包(轉換過)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'HotWallet_Cov'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'定期帳戶資料交換' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWallertInfoReceive_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'列舉類別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Enumeration', @level2type=N'COLUMN',@level2name=N'Category'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'描述' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Enumeration', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'列舉類別' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'EnumerationValue', @level2type=N'COLUMN',@level2name=N'Category'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'列舉值' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'EnumerationValue', @level2type=N'COLUMN',@level2name=N'Value'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'列舉值-描述' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'EnumerationValue', @level2type=N'COLUMN',@level2name=N'Description'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationInfo', @level2type=N'COLUMN',@level2name=N'NotificationSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'NotificationInfo', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'使用者帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UserId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'使用者名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'單位代碼' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UnitCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'單位名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UnitName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電子信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UserEmail'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'連絡電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UserPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'有效' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'IsValid'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人職稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'QueryRank'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'調閱人任職單位(洗錢防制處)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'QueryUnit'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'刑事案類(刑事調查)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'ProjectCategory'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'最後異動人員帳號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UpdateUserId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'最後異動人員名稱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UpdateUserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'最後異動時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SysUserList', @level2type=N'COLUMN',@level2name=N'UpdateTime'
GO
