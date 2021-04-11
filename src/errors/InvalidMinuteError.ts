export class InvalidMinuteError extends Error {
  private static readonly DEFAULT_MESSAGE: string =
    'The given minute value is invalid';

  constructor(message?: string) {
    super(message || InvalidMinuteError.DEFAULT_MESSAGE);
  }
}
