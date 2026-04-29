export function canvasFont(
  sizePx: number,
  family: string,
  weight: number | string = 400
): string {
  return `${weight} ${sizePx}px ${family}`;
}
