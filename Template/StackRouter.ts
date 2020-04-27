import { Store } from "../Store";

import { Readable } from "svelte/store";
import { SvelteComponent } from "svelte";

interface ComponentRoute {
	component: SvelteComponent;
	props: { [key: string]: any };
}

type Route = ComponentRoute | SvelteComponent;
const isSvelteComponent = (route: Route): route is SvelteComponent => typeof route == "function";

interface StackRouterStore extends ComponentRoute {
	depth: number;
}

export class StackRouter implements Readable<StackRouterStore> {
	state = Store({
		component: undefined,
		props: {},
		depth: 0
	});

	route: ComponentRoute;
	stack: ComponentRoute[] = [];

	private min = 0;

	constructor(route?: Route) {
		this.route = Object.defineProperties(
			{},
			{
				component: { get: () => this.state.component },
				props: { get: () => this.state.props }
			}
		);
		if (route == undefined) return;
		this.go(route);
		this.min = 1;
	}

	private update() {
		let depth = this.stack.length;
		this.state.set({ ...this.stack[depth - 1], depth });
	}

	clear() {
		this.stack.splice(this.min)
		this.update();
	}

	back() {
		if (this.stack.length == this.min) return false;
		this.stack.pop();
		this.update();
		return true;
	}

	go(to: Route) {
		this.stack.push(isSvelteComponent(to) ? { component: to, props: {} } : to);
		this.update();
		return true;
	}

	get subscribe() {
		return this.state.subscribe;
	}
}
