import React from 'react';
import cx from 'classnames';

export type ModalFooterProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ModalFooter: React.FC<ModalFooterProps> = (props) => (
  <div {...props} className={cx('modal-footer', props.className || '')} />
);
