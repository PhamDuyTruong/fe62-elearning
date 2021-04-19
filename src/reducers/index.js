import { combineReducers } from "redux";
import courses from './courses';
import auth from './auth'
// Nơi khai báo các reducer con
const rootReducer = combineReducers({
    courses,
    auth
});

export default rootReducer;