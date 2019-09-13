import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from '../app'
import List from '../app/Menu/List'
import Payment from '../app/Payment'
import Billing from '../app/Payment/Billing'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  List: {
    screen: List,
  },
  Payment: {
    screen: Payment,
  },
  Billing: {
    screen: Billing
  }
},
{
  initialRouteName: 'List',
  headerMode:'none'
});

export default createAppContainer(AppNavigator);
