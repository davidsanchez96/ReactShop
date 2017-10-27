import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer/rootReducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export default function configureStore() {
    return createStoreWithMiddleware(rootReducer);
}