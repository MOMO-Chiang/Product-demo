import React from 'react';
import cx from 'classnames';
import './tag.scss';

export type TagVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface TagProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: TagVariant;
}

const getVariantClassName = (variant?: TagVariant) => {
  switch (variant) {
    case 'primary':
      return 'alert-primary';
    case 'secondary':
      return 'alert-secondary';
    case 'success':
      return 'alert-success';
    case 'danger':
      return 'alert-danger';
    case 'warning':
      return 'alert-warning';
    case 'info':
      return 'alert-info';
    case 'light':
      return 'alert-light';
    case 'dark':
      return 'alert-dark ';
    default:
      return '';
  }
};

export const Tag: React.FC<TagProps> = (props) => {
  const className = cx('alert', getVariantClassName(props.variant), 'nrg-tag', props.className);

  return (
    <div id={props.id} style={props.style} className={className}>
      {props.children}
    </div>
  );
};
