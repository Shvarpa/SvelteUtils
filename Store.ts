import { Writable, writable } from "svelte/store";

export class IStore<T> implements Writable<T> {
	private unsub: () => void;
	private _value: T;
	private _store: Writable<T> = writable<T>(undefined);
	constructor(value?: T) {
		this.unsub = this._store.subscribe(val => (this._value = val));
		if (value) this.value = value;
	}
	destroy() {
		this.unsub();
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
	}
	update(updater: (value: T) => T) {
		return this._store.update(updater);
	}
	set(value: T) {
		return this._store.set(value);
	}
}

export const Store = <T>(value: T) => new IStore(value);

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
