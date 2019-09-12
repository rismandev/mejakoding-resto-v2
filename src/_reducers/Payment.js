const initialState = {
  valid: 0,
  data: {
    tableNumber: 0,
    subTotal: 0,
    discount: 0,
    serv: 0,
    tax: 0,
    total: 0,
  },
  isLoading: false,
  isError: false
}

export default Payment = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TABLE_NUMBER_PENDING':
      return {...state, isLoading: true}
    case 'ADD_TABLE_NUMBER_FULFILLED':
      return {...state, data: {...state.data, tableNumber: action.payload.number}, isLoading: false}
    case 'ADD_TABLE_NUMBER_REJECTED':
      return {...state, isError: true, isLoading: false}

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
