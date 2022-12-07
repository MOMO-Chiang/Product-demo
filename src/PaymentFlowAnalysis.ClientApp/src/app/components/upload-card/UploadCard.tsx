import React from 'react';
import { Card } from '../card';

export type UploadCardProps = {
  children?: React.ReactNode | null;
};

export const UploadCard: React.FC<UploadCardProps> = ({ children }) => (
  <Card className="nrg-upload-card">
    <Card.Header>
      <h5>上傳檔案</h5>
    </Card.Header>
    <Card.Body className="nrg-upload-card-body">{children}</Card.Body>
  </Card>
);
