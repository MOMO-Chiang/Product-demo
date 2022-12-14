USE [PaymentFlowAnalysisDMZ]
GO
/****** Object:  Table [dbo].[CryptoAddBlackAccount_API]    Script Date: 2022/8/29 下午 03:39:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoAddBlackAccount_API](
	[AddBlackAccountSeq] [bigint] IDENTITY(1,1) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[WalletAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[IdCardNum] [nvarchar](20) NOT NULL,
	[Risklevel] [int] NULL,
	[Url] [nvarchar](300) NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoBlackAccount _API] PRIMARY KEY CLUSTERED 
(
	[AddBlackAccountSeq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoAddBlackAccountIP_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoAddBlackAccountIP_API](
	[AddBlackAccountSeq] [bigint] NOT NULL,
	[IP] [nvarchar](50) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoAddBlackAccountIP _API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoAddBlackAccountPhone_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoAddBlackAccountPhone_API](
	[AddBlackAccountSeq] [bigint] NOT NULL,
	[Phone] [nvarchar](30) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoAddBlackAccountPhone _API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlackAccount]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlackAccount](
	[WalletAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[IdCardNum] [nvarchar](20) NOT NULL,
	[Risklevel] [int] NULL,
	[Url] [nvarchar](300) NULL,
	[CreateTime] [datetime] NOT NULL,
	[UpdateTime] [datetime] NOT NULL,
	[Remark] [nvarchar](max) NULL,
 CONSTRAINT [PK_CryptoBlackAccount] PRIMARY KEY CLUSTERED 
(
	[WalletAddress] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlackAccount_Original]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlackAccount_Original](
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
	[walletAddress] [nvarchar](50) NOT NULL,
	[currencyType] [nvarchar](20) NOT NULL,
	[email] [nvarchar](200) NULL,
	[phone] [nvarchar](500) NULL,
	[ip] [nvarchar](500) NULL,
	[idCardNumber] [nvarchar](100) NULL,
	[url] [nvarchar](200) NULL,
	[riskLevel] [int] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[exchange] [int] NULL,
 CONSTRAINT [PK__CryptoBl__DDDFBCBEF6E14696] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlackAccountEmail]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlackAccountEmail](
	[WalletAddress] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[UpdateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlackAccountIP]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlackAccountIP](
	[WalletAddress] [nvarchar](100) NOT NULL,
	[IP] [nvarchar](50) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[UpdateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlackAccountPhone]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlackAccountPhone](
	[WalletAddress] [nvarchar](100) NOT NULL,
	[Phone] [nvarchar](30) NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[UpdateTime] [datetime] NOT NULL,
	[Seq] [bigint] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlacklistBroadcast_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlacklistBroadcast_API](
	[BlacklistBroadcastSeq] [bigint] IDENTITY(1,1) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[WalletAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NULL,
	[IdCardNum] [nvarchar](20) NOT NULL,
	[Risklevel] [int] NULL,
	[Url] [nvarchar](300) NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoBlacklistBroadcast _API] PRIMARY KEY CLUSTERED 
(
	[BlacklistBroadcastSeq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlacklistBroadcast_Original]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlacklistBroadcast_Original](
	[seq] [bigint] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[walletAddress] [nvarchar](100) NULL,
	[currencyType] [nvarchar](20) NULL,
	[email] [nvarchar](500) NULL,
	[phone] [nvarchar](500) NULL,
	[ip] [nvarchar](500) NULL,
	[idCardNumber] [nvarchar](30) NULL,
	[url] [nvarchar](200) NULL,
	[riskLevel] [int] NULL,
	[CreateTime] [datetime] NOT NULL,
	[exchange] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlacklistBroadcastEmail_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlacklistBroadcastEmail_API](
	[BlacklistBroadcastSeq] [bigint] NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoBlacklistBroadcastEmail_API] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlacklistBroadcastIP_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlacklistBroadcastIP_API](
	[BlacklistBroadcastSeq] [bigint] NOT NULL,
	[IP] [nvarchar](50) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoBlacklistBroadcastIP_API] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoBlacklistBroadcastPhone_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoBlacklistBroadcastPhone_API](
	[BlacklistBroadcastSeq] [bigint] NOT NULL,
	[Phone] [nvarchar](30) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoBlacklistBroadcastPhone_API] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoErrorLog]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoErrorLog](
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
	[create_at] [datetime] NOT NULL,
	[original_data] [nvarchar](max) NOT NULL,
	[error_message] [nvarchar](255) NOT NULL,
	[exchange_code] [nvarchar](20) NOT NULL,
	[api] [nvarchar](100) NOT NULL,
	[source_ip] [varchar](20) NOT NULL,
	[exception_message] [nvarchar](max) NULL,
 CONSTRAINT [PK__CryptoErrorLog] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfo_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK__CryptoPe__C5B69A4A169E2C43] PRIMARY KEY CLUSTERED 
(
	[Uid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoLoginIPList_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoPersonalInfoLoginIPList_API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoPhone_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK__CryptoPe__C5B69A4AE911304A] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoPictures_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoPersonalInfoPictures_API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoPersonalInfoWallet_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoPersonalInfoWallet_API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfo_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoTransactionInfo_API_1] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfoCashIn_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoTransactionInfoCashIn _API_1] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfoCashOut_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoTransactionInfoCashOut _API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoTransactionInfoVirtualCash_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoTransactionInfoVirtualCash _API] PRIMARY KEY CLUSTERED 
(
	[Seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoUpdateBlackAccount_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoUpdateBlackAccount_API](
	[UpdateBlackAccountSeq] [bigint] IDENTITY(1,1) NOT NULL,
	[ExchangeTypeCode] [int] NOT NULL,
	[WalletAddress] [nvarchar](100) NOT NULL,
	[CurrencyType] [nvarchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[IdCardNum] [nvarchar](20) NULL,
	[Risklevel] [int] NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_CryptoUpdateBlackAccount _API] PRIMARY KEY CLUSTERED 
(
	[UpdateBlackAccountSeq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoUpdateBlackAccountIP_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoUpdateBlackAccountIP_API](
	[UpdateBlackAccountSeq] [bigint] NOT NULL,
	[IP] [nvarchar](50) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoUpdateBlackAccountIP _API] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoUpdateBlackAccountPhone_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoUpdateBlackAccountPhone_API](
	[UpdateBlackAccountSeq] [bigint] NOT NULL,
	[Phone] [nvarchar](30) NOT NULL,
	[IsDataSync] [bit] NOT NULL,
	[CreateTime] [datetime] NOT NULL,
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CryptoUpdateBlackAccountPhone _API] PRIMARY KEY CLUSTERED 
(
	[seq] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoWallertInfoReceive_API]    Script Date: 2022/8/29 下午 03:39:40 ******/
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
 CONSTRAINT [PK_CryptoWallertInfoReceive_API_1] PRIMARY KEY CLUSTERED 
