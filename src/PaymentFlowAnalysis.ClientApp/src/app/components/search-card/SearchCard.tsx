import React from 'react';
import { Card } from '../card';

export type SearchCardProps = {
  children?: React.ReactNode | null;
};

export const SearchCard: React.FC<SearchCardProps> = ({ children }) => (
  <Card className="nrg-search-card">
    <Card.Header>
      <h5>搜尋</h5>
    </Card.Header>
    <Card.Body className="nrg-search-card-body">{children}</Card.Body>
  </Card>
);
