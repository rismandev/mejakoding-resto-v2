const initialState = {
  valid: 0,
  data: {
    paymentId: 0,
    tableNumber: 0,
    subTotal: 0,
    discount: 0,
    serv: 0,
    tax: 0,
    total: 0,
  },
  isLoading: false,
  isError: false,
  dataItem: {
    paymentId: 0,
    tableNumber: 0,
    total: 0,
  }
}

export default Payment = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TABLE_NUMBER_PENDING':
      return {...state, isLoading: true}
    case 'ADD_TABLE_NUMBER_FULFILLED':
      const { id, tableNumber } = action.payload.data
      return {...state, data: {...state.data, paymentId: id, tableNumber: tableNumber}, isLoading: false}
    case 'ADD_TABLE_NUMBER_REJECTED':
      return {...state, isError: true, isLoading: false}

    case 'UPDATE_PAYMENT_PENDING':
      return {...state, isLoading: true, isError: false}
    case 'UPDATE_PAYMENT_FULFILLED':
      const dataItem = {
        paymentId: state.data.paymentId,
        tableNumber: state.data.tableNumber,
        total: state.data.total
      }
      const data = {
        paymentId: 0,
        tableNumber: 0,
        subTotal: 0,
        discount: 0,
        serv: 0,
        tax: 0,
        total: 0,
      }
      return {...state, valid: 0, dataItem, data, isLoading: false, isError: false}
    case 'UPDATE_PAYMENT_REJECTED':
      return {...state, isLoading: false, isError: true}

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
