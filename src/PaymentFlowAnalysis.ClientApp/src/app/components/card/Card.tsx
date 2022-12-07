import React from 'react';
import cx from 'classnames';
import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';
import { CardFooter } from './CardFooter';

export type CardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type CardComponent = React.FC<CardProps> & {
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
};

export const Card: CardComponent = (props) => (
  <div {...props} className={cx('card nrg-card', props.className || '')} />
);

Card.Body = CardBody;
Card.Header = CardHeader;
Card.Footer = CardFooter;
