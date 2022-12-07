import React, { useEffect, useRef, useState } from 'react';
import { v4 as UUIDv4 } from 'uuid';
import { SortedType } from '@shared/enums';
import { Spinner } from '@app/components/spinner';
import { SortedButton } from '@app/components/data-table/SortedButton';
import { DataColumn } from '@app/components/data-table';

/** 延遲顯示 Loading 的毫秒數 */
const DELAY_SHOW_LOADING_MS = 500;

export type DataTableColumnConfig = {
  /** 資料物件 [key] 名稱 */
  field: string;
  /** 欄位顯示名稱 */
  name: string;
  /**
   * 是否隱藏
   * @default - false
   */
  isHidden?: boolean;
  /**
   * 是否有要顯示的子明細資料
   * @default - false
   */
  isDetail?: boolean;
  /**
   * 是否為 pk
   * @default - false
   */
  isPrimary?: boolean;
  /**
   * 是否可排序
   * @default - true
   */
  isSortable?: boolean;

  isHasHead?: boolean;

  datatableTrColor?: string;
};

export type DetailDataTableColumnConfig = {
  /** 資料物件 [key] 名稱 */
  field: string;
  /** 欄位顯示名稱 */
  name: string;
  /**
   * 是否為圖片類型欄位
   * @default - false
   */
  isImage?: boolean;
  /**
   * 是否為網址類型欄位
   * @default - false
   */
  isUrl?: boolean;
  /**
   * 是否為 true/false類型欄位
   * @default - false
   */
  isCheck?: boolean;
  /**
   * 是否為 pk
   * @default - false
   */
  isPrimary?: boolean;
  /**
   * 是否可排序
   * @default - true
   */
  isSortable?: boolean;
};

export type RenderColumnFunc<TData, TField = any> = (arg: { field: TField; data: TData }) => React.ReactNode;

export type RenderDetailColumnFunc<TData, TField = any> = (arg: {
  field: TField;
  data: TData;
  cidx: number;
}) => React.ReactNode;

export type SortChangeFunc = (field: string, sortedType: SortedType) => void;

export type ExpandDetailClickfunc = (key: string, bool: boolean) => void;

export type ChangeAllCheckboxFunc = (bool: boolean) => void;

export type ChangeRowCheckboxFunc = (key: string, bool: boolean) => void;

export type CheckAllCheckboxFunc = () => boolean;

export type CheckRowCheckboxFunc = (key: string) => boolean;

export type KeyExtractor<T> = (item: T, index: number) => string;

export type DataTableProps<T = any> = {
  /** 資料表欄位設定 */
  columns: DataTableColumnConfig[];
  /** 明細資料表欄位設定 */
  DetailColumn?: DetailDataTableColumnConfig[];
  /** 資料 */
  data?: T[];
  /** class */
  tableClassName?: string;
  /** 排序欄位 */
  sortedColumn: string;
  /** 排序方式 */
  sortedType: SortedType;
  /** Takes an item from data and renders it into the tbody. */
  renderColumn: RenderColumnFunc<T>;
  /** render明細表內容 */
  renderDetailColumn?: RenderDetailColumnFunc<T>;
  /** 排序改變事件 */
  onSortChange?: SortChangeFunc;
  /**
   * sed to extract a unique key for a given item at the specified index.
   * Key is used for caching and as the react key to track item re-ordering.
   */
  keyExtractor: KeyExtractor<T>;

  /** 是否讀取中 */
  isLoading?: boolean;

  emptyContentMessage?: string | null;

  /** 是否有子明細資料 */
  isHasExpandColumn?: boolean | null;

  exPandIndex?: string | null;
  /** 展開明細按鈕事件 */
  onExpandDetailClick?: ExpandDetailClickfunc;

  /** 是否有Checkbox */
  isHasCheckboxColumn?: boolean | null;

  /** 是否有全選Checkbox */
  isHasAllCheckbox?: boolean | null;

  /** 選取全部Checkbox事件 */
  onChangeAllCheckbox?: ChangeAllCheckboxFunc;

  /** Checkbox事件 */
  onChangeRowCheckbox?: ChangeRowCheckboxFunc;

  /** 全選Checkbox是否勾選 */
  checkIsAllCheckboxChecked?: CheckAllCheckboxFunc;

  /** Checkbox是否勾選 */
  checkIsRowCheckboxChecked?: CheckRowCheckboxFunc;

  /** 是否有全選Checkbox */
  isHasHead?: boolean | null;

  datatableTrColor?: string | null;
};

