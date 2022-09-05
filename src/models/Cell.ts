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

  isEmpty() { // Вернет true если ячейка пустая.
    return this.figure === null;
  }

  isEmptyVertical(target: Cell): boolean { // Проверка на пустоту по вертикали. Аргументом принимает target ячейку, куда мы хотим по ходит. Возвращать будет boolean flag, true || false.
    if (this.x !== target.x) { // Если х координаты текущей ячейки и координаты target ячейки не совпадают. 
      return false; // Так мы отсеиваем, все столбцы по вертикали, которые не совпадают с тем направлением движение, которые мы хотим. 
    }

    const min = Math.min(this.y, target.y); // min координата текущей и target ячеек, с помощью функции min пакета Math 
    const max = Math.max(this.y, target.y); // max координата текущей и target ячеек.
    for (let y = min + 1; y < max; y++) { // Проходим в цикле от min +1, до max. +1 - Потому, что min это текущая ячейка.
      if(!this.board.getCell(this.x, y).isEmpty()) { // Получаем x координату по индексу y. Если ячейка не пустая 
        return false; // Вернем false.
      }
    }
    return true; // Если все проверки прошли, тогда вернем true
  }

  isEmptyHorizontal(target: Cell): boolean { // Проверка на пустоту по горизонтали. Реализуется так же, как по вертикали. Только координаты меняются местами.
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

  // Разница между диагональными клетками по x и по y всегда равняется. Поэтому с помощью f abs() берем модуль. Модуль важен, поскольку двигаться будем в разных направлениях.

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x); // abs() возвращает модуль числа (абсолютное значение числа). Верхний левый = верхний правый.
    const absY = Math.abs(target.y - this.y); // Нижний левый = нижний правый.
    if(absY !== absX) // Если разница модулей не совпадает 
      return false; // Тогда вернем false. Это уже не диагональ
    
    // Проверим эти диагонали на пустоту. Для этого получаем направления по которому двигаемся.
    // Если координата по y текущей проверки, меньше чем координата точки в которую, мы хотим попасть.
    const dy = this.y < target.y ? 1 : -1 // то присвоиваем 1цу иначе -1цу
    const dx = this.x < target.x ? 1 : -1 // так же по х. Затем на это значения будем умножать.

    for (let i = 1; i < absY; i++) { // В цикле двигаемся на столько ячеек, на сколько получили в моудль разницу в самом начале.
      if(!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) // Получаем ячейку и по х к текущей координате прибавляем, произведение dx * на индекс.
      // так мы, получаем направление движение. Если в отрицательную сторону, то индекс умножаем -1цу, получиться (x -индекс) в обротном случае +1цу, (x + индекс).так же по y
        return false;
    }
    return true;
  }

  setFigure(figure: Figure) {// Меняет фигуру в самой ячейке.
    this.figure = figure; // На текущей ячейке меняем фигуру.
    this.figure.cell = this; // У ячейки на которую смотрит фигура, тоже меняем на this.
  }

  // Тут есть колцевая зависимость. Поэтому необходимо, для самой ячейки, тоже фигуру надо поменять. Поэтому реализуем метод setFigure()
  moveFigure(target: Cell) { // Перемещение фигур. Аргументом принимает target - Это ячейка куда мы хотим переместить.
    if(this.figure && this.figure?.canMove(target)) { // Если есть фигура на этой ячейке и у этой фигуры метод canMove возвращает true 
      this.figure.moveFigure(target) // Тогда у фигуры вызываем метод moveFigure()
      target.setFigure(this.figure); // фигуру добавили 
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
