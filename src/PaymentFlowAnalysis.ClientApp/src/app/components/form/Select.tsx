import _ from 'lodash';
import React, { useState } from 'react';
import { v4 as UUIDv4 } from 'uuid';
import { SelectOptionConfig } from '@shared/types';

export type FormSelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: SelectOptionConfig[];
};

export const Select: React.FC<FormSelectProps> = (props) => {
  const [uid] = useState(UUIDv4());
  const selectProps = _.omit(props, ['options']);

  return (
    <select {...selectProps} className={`form-select ${props.className || ''}`}>
      {props.options.map((cfg) => (
        <option key={`${uid}_${cfg.value}`} value={cfg.value}>
          {cfg.text}
        </option>
      ))}
    </select>
  );
};
