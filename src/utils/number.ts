function parseInteger(value: string | number) {
  if (typeof value === 'number') {
    return Math.trunc(value);
  }
  else return Number.parseInt(value);
}

function isSingleDigit(value: string | number) {
  return value >= 0 && value <= 9;
}

export const NumberUtils = {
  parseInteger,
  isSingleDigit
}
