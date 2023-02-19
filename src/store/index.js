import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import reducer from './reducer'

export const store = createStore(
    reducer,
    compose(applyMiddleware(thunk))
    );
 