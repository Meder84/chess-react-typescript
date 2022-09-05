import Figure, {FigureNames} from "./Figure";
import {Colors} from "../Colors";
import Cell from "../Cell";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

export default class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KNIGHT;
  }

  // Закономерность движение коней. Изменение одной координаты движение, всегда меняется на 2, а второй координаты на 1
  // Причем не важно движение по х или по у. Чтобы понять на сколько клеток идет движение. Определяем с помошью модуль
  canMove(target: Cell): boolean {
    if(!super.canMove(target)) // Если все условия родительского класса Figure{} не соблюдаются?
      return false; // Тогда вернем false.
    const dx = Math.abs(this.cell.x - target.x); // Берем модуль с помошью abs() и отнимаем от текущей позиции позицию target.x 
    const dy = Math.abs(this.cell.y - target.y); // Тоже самое для у
    // проверяем смещение. На два по одной оси, на одну по другой оси. Так же в обратную сторону.
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
  }
}
