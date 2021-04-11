export function parseInteger(value: string | number) {
  if (typeof value === 'number') {
    return Math.trunc(value);
  }
  else return Number.parseInt(value);
}

export function isSingleDigit(value: string | number) {
  return value >= 0 && value <= 9;
}
