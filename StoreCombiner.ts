import { Readable } from "svelte/store";

type Subscriber<T> = (value: T) => void;
type Unsubscriber = () => void;
type Invalidator<T> = (value?: T) => void;

export const ReadableCombine = <A, B>(a: Readable<A>, b: Readable<B>): Readable<A & B> => {
	return {
		subscribe: (run: Subscriber<A & B>, invalidate?: Invalidator<A & B>): Unsubscriber => {
			const unsuba = a.subscribe(run, invalidate);
			const unsubb = b.subscribe(run, invalidate);
			return () => {
				unsuba();
				unsubb();
			};
		}
	};
};

export const ReadableCombineAny = (...readables: Readable<Object>[]): Readable<Object> => {
	return {
		subscribe: (run: Subscriber<Object>, invalidate?: Invalidator<Object>): Unsubscriber => {
			const unsubs = readables.map(readable => readable.subscribe(run, invalidate));
			return () => {
				unsubs.forEach(unsub => unsub());
			};
		}
	};
};
