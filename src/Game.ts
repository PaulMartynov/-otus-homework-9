import * as GameState from "./GameState";

export class Game {
  gameField: Element;

  startBtn: Element;

  gameSpeed: number;

  timer: NodeJS.Timer | undefined;

  gameIsRunning: boolean | undefined;

  constructor(gameField: Element, startBtn: Element, gameSpeed: number) {
    this.gameField = gameField;
    this.startBtn = startBtn;
    this.gameSpeed = 3000 - gameSpeed;
  }

  setGameSpeed(gameSpeed: number): void {
    this.gameSpeed = 3000 - gameSpeed;
    if (this.gameIsRunning) {
      this.stop();
      this.start();
    }
  }

  stop(): void {
    this.gameIsRunning = false;
    this.startBtn.setAttribute("value", "Start game");
    clearInterval(<NodeJS.Timeout>this.timer);
  }

  start(): void {
    this.gameIsRunning = true;
    this.startBtn.setAttribute("value", "Stop game");
    this.timer = setInterval(() => {
      const field = GameState.getFieldMatrix(this.gameField);
      GameState.doomNeighbours(this.gameField);
      GameState.updateField(field);
      if (!GameState.isAnyoneAlive(this.gameField)) {
        alert("All cells is dead");
        this.stop();
      }
    }, this.gameSpeed);
  }
}
