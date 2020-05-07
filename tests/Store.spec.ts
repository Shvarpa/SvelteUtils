import assert from "assert";
import { Store } from "../Store";

describe("Store", () => {
	it("updates state to subscribers", res => {
		let i = 0;
		let store = Store<{ [key: string]: any }>({});
		store.subscribe(value => {
			switch (i++) {
				case 1:
					assert.equal(value.x, 5);
					assert.equal(value.x, store.x);
					break;
				case 2:
					assert.deepEqual(value, {});
					assert.equal(value.x, store.x);
					res();
					break;
			}
		});
		store.x = 5;
		delete store.x;
	});
	it("updates state of nested object", res => {
		let i = 0;
		let store = Store<{ [key: string]: any }>({});
		store.subscribe(value => {
			switch (i++) {
				case 1:
					assert.deepEqual(value.x, { z: 5 });
					assert.deepEqual(value.x, store.x);
					// res();
					break;
				case 2:
					assert.deepEqual(value.x, { z: 6 });
					assert.deepEqual(value.x, store.x);
					break;
				case 3:
					assert.deepEqual(value.x, {});
					assert.deepEqual(value.x, store.x);
					res();
					break;
			}
		});
		store.x = { z: 5 };
		store.x.z = 6;
		delete store.x.z;
	});
	it("what happens when creating using complex object?", res => {
		let i = 0;
		let store = Store<{ [key: string]: any }>({});
		store.subscribe(value => {
			switch (i++) {
				case 1:
					assert.deepEqual(value.x, { z: { a: 5 } });
					assert.deepEqual(value.x, store.x);
					break;
				case 2:
					assert.deepEqual(value.x, { z: { a: { b: 6 } } });
					assert.deepEqual(value.x, store.x);
					res();
					break;
			}
		});
		store.x = { z: { a: 5 } };
		store.x.z.a = { b: 6 };
	});
	// it("what happens when updating old refrence?", res=>{
	// 	let i = 0;
	// 	let store = Store<{ [key: string]: any }>({});
	// 	store.subscribe(value => {
	// 		console.log("update",{value});

	// 		switch (i++) {
	// 			case 1:
	// 				assert.equal(value.x.a, 1);
	// 				assert.equal(value.x.a, store.x.a);
	// 				break;
	// 			case 2:
	// 				assert.equal(value.x.a, 2);
	// 				assert.equal(value.x.a, store.x.a);
	// 				break;
	// 			case 3:
	// 				assert.equal(value.x.a, 3);
	// 				assert.equal(value.x.a, store.x.a);
	// 				res();
	// 				break;
	// 		}
	// 	});
	// 	let x = {
	// 		a: 1,
	// 		inc() {
	// 			this.a++;
	// 		},
	// 	};
	// 	store.x = x
	// 	console.log({x,storex:store.x});

	// 	// x.inc();
	// 	// x.inc();
	// 	store.x.inc();
	// 	x.inc();
	// 	store.x.inc();
	// 	// store.x.inc();
	// 	// console.log(store.x);
	// 	// console.log(x);

	// })
});
