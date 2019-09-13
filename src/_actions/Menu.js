import Axios from 'axios'
import { API } from 'react-native-dotenv'

export const getAllMenu = () => {
  return {
    type: 'GET_MENU',
    payload: Axios({
      method: 'GET',
      url: `${API}all_menu`,
      responseType: 'json'
    })
    // payload: Axios.get(`${API}all_menu`)
  }
}
