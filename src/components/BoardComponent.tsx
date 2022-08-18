import React from 'react';
import { Board } from '../models/Board';

interface BoardProps { // interface - В TypeScript интерфейсы выполняют роль именования этих типов 
  // и являются мощным способом определения контрактов в вашем коде, а также контрактов с кодом вне вашего проекта.
  board: Board; // props - board
  setBoard: (board: Board) => void; // с помощью этой функ. board можно изменить.
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent = () => {

  return(
    <div className='board'>
    </div>
  )
}

export default BoardComponent;

