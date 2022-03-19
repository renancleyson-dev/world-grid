/*
  BSF algorithm to calculate islands around a position(source cell) on a matrix.

  There's no need to check new islands for the whole grid, so the algorithm
  search only for new/lost islands.

  Time complexity:
  O(n) -> "n" is the source's island size
*/

export enum CellTypes {
  Empty = 'empty',
  Filled = 'filled',
}

export type Position = [number, number];

export type GridType = CellTypes[][];

const adjacentValues: Position[] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const serializeCoords = ([i, j]: Position) => `[${i} ${j}]`;

const getFilledAdjacent = (
  grid: GridType,
  position: Position,
  adjacentPosition: Position,
  visited: Set<string>,
) => {
  const [iCorner, jCorner] = adjacentPosition;
  const [i, j] = position;

  const rowIndex = i + iCorner;
  const columnIndex = j + jCorner;
  const row = grid[rowIndex];

  const cell = row && row[columnIndex];
  if (!cell || cell === CellTypes.Empty || visited.has(serializeCoords([rowIndex, columnIndex]))) {
    return null;
  }

  return [rowIndex, columnIndex];
};

/*
  The BFS here only traverse the island and empty its cells.
  The goal is to remove overlaps when checking for how many
  new/lost islands there's around the source.
*/
const bfs = (grid: GridType, position: Position, visited: Set<string>) => {
  const queue = [position];

  while (queue.length) {
    const value = queue.shift();
    if (!value) {
      break;
    }

    adjacentValues.forEach((cornerPosition) => {
      const adjacentPosition = getFilledAdjacent(grid, value, cornerPosition, visited);

      if (adjacentPosition) {
        const [rowIndex, columnIndex] = adjacentPosition;

        visited.add(serializeCoords([rowIndex, columnIndex]));
        queue.push([rowIndex, columnIndex]);
      }
    });
  }
};

/*
  Driver of the algorithm to calculate island by a given position
  A cell can merge or split islands when changed, the goal here is to handle
  these cases.

  The return value will always be a number in a range of -3 to 3.
*/
export default function calculateIslands(grid: GridType, position: Position) {
  let result = 0;
  const visited = new Set<string>();
  const [i, j] = position;
  const source = grid[i][j];

  if (source === CellTypes.Filled) {
    result++;
    visited.add(serializeCoords([i, j]));
  } else {
    result--;
  }

  adjacentValues.forEach((cornerPosition) => {
    const adjacentPosition = getFilledAdjacent(grid, position, cornerPosition, visited);

    if (!adjacentPosition) {
      return;
    }

    /*
      If the cell is filled, then the source is/was inside an island,
      which means that the source may had merged or splitted the island
      when changed.
    */
    const [rowIndex, columnIndex] = adjacentPosition;
    if (source === CellTypes.Filled) {
      // The islands merged into one
      result--;
    } else {
      // The island splitted into two
      result++;
    }

    bfs(grid, [rowIndex, columnIndex], visited);
  });

  return result;
}

/*
  Algorithm to calculate islands on the whole grid.
*/
export const calculateIslandsGrid = (grid: GridType, positions: Position[]) => {
  let result = 0;
  const visited = new Set<string>();

  positions.forEach((position) => {
    const [i, j] = position;
    const source = grid[i][j];

    if (visited.has(serializeCoords([i, j]))) {
      return;
    }

    if (source === CellTypes.Filled) {
      result++;
      bfs(grid, [i, j], visited);
    }
  });

  return result;
};
