import React from 'react';
import { Card } from '../card';

export type CryptoCardProps = {
  children?: React.ReactNode | null;
  title?: string | null;
};

export const CryptoCard: React.FC<CryptoCardProps> = ({ title, children }) => (
  <Card className="nrg-crypto-card">
    <Card.Header>
      <h5>{title}</h5>
    </Card.Header>
    <Card.Body className="nrg-crypto-card-body">{children}</Card.Body>
  </Card>
);
