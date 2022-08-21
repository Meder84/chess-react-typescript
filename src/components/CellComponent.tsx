import React, { FC } from 'react';
import {Cell} from '../models/Cell'

interface CellProps { // Укажем что, на вход ожидаем объект ячейки. Это класс Cell
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

// дженерики — это возможность создавать компоненты, работающие несколькими типами данных".
const CellComponent: FC<CellProps> = ({cell, selected, click}) => { //FC в качестве дженерика (jeneric) передаем interface CellProps и сразу деструктуризируем
  return (
    <div // в корневой блок необходимо навесить два класса. 1-'cell', 2-цвет ячейки, из объекта cell
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')} // с помощью join через пробел объединяем два класса(arr) в одну строку
      onClick={() => click(cell)}
      style={{background: cell.available && cell.figure ? 'green' : ''}}
    >
      {cell.available && !cell.figure && <div className={'available'}/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt=''/>} {/*у объекта cell есть поле figure, проверяем если это поле есть
      то тогда мы будем отрисовывать*/}
    </div>
  )
}

export default CellComponent;