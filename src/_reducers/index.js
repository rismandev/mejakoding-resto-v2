import { combineReducers } from 'redux'
import Category from './Category'
import Menu from './Menu'
import Order from './Order'
import Time from './Time'

export default combineReducers({
  Category,
  Menu,
  Order,
  Time
})
