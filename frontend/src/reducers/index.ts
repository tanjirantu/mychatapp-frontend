import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import { userApi } from '../api/users';

const rootReducer = combineReducers({
    user: userReducer,
    messages: messageReducer,
    [userApi.reducerPath]: userApi.reducer,
});

export default rootReducer;
