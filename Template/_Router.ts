import { Store } from "../Store";

export const filter = (path: string) => path.match(/(\/)?(.*)/)[2];
const getPath = (path: string) => path.split("/").filter(Boolean);
const resolve = path => {
	let segments = getPath(path);
	for (let i = 0; i < segments.length; ) {
		if (segments[i] == "..") {
			console.log(segments.splice(i, i == 0 ? 1 : 2));
			i = Math.max(0, i - 2);
		} else if (segments[i] == ".") {
			console.log(segments.splice(i, 1));
			i = Math.max(0, i - 1);
		} else {
			i++;
		}
		console.log(i, segments);
	}
	return segments.join("/");
};
const combine = (path, add) => {
	if (add[0] == "/") return resolve(add);
	return resolve(path + "/" + add);
};
const tree = routes => {
	let routePaths = routes.map(route => getPath(route.path)); // ["settings/", "settings/keyboard", "settings/:key", "mouse/:key", "settings/:key/keyboard", "settings/*", "*"];
	const branch = rel => {
		let root = {};
		rel.forEach(path => {
			let r = rel.filter(p => path[0] == p).map(p => p.slice(1));
			root[path[0]] = r.length <= 1 ? r[0] : branch(r);
		});
		return root;
	};
	const root = branch(routes.map((path, index) => getPath(path).concat(index)));
	const goTO = path => {
		let step = root;
		getPath(path).forEach(s => (step = step[s]));
		return step;
	};
	return goTO;
};

interface Routes {
	[index: number]: { path: string; component: any };
}

export class Router {
	state = Store({
		basepath: undefined,
		url: ""
	});

	routes: Routes;
   
	constructor(routes: { [path: string]: any }) {
		this.routes = routes.map(([path, component]) => {
			return { path, component };
		});
	}

	find(path) {
		return { component: this.routes[path], props: {} };
	}

	navigate(to) {
		if (to == this.state.url) return;
		this.state.url = combine(this.state.url, to);
	}

	get subscribe() {
		return this.state.subscribe;
	}
}
