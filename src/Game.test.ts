import * as GameState from "./GameState";
import { Game, LEN_OF_GENERATIONS } from "./Game";

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

describe("testing setSpeed function", () => {
  let game: Game;
  beforeEach(() => {
    game = new Game(
      document.createElement("table"),
      document.createElement("input"),
      2000
    );
    game.stop = jest.fn();
    game.start = jest.fn();
  });
  test("is a function", () => {
    expect(Game.prototype.setGameSpeed).toBeInstanceOf(Function);
  });
  test("it change game speed if game is not running", () => {
    game.setGameSpeed(1500);
    expect(game.gameSpeed).toBe(1500);
  });
  test("it change game speed if game is running", () => {
    game.gameIsRunning = true;
    game.setGameSpeed(1500);
    expect(game.gameSpeed).toBe(1500);
    expect(game.stop).toBeCalled();
    expect(game.start).toBeCalled();
  });
});

describe("testing stop function", () => {
  test("is a function", () => {
    expect(Game.prototype.stop).toBeInstanceOf(Function);
  });
  test("it stopping game", () => {
    const game = new Game(
      document.createElement("table"),
      document.createElement("input"),
      2000
    );
    game.gameIsRunning = true;
    jest.useFakeTimers();
    jest.spyOn(global, "clearInterval");
    game.stop();
    expect(game.gameIsRunning).toBeFalsy();
    expect(game.startBtn.getAttribute("value")).toBe("Start game");
    expect(global.clearInterval).toBeCalled();
  });
});

describe("testing start function", () => {
  test("is a function", () => {
    expect(Game.prototype.start).toBeInstanceOf(Function);
  });
  test("it starting game", () => {
    const table = document.createElement("table");
    const game = new Game(table, document.createElement("input"), 2000);
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");
    game.start();
    expect(game.gameIsRunning).toBeTruthy();
    expect(game.startBtn.getAttribute("value")).toBe("Stop game");
    expect(global.setInterval).toBeCalled();
  });
});

describe("testing run function", () => {
  test("is a function", () => {
    expect(Game.prototype.run).toBeInstanceOf(Function);
  });
  test("it run game", () => {
    const table = document.createElement("table");
    table.innerHTML =
      "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
      "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
      "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>";
    const game = new Game(table, document.createElement("input"), 2000);
    jest.spyOn(GameState, "getFieldMatrix");
    jest.spyOn(GameState, "doomNeighbours");
    jest.spyOn(GameState, "updateField");
    jest.spyOn(GameState, "isAnyoneAlive");
    game.stop = jest.fn();
    game.run();
    expect(GameState.getFieldMatrix).toBeCalledWith(table);
    expect(GameState.doomNeighbours).toBeCalledWith(table);
    expect(GameState.updateField).toBeCalled();
    expect(GameState.isAnyoneAlive).toBeCalledWith(table);
    expect(game.stop).toBeCalled();
  });
});

describe("testing addNewGeneration function", () => {
  test("is a function", () => {
    expect(Game.prototype.addNewGeneration).toBeInstanceOf(Function);
  });
  test("is adding last field state", () => {
    const table = document.createElement("table");
    table.innerHTML =
      "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
      "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>" +
      "<tr><td class='dead'></td><td class='dead'></td><td class='dead'></td></tr>";
    const fieldState = GameState.getFieldMatrix(table);
    const game = new Game(table, document.createElement("input"), 2000);
    expect(game.generations).toHaveLength(0);
    game.addNewGeneration(fieldState);
    expect(game.generations).toHaveLength(1);
    game.addNewGeneration(fieldState);
    game.addNewGeneration(fieldState);
    expect(game.generations).toHaveLength(LEN_OF_GENERATIONS);
  });
});
