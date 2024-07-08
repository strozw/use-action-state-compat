# useActionStateCompat

Next.js v14 and React.js v18 canary compatible `useActionState`

## Install

```
npm install -D @strozw/use-action-state-compat
```

## Usage

```tsx
import { useActionStateCompat } from "@strozw/use-action-state-compat";

type FormState = null | string;

const myAction = async (_state: FormState, data: FormData) => {
	return new Promise<null | string>((resolve) => {
		window.setTimeout(() => {
			if (!data.get("word")) {
				resolve("please input `word`");
			}
			resolve(null);
		}, 3000);
	});
};

export function MyFrom() {
	const [currentState, action, isPending] = useActionStateCompat(
		myAction,
		null,
	);

	return (
		<div>
			{currentState && <div>ERROR: {currentState}</div>}
			<form action={action}>
				<input type="text" name="word" />
				<button type="submit" disabled={isPending}>
					Submit
				</button>
			</form>
		</div>
	);
}
```
