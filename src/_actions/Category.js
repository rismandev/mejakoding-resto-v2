export const getMenuByCategory = (categoryId) => {

  return {
    type: 'GET_MENU_CATEGORY',
    payload: categoryId
  }

}
