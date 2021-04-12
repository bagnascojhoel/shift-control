export class InvalidTimeStringError extends Error {
  private static readonly DEFAULT_MESSAGE = 'The given string value is invalid.';

  constructor(message?: string) {
    super(message || InvalidTimeStringError.DEFAULT_MESSAGE);
  }
}

