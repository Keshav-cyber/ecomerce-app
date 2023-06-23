import {combineReducers} from 'redux'
import { cartReducer } from './cartReducer'
import { searchReducer } from './searchReducer'

export const combinedRed = combineReducers({
    cart : cartReducer,
    searchString : searchReducer
    
} )