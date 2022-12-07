import React from 'react';
import cx from 'classnames';
import _ from 'lodash';

export type FormTextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  invalid?: boolean;
};

export const Textarea: React.FC<FormTextareaProps> = (props) => {
  const inputProps = _.omit(props, ['invalid']);
  const className = cx('form-control', props.className || '', {
    'is-invalid': props.invalid,
  });

  return <textarea {...inputProps} className={className} />;
};
