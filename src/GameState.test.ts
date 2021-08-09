import * as GameState from "./GameState";

describe("testing isAnyoneAlive function", () => {
  test("is a function", () => {
    expect(GameState.isAnyoneAlive).toBeInstanceOf(Function);
  });
  test("must return false", () => {
    expect(
      GameState.isAnyoneAlive(document.createElement("table"))
    ).toBeFalsy();
  });
  test("must return true", () => {
    const str = document.createElement("tr");
    str.innerHTML = "<tr><td class='alive'></td>></tr>";
    expect(GameState.isAnyoneAlive(str)).toBeTruthy();
  });
});

describe("testing getFieldMatrixTest", () => {
  test("is a function", () => {
    expect(GameState.getFieldMatrix).toBeInstanceOf(Function);
  });
  test("checking returning value", () => {
    const table = document.createElement("table");
    table.innerHTML =
      "<tr><td></td><td></td><td></td></tr><tr><td></td><td></td></tr>";
    const fieldMatrix = GameState.getFieldMatrix(table);
    expect(fieldMatrix).toBeInstanceOf(Array);
    expect(fieldMatrix).toHaveLength(2);
    expect(fieldMatrix[0]).toHaveLength(3);
  });
});

describe("testing checkCellState function", () => {
  const table = document.createElement("table");
  table.innerHTML =
    "<tr><td class='dead'></td><td class='alive'></td><td class='doomed'></td></tr><tr><td></td><td></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.checkCellState).toBeInstanceOf(Function);
  });
  test("must return 0 when row is not exist", () => {
    expect(GameState.checkCellState(fieldMatrix, 3, 3)).toBe(0);
  });
  test("must return 0 when cell is not exist", () => {
    expect(GameState.checkCellState(fieldMatrix, 3, 1)).toBe(0);
  });
  test("must return 0 when cell is dead", () => {
    expect(GameState.checkCellState(fieldMatrix, 0, 0)).toBe(0);
  });
  test("must return 1 when cell is alive", () => {
    expect(GameState.checkCellState(fieldMatrix, 1, 0)).toBe(1);
  });
  test("must return 1 when cell is doomed", () => {
    expect(GameState.checkCellState(fieldMatrix, 2, 0)).toBe(1);
  });
});

describe("testing chekNeighbours function", () => {
  const table = document.createElement("table");
  table.innerHTML =
    "<tr><td class='dead'></td><td class='alive'></td><td class='doomed'></td></tr>" +
    "<tr><td class='alive'></td><td class='dead'></td><td class='alive'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='alive'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.chekNeighbours).toBeInstanceOf(Function);
  });
  [
    [0, 0, 2],
    [1, 0, 3],
    [0, 3, 0],
    [1, 3, 1],
  ].forEach(([x, y, result]) => {
    test(`for x='${x}', y='${y}' must return '${result}'`, () => {
      expect(GameState.chekNeighbours(fieldMatrix, x, y)).toBe(result);
    });
  });
});

describe("testing updateCellState function", () => {
  const table = document.createElement("table");
  table.innerHTML =
    "<tr><td class='alive'></td><td class='alive'></td><td class='doomed'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='alive'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='alive'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.updateCellState).toBeInstanceOf(Function);
  });
  [
    [1, 0, "dead"],
    [1, 2, "dead"],
    [2, 2, "alive"],
    [1, 3, "dead"],
  ].forEach(([x, y, result]) => {
    test(`for x='${x}', y='${y}' cell must be '${result}'`, () => {
      GameState.updateCellState(fieldMatrix, Number(x), Number(y));
      expect(fieldMatrix[Number(y)][Number(x)].getAttribute("class")).toBe(
        result
      );
    });
  });
});

describe("testing doomNeighbours function", () => {
  const table = document.createElement("table");
  table.innerHTML =
    "<tr><td class='alive'></td><td class='alive'></td><td class='alive'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='alive'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='alive'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='dead'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.doomNeighbours).toBeInstanceOf(Function);
  });
  [
    [1, 0, "alive"],
    [2, 1, "doomed"],
    [1, 3, "doomed"],
    [2, 3, "alive"],
  ].forEach(([x, y, result]) => {
    test(`for x='${x}' y='${y}' neighbour must be '${result}'`, () => {
      GameState.doomNeighbours(fieldMatrix, Number(x), Number(y));
      expect(fieldMatrix[Number(y)][Number(x) - 1].getAttribute("class")).toBe(
        result
      );
    });
  });
});
