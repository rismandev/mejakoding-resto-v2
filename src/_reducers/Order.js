const initialState = {
  data : [],
  subTotal : 0,
  orders: [],
  fixSubtotal: 0,
}

export default Order = (state = initialState, action) => {

  switch(action.type){

    case 'ADD_ORDER_MENU':
      return {...state, data : [...state.data, action.payload]}

    case 'ADD_QTY_MENU':
      let item = state.data.findIndex(y => y.menu.id == action.payload.menu.id)

      const newItem = [...state.data.slice(0, item), action.payload, ...state.data.slice(item + 1)]

      return {...state, data : newItem}

    case 'DEC_QTY_MENU':
      let index = state.data.findIndex(x => x.menu.id == action.payload.menu.id)

      const newMenu = [...state.data.slice(0, index), action.payload, ...state.data.slice(index + 1)]

      return {...state, data : newMenu}

    case 'DEL_ORDER_MENU':
      let indexOrder = state.data.findIndex(z => z.menu.id == action.payload.menu.id)

      const nextMenu = [...state.data.slice(0, indexOrder), ...state.data.slice(indexOrder + 1)]

      return {...state, data : nextMenu}

    case 'CLEAR_ORDER_MENU':
      return {...state, data: [], subTotal: 0}

    case 'ADD_SUB_TOTAL':
      return {...state, subTotal: state.subTotal + action.payload}

    case 'MIN_SUB_TOTAL':
      return {...state, subTotal: state.subTotal - action.payload}

    case 'CONFIRM_DATA_ORDER':
      return {...state, data: [], subTotal: 0, orders: [...state.orders, action.payload.orders], fixSubtotal: action.payload.subTotal}

    default:
      return state
  }

}
