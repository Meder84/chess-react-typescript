import React, { FC } from 'react';
import Cell from '../models/Cell'

interface CellProps { // Укажем что, на вход ожидаем объект ячейки. Это класс Cell
  cell: Cell;
  selected: boolean; // отвечает, ячейка выбрана или нет.
  click: (cell: Cell) => void; // укажем что, ожидаем функцию click. Аргументом принимает объкт типа класса Cell и ничего не возвращает. void === undefined
}

// дженерики — это возможность создавать компоненты, работающие несколькими типами данных".
const CellComponent: FC<CellProps> = ({cell, selected, click}) => { //FC в качестве дженерика (jeneric) передаем interface CellProps и сразу деструктуризируем
  return (
    <div // в корневой блок необходимо навесить два класса. 1-'cell', 2-цвет ячейки, из объекта cell
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')} // с помощью join через пробел объединяем два класса(arr) в одну строку
      onClick={() => click(cell)} // вещаем слушатель событии onClick. Методом стрелочной функции вызываем функцию click аргументом передаем ячейку.
      style={{background: cell.available && cell.figure ? 'green' : ''}} // на каких фигур можно атаковать.
      // inline style надо поменять. 
    >
      {cell.available && !cell.figure && <div className={'available'}/>} {/*Если у класса Cell поле available === true и нет фигуры то тогда отрисовываем класс available*/}
      {cell.figure?.logo && <img src={cell.figure.logo} alt=''/>} {/*у объекта cell есть поле figure, проверяем если это поле есть
      то тогда мы будем отрисовывать*/}
    </div>
  )
}

export default CellComponent;