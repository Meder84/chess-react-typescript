import { Cell } from "../Cell";
import { Colors } from "../Colors";
import logo from '../../assets/black-bishop.png'

export class Figure { 
  color: Colors; // в поле color запишем enum Colors - это примитивный перечисляемый тип (цвета)
  logo: typeof logo | null; // у каждой фигуры будет какой-то логотип. Чтобы правильно указать тип, сделаем 
  // typeof от того объекта который мы импортировали.
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIFURE;
    this.id = Math.random();
  }
}

// Здесь тоже сделаем кольцевая зависимость