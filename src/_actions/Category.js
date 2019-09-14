import Axios from 'axios'
import { API } from 'react-native-dotenv'

export const getAllCategory = () => {

  return {
    type: 'GET_CATEGORY',
    payload: Axios({
      method: 'GET',
      url: `${API}all_category`,
      responseType: 'json'
    })
  }

}

export const getMenuByCategory = (categoryId) => {

  return {
    type: 'GET_MENU_CATEGORY',
    payload: categoryId
  }

}
