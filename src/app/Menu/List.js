import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, BackHandler, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AlertPro from 'react-native-alert-pro'

import { getMenuByCategory, getAllCategory } from '../../_actions/Category'
import { getAllMenu } from '../../_actions/Menu'
import { addOrderMenu, addQtyMenu, decQtyMenu, delOrderMenu, addSubtotal, minSubTotal, clearOrderMenu, confirmDataOrder } from '../../_actions/Order'
import { setIntervalTime, setCounter, resetInterval } from '../../_actions/Time'
import { addSubtotalToPayment } from '../../_actions/Payment'
import { converToPrice } from '../../utils/Constant'
import Header from '../components/Header'

class List extends Component {

    constructor(){
      super()
      this.getCategory
    }

    state = {
      swipe: 110,
      refresh: false,
      tableNumber: null
    }

    async componentDidMount() {

      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

      const { tableNumber } = this.props.payment.data
      await this.setState({
        tableNumber
      })

      await this.props.dispatch(setIntervalTime(
        setInterval(() => {
          this.props.dispatch(setCounter(this.props.time.timer))
        }, 1000)
      ))

      await this.props.dispatch(clearOrderMenu())
      await this.props.dispatch(getAllCategory())
      await this.props.dispatch(getAllMenu())

    }

    componentWillUnmount() {
      this.backHandler.remove()
    }

    handleCategory = (categoryId) => {

      this.props.dispatch(getMenuByCategory(categoryId))
      this.setState({
        refresh: !this.state.refresh
      })

    }

    handleMenuItem = (item) => {

      const orderData = this.props.order.data
      const filterOrder = orderData.filter((data) => {
        return data.menu.id == item.id
      })

      if(filterOrder.length == 0) {

        this.props.dispatch(addOrderMenu(item))
        this.props.dispatch(addSubtotal(item.price, 1))

      } else {

        this.props.dispatch(addQtyMenu(filterOrder[0]))
        this.props.dispatch(addSubtotal(filterOrder[0].menu.price, 1))

      }

      this.setState({
        swipe: 110
      })

    }

    handleOrderMenu = (item) => {
      if(item.qty > 1) {

        this.props.dispatch(decQtyMenu(item))
        this.props.dispatch(minSubTotal(item.menu.price, 1))

      } else {

        this.props.dispatch(delOrderMenu(item))
        this.props.dispatch(minSubTotal(item.menu.price, 1))

      }
    }

    handleResetOrder = () => {

      this.props.dispatch(clearOrderMenu())
      this.setState({
        refresh: !this.state.refresh
      })

    }

    handleConfirm = () => {

      this.props.dispatch(addSubtotalToPayment(this.props.order.subTotal))

      const { paymentId } = this.props.payment.data
      this.props.order.data.map((data) => {

        this.props.dispatch(confirmDataOrder(data, paymentId))

      })

      clearInterval(this.props.time.time)
      this.props.dispatch(resetInterval())
      this.props.navigation.navigate('Payment')

    }

    handleConfirmOrder = () => {

      this.AlertPro.open()

    }

    handleBackButton = () => {

      BackHandler.exitApp()
      return true;

    }

