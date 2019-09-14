import React, { Component } from 'react';
import { View, Text, Image, BackHandler, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
// Using Icon from FontAwesome 5
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

class Billing extends Component {

  componentDidMount() {

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  // Exit App if User Back
  handleBackButton() {

    BackHandler.exitApp()

    return true;

  }

  render() {

    const { paymentId, tableNumber, total } = this.props.payment.dataItem

    return (
      <View style={styles.container}>
        {/* Header Image */}
        <View style={styles.cardImage}>
          <Image
            source={require('../../assets/illustration/payment-icon.png')}
            style={styles.Image}
          />
        </View>
        {/* Section */}
        <View style={styles.cardSection}>
          <Text>Please Bring Your Phone to Cashier &nbsp;<FontAwesome name="grin-alt" color="#8f6dfa" size={18} /></Text>
          <Text style={styles.textPaymentCode}>Payment Code : #MKR-{paymentId}.{tableNumber}.{total}</Text>
          <Text style={styles.textTimeSpent}>Time Spent : {this.props.time.data}</Text>
          {/* Button Exit */}
          <TouchableOpacity
            onPress={() => BackHandler.exitApp()}
            style={styles.btnExit}>
            <Text style={styles.textBtnExit}>EXIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payment: state.Payment,
    time: state.Time
  }
}

export default connect(mapStateToProps)(Billing);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImage: {
    width: '100%',
    backgroundColor: 'transparent',
    marginHorizontal: 8,
    height: 180,
    marginVertical: 10,
    paddingTop: 10
  },
  Image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  },
  cardSection: {
    width: '100%',
    marginVertical: 12,
    alignItems: 'center'
  },
  textPaymentCode: {
    marginTop: 10
  },
  textTimeSpent: {
    marginTop: 10,
    color: 'green'
  },
  btnExit: {
    marginVertical: 25,
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: .5
  },
  textBtnExit: {
    color: 'white',
    fontSize: 16
  }
})
