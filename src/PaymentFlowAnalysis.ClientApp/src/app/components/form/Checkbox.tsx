import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

export type FormCheckoutProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  isInvalid?: boolean;
  isRequred?: boolean;
  labeltext?: string;
};

export const Checkbox: React.FC<FormCheckoutProps> = (props) => {
  const inputProps = _.omit(props, ['isInvalid']);
  const className = cx('form-check-input', props.className || '', {
    'is-invalid': props.isInvalid,
  });
  //const labelProps = _.omit(props, ['isRequred']);
  const labelClassName = cx(
    'form-label nrg-form-label form-check-label',
    { 'nrg-form-label--required': props.isRequred },
    props.className,
  );

  return (
    <div className="form-check form-switch">
      <input type="checkbox" {...inputProps} className={className} />
      <label htmlFor={inputProps.name} className={labelClassName}>
        {props.labeltext}
      </label>
    </div>
  );
};
