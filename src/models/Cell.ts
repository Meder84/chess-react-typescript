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

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) { // Если х координаты текущей ячейки и координаты target ячейки не совпадают. 
      return false; // Так мы отсеиваем, все столбцы по вертикали, которые не совпадают с тем направлением движение, которые мы хотим. 
    }

    const min = Math.min(this.y, target.y); // min координата текущей и target ячеек, с помощью функции min пакета Math 
    const max = Math.max(this.y, target.y); // max координата текущей и target ячеек.
    for (let y = min + 1; y < max; y++) { // Проходим в цикле от минимального 
      if(!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if(!this.board.getCell(x, this.y).isEmpty()) {
        return false
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if(absY !== absX)
      return false;

    const dy = this.y < target.y ? 1 : -1
    const dx = this.x < target.x ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if(!this.board.getCell(this.x + dx*i, this.y + dy   * i).isEmpty())
        return false;
    }
    return true;
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
