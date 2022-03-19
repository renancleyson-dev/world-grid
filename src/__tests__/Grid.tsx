import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { CellTypes } from '../algorithms/calculateIslands';
import Grid from '../components/Grid';

afterEach(() => {
  cleanup();
});

it('should generate only empty cells on render', () => {
  render(<Grid width={10} height={10} />);

  const cells = screen.getAllByRole('button');
  const hasFilledCell = cells.some((item) => item.getAttribute('data-cell') !== CellTypes.Empty);

  expect(hasFilledCell).toBe(false);
});
