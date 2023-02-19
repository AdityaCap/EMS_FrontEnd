import { combineReducers } from "@reduxjs/toolkit";

import employee from './employee';
import department from './department';
import login from './login';

export default combineReducers({employee,department,login})