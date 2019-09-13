const initialState = {
  categoryId: 0,
  data : []
}

export default Category = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_PENDING':
      return {...state }

    case 'GET_CATEGORY_FULFILLED':
      return {...state, data: action.payload.data, categoryId: 1}

    case 'GET_MENU_CATEGORY':
      return {...state, categoryId: action.payload}

    default:
      return state
  }
}
