import React, { Component } from 'react'
import store from './src/_redux/store'
import { Provider } from 'react-redux'

import List from './src/app/Menu/List'

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <List />
      </Provider>
    )
  }

}
