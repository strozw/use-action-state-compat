import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vitest } from "vitest";
import { useActionStateCompat } from ".";

const setup = (
  action: (state: unknown, payload: Record<string, string>) => Promise<unknown>,
  initialState: unknown,
) => renderHook(() => useActionStateCompat(action, initialState));

describe("useActionStateCompat", () => {
  it("should change `currentState` and `isPending` depending on the action being performed", async () => {
    const initialState = { value: "init" };

    const resolvedState = { value: "resolved" };

    const action = vitest.fn(async () => {
      return new Promise((resolve) => {
        globalThis.setTimeout(() => {
          resolve(resolvedState);
        }, 500);
      });
    });

    const { result, rerender } = setup(action, initialState);

    const [, finalAction] = result.current;

    const getCurrentState = () => result.current.at(0);

    const getIsPending = () => result.current.at(2);

    expect(getCurrentState()).toStrictEqual(initialState);

    expect(getIsPending()).toBe(false);

    finalAction({ value: "param" });

    expect(action).toHaveBeenCalledWith(initialState, { value: "param" });

    await waitFor(
      () => {
        rerender();

        expect(getCurrentState()).toStrictEqual(initialState);

        expect(getIsPending()).toBe(true);
      },
      { timeout: 500 },
    );

    await waitFor(
      () => {
        rerender();

        expect(getCurrentState()).toBe(resolvedState);

        expect(getIsPending()).toBe(false);
      },
      { timeout: 1000 },
    );
  });
});
