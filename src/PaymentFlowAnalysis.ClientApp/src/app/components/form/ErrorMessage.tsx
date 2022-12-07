import React from 'react';

export type ErrorMessageProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => (
  <div {...props} className={`nrg-form-error-message ${props.className || ''}`} />
);
