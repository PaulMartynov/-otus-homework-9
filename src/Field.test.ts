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
    const cell = tableString.querySelector("td");
    if (cell) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(cell.getAttribute("class")).toBe("dead");
    }
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