    render() {

      if(this.props.order.isLoading) {
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
          <View style={styles.container}>
              {/* Using Component AlertPro from Confirm Button */}
              <AlertPro
                ref={ref => {
                  this.AlertPro = ref;
                }}
                onConfirm={this.handleConfirm}
                onCancel={() => this.AlertPro.close()}
                textCancel="Cancel"
                title="Confirm Order"
                message="Are You Sure Confirm Order?"
                textConfirm="Confirm"
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
              {/* Using Component Header */}
              <Header
                tableNumber={this.state.tableNumber}
                iconTableNumber="slack"
                time={this.props.time.data}
                iconTime="clock"
              />
              {/* Container */}
              <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Header & Category */}
                  <View>
                      {/* Title Application */}
                      <View style={styles.HeaderCard}>
                          <Text style={styles.HeaderText}>MejaKoding Resto</Text>
                      </View>
                      {/* Category From API */}
                      <FlatList
                        data={this.props.category.data}
                        horizontal
                        keyExtractor={(item, index) => item.id.toString()}
                        extraData={this.state.refresh}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{height: 80, paddingVertical: 4}}
                        renderItem={({item}) => {

                          if(item.id == this.props.category.categoryId){
                            return (
                              <TouchableOpacity onPress={() => this.handleCategory(item.id)} style={styles.buttonCategory}>
                                  <View style={styles.viewCategory}>
                                      <FontAwesome
                                          name={item.icon}
                                          size={25}
                                          style={[styles.iconCategory, {color: '#877dfa' }]}
                                      />
                                      <Text style={[styles.textCategory, { color: '#877dfa'}]}>
                                          {item.name}
                                  </Text>
                                  </View>
                              </TouchableOpacity>
                            )
                          }

                          return (
                            <TouchableOpacity onPress={() => this.handleCategory(item.id)} style={styles.buttonCategory}>
                                <View style={styles.viewCategory}>
                                    <FontAwesome
                                      name={item.icon}
                                      size={25}
                                      style={[styles.iconCategory, {color: '#919191' }]}
                                    />
                                    <Text style={[styles.textCategory, { color: '#919191'}]}>
                                      {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                          )
                        }}
                      />
                  </View>
                  {/* Menu */}
                  <View style={styles.menuSection}>
                      {/* Title */}
                      <View style={styles.menuTitle}>
                          <Text style={{ fontWeight: 'bold' }}>Click the menu to add cart</Text>
                      </View>
                      {/* Menu From API */}
                      <FlatList
                        data={this.props.menu.data}
                        keyExtractor={(item, index) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state.refresh}
                        renderItem={({item}) => {

                          if(this.props.category.categoryId == 1) {
                            return (
                              <TouchableOpacity
                                onPress={() => this.handleMenuItem(item)}
                                style={styles.buttonMenu}
                              >
                                <View style={styles.viewMenu}>
                                  <View style={styles.viewImageMenu}>
                                    <Image
                                      source={{ uri: item.image }}
                                      style={styles.Image} />
                                  </View>
                                  <View style={styles.viewDataMenu}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                    <Text>
                                      Rp. {converToPrice(item.price)}
                                    </Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )
                          }else if(item.categoryId == this.props.category.categoryId) {
                            return (
                              <TouchableOpacity
                                  onPress={() => this.handleMenuItem(item)}
                                  style={styles.buttonMenu}
                              >
                                  <View style={styles.viewMenu}>
                                      <View style={styles.viewImageMenu}>
                                          <Image
                                              source={{ uri: item.image }}
                                              style={styles.ImageMenu} />
                                      </View>
                                      <View style={styles.viewDataMenu}>
                                          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                          <Text>
                                            Rp. {converToPrice(item.price)}
                                          </Text>
                                      </View>
                                  </View>
                              </TouchableOpacity>
                            )
                          }

                        }}
                      />
                  </View>

              </ScrollView>
              {/* If User Order Minimal 1 Menu, Show This */}
              {
                  this.props.order.data.length > 0 &&
                  <View style={[styles.swipeOrder, {minHeight: this.state.swipe}]}>
                      {
                        this.state.swipe == 110 ?
                        <TouchableOpacity
                            onPress={() => this.setState({swipe : 220})}
                            style={styles.btnSwipe}>
                            <FontAwesome name="chevron-up" color="white" size={25} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => this.setState({swipe : 110})}
                            style={styles.btnSwipe}>
                            <FontAwesome name="chevron-down" color="white" size={25} />
                        </TouchableOpacity>
                      }

                      <View style={styles.orderCard}>
                        <FlatList
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          data={this.props.order.data}
                          keyExtractor={(item, index) => item.menu.id.toString()}
                          contentContainerStyle={{paddingHorizontal: 6}}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              onPress={() => this.handleOrderMenu(item)}
                              style={styles.orderItem}>
                              <View style={{flex: 1}}>
                                <Text style={styles.textQty}>{item.qty}</Text>
                                <Image
                                source={{uri : item.menu.image}}
                                style={styles.Image}
                                />
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      </View>

                      {
                        this.state.swipe == 220 &&
                        <View style={styles.swipeOrderFull}>
                          <View style={styles.swipeOrderFullEstimation}>
                            <Text>Price Estimation</Text>
                            <Text>
                              Rp. {converToPrice(this.props.order.subTotal)}
                            </Text>
                          </View>
                          <View style={styles.swipeOrderFullView}>
                            <TouchableOpacity
                              onPress={this.handleResetOrder}
                              style={[styles.swipeOrderFullButton, {backgroundColor: 'red'}]}>
                              <Text style={styles.swipeOrderFullTextButton}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={this.handleConfirmOrder}
                              style={[styles.swipeOrderFullButton, {backgroundColor: '#877dfa'}]}>
                              <Text style={styles.swipeOrderFullTextButton}>Confirm</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      }
                  </View>
              }
          </View>
      )
    }

}

const mapStateToProps = (state) => {
  return {
    category: state.Category,
    menu: state.Menu,
    order: state.Order,
    time: state.Time,
    payment: state.Payment
  }
}

export default connect(mapStateToProps)(List)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0ff'
  },
  HeaderCard: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  HeaderText: {
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },

  buttonCategory: {
    justifyContent: 'center',
    marginHorizontal: 4
  },
  viewCategory: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 6
  },
  iconCategory: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    borderRadius: 100 / 20,
    elevation: 2
  },
  textCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 6
  },

  menuSection: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  menuTitle: {
    paddingVertical: 8,
    marginLeft: 6
  },
  buttonMenu: {
    marginVertical: 5,
    borderRadius: 100 / 25,
    minHeight: 100,
    elevation: 2.5,
    marginHorizontal: 4,
    backgroundColor: 'white'
  },
  viewMenu: {
    flexDirection: 'row',
    maxWidth: '100%'
  },
  viewImageMenu: {
    maxWidth: '40%',
    flex: 1,
    height: 100,
    paddingHorizontal: 8
  },
  Image: {
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    flex: 1
  },
  viewDataMenu: {
    maxWidth: '60%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-around'
  },

  swipeOrder: {
    alignItems: 'center',
    elevation: 12,
    backgroundColor: '#f0f0ff'
  },
  btnSwipe: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#877dfa',
    position: 'absolute',
    top: 0,
    marginTop: -25,
    borderRadius: 100/20
  },
  orderCard: {
    width: '100%',
    height: 80,
    marginTop: 30,
    marginHorizontal:5
  },
  orderItem: {
    minWidth: 120,
    backgroundColor: 'white',
    borderRadius: 100/25,
    marginHorizontal: 10,
    marginVertical: 10
  },
  textQty: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    marginTop: -10,
    right: 0,
    marginRight: -10,
    backgroundColor: 'red',
    color: 'white',
    paddingBottom:2,
    paddingHorizontal: 6,
    borderRadius:100/2
  },
  swipeOrderFull: {
    width: '100%',
    justifyContent: 'center',
    height: 120
  },
  swipeOrderFullEstimation: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderRadius: 6
  },
  swipeOrderFullView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 10
  },
  swipeOrderFullButton: {
    minWidth: '20%',
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginHorizontal: 8,
    borderRadius: 100/10,
    elevation: 2
  },
  swipeOrderFullTextButton: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
})
