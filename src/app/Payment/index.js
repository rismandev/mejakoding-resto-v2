import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert, BackHandler, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StackActions, NavigationActions } from 'react-navigation'
import AlertPro from "react-native-alert-pro";
import AlertPro2 from "react-native-alert-pro";
import { connect } from 'react-redux';

import { updateTotal, updateDiscount, updateDataPayment } from '../../_actions/Payment'
import { converToPrice } from '../../utils/Constant'

class Payment extends Component {

  state = {
    valueText: null,
  }

  componentDidMount() {

    this.getTotal()

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    console.log(this.props.time.data)

  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  getTotal () {

    const { paymentId, tableNumber, subTotal, discount } = this.props.payment.data

    const serv = Math.trunc((subTotal / 100) * 5)
    const tax = Math.trunc((subTotal / 100) * 2.5)

    const total = (subTotal + serv + tax) - discount

    const data = {
      paymentId,
      tableNumber,
      subTotal,
      discount,
      serv,
      tax,
      total
    }

    this.props.dispatch(updateTotal(data))

  }

  handleChangeText = async(text) => {

    const valueText = text.toUpperCase()

    await this.setState({
      valueText
    })

    await this.createIsValid()

  }

  createIsValid = async() => {

    if(this.state.valueText == 'SIAPKODING' || this.state.valueText == 'RDEV' && this.props.payment.data.total > 20000) {

      this.props.dispatch(updateDiscount(1, 10000))

      this.AlertPro.open()

      await this.getTotal()

    } else if(this.state.valueText == 'SIAPKODING' || this.state.valueText == 'RDEV' && this.props.payment.data.total < 20000) {

      this.props.dispatch(updateDiscount(0, 0))

      Alert.alert(
        'PROMO CODE FAILED',
        'Minimum Payment Rp. 20.000',
        [
          {text: 'OKE'}
        ]
      )

      await this.getTotal()

    } else {

      this.props.dispatch(updateDiscount(0, 0))

      await this.getTotal()

    }

  }

  handleCallBill = async() => {

    const { data } = this.props.payment
    const finishedTime = this.props.time.data

    await this.props.dispatch(updateDataPayment(data, finishedTime))

    await this.props.navigation.navigate('Billing')

  }

  handleBackButton = () => {

    this.AlertPro2.open()

    return true;

  }

  render() {

    const { subTotal, discount, serv, tax, total } = this.props.payment.data

    if(this.props.payment.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginVertical: 10, fontSize: 20}}>Waiting</Text>
          <ActivityIndicator
            size={50}
            color="#877dfa"
          />
        </View>
      )
    }

    return (
      <View style={{flex: 1, backgroundColor: '#f0f0ff'}}>

        <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          onConfirm={() => this.AlertPro.close()}
          showCancel={false}
          title="Promo Code Success"
          message="You get a discount of 10,000"
          textConfirm="Oke"
          customStyles={{
            mask: {
              backgroundColor: "transparent"
            },
            container: {
              borderWidth: 1,
              borderColor: "#9900cc",
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 10
            },
            buttonConfirm: {
              backgroundColor: "#877dfa"
            }
          }}
        />

        <AlertPro2
          ref={ref => {
            this.AlertPro2 = ref;
          }}
          onConfirm={() => this.AlertPro2.close()}
          showCancel={false}
          title="Please Continue Payment"
          message="You not Exit App"
          textConfirm="Oke"
          customStyles={{
            mask: {
              backgroundColor: "transparent"
            },
            container: {
              borderWidth: 1,
              borderColor: "#9900cc",
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 10
            },
            buttonConfirm: {
              backgroundColor: "#877dfa"
            }
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: 'transparent', marginHorizontal: 8, height: 160, marginVertical: 10, paddingTop: 10}}>
            <Image
              source={require('../../assets/illustration/transfer-icon.png')}
              style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}
            />
          </View>

          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.04)', margin: 10, borderRadius: 8, paddingHorizontal: 6, paddingVertical:3}}>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>SubTotal</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(subTotal)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>Discount</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(discount)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>Serv. Charge (5%)</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(serv)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: 'white'}}>
              <Text style={{fontSize: 20}}>Tax (2,5%)</Text>
              <Text style={{fontSize: 20}}>Rp. {converToPrice(tax)}</Text>
            </View>
            <View style={{height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 4, marginVertical: 3, borderWidth: .6, borderColor: this.props.payment.valid == 1 ? 'green' : 'white'}}>
              <TextInput
                placeholder="INSERT PROMO CODE HERE"
                value={this.state.valueText}
                onChangeText={(text) => this.handleChangeText(text)}
                style={{color: this.props.payment.valid == 1 ? 'green' : 'black'}}
              />
                {
                  this.props.payment.valid == 1 ?
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
              <Text style={{fontSize: 20}}>Rp. {converToPrice(total)}</Text>
            </View>
          </View>

        </ScrollView>
        <TouchableOpacity
          onPress={this.handleCallBill}
          style={{padding: 10, backgroundColor: '#877dfa', width: '40%', position: 'absolute', left: '30%', bottom: 0, marginBottom: 15, borderRadius: 100/25, elevation: 2.5}}>
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

const mapStateToProps = (state) => {

  return {
    payment: state.Payment,
    order: state.Order,
    time: state.Time
  }

}

export default connect(mapStateToProps)(Payment);
