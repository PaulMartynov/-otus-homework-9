import { Game } from "./Game";

describe("testing Game class", () => {
  test("is a function", () => {
    expect(Game).toBeInstanceOf(Function);
  });
  test("is a instance of Game", () => {
    expect(
      new Game(
        document.createElement("table"),
        document.createElement("input"),
        2000
      )
    ).toBeInstanceOf(Game);
  });
});
