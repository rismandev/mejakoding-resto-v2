import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import List from '../app/Menu/List'
import Home from '../app'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  List: {
    screen: List,
  }
});

export default createAppContainer(AppNavigator);
