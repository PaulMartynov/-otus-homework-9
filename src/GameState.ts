export function isAnyoneAlive(field: Element): boolean {
  return field.querySelectorAll(".alive").length > 0;
}
