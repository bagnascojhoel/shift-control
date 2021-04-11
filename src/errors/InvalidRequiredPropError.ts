export class InvalidRequiredPropError extends Error {
  private static readonly DEFAULT_MESSAGE: string =
    'A required prop was null or undefined.';

  constructor(message?: string) {
    super(message || InvalidRequiredPropError.DEFAULT_MESSAGE);
  }
}
