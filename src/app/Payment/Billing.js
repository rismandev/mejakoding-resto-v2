import React, { Component } from 'react';
import { View, Text, Image, BackHandler, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Billing extends Component {

  componentDidMount() {

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackButton() {

    BackHandler.exitApp()

    return true;

  }

  render() {

    const { paymentId, tableNumber, total } = this.props.payment.dataItem

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
          <Text style={{marginTop: 10}}>Payment Code : {paymentId}.{tableNumber}.{total}</Text>
          <TouchableOpacity
            onPress={() => BackHandler.exitApp()}
            style={{marginVertical: 15, backgroundColor: 'red', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, borderColor: 'white', borderWidth: .5}}>
            <Text style={{color: 'white', fontSize: 16}}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payment: state.Payment
  }
}

export default connect(mapStateToProps)(Billing);
