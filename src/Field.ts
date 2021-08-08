export function CreateNewCell(webEl: Element): void {
  const newCell = document.createElement("td");
  newCell.setAttribute("class", "dead");
  newCell.setAttribute(
    "style",
    "background-color:#FFFFFF; height:15px; width:15px;"
  );
  webEl.appendChild(newCell);
}

export function CreateNewString(webEl: Element, size: number): void {
  const newString = document.createElement("tr");
  for (let i = 0; i < size; i += 1) {
    CreateNewCell(newString);
  }
  webEl.appendChild(newString);
}

export function CreateNewField(
  webEl: Element,
  sizeX: number,
  sizeY: number
): void {
  for (let i = 0; i < sizeY; i += 1) {
    CreateNewString(webEl, sizeX);
  }
  webEl.setAttribute("border", "1");
}
