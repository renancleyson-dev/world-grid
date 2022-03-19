import calculateIslands, { CellTypes } from '../../algorithms/calculateIslands';

it('Calculates added islands', () => {
  let islands = 0;
  const grid = [
    [CellTypes.Empty, CellTypes.Empty],
    [CellTypes.Empty, CellTypes.Empty],
  ];

  grid[1][1] = CellTypes.Filled;
  islands += calculateIslands(grid, [1, 1]);

  expect(islands).toBe(1);
});

it('Calculates removed islands', () => {
  let islands = 1;
  const grid = [
    [CellTypes.Empty, CellTypes.Empty],
    [CellTypes.Empty, CellTypes.Filled],
  ];

  grid[1][1] = CellTypes.Empty;
  islands += calculateIslands(grid, [1, 1]);

  expect(islands).toBe(0);
});

it('Calculates island merging', () => {
  let islands = 2;
  const grid = [
    [CellTypes.Filled, CellTypes.Empty, CellTypes.Filled],
  ];

  grid[0][1] = CellTypes.Filled;
  islands += calculateIslands(grid, [0, 1]);

  expect(islands).toBe(1);
});

it('Calculates island splitting', () => {
  let islands = 4;
  const grid = [
    [CellTypes.Empty, CellTypes.Filled, CellTypes.Empty],
    [CellTypes.Filled, CellTypes.Empty, CellTypes.Filled],
    [CellTypes.Empty, CellTypes.Filled, CellTypes.Empty],
  ];

  grid[1][1] = CellTypes.Filled;
  islands += calculateIslands(grid, [1, 1]);

  expect(islands).toBe(1);
});
