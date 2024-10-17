import { Result } from "../src/result";

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.err("Division by zero");
  }
  return Result.ok(a / b);
}

const result = divide(10, 2);

if (result.isOk()) {
  console.log("Result:", result.unwrap());
} else {
  console.error("Error:", result.unwrapErr());
}

const expectErrorResult = divide(10, 0);

if (expectErrorResult.isOk()) {
  console.log("Result:", expectErrorResult.unwrap());
} else {
  console.error("Error:", expectErrorResult.unwrapErr());
}
