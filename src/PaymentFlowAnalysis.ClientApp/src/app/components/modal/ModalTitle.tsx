import React from 'react';
import cx from 'classnames';

export type ModalTitleProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export const ModalTitle: React.FC<ModalTitleProps> = (props) => (
  <h5 {...props} className={cx('modal-title', props.className || '')} />
);
