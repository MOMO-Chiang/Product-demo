import React from 'react';
import { Card } from '../card';

export type ScanCardProps = {
  children?: React.ReactNode | null;
};

export const ScanCard: React.FC<ScanCardProps> = ({ children }) => (
  <Card className="nrg-scan-card">
    <Card.Header>
      <h5>掃描條碼</h5>
    </Card.Header>
    <Card.Body className="nrg-scan-card-body">{children}</Card.Body>
  </Card>
);
