import { useCallback, useTransition } from "react";
import { useFormState } from "react-dom";

/**
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/canary.d.ts#L103-L112}
 */
export function useActionStateCompat<State>(
  action: (state: Awaited<State>) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string,
): [state: Awaited<State>, dispatch: () => void, isPending: boolean];
export function useActionStateCompat<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string,
): [
  state: Awaited<State>,
  dispatch: (payload: Payload) => void,
  isPending: boolean,
];
export function useActionStateCompat<State, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: Awaited<State>,
  permalink?: string,
) {
  const [isPending, startTransition] = useTransition();

  const [currentState, dispatchAction] = useFormState(
    action,
    initialState,
    permalink,
  );

  const finalAction = useCallback(
    (payload: Payload) => {
      startTransition(() => {
        dispatchAction(payload);
      });
    },
    [dispatchAction],
  );

  return [currentState, finalAction, isPending];
}