(
	[WalletAddress] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CryptoWhiteList]    Script Date: 2022/8/29 下午 03:39:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CryptoWhiteList](
	[seq] [bigint] IDENTITY(1,1) NOT NULL,
	[exchange_code] [nvarchar](20) NOT NULL,
	[ip] [nvarchar](20) NOT NULL,
	[apikey] [nvarchar](255) NOT NULL,
	[type_enum] [int] NOT NULL,
 CONSTRAINT [PK__CryptoWhiteList] PRIMARY KEY CLUSTERED 
(
	[apikey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CryptoAddBlackAccount_API] ADD  CONSTRAINT [DF_CryptoBlackAccount _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoAddBlackAccount_API] ADD  CONSTRAINT [DF_CryptoBlackAccount _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoAddBlackAccountIP_API] ADD  CONSTRAINT [DF_CryptoAddBlackAccountIP _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoAddBlackAccountIP_API] ADD  CONSTRAINT [DF_CryptoAddBlackAccountIP _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoAddBlackAccountPhone_API] ADD  CONSTRAINT [DF_CryptoAddBlackAccountPhone _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoAddBlackAccountPhone_API] ADD  CONSTRAINT [DF_CryptoAddBlackAccountPhone _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccount] ADD  CONSTRAINT [DF_CryptoBlackAccount_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccount] ADD  CONSTRAINT [DF_CryptoBlackAccount_CreateTime1]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccount_Original] ADD  CONSTRAINT [DF__CryptoBla__Creat__6F7F8B4B]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccountEmail] ADD  CONSTRAINT [DF_CryptoBlackAccountEmail_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccountEmail] ADD  CONSTRAINT [DF_CryptoBlackAccountEmail_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccountIP] ADD  CONSTRAINT [DF_CryptoBlackAccountIP_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccountIP] ADD  CONSTRAINT [DF_CryptoBlackAccountIP_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccountPhone] ADD  CONSTRAINT [DF_CryptoBlackAccountPhone_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlackAccountPhone] ADD  CONSTRAINT [DF_CryptoBlackAccountPhone_UpdateTime]  DEFAULT (getdate()) FOR [UpdateTime]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcast_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcast _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcast_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcast _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcast_Original] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcastEmail_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcastEmail_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcastEmail_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcastEmail_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcastIP_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcastIP_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcastIP_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcastIP_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcastPhone_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcastPhone_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoBlacklistBroadcastPhone_API] ADD  CONSTRAINT [DF_CryptoBlacklistBroadcastPhone_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo_API] ADD  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo_API] ADD  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfo_API] ADD  CONSTRAINT [DF_CryptoPersonalInfo_API_IsCaseMark]  DEFAULT ((0)) FOR [IsCaseMark]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoLoginIPList_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerLoginIPList_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoLoginIPList_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerLoginIPList_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPhone_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPhone_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPhone_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPhone_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPictures_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPictures_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoPictures_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerPictures_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoWallet_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerWallet_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoPersonalInfoWallet_API] ADD  CONSTRAINT [DF_CryptoAccountOwnerWallet_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
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
ALTER TABLE [dbo].[CryptoTransactionInfoVirtualCash_API] ADD  CONSTRAINT [DF_CryptoTransactionInfoVirtualCash _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoUpdateBlackAccount_API] ADD  CONSTRAINT [DF_CryptoUpdateBlackAccount _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoUpdateBlackAccount_API] ADD  CONSTRAINT [DF_CryptoUpdateBlackAccount _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoUpdateBlackAccountIP_API] ADD  CONSTRAINT [DF_CryptoUpdateBlackAccountIP _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoUpdateBlackAccountIP_API] ADD  CONSTRAINT [DF_CryptoUpdateBlackAccountIP _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoUpdateBlackAccountPhone_API] ADD  CONSTRAINT [DF_CryptoUpdateBlackAccountPhone _API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoUpdateBlackAccountPhone_API] ADD  CONSTRAINT [DF_CryptoUpdateBlackAccountPhone _API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
ALTER TABLE [dbo].[CryptoWallertInfoReceive_API] ADD  CONSTRAINT [DF_CryptoWallertInfoReceive_API_IsDataSync]  DEFAULT ((0)) FOR [IsDataSync]
GO
ALTER TABLE [dbo].[CryptoWallertInfoReceive_API] ADD  CONSTRAINT [DF_CryptoWallertInfoReceive_API_CreateTime]  DEFAULT (getdate()) FOR [CreateTime]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新增黑名單流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'AddBlackAccountSeq'
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
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別, Enumeration.CryptoCurrencyType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電子郵件信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'風險類別, Enumeration.CryptoRiskLevel' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'Risklevel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單新增紀錄' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccount_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新增黑名單流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'AddBlackAccountSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'IP位置' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'IP'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單新增紀錄_IP列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountIP_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新增黑名單流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'AddBlackAccountSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'Phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單新增紀錄_電話列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoAddBlackAccountPhone_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別, Enumeration.CryptoCurrencyType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'CurrencyType'
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
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'風險類別, Enumeration.CryptoRiskLevel' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'Risklevel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料修改時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'UpdateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'備註' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount', @level2type=N'COLUMN',@level2name=N'Remark'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'walletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'幣種' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'currencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'郵件信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'手機號碼列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'IP地址列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'ip'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'idCardNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0 被害人1 交易所自行分析所得之高風險用戶2 加害者（含犯嫌與人頭戶）
0 被害人1 交易所自行分析所得之高風險用戶2 加害者（含犯嫌與人頭戶）' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'riskLevel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'    /// <summary>
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
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original', @level2type=N'COLUMN',@level2name=N'exchange'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單原始紀錄' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccount_Original'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountEmail', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電子郵件信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountEmail', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountEmail', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料修改時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountEmail', @level2type=N'COLUMN',@level2name=N'UpdateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountEmail', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單_Email列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountEmail'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountIP', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'IP位置' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountIP', @level2type=N'COLUMN',@level2name=N'IP'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountIP', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料修改時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountIP', @level2type=N'COLUMN',@level2name=N'UpdateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountIP', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單 ip 列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountIP'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountPhone', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountPhone', @level2type=N'COLUMN',@level2name=N'Phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountPhone', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料修改時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountPhone', @level2type=N'COLUMN',@level2name=N'UpdateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountPhone', @level2type=N'COLUMN',@level2name=N'Seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單 電話列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlackAccountPhone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單廣播流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'BlacklistBroadcastSeq'
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
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別, Enumeration.CryptoCurrencyType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'風險類別, Enumeration.CryptoRiskLevel' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'Risklevel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'接收黑名單廣播資料' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'walletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'幣種' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'currencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'email 列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電話 列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ip 列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'ip'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證統一編號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'idCardNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'url' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'url'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'riskLevel' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'riskLevel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代號
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
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original', @level2type=N'COLUMN',@level2name=N'exchange'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'接收黑名單廣播原始資料' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcast_Original'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單廣播流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastEmail_API', @level2type=N'COLUMN',@level2name=N'BlacklistBroadcastSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電子郵件信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastEmail_API', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastEmail_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastEmail_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastEmail_API', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'接收黑名單廣播資料email列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastEmail_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單廣播流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastIP_API', @level2type=N'COLUMN',@level2name=N'BlacklistBroadcastSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'IP位置' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastIP_API', @level2type=N'COLUMN',@level2name=N'IP'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastIP_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastIP_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastIP_API', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'接收黑名單廣播資料IP列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastIP_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'黑名單廣播流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastPhone_API', @level2type=N'COLUMN',@level2name=N'BlacklistBroadcastSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastPhone_API', @level2type=N'COLUMN',@level2name=N'Phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastPhone_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastPhone_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastPhone_API', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'接收黑名單廣播資料電話列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoBlacklistBroadcastPhone_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'create_at'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'原始資料' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'original_data'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錯誤訊息' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'error_message'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料來源交易所代號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'exchange_code'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錯誤來源API' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'api'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'發動請求ip位址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'source_ip'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Exception Message' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog', @level2type=N'COLUMN',@level2name=N'exception_message'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所資料交換錯誤紀錄' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoErrorLog'
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新增黑名單流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'UpdateBlackAccountSeq'
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
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'ExchangeTypeCode'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包地址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'WalletAddress'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'錢包幣別, Enumeration.CryptoCurrencyType' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'CurrencyType'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'電子郵件信箱' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'Email'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'身分證字號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'IdCardNum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'風險類別, Enumeration.CryptoRiskLevel' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'Risklevel'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'編輯黑名單紀錄' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccount_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新增黑名單流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'UpdateBlackAccountSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'IP位置' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'IP'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountIP_API', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'編輯黑名單紀錄IP列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountIP_API'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'新增黑名單流水號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'UpdateBlackAccountSeq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'個人電話' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'Phone'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'是否資料已同步至內網' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'IsDataSync'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'資料建立時間' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'CreateTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'自動序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountPhone_API', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'編輯黑名單紀錄電話列表' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoUpdateBlackAccountPhone_API'
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
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'序號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWhiteList', @level2type=N'COLUMN',@level2name=N'seq'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所代號' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWhiteList', @level2type=N'COLUMN',@level2name=N'exchange_code'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'ip位址' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWhiteList', @level2type=N'COLUMN',@level2name=N'ip'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'API KEY' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWhiteList', @level2type=N'COLUMN',@level2name=N'apikey'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'    /// <summary>
    /// 交易所種類
    /// </summary>
    public enum ExchangeTypeEnum
    {
        [Remark("ACE")]
        ACE = 1,
        [Remark("MaiCoin")]
        MaiCoin = 2,
        [Remark("BitoPro")]
        BitoPro = 3,
        [Remark("BITGIN")]
        BITGIN = 4
    }' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWhiteList', @level2type=N'COLUMN',@level2name=N'type_enum'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'交易所資料交換白名單' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CryptoWhiteList'
GO
