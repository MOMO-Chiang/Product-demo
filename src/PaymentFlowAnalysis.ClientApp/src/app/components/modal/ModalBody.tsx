import React from 'react';
import cx from 'classnames';

export type ModalBodyProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ModalBody: React.FC<ModalBodyProps> = (props) => (
  <div {...props} className={cx('modal-body', props.className || '')} />
);
