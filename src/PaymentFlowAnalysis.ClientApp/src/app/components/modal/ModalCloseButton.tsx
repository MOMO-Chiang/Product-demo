import React from 'react';
import cx from 'classnames';

export type ModalCloseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = (props) => (
  <button {...props} type="button" className={cx('btn-close', props.className || '')} />
);
