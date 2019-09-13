import Axios from 'axios'
import { API } from 'react-native-dotenv'

export const addOrderMenu = (item) => {

  const dataItem = {
    menu: item,
    qty: 1
  }

  return {
    type: 'ADD_ORDER_MENU',
    payload: dataItem
  }

}

export const delOrderMenu = (prevMenu) => {

  const dataItem = {
    menu: prevMenu.menu,
    qty: prevMenu.qty
  }

  return {
    type: 'DEL_ORDER_MENU',
    payload: dataItem
  }

}

export const clearOrderMenu = () => {

  return {
    type: 'CLEAR_ORDER_MENU'
  }

}

export const addQtyMenu = (prevMenu) => {

  const dataItem = {
    menu: prevMenu.menu,
    qty: prevMenu.qty + 1
  }

  return {
    type: 'ADD_QTY_MENU',
    payload: dataItem
  }
}

export const decQtyMenu = (prevOrder) => {

  const dataItem = {
    menu: prevOrder.menu,
    qty: prevOrder.qty - 1
  }

  return {
    type: 'DEC_QTY_MENU',
    payload: dataItem
  }

}

export const addSubtotal = (price, qty) => {

  return {
    type: 'ADD_SUB_TOTAL',
    payload: price * qty
  }

}

export const minSubTotal = (price, qty) => {

  return {
    type: 'MIN_SUB_TOTAL',
    payload: price * qty
  }

}

export const confirmDataOrder = (order, paymentId) => {

  return {
    type: 'CONFIRM_DATA_ORDER',
    payload: Axios({
      method: 'POST',
      url: `${API}add_order`,
      data: {
        menuId: order.menu.id,
        paymentId,
        qty: order.qty,
        price: order.menu.price,
        status: 1
      },
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json'
    })
  }

}
