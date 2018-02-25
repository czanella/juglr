/* eslint-disable no-undef */
const globalWindow = window || {
    requestAnimationFrame: () => {},
};

export default globalWindow;
