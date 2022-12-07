import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

export type FormLabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  isRequred?: boolean;
};

export const Label: React.FC<FormLabelProps> = (props) => {
  const labelProps = _.omit(props, ['isRequred']);
  const className = cx(
    'form-label nrg-form-label',
    { 'nrg-form-label--required': props.isRequred },
    props.className,
  );

  return <label {...labelProps} className={className} />;
};
