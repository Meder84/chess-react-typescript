import Board from "./Board";
import {Colors} from "./Colors";
import Figure from "./figures/Figure";

export default class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // Можешь ли переместиться
  id: number; // Для реакт ключей

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x =- x;
    this.y = y;
    this.board = board;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.id = Math.random();
  }

  moveFigure(target: Cell) { // Перемещение фигур. Аргументом принимает target - Это ячейка куда мы хотим переместить.
    if(this.figure && this.figure?.canMove(target)) { // Если есть фигура на этой ячейке и у этой фигуры метод canMove возвращает true 
      this.figure.moveFigure(target) // Тогда у фигуры вызываем метод moveFigure()
      target.figure = this.figure; // фигуру добавили 
      this.figure = null // фигуру убрали
      // if (target.figure) {
      //   console.log(target.figure)
      //   this.addLostFigure(target.figure);
      // }
      // target.setFigure(this.figure)
      // this.figure = null;
    }
  }
}
