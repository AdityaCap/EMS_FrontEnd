import { combineReducers } from "@reduxjs/toolkit";

import employee from './employee';
import department from './department';
import login from './login';
import project from './project'

export default combineReducers({employee,department,login,project})