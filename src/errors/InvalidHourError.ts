export class InvalidHourError extends Error {
  private static readonly DEFAULT_MESSAGE = 'The given hour value is invalid';

  constructor(message?: string) {
    super(message || InvalidHourError.DEFAULT_MESSAGE);
  }
}
