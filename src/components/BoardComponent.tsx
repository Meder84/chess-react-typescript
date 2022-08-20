import React, { FC } from 'react';
import { Board } from '../models/Board';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardProps { // interface - В TypeScript интерфейсы выполняют роль именования этих типов 
  // и являются мощным способом определения контрактов в вашем коде, а также контрактов с кодом вне вашего проекта.
  board: Board; // props - board
  setBoard: (board: Board) => void; // с помощью этой функ. board можно изменить.
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ // FC - FunctionComponent в качестве пропсов, передаем interface BoardProps
  board, setBoard, currentPlayer, swapPlayer // деструктурируем interface BoardProps. Достоем саму доску и функцию которую ее может изменить.
}) => { 

  return(
    <div className='board'>
      {board.cells.map((row, index) => // с помощью map по двумернему массиву проходимся. Поскольку массив двумерный
      // каждым элементом является массива, другой массив. Это уже непосредственно массив ячеек.
        <React.Fragment key={index}> {//почему fragment - Потому что, нет нобходимости обернуть в блок}
          {row.map(cell => 
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
  )
}

export default BoardComponent;

