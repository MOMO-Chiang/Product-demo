import { fetchBankTransactionsDetail } from '@app/apis/admin/bank-transaction';
import { AppState } from '@app/store';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_COUNT,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL_PAGE,
  DEFAULT_TOTAL_PAGE_COUNT,
} from '@shared/constants';
import { SortedType } from '@shared/enums';
import { bankTransactionDetail } from '@shared/types';
import React, { useEffect, useState } from 'react';
import { DataColumn, DataTable, PaginatedButtonClickFunc, Pagination, RenderColumnFunc } from '../data-table';

export type bankTransactionDetailTableField = keyof (bankTransactionDetail & {
  actions: string;
});
export type DataTableProps<T = any> = {
  /** id */
  id: string;
  /** 外層table id */
  parentid: string;
  /** 是否取得明細 */
  isFetch: boolean;
  /** 是否取得明細 */
  searchParams: {
    /** 身分證帳號 */
    idCardNumber: string;
    /** 交易帳號 */
    transactionAccountId: string;
    /** 交易行 */
    transactionBank: string;
    /** 交易摘要 */
    transactionSummary: string;
    /** 交易日期(起) */
    transactionTimeStart: string;
    /** 交易日期(迄) */
    transactionTimeEnd: string;
  };
};

export const DetailDataTable: React.FC<DataTableProps> = ({ id, parentid, isFetch, searchParams }) => {
  useEffect(() => {
    const fetchDetailData = async () => {
      const data = await fetchBankTransactionsDetail(currentFetchBankTransactionDetailParams);
      setbankTransacctionDetail(data.data as bankTransactionDetail[]);
      setPaginatedInfo({
        page: data.paginatedInfo.page,
        pageCount: data.paginatedInfo.pageCount,
        totalPage: data.paginatedInfo.totalPage,
        totalCount: data.paginatedInfo.totalCount,
        pageSize: data.paginatedInfo.pageSize,
      });
    };
    fetchDetailData();
  }, [isFetch]);
  /** 分頁資訊資料 */
  const [paginatedInfo, setPaginatedInfo] = useState({
    page: DEFAULT_PAGE,
    pageCount: DEFAULT_PAGE_COUNT,
    totalPage: DEFAULT_TOTAL_PAGE,
    totalCount: DEFAULT_TOTAL_PAGE_COUNT,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  /** 當前取得帳號資料的搜尋條件資料 */
  const [currentFetchBankTransactionDetailParams, setcurrentFetchBankTransactionDetailParams] = useState({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    sortedColumn: '',
    sortedType: SortedType.DESC,
    transactionAccountId: searchParams.transactionAccountId == '' ? id : searchParams.transactionAccountId,
    idCardNumber: searchParams.idCardNumber,
    transactionBank: searchParams.transactionBank,
    transactionSummary: searchParams.transactionSummary,
    transactionTimeStart: searchParams.transactionTimeStart,
    transactionTimeEnd: searchParams.transactionTimeEnd,
  });

  /** 處理 DataTable 換頁事件 */
  const handlePageChange = (nextPage: number) => {
    var params = {
      ...currentFetchBankTransactionDetailParams,
      page: nextPage,
    };
    setcurrentFetchBankTransactionDetailParams(params);
    setPaginatedInfo({
      ...paginatedInfo,
      page: nextPage,
    });
    const fetchDetailData = async () => {
      const data = await fetchBankTransactionsDetail(params);
      setbankTransacctionDetail(data.data as bankTransactionDetail[]);
    };
    fetchDetailData();
  };

  const [dataTableColumns] = useState([
    { field: 'transactionId', name: '交易序號' },
    { field: 'transactionTime', name: '交易時間' },
    { field: 'transactionBank', name: '交易行' },
    { field: 'transactionSummary', name: '交易摘要' },
    { field: 'currencyType', name: '幣別' },
    { field: 'payoutMoneyAmount', name: '支出金額' },
    { field: 'depositMoneyAmount', name: '存入金額' },
    { field: 'balance', name: '餘額' },
    { field: 'atmDeviceCode', name: 'ATM或端末機代號' },
    { field: 'bankTellerId', name: '櫃員代號' },
    { field: 'bankCodeAccount', name: '轉出入行庫代碼及帳號' },
    { field: 'remark', name: '備註' },
    { field: 'createTime', name: '資料匯入時間' },
    //{ field: 'fileMD5', name: '檔案MD5' },
  ]);
  const [bankTransactionDetail, setbankTransacctionDetail] = useState([] as bankTransactionDetail[]);
  const [handleSortedColumnChange] = useState();
  const [isFetchBankTransactionsLoading] = useState();

  /** Render DataTable Columns */
  const renderColumnDetail: RenderColumnFunc<bankTransactionDetail, bankTransactionDetailTableField> = ({ field, data }) => {
    if (field === 'actions') {
      return <DataColumn></DataColumn>;
    }
    return <DataColumn>{data[field]}</DataColumn>;
  };

  return (
    <div id={'expand' + id} className="accordion-collapse collapse" data-bs-parent={`#${parentid}`}>
      <DataTable
        columns={dataTableColumns}
        data={bankTransactionDetail}
        onSortChange={handleSortedColumnChange}
        sortedColumn={''}
        sortedType={SortedType.ASC}
        renderColumn={renderColumnDetail}
        keyExtractor={(item: bankTransactionDetail) => item.seq}
        isLoading={isFetchBankTransactionsLoading}
      />
      <div style={{ width: '25%', marginLeft: '20px' }}>
        <Pagination
          page={paginatedInfo.page}
          totalPage={paginatedInfo.totalPage}
          pageSize={paginatedInfo.pageSize}
          totalCount={paginatedInfo.totalCount}
          onPaginatedButtonClick={handlePageChange}
          disabled={isFetchBankTransactionsLoading}
        />
      </div>
    </div>
  );
};
