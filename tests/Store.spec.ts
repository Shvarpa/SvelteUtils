import assert from "assert";
import { Store, IStore, getValue } from "../Store";
import { writable } from "svelte/store";
describe("Store", () => {
	describe("getValue", () => {
		it("should return current value of store", async () => {
			let value = {};
			const store = Store<{ [key: string]: any }>(value);
			let res = await getValue(store);
			assert.deepEqual(value, res);
			value = { a: 5 };
			store.set(value);
			res = await getValue(store);
			assert.deepEqual(value, res);
			store.destroy();
		});
		it("should return current value of writable", async () => {
			let value = {};
			const store = writable<{ [key: string]: any }>(value);
			let res = await getValue(store);
			assert.deepEqual(value, res);
			value = { a: 5 };
			store.set(value);
			res = await getValue(store);
			assert.deepEqual(value, res);
		});
		it("should return current value of writable that is not an object", async () => {
			let value = "string";
			const store = writable<string>(value);
			let res = await getValue(store);
			assert.equal(value, res);
			value = "different string";
			store.set(value);
			res = await getValue(store);
			assert.deepEqual(value, res);
		});
		it("should notify changes when changing subscribed value obtained from getValue directly", async () => {
			let sub = undefined;
			const store = writable<{ [key: string]: any }>({});
			store.subscribe(val => (sub = val));
			let res = await getValue(store);
			assert.deepEqual(res, {});
			assert.deepEqual(sub, {});
			res.b = 5;
			let diff = await getValue(store);
			assert.deepEqual(res, { b: 5 });
			assert.deepEqual(res, diff);
			assert.deepEqual(diff, sub);
		});
		it("should notify changes when changing deeply nested properties of subscribed value obtained from getValue directly", async () => {
			let sub = undefined;
			const value = { a: { b: "c" } };
			const store = writable<{ [key: string]: any }>(value);
			store.subscribe(val => (sub = val));
			let res = await getValue(store);
			assert.deepEqual(res, value);
			assert.deepEqual(sub, value);
			let a = res.a;
			a.b = "d";
			a = "something else";
			let diff = await getValue(store);
			assert.deepEqual(res, { a: { b: "d" } });
			assert.deepEqual(res, diff);
			assert.deepEqual(diff, sub);
		});
		it("should notify changes when deleting deeply nested properties of subscribed value obtained from getValue directly", async () => {
			let sub = undefined;
			const value = { a: { b: "c" } };
			const store = writable<{ [key: string]: any }>(value);
			store.subscribe(val => (sub = val));
			let res = await getValue(store);
			assert.deepEqual(res, value);
			assert.deepEqual(sub, value);
			delete res.a.b;
			let diff = await getValue(store);
			assert.deepEqual(res, { a: {} });
			assert.deepEqual(res, diff);
			assert.deepEqual(diff, sub);
		});
		it("should notify changes when using methods of subscribed value obtained from getValue directly", async () => {
			let sub = undefined;
			const value = new Set([]);
			const store = writable(value);
			store.subscribe(val => (sub = val));
			let res = await getValue(store);
			assert.deepEqual(res, value);
			assert.deepEqual(sub, value);
			res.add("a");
			let diff = await getValue(store);
			assert(res.has("a"));
			assert(diff.has("a"));
			assert(sub.has("a"));
		});
		it("should not change subscribed value obtained from getValue directly, when setting a different value", async () => {
			let sub = undefined;
			const store = writable<{ [key: string]: any }>({});
			store.subscribe(val => (sub = val));
			let res = await getValue(store);
			assert.deepEqual(res, {});
			assert.deepEqual(sub, {});
			store.set({});
			res.b = 5;
			let diff = await getValue(store);
			assert.deepEqual(res, { b: 5 });
			assert.notDeepEqual(res, diff);
			assert.deepEqual(diff, sub);
		});
	});
	describe("IStore", () => {
		describe("change", () => {
			it("should change value of store, if store is an object", async () => {
				let value = {};
				const store = Store<{ [key: string]: any }>(value);
				let res = await getValue(store);
				assert.deepEqual(value, res);

				store.change(x => (x.a = 5));
				res = await getValue(store);

				assert.deepEqual(res, { a: 5 });
				store.destroy();
			});
		});
		describe("value", () => {
			it("should trigger subsciption update on value change", async () => {
				let value = {};
				const store = Store<{ [key: string]: any }>(value);
				assert.deepEqual(store.value, value);
				store.value.a = 5;
				let res = await getValue(store);
				assert.deepEqual(store.value, { a: 5 });
				assert.deepEqual(store.value, res);
			});
			it("should trigger subsciption update on value set", async () => {
				let value = "assdafa";
				let newValue = "nlkerntklnrelk";
				const store = Store(value);
				assert.equal(store.value, value);
				store.value = newValue;
				let res = await getValue(store);
				assert.equal(store.value, newValue);
				assert.equal(store.value, res);
			});
		});
	});
});
