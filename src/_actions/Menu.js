import Axios from 'axios'
import { API } from 'react-native-dotenv'

export const getAllMenu = () => {
  return {
    type: 'GET_MENU',
    payload: Axios.get(`${API}all_menu`)
  }
}
