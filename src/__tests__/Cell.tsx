import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { CellTypes } from '../algorithms/calculateIslands';
import Cell from '../components/Cell/';

afterEach(() => {
  cleanup();
});

it('toggles between filled and empty on click', () => {
  render(<Cell />);

  const cell = screen.getByRole('button');
  const initialCellType = cell.getAttribute('data-cell');

  fireEvent.click(cell);
  const filledCellType = cell.getAttribute('data-cell');
  fireEvent.click(cell);

  expect(initialCellType).toBe(CellTypes.Empty);
  expect(filledCellType).toBe(CellTypes.Filled);
  expect(cell.getAttribute('data-cell')).toBe(CellTypes.Empty);
});
