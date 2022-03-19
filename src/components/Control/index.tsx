import React, { useState } from 'react';
import './styles.css';

type Props = {
  width: number;
  height: number;
  onChangeSize: (width: number, height: number) => void;
};

const handleInvalidSizes = (value: string) => value === '' ? '1' : value;

export default function Control({ width, height, onChangeSize }: Props) {
  const [widthText, setWidth] = useState<string>(`${width}`);
  const [heightText, setHeight] = useState<string>(`${height}`);

  const handleWidthOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(event.target.value);
  };

  const handleHeightOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const finalWidth = handleInvalidSizes(widthText);
    const finalHeight = handleInvalidSizes(heightText);

    onChangeSize(parseInt(finalWidth, 10), parseInt(finalHeight, 10));
    setWidth(finalWidth);
    setHeight(finalHeight);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="width" className="label-size">
        width:
      </label>
      <input
        id="width"
        min="1"
        max="100"
        className="textinput"
        type="number"
        name="width"
        value={widthText}
        onChange={handleWidthOnChange}
      />
      <label htmlFor="height" className="label-size">
        height:
      </label>
      <input
        id="height"
        min="1"
        max="100"
        className="textinput"
        type="number"
        name="height"
        value={heightText}
        onChange={handleHeightOnChange}
      />
      <button className="submit-button">Build</button>
    </form>
  );
}
