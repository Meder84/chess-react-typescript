import  Cell  from "./Cell";
import  {Colors}  from "./Colors";
import  Pawn  from "./figures/Pawn";
import  Rook  from "./figures/Rook";
import  Knight  from "./figures/Knight";
import  Bishop  from "./figures/Bishop";
import  King  from "./figures/King";
import  Queen  from "./figures/Queen";

export default class Board {
  cells: Cell[][] = [] // ячейки предсталяет двумерный массив. Строки и столбцы.
  // Строка двумерный массив. Таблица одномерный. По сути матрица.
  // По умолчанию проинициализируем эту переменную. Это, поле свойства класса с пустым массивом.

  public initCells() { // публичный метод
    for (let i = 0; i < 8; i++) { // проход по строкам
      const row: Cell[] = [] // одномерный массив ячеек.
      for (let j = 0; j < 8; j++) { // проход по столбцам
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)) // черные ячейки
          // this текущий obj т.е. доска. j - x, i -y, null поумолчанию безфигур.
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)) // белые ячейки
        }
      }
      this.cells.push(row); // сформированную строку добавляем в двумерный массив cells.
    }
  }

  public getCell(x: number, y: number) { // чтобы точечно поставлять фигуры (x, y - координаты)
    return this.cells[x][y] // Вернем соответствуйщий элемент из двумерного массива cells
  }
 
  private addPawns() { // Пешки будут по 8 штук, мы их будем добавлять в цикле.
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1)); // в качестве х вставим элемента итерации i(index). А y 1
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }
  
  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 1));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  public addFigures() {
    this.addRooks();
    this.addBishops();
    this.addKnights();
    this.addKings();
    this.addQueens();
    this.addPawns();
  }
}