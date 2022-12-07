import React from 'react';
import { Tag, TagProps } from './Tag';

export interface RemovableTagProps extends TagProps {
  onTagRemove?: () => void;
}

export const RemovableTag: React.FC<RemovableTagProps> = (props) => (
  <Tag id={props.id} style={props.style} className={props.className} variant={props.variant}>
    <div className="d-flex justify-content-between align-items-center">
      <span>{props.children}</span>
      <button type="button" className="btn btn-link btn-sm" onClick={props.onTagRemove}>
        <i className="fas fa-times" />
      </button>
    </div>
  </Tag>
);
