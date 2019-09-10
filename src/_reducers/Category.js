const initialState = {
  categoryId: 1,
  data : [
    {
      id: 1,
      name: 'All Menu',
      icon: 'th-list'
    },
    {
      id: 2,
      name: 'Promo',
      icon: 'gift'
    },
    {
      id: 3,
      name: 'Appetizer',
      icon: 'hamburger'
    },
    {
      id: 4,
      name: 'Main Course',
      icon: 'utensils'
    },
    {
      id: 5,
      name: 'Dessert',
      icon: 'birthday-cake'
    },
    {
      id: 6,
      name: 'Addition',
      icon: 'plus-square'
    },
    {
      id: 7,
      name: 'Drink',
      icon: 'beer'
    }
  ]
}

export default Category = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_CATEGORY':
      return {...state}
    case 'GET_MENU_CATEGORY':
      return {...state, categoryId: action.payload}

    default:
      return state
  }
}
