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
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null); // Инициализируем с помощью UseState. Укажем какой тип в этом состоянии будет
  // Либо ячейка, либо null если не одна ячейка не выбрана. А в сам CellComponent передаем boolean flag котороя будет отвечать, ячейка выбрана или нет.

  function click(cell: Cell) { // Отработает при нажатии на ячейку. Аргументом передаем саму ячейку.
    // в этой функции меняем состояние с помощью setSelectedCell аргументом передаем выбранную ячейку.
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

  function highlightCells() { // подсвечивает ячейки которые доступны. 
    board.highlightCells(selectedCell) // Вызываем у класса Board метод highlightCells. Но изменение каких-то данных 
    // внутри объекта Board привести за собой перерендеринг компонента не будет. Для этого необходимо явно обновить состояние.
   // Для этого создаем отдельную функцию. updateBoard()
    updateBoard()
  }

  function updateBoard() { // Для обновления состояния класса Board
    const newBoard = board.getCopyBoard() // Создаем новый объект (доску), копю существующего. Для того что была новая ссылка.
    // Чтобы при изменении состояние react перерисовал всю доску. После получения нового объекта
    setBoard(newBoard); // Вызываем для изменения состояния
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
                click={click} // функцию click передаем в сам компонент ячейки. А в самом компоненте пропсом указать, что эту функцию ожидаем.
                cell={cell}
                key={cell.id}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} // Если текущая ячейка по координате х и по координате х выбранной ячейки
                // и так же по y. То будем считать эта ячейка выбрана. То есть координаты совпадают. Как x так и у.
                // ? - optional оператор - пользовали чтобы при обращении на не существующего поле объекта, приложение не сломолось. 
                // Т.е. selectedCell?.x тоже самое selectedCell === null || selectedCell === undefined ? undefined : selectedCell.x
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default BoardComponent;

