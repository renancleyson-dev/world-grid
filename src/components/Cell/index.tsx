import React, { useEffect, useState } from 'react';
import { CellTypes, Position } from '../../algorithms/calculateIslands';
import { noop } from '../../utils';
import './styles.css';

type Props = {
  onChange?: (position: Position, cellType: CellTypes) => void;
  position: Position;
};

export default function Cell(props: Props) {
  const { position, onChange = noop } = props;
  const [cellType, setType] = useState(CellTypes.Empty);
  const [isDirty, setDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      onChange(position, cellType);
    }
  }, [isDirty, cellType, position, onChange]);

  const handleClick = () => {
    setDirty(true);
    setType((currentType) =>
      currentType === CellTypes.Empty ? CellTypes.Filled : CellTypes.Empty,
    );
  };

  return <button type="button" className="cell" data-cell={cellType} onClick={handleClick} />;
}
