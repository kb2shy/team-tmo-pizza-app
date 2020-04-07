import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../src/reducers';
import { middlewares } from '../src/configureStore';

/**
 * Create a testing store with import reducers, middleware,
 * and initial state
 * globals: rootReducer
 * @param {object} initialState - initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}

/**
 * Return node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}