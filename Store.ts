import { Writable, writable, Readable } from "svelte/store";

export class IStore<T> implements Writable<T> {
	private _value: T;
	private _store: Writable<T> = writable<T>(undefined);
	constructor(value?: T) {
		this.value = value || undefined;
	}
	set value(value) {
		this.set(value);
	}
	get value() {
		return this._value;
	}
	get subscribe() {
		return this._store.subscribe.bind(this._store);
	}
	change(changer: (x: T) => void) {
		changer(this._value);
		this.set(this._value);
	}
	update(updater: (value: T) => T) {
		return this.set(updater(this._value));
	}
	set(value: T) {
		return this._store.set((this._value = value));
	}
}

export const Store = <T>(value?: T) => new IStore(value);

export const getValue = async <T>(store: Writable<T>): Promise<T> => {
	return new Promise(async res => {
		let unsub = (): void => {
			throw new Error("getValue failed");
		};
		let val: T = await new Promise(_res => (unsub = store.subscribe(val => _res(val))));
		unsub();
		res(val);
	});
};

export const until = async <T>(store: Readable<T>, callback: (value: T) => boolean) => {
	let unsub;
	await new Promise(res => {
		unsub = store.subscribe(e => {
			if (callback(e)) res(true);
		});
	});
	unsub();
};
