import { writable } from "svelte/store";
export class IStore {
    constructor(value) {
        this._store = writable(undefined);
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
    change(changer) {
        changer(this._value);
        this.set(this._value);
    }
    update(updater) {
        return this.set(updater(this._value));
    }
    set(value) {
        return this._store.set((this._value = value));
    }
}
export const Store = (value) => new IStore(value);
export const getValue = async (store) => {
    return new Promise(async (res) => {
        let unsub = () => {
            throw new Error("getValue failed");
        };
        let val = await new Promise(_res => (unsub = store.subscribe(val => _res(val))));
        unsub();
        res(val);
    });
};
export const until = async (store, callback) => {
    let unsub;
    await new Promise(res => {
        unsub = store.subscribe(e => {
            if (callback(e))
                res(true);
        });
    });
    unsub();
};
