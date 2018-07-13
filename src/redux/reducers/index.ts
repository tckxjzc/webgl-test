import {combineReducers} from 'redux';
import loading from './loading'

export default combineReducers({
    start: (state = null, action) => {
        return true
    },
    loading,
});