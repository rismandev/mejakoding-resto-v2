import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert, BackHandler, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

import { converToPrice } from '../../utils/Constant'

class Payment extends Component {

  state = {
    valueText: null,
    valid: 0,
    data: {
      subTotal: 15000,
      discount: 0,
      serv: 1000,
      tax: 1000,
      total: 0,
    },
    promo: 0,
    modalVisible: false
  }

  componentDidMount() {

    this.getTotal()

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  getTotal () {

    const { promo } = this.state

    const { subTotal, discount, serv, tax } = this.state.data

    const total = subTotal + serv + tax - discount - promo

    this.setState({
      data : {
        subTotal,
        discount,
        serv,
        tax,
        total
      },
      promo
    })

  }

  handleChangeText = async(text) => {

    const valueText = text.toUpperCase()

    await this.setState({
      valueText
    })

    await this.createIsValid()

  }

  createIsValid = async() => {

    if(this.state.valueText == 'SIAPKODING' || this.state.valueText == 'RDEV' && this.state.data.total > 20000) {

      await this.setState({
        valid: 1,
        promo: 10000
      })

      Alert.alert(
        'PROMO CODE SUCCESS',
        'You have a promo Rp. 10.000',
        [
          {text: 'OKE'}
        ]
      )

      await this.getTotal()

    } else if(this.state.valueText == 'SIAPKODING' || this.state.valueText == 'RDEV' && this.state.data.total < 20000) {

      await this.setState({
        valid: 0,
        promo: 0,
      })

      Alert.alert(
        'PROMO CODE FAILED',
        'Minimum Payment Rp. 20.000',
        [
          {text: 'OKE'}
        ]
      )

      await this.getTotal()

    } else {

      await this.setState({
        valid: 0,
        promo: 0,
      })

      await this.getTotal()

    }


  }

  handleBackButton = () => {

    Alert.alert(
      'Exit App',
      'Please complete payment before exit',
      [
        {text: 'Oke'}
      ]
    )

    return true;

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

    return (
      <View style={{flex: 1, backgroundColor: '#f0f0ff'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: 'transparent', marginHorizontal: 8, height: 160, marginVertical: 10, paddingTop: 10}}>
            <Image
              source={require('../../assets/illustration/payment-icon.png')}
              style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}
            />
          </View>

          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.04)', margin: 10, borderRadius: 8, paddingHorizontal: 6, paddingVertical:3}}>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>SubTotal</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(this.state.data.subTotal)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>Discount</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(this.state.data.discount)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>Service Charge</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(this.state.data.serv)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>Tax</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(this.state.data.tax)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: this.state.valid == 1 ? 'green' : 'white'}}>
              <TextInput
                placeholder="INSERT PROMO CODE HERE"
                value={this.state.valueText}
                onChangeText={(text) => this.handleChangeText(text)}
                style={{color: this.state.valid == 1 ? 'green' : 'black'}}
              />
                {
                  this.state.valid == 1 ?
                  <Icon
                    name='check-circle'
                    size={25}
                    color='green'
                  />
                  :
                  <Icon
                    name='gift'
                    size={25}
                  />
                }
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>Total</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(this.state.data.total)}</Text>
            </View>
          </View>

        </ScrollView>
        <TouchableOpacity style={{padding: 10, backgroundColor: '#877dfa', width: '40%', position: 'absolute', left: '30%', bottom: 0, marginBottom: 15, borderRadius: 100/25, elevation: 2.5}}>
          <Text style={{color: 'white', fontSize: 18, textTransform: 'uppercase'}}>
            <Icon
              name='hand-holding-usd'
              size={25}
            />
            &nbsp;
            Call Bill
          </Text>
        </TouchableOpacity>
      </View>
    )

  }

}

export default Payment;
