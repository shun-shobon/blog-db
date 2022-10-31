export class UnreachableError extends Error {
  constructor() {
    super("Unreachable");
  }
}

export function trying<T>(fn: () => T): T | Error {
  try {
    return fn();
  } catch (error: unknown) {
    if (error instanceof Error) return error;

    throw new UnreachableError();
  }
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
