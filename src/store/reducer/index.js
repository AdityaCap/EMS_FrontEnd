import { combineReducers } from "@reduxjs/toolkit";

import employee from './employee';
import department from './department';
import login from './login';
import project from './project'
import assignProject from "./assignProject";

export default combineReducers({employee,department,login,project,assignProject})