export type DataTableComponent<T extends unknown> = React.FC<DataTableProps<T>>;

/**
 * DataTable 元件
 * @returns DataTable
 */
export const DataTable: React.FC<DataTableProps> = ({
  columns,
  DetailColumn,
  data,
  tableClassName,
  sortedColumn,
  sortedType,
  onSortChange,
  keyExtractor,
  renderColumn,
  renderDetailColumn,
  isLoading,
  emptyContentMessage,
  isHasExpandColumn = false,
  exPandIndex,
  isHasCheckboxColumn,
  isHasAllCheckbox = true,
  onChangeAllCheckbox,
  checkIsAllCheckboxChecked,
  onChangeRowCheckbox,
  checkIsRowCheckboxChecked,
  isHasHead = true,
  datatableTrColor = 'inherit',
}) => {
  const [isShowLoading, setIsShowLoading] = useState<boolean>(isLoading || false);
  const setTimoutFuncRef = useRef<any | null>(null);
  const { columnConfigs, setColumnConfigs } = useColumnConfigs(columns);

  const handleSortedButtonClick = (field: string) => {
    if (onSortChange) {
      const newSortedType = sortedColumn === field && sortedType === SortedType.DESC ? SortedType.ASC : SortedType.DESC;

      onSortChange(field, newSortedType);
    }
  };

  const [dtSortBy, setSortbyState] = useState('');
  const [dtSortDirection, setSortDirectionState] = useState(true);
  /**計算顯示的欄位數**/
  const vsFieldsCount = columns.filter((el) => !el.isHidden && !el.isDetail).length;
  /**取得要顯示的明細資料Index**/
  const dtFieldsIndex = columns.findIndex((el) => el.isDetail == true);
  /**檢查是否有明細資料欄位*/
  isHasExpandColumn = dtFieldsIndex > -1 ? true : false;
  /**紀錄已開啟的明細資料 */
  const [ExpandField, setExpandField] = useState('');
  /**明細資料開關狀態**/
  const [isExpand, setIsExpand] = useState(false);
  const [isExpandList, setExpandList] = useState([] as boolean[]);
  const [ExList, setExList] = useState([] as string[]);

  /**點擊明細資料按鈕事件**/
  const handleClick = (key: string, idx: number) => {
    if (isHasExpandColumn) {
      let exs = [...ExList];
      if (exs.indexOf(key) == -1) {
        exs.push(key);
      } else {
        exs.forEach((item, index) => {
          if (item === key) exs.splice(index, 1);
        });
      }
      setExList(exs);
      setExpandField(key);
    } else {
    }
    return true;
  };

  /**測試用明細資料 */
  //const jsonString = `[{"欄位1":[{"field":true,"isImage":false,"isBase64":false,"isUrl":false,"isCheck":true}],"欄位2":[{"field":"ppppppp","isImage":false,"isBase64":false,"isUrl":false,"isCheck":false}],"欄位3":[{"field":"33333","isImage":false,"isBase64":false,"isUrl":false}],"欄位4":[{"field":"www.google.com","isImage":false,"isBase64":false,"isUrl":true}],"欄位5":[{"field":"https://www.google.com","isImage":false,"isBase64":false,"isUrl":true}]},{"欄位1":[{"field":false,"isImage":false,"isBase64":false,"isUrl":false,"isCheck":true}],"欄位2":[{"field":"SSSSS","isImage":false,"isBase64":false,"isUrl":false}],"欄位3":[{"field":"DDDDD","isImage":false,"isBase64":false,"isUrl":false}],"欄位4":[{"field":"FFFFF","isImage":false,"isBase64":false,"isUrl":"www.google.com"}],"欄位5":[{"field":"GGGGG","isImage":false,"isBase64":false,"isUrl":false}]},{"欄位1":[{"field":"WWWWW","isImage":false,"isBase64":false,"isUrl":false}],"欄位2":[{"field":"EEEEE","isImage":false,"isBase64":false,"isUrl":false}],"欄位3":[{"field":"RRRRR","isImage":false,"isBase64":false,"isUrl":false}],"欄位4":[{"field":"TTTTT","isImage":false,"isBase64":false,"isUrl":false}],"欄位5":[{"field":"YYYYY","isImage":false,"isBase64":false,"isUrl":false}]}]`;
  //const jsonData = JSON.parse(jsonString);
  //const [dtData, setDtData] = useState(jsonData);

  //處理明細資料表頭
  const getHeaders = (jsondata: any[]) => {
    const headers = jsondata.reduce((headers: [], item: any) => {
      const _headers = Object.keys(item).reduce((_headers, header) => ({ ..._headers, [header]: null }), {});

      return {
        ...headers,
        ..._headers,
      };
    }, {});

    return Object.keys(headers);
  };

  const fillCells = (headers: any) => (item: any) =>
    Object.assign(
      {},
      headers.reduce((_headers: [], header: string) => ({ ..._headers, [header]: null }), {}),
      item,
    );

  //處理明細資料表頭排序
  const sortBy = (sortBy: any) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSortbyState(sortBy);
    setSortDirectionState(dtSortBy === sortBy ? !dtSortDirection : true);
  };

  const sortDataBy = (sortBy: any, direction: boolean) => (a: any, b: any) => {
    if (a[sortBy] == undefined) return 0;
    if (direction) {
      return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
    }

    return a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
  };

  const renderRows = () => {
    if (!data) {
      return null;
    }

    let jsonData = JSON.parse('[]');
    let DetailColumnCfg = DetailColumn != undefined ? DetailColumn : [];

    return data.map((item, index) => {
      //const key = keyExtractor(item, index);
      const key = 'row-' + index;

      if (dtFieldsIndex > -1) {
        const jsonString = item[columns[dtFieldsIndex].field] != undefined ? item[columns[dtFieldsIndex].field] : '[]';
        jsonData = jsonString != undefined ? JSON.parse(jsonString) : jsonData;
      }

      const dtData = jsonData;
      const headers = jsonData.length > 0 ? getHeaders(dtData) : [];

      return (
        <React.Fragment key={index}>
          <tr key={key} style={{ backgroundColor: datatableTrColor == null ? 'inherit' : datatableTrColor }}>
            {isHasExpandColumn && (
              <DataColumn>
                <button
                  id={'btn' + index}
                  className={ExList.indexOf(key) > -1 ? 'btn btn-danger btn-sm' : 'btn btn-success btn-sm'}
                  onClick={() => {
                    handleClick(key, index);
                  }}
                >
                  <i className={ExList.indexOf(key) > -1 ? 'fas fa-minus' : 'fas fa-plus'}></i>
                </button>
              </DataColumn>
            )}
            {isHasCheckboxColumn && (
              <DataColumn>
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={() =>
                    onChangeRowCheckbox &&
                    checkIsRowCheckboxChecked &&
                    onChangeRowCheckbox(key, !checkIsRowCheckboxChecked(key))
                  }
                  checked={checkIsRowCheckboxChecked && checkIsRowCheckboxChecked(key)}
                />
              </DataColumn>
            )}
            {columnConfigs.map((cfg, idx) => {
              const DataColumnComponent = () => <>{renderColumn({ field: cfg.field, data: item })}</>;
              return cfg.isHidden || cfg.isDetail ? null : <DataColumnComponent key={`${key}_${idx}`} />;
            })}
          </tr>

          {!isNaN(dtFieldsIndex) && dtFieldsIndex > -1 && (
            /** 處理明細資料顯示 **/
            <tr className={ExList.indexOf(key) > -1 ? 'detail-show' : 'detail-hide'} key={`${key}.${index}`}>
              <td className="container" colSpan={vsFieldsCount + 2}>
                <div className="table-responsive">
                  <table id="sortable" className="table table-hover" style={{ display: isLoading ? 'none' : '' }}>
                    <thead>
                      <tr>
                        {DetailColumnCfg.map((cfg: any, idx: number) => (
                          <th
                            scope="row"
                            style={{ textAlign: 'center', whiteSpace: 'nowrap' }}
                            key={cfg.field}
                            className={dtSortBy == cfg.field ? (dtSortDirection ? 'ascendent_sort' : 'descendent_sort') : ''}
                            onClick={sortBy(cfg.field)}
                          >
                            <span style={{ textAlign: 'center' }}>{cfg.name}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dtData
                        .sort(sortDataBy(dtSortBy, dtSortDirection))
                        .map(fillCells(headers))
                        .map((t: any, rowIndex: number) => (
                          <tr key={rowIndex}>
                            {Object.values(DetailColumnCfg).map((cfg: any, cellIndex) => {
                              const cm = (
                                <DataColumn
                                  key={`${rowIndex}.${cellIndex}`}
                                  style={{ textAlign: 'center', lineHeight: '100px' }}
                                >
                                  {renderDetailColumn != undefined &&
                                    renderDetailColumn({ field: cfg.field, data: t, cidx: cellIndex })}
                                </DataColumn>
                              );
                              return cm;
                            })}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

  // 設定 columnConfigs 的初始值, 每次 columns 變更都要重設
  useEffect(() => {
    setColumnConfigs(columns);
  }, [columns]);

  /**
   * 處理 Loading 顯示邏輯
   * @description 使用 setTimout 延遲顯示 loading cursor，防止畫面抖動。
   */
  useEffect(() => {
    if (isLoading && !isShowLoading) {
      setTimoutFuncRef.current = setTimeout(() => {
        setIsShowLoading(true);
      }, DELAY_SHOW_LOADING_MS);
    }

    if (!isLoading && isShowLoading) {
      setIsShowLoading(false);
    }

    if (!isLoading && !isShowLoading && setTimoutFuncRef.current) {
      clearTimeout(setTimoutFuncRef.current);
      setTimoutFuncRef.current = null;
    }
  }, [isLoading, isShowLoading]);

  return (
    <div className="table-responsive">
      <table className={`table nrg-data-table ${tableClassName || ''}`}>
        {isHasHead && (
          <thead>
            <tr>
              {isHasExpandColumn && <th key={UUIDv4()} className="nrg-data-table-th"></th>}
              {isHasCheckboxColumn && (
                <th key={UUIDv4()} className="nrg-data-table-th">
                  {isHasAllCheckbox && (
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={() =>
                        onChangeAllCheckbox && checkIsAllCheckboxChecked && onChangeAllCheckbox(!checkIsAllCheckboxChecked())
                      }
                      checked={checkIsAllCheckboxChecked && checkIsAllCheckboxChecked()}
                      disabled={isShowLoading}
                    />
                  )}
                </th>
              )}
              {columnConfigs.map(
                (cfg) =>
                  !cfg.isHidden &&
                  !cfg.isDetail && (
                    <th key={UUIDv4()} className="nrg-data-table-th">
                      <SortedButton
                        field={cfg.field}
                        text={cfg.name}
                        onClick={handleSortedButtonClick}
                        sortedType={sortedColumn === cfg.field ? sortedType : null}
                        disabled={!cfg.isSortable}
                      />
                    </th>
                  ),
              )}
            </tr>
          </thead>
        )}
        {!isShowLoading && <tbody>{renderRows()}</tbody>}
      </table>
      {isShowLoading && (
        <div className="nrg-data-table-loading-wrapper">
          <Spinner className="nrg-data-table-loading" />
        </div>
      )}
      {!data && <div className="nrg-data-table-empty-content-wrapper">{emptyContentMessage || '無資料'}</div>}
    </div>
  );
};

const useColumnConfigs = (columns: DataTableColumnConfig[]) => {
  const [columnConfigs, setConfigs] = useState<DataTableColumnConfig[]>(columns);
  const setColumnConfigs = (columns: DataTableColumnConfig[]) => {
    const newColConfig = columns.map((col) => ({
      ...col,
      isSortable: typeof col.isSortable === 'undefined' ? true : col.isSortable,
    }));
    setConfigs(newColConfig);
  };

  return { columnConfigs, setColumnConfigs };
};

interface CreateDataTableComponentFunc {
  <T>(): DataTableComponent<T>;
}

export const createDataTable: CreateDataTableComponentFunc = () => DataTable;
