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
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='alive'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='alive'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='alive'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.chekNeighbours).toBeInstanceOf(Function);
  });
  [
    [0, 0, 2],
    [1, 0, 3],
    [0, 3, 1],
    [1, 3, 2],
    [0, 5, 3],
    [2, 5, 3],
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
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='alive'></td><td class='dead'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.updateCellState).toBeInstanceOf(Function);
  });
  [
    [1, 0, 0],
    [1, 2, 2],
    [2, 2, 2],
    [1, 3, 2],
    [0, 6, 1],
  ].forEach(([x, y, result]) => {
    test(`for x='${x}', y='${y}' cell must be '${result}'`, () => {
      expect(GameState.updateCellState(fieldMatrix, Number(x), Number(y))).toBe(
        result
      );
    });
  });
});

describe("testing doomNeighbours function", () => {
  const table = document.createElement("table");
  table.innerHTML = "<tr><td class='doomed'></td></tr>";
  test("is a function", () => {
    expect(GameState.doomNeighbours).toBeInstanceOf(Function);
  });
  test("is set cells as dead", () => {
    GameState.doomNeighbours(table);
    const deadCell = table.querySelector("td") || document.createElement("td");
    expect(deadCell.getAttribute("class")).toBe("dead");
  });
});

describe("testing updateField function", () => {
  const table = document.createElement("table");
  table.innerHTML =
    "<tr><td class='alive'></td><td class='alive'></td><td class='alive'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='alive'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='alive'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='dead'></td></tr>" +
    "<tr><td class='dead'></td><td class='alive'></td><td class='dead'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.updateField).toBeInstanceOf(Function);
  });
  test("is mark cells as alive and doomed", () => {
    GameState.updateField(fieldMatrix);
    expect(table.querySelectorAll(".alive")).toHaveLength(8);
    expect(table.querySelectorAll(".doomed")).toHaveLength(3);
  });
});

describe("testing equals function", () => {
  const table = document.createElement("table");
  table.innerHTML =
    "<tr><td class='alive'></td><td class='dead'></td><td class='alive'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='alive'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.equals).toBeInstanceOf(Function);
  });
  test("must return true", () => {
    const state: string[][] = [
      ["alive", "dead", "alive"],
      ["alive", "alive", "alive"],
    ];
    expect(GameState.equals(fieldMatrix, state)).toBeTruthy();
  });
  test("must return false", () => {
    const state: string[][] = [
      ["alive", "dead", "alive"],
      ["alive", "dead", "alive"],
    ];
    expect(GameState.equals(fieldMatrix, state)).toBeFalsy();
  });
  test("must return false if trowing exception", () => {
    const state: string[][] = [
      ["alive", "dead"],
      ["alive", "alive"],
    ];
    expect(GameState.equals(fieldMatrix, state)).toBeFalsy();
  });
});

describe("testing checkListOfField function", () => {
  const table = document.createElement("table");
  table.innerHTML =
    "<tr><td class='alive'></td><td class='dead'></td><td class='alive'></td></tr>" +
    "<tr><td class='alive'></td><td class='alive'></td><td class='alive'></td></tr>";
  const fieldMatrix = GameState.getFieldMatrix(table);
  test("is a function", () => {
    expect(GameState.checkListOfField).toBeInstanceOf(Function);
  });
  test("must return true", () => {
    const state: string[][] = [
      ["alive", "dead", "alive"],
      ["alive", "alive", "alive"],
    ];
    expect(GameState.checkListOfField(fieldMatrix, [state])).toBeTruthy();
  });
  test("must return false", () => {
    const state: string[][] = [
      ["alive", "dead", "alive"],
      ["alive", "dead", "alive"],
    ];
    expect(GameState.checkListOfField(fieldMatrix, [state])).toBeFalsy();
  });
});
