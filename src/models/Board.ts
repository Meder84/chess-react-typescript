import { Cell } from "./Cell";
import { Colors } from "./Colors";

export class Board {
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
  public addFigures() {
    this.addPawns()
    this.addKnights()
    this.addKings()
    this.addBishops()
    this.addQueens()
    this.addRooks()
  }
}