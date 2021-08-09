import * as Field from "./Field";

export function isAnyoneAlive(webEl: Element): boolean {
  return webEl.querySelectorAll(".alive").length > 0;
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
  }
  for (let i = x - 1; i <= x + 1; i += 1) {
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
): void {
  const countOfNeighbours = chekNeighbours(field, x, y);
  if (countOfNeighbours === 3) {
    Field.setAlive(field[y][x]);
  }
  if (countOfNeighbours > 3 || countOfNeighbours < 2) {
    Field.setDead(field[y][x]);
  }
  if (
    countOfNeighbours === 2 &&
    field[y][x].getAttribute("class") === "alive"
  ) {
    Field.setAlive(field[y][x]);
  }
}

export function doomNeighbours(
  field: Array<NodeListOf<Element>>,
  x: number,
  y: number
): void {
  for (let i = x - 1; i <= x; i += 1) {
    if (checkCellState(field, i, y - 1) === 1) {
      const countOfNeighbours = chekNeighbours(field, i, y - 1);
      if (countOfNeighbours > 3 || countOfNeighbours < 2) {
        Field.setDoomed(field[i][y - 1]);
      }
    }
  }
  if (checkCellState(field, x - 1, y) === 1) {
    const countOfNeighbours = chekNeighbours(field, x - 1, y);
    if (countOfNeighbours > 3 || countOfNeighbours < 2) {
      Field.setDoomed(field[y][x - 1]);
    }
  }
}
