import Axios from 'axios'

export const getAllCategory = () => {

  return {
    type: 'GET_CATEGORY',
    payload: Axios.get('http://192.168.0.28:8000/api/v2/all_category')
  }

}

export const getMenuByCategory = (categoryId) => {

  return {
    type: 'GET_MENU_CATEGORY',
    payload: categoryId
  }

}
