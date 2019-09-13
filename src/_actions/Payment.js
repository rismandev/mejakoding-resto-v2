import Axios from 'axios'
import { API } from 'react-native-dotenv'

export const addTableNumber = (number) => {
  return {
    type: 'ADD_TABLE_NUMBER',
    payload: Axios({
      method: 'POST',
      url: `${API}add_payment`,
      data: {
        tableNumber: number,
        isPaid: false
      }
    })
  }
}

export const updateDataPayment = (data, finishedTime) => {

  const payment = {
    tableNumber: data.tableNumber,
    finishedTime,
    subtotal: data.subTotal,
    discount: data.discount,
    serviceCharge: data.serv,
    tax: data.tax,
    total: data.total,
    isPaid: 1
  }

  const id = data.paymentId

  return {
    type: 'UPDATE_PAYMENT',
    payload: Axios({
      method: 'PATCH',
      url: `${API}update_payment/${id}/tableNumber/${data.tableNumber}`,
      data: payment
    })
  }
}

export const updateTotal = (data) => {
  return {
    type: 'UPDATE_TOTAL',
    payload: data
  }
}

export const updateDiscount = (valid, discount) => {
  return {
    type: 'UPDATE_DISCOUNT',
    payload: {
      valid,
      discount
    }
  }
}

export const addSubtotalToPayment = (subTotal) => {
  return {
    type: 'UPDATE_SUBTOTAL',
    payload: subTotal
  }
}
