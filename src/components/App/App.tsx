import React, {useEffect, useState} from 'react';
import BoardComponent from "../BoardComponent/BoardComponent";
import {Board} from "../../models/Board";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import LostFigures from "../LostFigures/LostFigures";
import Timer from "../Timer";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer);
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="app">
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />
      
      <BoardComponent
        board={board}
        figures={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      
    </div>
  );
};

export default App;
