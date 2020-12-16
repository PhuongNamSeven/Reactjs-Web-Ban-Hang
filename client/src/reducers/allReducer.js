import { combineReducers } from 'redux';
import userReducer  from './userReducer';
// import  valueSearchReducer  from './valueSearchReducer';
const rootReducer = combineReducers({
    user: userReducer, // luu tru du lieu khach hang dat mua hang
    // valueSearch: valueSearchReducer // luu tru du lieu Search
});
export default rootReducer;