import Axios from 'axios'

export const addTableNumber = (number) => {
  return {
    type: 'ADD_TABLE_NUMBER',
    payload: Axios({
      method: 'POST',
      url: `http://192.168.0.28:8000/api/v2/add_payment`,
      data: {
        tableNumber: number,
        isPaid: false
      }
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
