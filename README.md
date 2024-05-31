# Result-in-ts

## Overview

Result-in-ts is a TypeScript library designed to handle results and errors in a functional programming style. It provides a simple and effective way to manage success and failure cases without relying on exceptions.

## Features

- Easy-to-use API for handling results and errors
- Functional programming style
- Type-safe error handling
- Lightweight and performant

## Installation

### From npm

```sh
npm install result-in-ts       # npm
yarn add result-in-ts          # yarn
bun add result-in-ts           # bun
pnpm add result-in-ts          # pnpm
```

## Usage

Here's a basic example of how to use Result-in-ts:

```typescript
import { Result } from "./result";

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
```
