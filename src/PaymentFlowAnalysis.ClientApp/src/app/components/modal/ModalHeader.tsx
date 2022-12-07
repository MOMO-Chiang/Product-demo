import React from 'react';
import cx from 'classnames';

export type ModalHeaderProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ModalHeader: React.FC<ModalHeaderProps> = (props) => (
  <div {...props} className={cx('modal-header', props.className || '')} />
);
