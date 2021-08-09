import * as Field from "./Field";
import { Game } from "./Game";

const horizontalFieldSize = <HTMLInputElement>document.querySelector("#Ox");
const verticalFieldSize = <HTMLInputElement>document.querySelector("#Oy");
const speed = <HTMLInputElement>document.querySelector("#speed");
const startBtn = document.querySelector("#start");
const gameField = document.querySelector("#game_field");

if (
  horizontalFieldSize &&
  verticalFieldSize &&
  gameField &&
  speed &&
  startBtn
) {
  Field.CreateNewField(
    gameField,
    Number(horizontalFieldSize.value),
    Number(verticalFieldSize.value)
  );

  const game = new Game(gameField, startBtn, Number(speed.value));

  horizontalFieldSize.addEventListener("click", () => {
    Field.updateX(gameField, Number(horizontalFieldSize.value));
  });
  verticalFieldSize.addEventListener("click", () => {
    Field.updateY(gameField, Number(verticalFieldSize.value));
  });
  speed.addEventListener("mouseup", () => {
    game.setGameSpeed(Number(speed.value));
  });
  startBtn.addEventListener("click", () => {
    if (game.gameIsRunning) {
      game.stop();
    } else {
      game.start();
    }
  });
}
