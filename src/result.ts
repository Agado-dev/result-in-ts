interface ResultType<T, E> {
  map<B>(fn: (val: T) => B): Result<B, E>;
  mapErr<F>(fn: (err: E) => F): Result<T, F>;
  flatMap<B, F>(fn: (val: T) => Result<B, F>): Result<B, F>;
  isOk(): this is Ok<T>;
  isErr(): this is Err<E>;
  unwrapOr(defaultValue: T): T;
  toString(): string;
}
/**
 * Result type can both be an instance of Ok (valid result with a value)
 *  or instance of Err (error result with an error field)
 **/
export type Result<T, E> = Ok<T> | Err<E>;

class Ok<T> implements ResultType<T, never> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  map<B>(fn: (value: T) => B): Result<B, never> {
    return ok(fn(this.value));
  }
  mapErr<F>(_fn: (err: never) => F): Result<T, F> {
    return ok(this.value);
  }

  flatMap<B, E>(fn: (val: T) => Result<B, E>): Result<B, E> {
    return fn(this.value);
  }

  isOk(): this is Ok<T> {
    return true;
  }

  isErr(): this is Err<never> {
    return false;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  toString(): string {
    return `Ok(${format(this.value)})`;
  }
}
export type OkType<T> = Ok<T>;

class Err<E> implements ResultType<never, E> {
  private readonly error: E;
  readonly stack: string | undefined;

  constructor(error: E) {
    this.error = error;
    this.stack = new Error().stack;
  }

  map<B>(_fn: (value: never) => B): Result<B, E> {
    return err(this.error);
  }

  mapErr<F>(fn: (err: E) => F): Result<never, F> {
    return err(fn(this.error));
  }

  flatMap<B, F>(_fn: (val: never) => Result<B, F>): Result<B, F> {
    return this as unknown as Result<B, F>;
  }

  isOk(): this is Ok<never> {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }

  unwrapErr(): E {
    return this.error;
  }
  unwrapOr<T>(_defaultValue: T): T {
    return _defaultValue;
  }
  toString(): string {
    return `Err(${format(this.error)})`;
  }
}
export type ErrType<E> = Err<E>;

// Utility functions
function ok<T>(value: T): Ok<T> {
  return new Ok(value);
}

function err<E>(error: E): Err<E> {
  return new Err(error);
}
function format(val: unknown): string {
  let value = String(val);
  if (value === "[object Object]") {
    try {
      value = JSON.stringify(val);
    } catch {}
  }
  return value;
}

/**
 * Exported function to create instance of Ok or Err
 */
export const Result = {
  ok,
  err,
};
