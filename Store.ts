import { writable, Writable } from "svelte/store";

interface Value<T> {
	readonly value: T;
}

const InnerSymbol = Symbol("inner");
function inner<K extends Object, T extends Object>(state: K, root: store<T>) {
	return new Proxy(state, {
		set: (object, key, value, proxy) => {
			object[key] = value;
			root.update(s => s);
			return true;
		},
		get: (object, key, proxy) => {
			if (key === InnerSymbol) {
				return true;
			}
			let value = object[key];
			if (typeof value == "object" && !value[InnerSymbol]) {
				// object[key] = inner(value, root);
				return inner(value, root);
			}
			return object[key];
		},
		deleteProperty: (object, key) => {
			delete object[key];
			root.update(s => s);
			return true;
		}
	});
}

export class store<T extends Object> implements Writable<T>, Value<T> {
	private _value: T;
	private store: Writable<T>;
	constructor(value: T) {
		this.store = writable((this._value = value));
		return new Proxy(this, {
			set: (object, key, value, proxy) => {
				this.update(store => {
					store[key] = value;
					return store;
				});
				return true;
			},
			deleteProperty: (object, key) => {
				this.update(store => {
					delete store[key];
					return store;
				});
				return true;
			},
			get: (object, key, proxy) => {
				if (key == "subscribe" || key == "update" || key == "set" || key == "toJSON" || key == "value") return this[key];
				let value = this._value[key];
				if (typeof value == "object" && !value[InnerSymbol]) {
					// object.state[key] = inner(value, this);
					return inner(value, this);
				}
				return this.value[key];
			}
		});
	}

	get subscribe() {
		return this.store.subscribe;
	}

	private _update = (updater: (x: T) => T): void => {
		this.store.update(value => (this._value = updater(value)));
	};
	get update() {
		return this._update;
	}

	private _set = (value: T) => {
		this.store.set((this._value = value));
	};
	get set() {
		return this._set;
	}

	get value() {
		return this._value;
	}

	// set value(value) { this.set(value); }

	toJSON() {
		return {
			...this.value
		};
	}
}

export function Store<T>(state: T) {
	return new store(state) as store<T> & T;
}

export default Store;
