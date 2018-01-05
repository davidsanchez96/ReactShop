import * as types from '../utils/actionTypes';
import Immutable, {OrderedSet} from 'immutable';

const initialState = Immutable.fromJS({
    loading: true,
    page:0,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    data: [],
    total: 0,
    checkedList: new OrderedSet([]),
    editable: false
});
export default function messageListReducer(state = initialState, action) {
    switch (action.type) {
        case types.MessageListLoading:
            return state.set('loading', true);
        case types.MessageListLoaded:
            if (action.page === 0) {
                return state.set('loading', false).set('loadingMore', false).set('page',action.page)
                    .set('hasMore', action.hasMore).set('data', Immutable.fromJS(action.data));
            } else {
                return state.set('loading', false).set('loadingMore', false).set('page',action.page)
                    .set('hasMore', action.hasMore).set('data', state.get('data').concat(Immutable.fromJS(action.data)));
            }
        case types.NetError:
            return state.set('loading', false);
        case types.MessageListTotal:
            return state.set('total', action.data);
        case types.MessageListEdit:
            return state.set('editable', !state.get('editable'));
        case types.MessageListItem:
            return state.withMutations((cursor) => {
                if (action.checked) {
                    cursor.set('checkedList', cursor.get('checkedList').concat(action.id));
                } else {
                    cursor.set('checkedList', cursor.get('checkedList').delete(action.id));
                }
            });
        case types.MessageListShowMore:
            return state.set('loadingMore', true);
        case types.MessageListClean:
            return initialState;
        default:
            return state;
    }
}