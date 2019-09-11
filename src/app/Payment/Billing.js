import React, { Component } from 'react';
import { View, Text, Image, BackHandler, Alert } from 'react-native'
import { connect } from 'react-redux'

class Billing extends Component {

  componentDidMount() {

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  handleBackButton() {

    BackHandler.exitApp()

    return true;

  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f0f0ff', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: '100%', backgroundColor: 'transparent', marginHorizontal: 8, height: 180, marginVertical: 10, paddingTop: 10}}>
          <Image
            source={require('../../assets/illustration/payment-icon.png')}
            style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: '100%', marginVertical: 12, alignItems: 'center'}}>
          <Text>Please Bring Your Phone to Cashier</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(Billing);
