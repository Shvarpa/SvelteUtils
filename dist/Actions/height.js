const pads = ["margin-bottom", "margin-top"];
const getBaseHeight = (node) => node.offsetHeight || 0;
const getHeight = (node) => {
    let style = window.getComputedStyle(node);
    return getBaseHeight(node) + pads.map(key => parseInt(style.getPropertyValue(key))).reduce((prev, cur) => prev + cur, 0);
};
export const getAllChildren = (node) => {
    if (node.children.length <= 0)
        return [];
    return Array.prototype.reduce.call(node.children, (prev, next) => prev.concat([next, ...getAllChildren(next)]), []);
};
export const getSize = (node) => {
    let children = getAllChildren(node);
    let cords = children.map((child) => [child, child.getBoundingClientRect().y]);
    let min = cords.reduce((prev, [, y]) => Math.min(y, prev), cords.length > 0 ? cords[0][1] : 0);
    let max = cords.reduce((prev, [node, y]) => Math.max(y - min + getHeight(node), prev), 0);
    return max;
};
export const height = (node, params) => {
    let show = false;
    let transition = "2s ease";
    const set = (params) => {
        show = params.show ?? false;
        transition = params.transition ?? "2s ease 0s";
    };
    const refresh = () => {
        node.style.height = getSize(node) + "px";
        node.style.transition = `height ${transition}`;
    };
    const update = (params) => {
        set(params);
        refresh();
    };
    const resize = () => {
        if (show)
            refresh();
    };
    node.style.overflow = "hidden";
    if (window)
        window.addEventListener("resize", resize);
    update(params);
    return {
        update,
        destroy: () => {
            if (window)
                window.removeEventListener("resize", resize);
        }
    };
};
export default height;
