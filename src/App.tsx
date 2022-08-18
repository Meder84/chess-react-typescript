import React, { useEffect, useState } from 'react';
import BoardComponent from './components/BoardComponent';
import "./App.css";
import { Board } from './models/Board';

const App = () => {
  const [board, setBoard] = useState(new Board()) // состояние поумолчанию объект класса Board.
  
  useEffect(() => {
    restart(); // Вызываем при монтировании компонента.
  }, [])

  function restart() {
    const newBoard = new Board(); //создаем новый объект
    newBoard.initCells(); // вызов метода initCells у объекта Board, Для инициализации ячеек.
    setBoard(newBoard); // сохраняем в состоянии.
  }

  return (
    <div className='app'>
      <BoardComponent/>
    </div>
  );
};

export default App;

// 13:00
// Шахматы на React и TypeScript С НУЛЯ. Практикуем ООП