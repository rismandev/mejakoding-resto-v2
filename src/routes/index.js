import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from '../app'
import List from '../app/Menu/List'
import Payment from '../app/Payment'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  List: {
    screen: List,
  },
  Payment: {
    screen: Payment,
  }
},
{
  initialRouteName: 'Payment',
  headerMode:'none'
});

export default createAppContainer(AppNavigator);
