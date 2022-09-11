import React, {FC, useEffect, useState} from 'react';
import {Board} from "../../models/Board";
import CellComponent from '../CellComponent/CellComponent';
import {Cell} from "../../models/Cell";
import {Player} from "../../models/Player";
import LostFigures from '../LostFigures/LostFigures';
import './BoardComponent.css';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  figures: Board;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, figures, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

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
    setBoard(newBoard)
  }

  return (
    <div className='boardComponent'>
      <h3 className='boardComponent__subTitle'>Текущий игрок {currentPlayer?.color}</h3>
      <LostFigures
        title="Черные фигуры:"
        figures={figures.lostWhiteFigures}
      />
      <div className="boardComponent__container">
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
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
      <LostFigures
        title="Белые фигуры:"
        figures={figures.lostBlackFigures}
      />
    </div>
  );
};

export default BoardComponent;
