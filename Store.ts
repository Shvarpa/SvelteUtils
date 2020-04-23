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
	private state: T;
	private store: Writable<T>;
	readonly value: T;
	constructor(state: T) {
		this.state = state;
		this.store = writable(state);
		this.value = state;
		return new Proxy(this, {
			set: (object, key, value, proxy) => {
				// if(typeof value == "object" && !value[InnerSymbol]) {
				// 	value = new inner(value,this);
				// }
				object.state[key] = value;
				object.update(state => {
					state[key] = value;
					return state;
				});
				return true;
			},
			deleteProperty: (object, key) => {
				delete object.state[key];
				object.update(state => {
					delete state[key];
					return state;
				});
				return true;
			},
			get: (object, key, proxy) => {
				if (key == "subscribe" || key == "update" || key == "set" || key == "toJSON" || key == "value") return object[key];
				let value = object.state[key];
				if (typeof value == "object" && !value[InnerSymbol]) {
					// object.state[key] = inner(value, this);
					return inner(value, this);
				}
				return object.state[key];
			}
		});
	}

	get subscribe() {
		return this.store.subscribe;
	}

	get update() {
		return this.store.update;
	}

	get set() {
		return (value: T) => {
			this.state = value;
			this.store.set(value);
		}
	}

	toJSON() {
		return {
			...this.state
		};
	}
}

export function Store<T>(state: T) {
	return new store(state) as store<T> & T;
}

export default Store;
