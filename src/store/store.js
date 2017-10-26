import {createStore} from 'redux';
import nav from '../reducer/rootReducer';

export default function configureStore() {
    return createStore(nav)
}