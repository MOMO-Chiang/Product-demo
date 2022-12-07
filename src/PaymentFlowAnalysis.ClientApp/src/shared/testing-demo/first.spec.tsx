import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { First } from './first';

let documentBody: RenderResult;

describe('<First />', () => {
  beforeEach(() => {
    documentBody = render(<First />);
  });

  it('runs the first test', () => {
    expect(true).toBe(true);
  });

  it('shows not found message', () => {
    expect(documentBody.getByText('First Com')).toBeInTheDocument();
  });
});
