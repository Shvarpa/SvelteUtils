export const resize = (node) => {
    const dispatch = (type, detail) => node.dispatchEvent(new CustomEvent(type, { detail }));
    const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const { contentRect } = entry;
            dispatch("resize", contentRect);
        });
    });
    observer.observe(node);
    return {
        destroy() {
            observer.unobserve(node);
        }
    };
};
export default resize;
