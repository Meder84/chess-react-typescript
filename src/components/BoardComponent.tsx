import React, { FC, useEffect, useState } from 'react';
import Board from '../models/Board';
import Player from '../models/Player';
import CellComponent from './CellComponent';
import Cell from '../models/Cell'

interface BoardProps { // interface - В TypeScript интерфейсы выполняют роль именования этих типов 
  // и являются мощным способом определения контрактов в вашем коде, а также контрактов с кодом вне вашего проекта.
  board: Board; // props - board
  setBoard: (board: Board) => void; // с помощью этой функ. board можно изменить.
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => { // FC - FunctionComponent в качестве пропсов, передаем interface BoardProps
  // деструктурируем interface BoardProps. Достаем саму доску и функцию которую ее может изменить.
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null); // Инициализируем с помощью UseState. 

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer()
      setSelectedCell(null);
      updateBoard()
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard);
  }

  return(
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className='board'>
        {board.cells.map((row, index) => // с помощью map по двумернему массиву проходимся. Поскольку массив двумерный
        // каждым элементом является массива, другой массив. Это уже непосредственно массив ячеек.
          <React.Fragment key={index}> {/*почему fragment - Потому что, нет нобходимости обернуть в блок. key=index - строки статичны, они не меняются*/}
            {row.map(cell => // итерируем строки для каждого элемента, отрисовываем компонент ячейки.
              <CellComponent 
                click={click}
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default BoardComponent;

