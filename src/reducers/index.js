import { combineReducers } from "redux";

import auth from './auth'
import userDetails from './userDetails'


export default combineReducers({
    auth,
    userDetails
})