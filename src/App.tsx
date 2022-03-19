import React, { useCallback, useState } from 'react';
import calculateIslands, {
  calculateIslandsGrid,
  CellTypes,
  GridType,
  Position,
} from './algorithms/calculateIslands';
import Control from './components/Control';
import Grid from './components/Grid';
import './App.css';

/*
  The driver of the app, initialize the state of the grid,
  the default size is a 10x10 grid.
*/
export default function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [islandCount, setIslandCount] = useState(0);
  const [filledCount, setFilledCount] = useState(0);

  const handleChangeSize = (width: number, height: number) => {
    setWidth(width);
    setHeight(height);
  };

  const handleGridChange = useCallback((grid: GridType) => {
    const filledCellPositions = grid.flatMap((row, i) =>
      row.reduce<Position[]>((acc, cell, j) => {
        if (cell === CellTypes.Filled) {
          return [...acc, [i, j]];
        }

        return acc;
      }, []),
    );

    setFilledCount(filledCellPositions.length);
    setIslandCount(calculateIslandsGrid(grid, filledCellPositions));
  }, []);

  const handleCellChange = useCallback((grid: GridType, position: Position) => {
    const [i, j] = position;
    const incrementValue = grid[i][j] === CellTypes.Filled ? 1 : -1;

    setFilledCount((prevCount) => prevCount + incrementValue);
    setIslandCount((prevCount) => prevCount + calculateIslands(grid, position));
  }, []);

  return (
    <div id="outer-wrapper">
      <div className="tabs-wrapper">
        <div className="tab">
          <Control width={width} height={height} onChangeSize={handleChangeSize} />
        </div>
        <div className="tab">
          <div>
            <div>{islandCount} islands</div>
            <div>{filledCount} filled cells</div>
          </div>
        </div>
      </div>
      <div id="inner-wrapper">
        <Grid
          width={width}
          height={height}
          onChange={handleGridChange}
          onChangeCell={handleCellChange}
        />
      </div>
    </div>
  );
}
