const initialState = {
  valid: 0,
  data: {
    tableNumber: 1,
    subTotal: 0,
    discount: 0,
    serv: 0,
    tax: 0,
    total: 0,
  }
}

export default Payment = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_TOTAL':
      return {...state, data: action.payload}

    case 'UPDATE_DISCOUNT':
      return {...state, valid: action.payload.valid, data: {...state.data, discount: action.payload.discount}}

    case 'UPDATE_SUBTOTAL':
      return {...state, data: {...state.data, subTotal: action.payload}}

    default:
      return state
  }
}
