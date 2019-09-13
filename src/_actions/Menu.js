import Axios from 'axios'

export const getAllMenu = () => {
  return {
    type: 'GET_MENU',
    payload: Axios.get('http://192.168.0.28:8000/api/v2/all_menu')
  }
}
