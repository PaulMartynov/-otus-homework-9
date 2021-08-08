import * as Field from "./Field";

describe("testing CreateNewCell function", () => {
  test("is a function", () => {
    expect(Field.CreateNewCell).toBeInstanceOf(Function);
  });
  test("is creating new cell", () => {
    const tableString = document.createElement("tr");
    expect(tableString.querySelectorAll("td")).toHaveLength(0);
    Field.CreateNewCell(tableString);
    expect(tableString.querySelectorAll("td")).toHaveLength(1);
    const cell =
      tableString.querySelector("td") || document.createElement("td");
    expect(cell.getAttribute("class")).toBe("dead");
  });
  test("click on cell", () => {
    const tableString = document.createElement("tr");
    Field.CreateNewCell(tableString);
    const cell =
      tableString.querySelector("td") || document.createElement("td");
    cell.dispatchEvent(new Event("click"));
    expect(cell.getAttribute("class")).toBe("alive");
  });
});

describe("testing CreateNewString function", () => {
  test("is a function", () => {
    expect(Field.CreateNewString).toBeInstanceOf(Function);
  });
  test("is creating a table string", () => {
    const table = document.createElement("table");
    expect(table.querySelectorAll("tr")).toHaveLength(0);
    expect(table.querySelectorAll("td")).toHaveLength(0);
    Field.CreateNewString(table, 5);
    expect(table.querySelectorAll("tr")).toHaveLength(1);
    expect(table.querySelectorAll("td")).toHaveLength(5);
    Field.CreateNewString(table, 6);
    expect(table.querySelectorAll("tr")).toHaveLength(2);
    expect(table.querySelectorAll("td")).toHaveLength(11);
  });
});

describe("testing CreateNewField function", () => {
  test("is a function", () => {
    expect(Field.CreateNewField).toBeInstanceOf(Function);
  });
  test("is creating a table", () => {
    const table = document.createElement("table");
    expect(table.querySelectorAll("tr")).toHaveLength(0);
    expect(table.querySelectorAll("td")).toHaveLength(0);
    Field.CreateNewField(table, 5, 5);
    expect(table.querySelectorAll("tr")).toHaveLength(5);
    expect(table.querySelectorAll("td")).toHaveLength(25);
  });
});

describe("testing updateX function", () => {
  test("is a function", () => {
    expect(Field.updateX).toBeInstanceOf(Function);
  });
  test("is added cells", () => {
    const table = document.createElement("table");
    table.appendChild(document.createElement("tr"));
    expect(table.querySelectorAll("td")).toHaveLength(0);
    Field.updateX(table, 10);
    expect(table.querySelectorAll("td")).toHaveLength(10);
  });
  test("is removing cells", () => {
    const table = document.createElement("table");
    const str = document.createElement("tr");
    str.appendChild(document.createElement("td"));
    str.appendChild(document.createElement("td"));
    table.appendChild(str);
    expect(table.querySelectorAll("td")).toHaveLength(2);
    Field.updateX(table, 1);
    expect(table.querySelectorAll("td")).toHaveLength(1);
  });
});

describe("testing updateY function", () => {
  test("is a function", () => {
    expect(Field.updateY).toBeInstanceOf(Function);
  });
  test("is added strings", () => {
    const table = document.createElement("table");
    table.appendChild(document.createElement("tr"));
    expect(table.querySelectorAll("tr")).toHaveLength(1);
    Field.updateY(table, 3);
    expect(table.querySelectorAll("tr")).toHaveLength(3);
  });
  test("is removing strings", () => {
    const table = document.createElement("table");
    table.appendChild(document.createElement("tr"));
    table.appendChild(document.createElement("tr"));
    table.appendChild(document.createElement("tr"));
    expect(table.querySelectorAll("tr")).toHaveLength(3);
    Field.updateY(table, 1);
    expect(table.querySelectorAll("tr")).toHaveLength(1);
  });
});

describe("testing setAlive function", () => {
  test("is a function", () => {
    expect(Field.setAlive).toBeInstanceOf(Function);
  });
  test("is set cell alive", () => {
    const cell = document.createElement("td");
    Field.setAlive(cell);
    expect(cell.getAttribute("class")).toBe("alive");
    expect(cell.getAttribute("style")).toBe(
      "background-color:black; height:15px; width:15px;"
    );
  });
});

describe("testing setDead function", () => {
  test("is a function", () => {
    expect(Field.setDead).toBeInstanceOf(Function);
  });
  test("is set cell dead", () => {
    const cell = document.createElement("td");
    Field.setDead(cell);
    expect(cell.getAttribute("class")).toBe("dead");
    expect(cell.getAttribute("style")).toBe(
      "background-color:#FFFFFF; height:15px; width:15px;"
    );
  });
});

describe("testing setDoomed function", () => {
  test("is a function", () => {
    expect(Field.setDoomed).toBeInstanceOf(Function);
  });
  test("is set cell doomed", () => {
    const cell = document.createElement("td");
    Field.setDoomed(cell);
    expect(cell.getAttribute("class")).toBe("doomed");
    expect(cell.getAttribute("style")).toBe(
      "background-color:blue; height:15px; width:15px;"
    );
  });
});

describe("testing clickOnCell function", () => {
  test("is a function", () => {
    expect(Field.clickOnCell).toBeInstanceOf(Function);
  });
  test("is set cell as alive", () => {
    const cell = document.createElement("td");
    cell.setAttribute("class", "dead");
    Field.clickOnCell(cell);
    expect(cell.getAttribute("class")).toBe("alive");
  });
  test("is set cell as dead", () => {
    const cell = document.createElement("td");
    cell.setAttribute("class", "alive");
    Field.clickOnCell(cell);
    expect(cell.getAttribute("class")).toBe("dead");
  });
});
