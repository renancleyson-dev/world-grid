import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { CellTypes, GridType, Position } from '../../algorithms/calculateIslands';
import { noop } from '../../utils';
import Cell from '../Cell';
import './styles.css';

type Props = {
  width: number;
  height: number;
  onChange?: (grid: GridType) => void;
  onChangeCell?: (grid: GridType, position: Position) => void;
};

/*
  A grid state should be avoided as it can cause too much performance issues on the UI
  even with React keys, lets try to use only refs to generate the grid as data structure
  and use it to calculate the islands and filled cells, while the cells handles its own
  UI state.
*/
const generateGrid = (width: number, height: number, prevGrid?: GridType) =>
  Array.from({ length: width }, (_, i) =>
    Array.from({ length: height }, (_, j) => {
      const prevRow = prevGrid && prevGrid[i];
      if (!prevGrid || !prevRow) {
        return CellTypes.Empty;
      }

      return prevRow[j] || CellTypes.Empty;
    }),
  );

export default function Grid(props: Props) {
  const { onChange = noop, onChangeCell = noop, width, height } = props;
  const gridRef = useRef<GridType>(generateGrid(width, height));

  const handleChange = useCallback(
    (position: Position, cellType: CellTypes) => {
      const [row, column] = position;

      gridRef.current[row][column] = cellType;
      onChangeCell(gridRef.current, position);
    },
    [onChangeCell],
  );

  const cells = useMemo(() => {
    return Array.from({ length: width }, (_, i) => {
      const columns = Array.from({ length: height }, (_, j) => (
        <Cell key={`[${i} ${j}]`} position={[i, j]} onChange={handleChange} />
      ));

      return (
        <div key={i} className="grid-row">
          {columns}
        </div>
      );
    });
  }, [width, height, handleChange]);

  useEffect(() => {
    gridRef.current = generateGrid(width, height, gridRef.current);
    onChange(gridRef.current);
  }, [width, height, onChange]);

  return (
    <div data-testid="world-grid" id="world-grid">
      {cells}
    </div>
  );
}
