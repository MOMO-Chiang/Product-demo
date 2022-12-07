import React, { ChangeEvent } from 'react';
import { SelectOptionConfig } from '@shared/types';
import { Select } from '../form';

export interface PageSizeSelectChangeFunc {
  (pageSize: string): void;
}

export type PageSizeSelectProps = {
  /** 分頁控制下拉選單資料 */
  options: SelectOptionConfig[];
  /**
   * 預設值
   * TODO: 移除 defaultValue 設定，僅需 value 即可。
   */
  defaultValue?: string;
  /** 值 */
  value?: string;
  /** 分頁控制下拉選單變更事件 */
  onChange: PageSizeSelectChangeFunc;

  /** disabled */
  disabled?: boolean;
};

export const PageSizeSelect: React.FC<PageSizeSelectProps> = ({ options, defaultValue, value, disabled, onChange }) => (
  <div className="nrg-page-size-select__container">
    <span className="nrg-page-size-select__text">顯示</span>
    <Select
      className="nrg-page-size-select__select"
      options={options}
      defaultValue={defaultValue}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange && onChange(e.target.value)}
      value={value}
      disabled={disabled}
    />
    <span className="nrg-page-size-select__text">個項目</span>
  </div>
);
