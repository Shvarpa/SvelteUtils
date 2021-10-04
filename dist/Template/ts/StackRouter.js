import { Store } from "../../Storeore";
const isSvelteComponent = (route) => typeof route == "function" || (typeof route == "object" && route.render);
export class StackRouter {
    constructor(route) {
        this.state = Store({
            component: undefined,
            props: {},
            depth: 0
        });
        this.stack = [];
        this.min = 0;
        this.back = () => {
            if (this.stack.length == this.min)
                return false;
            this.stack.pop();
            this.update();
            return true;
        };
        this.route = Object.defineProperties({}, {
            component: { get: () => this.state.value.component },
            props: { get: () => this.state.value.props }
        });
        if (route != undefined) {
            this._go(route);
            this.min = 1;
        }
    }
    update() {
        let depth = this.stack.length;
        let item = this.stack[depth - 1] || { component: undefined, props: {} };
        this.state.set({ ...item, depth });
    }
    clear() {
        this.stack.splice(this.min);
        this.update();
    }
    _go(to) {
        this.stack.push(isSvelteComponent(to) ? { component: to, props: {} } : to);
        this.update();
        return true;
    }
    go(to) {
        return () => this._go(to);
    }
    get subscribe() {
        return this.state.subscribe;
    }
}
