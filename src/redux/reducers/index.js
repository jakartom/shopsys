import { combineReducers } from 'redux';
import { user } from './user'
import { customer } from './customer'
import {cardType} from './cardType'

const rootReducer = combineReducers({
    user,
    customer,
    cardType
})

export default rootReducer