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
