import { Store } from "../Store";

import { Readable } from "svelte/store";
import { SvelteComponent } from "svelte";

type ISvelteComponent = SvelteComponent | any;
interface ComponentRoute {
	component: ISvelteComponent;
	props: { [key: string]: any };
}

type Route = ComponentRoute | ISvelteComponent;
const isSvelteComponent = (route: Route): route is ISvelteComponent => typeof route == "function" || (typeof route == "object" && (route as any).render);

interface StackRouterStore extends ComponentRoute {
	depth: number;
}

export class StackRouter implements Readable<StackRouterStore> {
	state = Store<StackRouterStore>({
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
				component: { get: () => this.state.value.component },
				props: { get: () => this.state.value.props }
			}
		);
		if (route != undefined) {
			this._go(route);
			this.min = 1;
		}
	}

	private update() {
		let depth = this.stack.length;
		let item = this.stack[depth - 1] || { component: undefined, props: {} };
		this.state.set({ ...item, depth });
	}

	clear = () => {
		this.stack.splice(this.min);
		this.update();
	};

	back = () => {
		if (this.stack.length == this.min) return false;
		this.stack.pop();
		this.update();
		return true;
	};

	_go(to: Route) {
		this.stack.push(isSvelteComponent(to) ? { component: to, props: {} } : to);
		this.update();
		return true;
	}

	go = (to: Route) => () => this._go(to);

	get subscribe() {
		return this.state.subscribe;
	}
}
