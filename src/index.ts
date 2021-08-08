import * as Field from "./Field";

const horizontalFieldSize = <HTMLInputElement>document.querySelector("#Ox");
const verticalFieldSize = <HTMLInputElement>document.querySelector("#Oy");
const speed = <HTMLInputElement>document.querySelector("#speed");
const startBtn = document.querySelector("#start");
const gameField = document.querySelector("#game_field");

if (horizontalFieldSize && verticalFieldSize && gameField) {
  Field.CreateNewField(
    gameField,
    Number(horizontalFieldSize.value),
    Number(verticalFieldSize.value)
  );

  horizontalFieldSize.addEventListener("click", () => {
    Field.updateX(gameField, Number(horizontalFieldSize.value));
  });
  verticalFieldSize.addEventListener("click", () => {
    Field.updateY(gameField, Number(verticalFieldSize.value));
  });
}
