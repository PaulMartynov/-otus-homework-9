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
