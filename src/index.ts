import * as Field from "./Field";

const horizontalFieldSize = document.querySelector("#Ox");
const verticalFieldSize = document.querySelector("#Oy");
const speed = document.querySelector("#speed");
const startBtn = document.querySelector("#start");
const gameField = document.querySelector("#game_field");

if (horizontalFieldSize && verticalFieldSize && gameField) {
  Field.CreateNewField(
    gameField,
    Number(horizontalFieldSize.getAttribute("value")),
    Number(verticalFieldSize.getAttribute("value"))
  );
}
