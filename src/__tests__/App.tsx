import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { CellTypes } from '../algorithms/calculateIslands';
import App from '../App';

afterEach(() => {
  cleanup();
});

it('renders a default grid of 10x10 empty cells', () => {
  render(<App />);

  const grid = within(screen.getByTestId('world-grid'));
  const cells = grid.getAllByRole('button');
  const emptyCells = cells.filter((item) => item.getAttribute('data-cell') === CellTypes.Empty);

  expect(emptyCells.length).toBe(100);
});

it('changes the size of the grid', () => {
  const newSize = 400; // create a 20x20 grid
  render(<App />);

  const grid = within(screen.getByTestId('world-grid'));
  let cells = grid.getAllByRole('button');
  const gridCount = cells.length;

  fireEvent.change(screen.getByRole('spinbutton', { name: /width/i }), {
    target: { value: '20' },
  });
  fireEvent.change(screen.getByRole('spinbutton', { name: /height/i }), {
    target: { value: '20' },
  });
  fireEvent.click(screen.getByRole('button', { name: /build/i }));

  cells = grid.getAllByRole('button');

  expect(gridCount).toBe(100);
  expect(cells.length).toBe(newSize);
});

it('counts the number of islands', () => {
  render(<App />);
  const grid = within(screen.getByTestId('world-grid'));
  const [firstCell, secondCell] = grid.getAllByRole('button');


  expect(screen.getByText(/0 islands/i)).toBeInTheDocument();

  fireEvent.click(firstCell);
  expect(screen.getByText(/1 islands/i)).toBeInTheDocument();

  fireEvent.click(secondCell);
  expect(screen.getByText(/1 islands/i)).toBeInTheDocument();

  fireEvent.click(firstCell);
  fireEvent.click(secondCell);
  expect(screen.getByText(/0 islands/i)).toBeInTheDocument();
});

it('counts the number of filled cells', () => {
  render(<App />);
  const grid = within(screen.getByTestId('world-grid'));
  const [firstCell] = grid.getAllByRole('button');


  expect(screen.getByText(/0 filled/i)).toBeInTheDocument();
  fireEvent.click(firstCell);
  expect(screen.getByText(/1 filled/i)).toBeInTheDocument();
  fireEvent.click(firstCell);
  expect(screen.getByText(/0 filled/i)).toBeInTheDocument();
});
