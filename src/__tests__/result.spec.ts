import { describe, expect, it } from "vitest";
import { type ErrType, type OkType, Result } from "../result";

describe("Result", () => {
  describe("Result creation", () => {
    it("should create an instance of Ok", () => {
      const okResult = Result.ok(1);
      expect(okResult.isOk()).toBe(true);
      expect(okResult.isErr()).toBe(false);
    });

    it("should create an instance of Err", () => {
      const errResult = Result.err("This went wrong");
      expect(errResult.isOk()).toBe(false);
      expect(errResult.isErr()).toBe(true);
    });
  });

  describe("Result unwrap", () => {
    it("could unwrap a value from Result.Ok", () => {
      const okResult = Result.ok(1);
      expect(okResult.unwrap()).toBe(1);
    });

    it("could unwrap an err from Result.Err", () => {
      const errResult = Result.err("This went wrong");
      expect(errResult.unwrapErr()).toBe("This went wrong");
    });
  });

  describe("Result unwrapOr", () => {
    it("should return the value on unwrapOr from Result.Ok", () => {
      const okResult = Result.ok(1);
      expect(okResult.unwrapOr(500)).toBe(1);
    });

    it("should return defaultValue on unwrapOr from Result.Err", () => {
      const errResult = Result.err("This went wrong");
      expect(errResult.unwrapOr("Now it's OK")).toBe("Now it's OK");
    });
  });

  describe("Result map", () => {
    it("could map a value from Result.Ok", () => {
      const okResult = Result.ok(1);
      const mappedResult = okResult.map((value) => value + 1);

      expectIsOkResult(mappedResult);
      expect(mappedResult.unwrap()).toBe(2);
    });
    it('could map a value from Result.Err. Must return the "unit" error value', () => {
      const errResult = Result.err("Wrong!");
      const mappedResult = errResult.map((value) => value + 1);

      expectIsErrResult(mappedResult);
      expect(mappedResult.unwrapErr()).toBe("Wrong!");
    });

    it('could mapErr a value from Result.Ok. Must return the "unit" value', () => {
      const okResult = Result.ok(1);
      const mappedResult = okResult.mapErr((err) => `${err}_modified`);

      expectIsOkResult(mappedResult);
      expect(mappedResult.unwrap()).toBe(1);
    });
    it('could mapErr a value from Result.Err. Must return the "unit" error value', () => {
      const errResult = Result.err("Wrong!");
      const mappedResult = errResult.mapErr((err) => `${err}_modified`);

      expectIsErrResult(mappedResult);
      expect(mappedResult.unwrapErr()).toBe("Wrong!_modified");
    });
  });

  describe("Result flatMap", () => {
    it("should flatMap a Result.Ok to another Result.Ok", () => {
      const okResult = Result.ok(1);
      const flatMappedResult = okResult.flatMap((value) =>
        Result.ok(value + 1)
      );
      expectIsOkResult(flatMappedResult);

      expect(flatMappedResult.unwrap()).toBe(2);
    });

    it("should flatMap a Result.Ok to a Result.Err", () => {
      const okResult = Result.ok(1);
      const flatMappedResult = okResult.flatMap((value) => Result.err("Snap!"));
      expectIsErrResult(flatMappedResult);

      expect(flatMappedResult.unwrapErr()).toBe("Snap!");
    });
    it("should not modify the error value when calling flatMap Result.Err", () => {
      const result: Result<string, string> = Result.err("Snap!");
      const flatMappedResult = result.flatMap((value) =>
        Result.ok(`${value}_modified`)
      );
      expectIsErrResult(flatMappedResult);

      expect(flatMappedResult.unwrapErr()).toBe("Snap!");
    });
  });

  describe("Result toString", () => {
    it("should return a string representation of Result.Ok", () => {
      const okResult = Result.ok(1);
      expect(okResult.toString()).toBe("Ok(1)");
    });

    it("should return a string representation of Result.Err", () => {
      const errResult = Result.err({ code: 500, message: "This went wrong" });
      expect(errResult.toString()).toBe(
        'Err({"code":500,"message":"This went wrong"})'
      );
    });
  });
});

function expectIsOkResult<T, E>(
  result: Result<T, E>
): asserts result is OkType<T> {
  expect(result.isOk()).toBe(true);
}
function expectIsErrResult<T, E>(
  result: Result<T, E>
): asserts result is ErrType<E> {
  expect(result.isErr()).toBe(true);
}
