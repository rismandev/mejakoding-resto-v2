import { combineReducers } from 'redux'
import Category from './Category'
import Menu from './Menu'
import Order from './Order'
import Time from './Time'
import Payment from './Payment'

export default combineReducers({
  Category,
  Menu,
  Order,
  Time,
  Payment
})
