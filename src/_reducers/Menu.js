const initialState = {
  data : []
}

export default Menu = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MENU_PENDING':
      return {...state}
    case 'GET_MENU_FULFILLED':
      return {...state, data : action.payload.data}

    default:
      return state
  }
}
