/* eslint no-unused-vars: 0 */

const simpleAction = store => next => (action) => {
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
};

export default simpleAction;
