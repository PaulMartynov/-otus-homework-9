import * as GameState from "./GameState";

const MIN_GAME_SPEED = 3000; // ms
const LEN_OF_GENERATIONS = 2; // количество предыдущих поколений для определения повторного состояния поля

export class Game {
  gameField: Element;

  startBtn: Element;

  gameSpeed: number;

  timer: NodeJS.Timer | undefined;

  gameIsRunning: boolean | undefined;

  generations: Array<string[][]>;

  constructor(gameField: Element, startBtn: Element, gameSpeed: number) {
    this.gameField = gameField;
    this.startBtn = startBtn;
    this.gameSpeed = MIN_GAME_SPEED - gameSpeed;
    this.generations = [];
  }

  setGameSpeed(gameSpeed: number): void {
    this.gameSpeed = MIN_GAME_SPEED - gameSpeed;
    if (this.gameIsRunning) {
      this.stop();
      this.start();
    }
  }

  addNewGeneration(field: Array<NodeListOf<Element>>): void {
    const elementsState: string[][] = [];
    for (let i = 0; i < field.length; i += 1) {
      const cells: string[] = [];
      for (let j = 0; j < field[i].length; j += 1) {
        cells.push(<string>field[i][j].getAttribute("class"));
      }
      elementsState.unshift(cells);
    }
    this.generations.unshift(elementsState);
    if (this.generations.length > LEN_OF_GENERATIONS) {
      this.generations.pop();
    }
  }

  stop(): void {
    this.gameIsRunning = false;
    this.startBtn.setAttribute("value", "Start game");
    clearInterval(<NodeJS.Timeout>this.timer);
  }

  run(): void {
    const field = GameState.getFieldMatrix(this.gameField);
    this.addNewGeneration(field);
    GameState.doomNeighbours(this.gameField);
    GameState.updateField(field);
    if (!GameState.isAnyoneAlive(this.gameField)) {
      alert("All cells is dead");
      this.stop();
    } else if (GameState.checkListOfField(field, this.generations)) {
      alert("Game repeating of some of previous generations");
      this.stop();
    }
  }

  start(): void {
    this.gameIsRunning = true;
    this.startBtn.setAttribute("value", "Stop game");
    this.timer = setInterval(() => {
      this.run();
    }, this.gameSpeed);
  }
}
