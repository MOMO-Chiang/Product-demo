import React from 'react';
import cx from 'classnames';
import { SortedType } from '@shared/enums';

export type SortedButtonField = string;

export interface SortedButtonClickFunc {
  (field: string): void;
}

export type SortedButtonProps = {
  /** 識別 ID */
  field: SortedButtonField;
  /** 顯示文字 */
  text?: string;
  /** onclick event */
  onClick?: SortedButtonClickFunc;
  /** 排序方式 */
  sortedType?: SortedType | null;
  /** disabled */
  disabled?: boolean;
};

export const SortedButton: React.FC<SortedButtonProps> = ({
  field,
  text,
  onClick,
  sortedType,
  disabled,
}) => {
  const handleClick = () =>
    !disabled && typeof onClick === 'function' && onClick(field);

  return (
    <a className="nrg-sorted-button" onClick={handleClick}>
      <span className="nrg-sorted-button__text">{text || ''}</span>
      <div
        className={cx('nrg-sorted-button__arrows', {
          'nrg-sorted-button__arrows--up':
            !disabled && sortedType === SortedType.DESC,
          'nrg-sorted-button__arrows--down':
            !disabled && sortedType === SortedType.ASC,
        })}
      >
        <i className="fas fa-caret-up" />
        <i className="fas fa-caret-down" />
      </div>
    </a>
  );
};
