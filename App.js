import React, { Component } from 'react'
import store from './src/_redux/store'
import { Provider } from 'react-redux'

import Route from './src/routes'

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    )
  }

}
