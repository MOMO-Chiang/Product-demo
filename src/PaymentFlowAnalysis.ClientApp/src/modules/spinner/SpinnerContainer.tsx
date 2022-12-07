import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { AppState } from '@app/store';
import './spinner-container.scss';

export const SpinnerContainer = () => {
  /** 是否顯示 flag */
  const show = useSelector((state: AppState) => state.spinner.show);
  /** 取最後一個 Spinner 來顯示 */
  const spinner = useSelector((state: AppState) => {
    const { spinners } = state.spinner;
    return spinners.length > 0 ? spinners[spinners.length - 1] : null;
  });

  return (
    <div className={cx('spinner-container', { show })}>
      <div className="spinner-content-wrapper">
        {spinner && (
          <div className="spinner-content">
            <div className="spinner-graph">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="spinner-text">{spinner.message || '處理中...'}</div>
          </div>
        )}
      </div>
    </div>
  );
};
