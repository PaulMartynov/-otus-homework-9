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

export function updateX(webEl: Element, size: number): void {
  const strings = webEl.querySelectorAll("tr");
  if (!strings) {
    return;
  }
  for (let i = 0; i < strings.length; i += 1) {
    let cells = strings[i].querySelectorAll("td");
    const diff = size - cells.length;
    if (diff > 0) {
      for (let j = 0; j < diff; j += 1) {
        CreateNewCell(strings[i]);
      }
    } else if (diff < 0) {
      for (let j = 0; j > diff; j -= 1) {
        cells[cells.length - 1].remove();
        cells = strings[i].querySelectorAll("td");
      }
    }
  }
}

export function updateY(webEl: Element, size: number): void {
  let strings = webEl.querySelectorAll("tr");
  if (!strings) {
    return;
  }
  const diff = size - strings.length;
  if (diff > 0) {
    for (let i = 0; i < diff; i += 1) {
      CreateNewString(webEl, strings[0].querySelectorAll("td").length);
    }
  } else if (diff < 0) {
    for (let i = 0; i > diff; i -= 1) {
      strings[strings.length - 1].remove();
      strings = webEl.querySelectorAll("tr");
    }
  }
}
