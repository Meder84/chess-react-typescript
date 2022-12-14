import React, {FC} from 'react';
import {Cell} from "../../models/Cell";
import './CellComponent.css'

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
  cursor: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click, cursor}) => {
  return (
    <div
      className={['cellComponent', cell.color, selected ? "selected" : ''].join(' ')}
      onClick={() => click(cell)}
      onMouseOver={() => cursor(cell)}
      style={{background: cell.available && cell.figure ? 'green' : ''}}
    >
      {cell.available && !cell.figure && <div className={"available"}/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
    </div>
  );
};

export default CellComponent;
