const initialState = {
  data : [
    {
      id: 1,
      categoryId: 1,
      name: 'Paket Ayam Geprek Resto Banyak Sambal',
      price: 18000,
      image: 'https://pngimage.net/wp-content/uploads/2018/06/menu-makanan-png-6.png'
    },
    {
      id: 2,
      categoryId: 2,
      name: 'Ayam Sunda Istimewa',
      price: 14000,
      image: 'https://peoplepng.com/wp-content/uploads/2019/03/prato-com-comida-png-2.png'
    },
    {
      id: 3,
      categoryId: 1,
      name: 'Paket Ayam Begadang',
      price: 22000,
      image: 'https://d20vvx1que2zyx.cloudfront.net/wp-content/uploads/2015/11/12161810/popup_origin_1.png'
    },
    {
      id: 4,
      categoryId: 5,
      name: 'Nasi Goreng Crispy',
      price: 13500,
      image: 'https://www.esteler77.com/assets/uploads/products-images-nasi-goreng-77-0.png'
    },
    {
      id: 5,
      categoryId: 3,
      name: 'Paket Chicken Murah',
      price: 16000,
      image: 'https://www.tobys.co.id/wp-content/uploads/2017/04/PAKET-MUJUR-2-TOBYS.png'
    }
  ]
}

export default Menu = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_MENU':
      return {...state}

    default:
      return state
  }
}
