import * as Field from "./Field";

export function isAnyoneAlive(webEl: Element): boolean {
  return (
    webEl.querySelectorAll(".alive").length > 0 ||
    webEl.querySelectorAll(".doomed").length > 0
  );
}

export function getFieldMatrix(webEl: Element): Array<NodeListOf<Element>> {
  const result = [];
  const strings = webEl.querySelectorAll("tr");
  for (let i = 0; i < strings.length; i += 1) {
    result.push(strings[i].querySelectorAll("td"));
  }
  return result;
}

export function checkCellState(
  field: Array<NodeListOf<Element>>,
  x: number,
  y: number
): number {
  const row = field[y];
  if (row === undefined) {
    return 0;
  }
  const cell = row[x];
  if (cell === undefined) {
    return 0;
  }
  if (
    cell.getAttribute("class") === "alive" ||
    cell.getAttribute("class") === "doomed"
  ) {
    return 1;
  }
  return 0;
}

export function chekNeighbours(
  field: Array<NodeListOf<Element>>,
  x: number,
  y: number
): number {
  let countOfAlive = 0;
  for (let i = x - 1; i <= x + 1; i += 1) {
    countOfAlive += checkCellState(field, i, y - 1);
    countOfAlive += checkCellState(field, i, y + 1);
  }
  countOfAlive += checkCellState(field, x - 1, y);
  countOfAlive += checkCellState(field, x + 1, y);
  return countOfAlive;
}

export function updateCellState(
  field: Array<NodeListOf<Element>>,
  x: number,
  y: number
): number {
  const countOfNeighbours = chekNeighbours(field, x, y);
  if (countOfNeighbours === 3) {
    return 1;
  }
  if (countOfNeighbours > 3 || countOfNeighbours < 2) {
    if (field[y][x].getAttribute("class") === "alive") {
      return 0;
    }
  }
  return 2;
}

export function updateField(field: Array<NodeListOf<Element>>): void {
  const aliveCells = [];
  const doomedCells = [];
  for (let i = 0; i < field.length; i += 1) {
    for (let j = 0; j < field[i].length; j += 1) {
      if (updateCellState(field, j, i) === 1) {
        aliveCells.push(field[i][j]);
      } else if (updateCellState(field, j, i) === 0) {
        doomedCells.push(field[i][j]);
      }
    }
  }
  doomedCells.forEach((cell) => {
    Field.setDoomed(cell);
  });
  aliveCells.forEach((cell) => {
    Field.setAlive(cell);
  });
}

export function doomNeighbours(webEl: Element): void {
  webEl.querySelectorAll(".doomed").forEach((doomed) => {
    Field.setDead(doomed);
  });
}

export function equals(
  field: Array<NodeListOf<Element>>,
  newField: string[][]
): boolean {
  try {
    for (let i = 0; i < field.length; i += 1) {
      for (let j = 0; j < field[i].length; j += 1) {
        if (field[i][j].getAttribute("class") !== newField[i][j]) {
          return false;
        }
      }
    }
  } catch (err) {
    return false;
  }
  return true;
}

export function checkListOfField(
  field: Array<NodeListOf<Element>>,
  listOfFields: Array<string[][]>
): boolean {
  for (let i = 0; i < listOfFields.length; i += 1) {
    if (!equals(field, listOfFields[i])) {
      return false;
    }
  }
  return true;
}
