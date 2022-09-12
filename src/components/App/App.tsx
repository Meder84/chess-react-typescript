import React, {useEffect, useState} from 'react';
import BoardComponent from "../BoardComponent/BoardComponent";
import {Board} from "../../models/Board";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import Timer from "../Timer/Timer";
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
      <BoardComponent
        board={board}
        figures={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />

      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
        player1='player 1'
        buttonRestart='restart game'
        player2='player 2'
      />
      
    </div>
  );
};

export default App;
