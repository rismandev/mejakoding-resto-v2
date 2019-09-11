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
