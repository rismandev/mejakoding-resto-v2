import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-community/async-storage'
import { StackActions, NavigationActions } from 'react-navigation'

import { getMenuByCategory } from '../../_actions/Category'
import { addOrderMenu, addQtyMenu, decQtyMenu, delOrderMenu, addSubtotal, minSubTotal, clearOrderMenu, confirmDataOrder } from '../../_actions/Order'
import { setIntervalTime, setCounter, resetInterval } from '../../_actions/Time'
import { converToPrice } from '../../utils/Constant'

class List extends Component {

    state = {
      swipe: 110,
      refresh: false,
      numberTable: null
    }

    async componentDidMount() {

      const numberTable = await AsyncStorage.getItem('numberTable')

      if(numberTable) {
        await this.setState({
          numberTable
        })

        await this.props.dispatch(setIntervalTime(
          setInterval(() => {
            this.props.dispatch(setCounter(this.props.time.timer))
          }, 1000)
        ))

      } else {
        this.props.navigation.popToTop()
      }


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

        this.props.dispatch(addSubtotal(filterOrder[0].menu.price, filterOrder[0].qty))

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

      this.props.order.data.map((data) => {

        this.props.dispatch(confirmDataOrder(data, this.props.order.subTotal))

      })

      this.props.dispatch(resetInterval())

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Payment' })],
      });

      this.props.navigation.dispatch(resetAction)

    }

    handleConfirmOrder = () => {

      Alert.alert(
        'Confirm Order',
        'Are you sure confirm this order?',
        [
          {text: 'Cancel', style: 'cancle'},
          {text: 'Confirm', onPress: this.handleConfirm}
        ],
        {cancelable: false}
      )

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f0f0ff' }}>
                <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
                    <View style={{ justifyContent: 'center', backgroundColor: '#877dfa', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100 / 2 }}>
                        <Text style={{ color: 'white' }}>
                            <FontAwesome
                                name="slack"
                                size={15}
                            />
                            &nbsp;&nbsp;
                            {this.state.numberTable}
                            </Text>
                    </View>
                    <View style={{ justifyContent: 'center', backgroundColor: '#877dfa', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100 / 2 }}>
                        <Text style={{ color: 'white' }}>
                            <FontAwesome
                                name="clock"
                                size={15}
                            />
                            &nbsp;&nbsp;
                            {this.props.time.data}
                            </Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>

                        <View style={{ height: 50, justifyContent: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'monospace', fontWeight: 'bold' }}>MejaKoding Resto</Text>
                        </View>

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
                                <TouchableOpacity onPress={() => this.handleCategory(item.id)} style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <FontAwesome
                                            name={item.icon}
                                            size={25}
                                            style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#877dfa' }}
                                        />
                                        <Text style={{ fontSize: 10, color: '#877dfa', fontWeight: 'bold', paddingVertical: 6 }}>
                                            {item.name}
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                              )
                            }

                            return (
                              <TouchableOpacity onPress={() => this.handleCategory(item.id)} style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                  <View style={{ alignItems: 'center' }}>
                                      <FontAwesome
                                          name={item.icon}
                                          size={25}
                                          style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#919191' }}
                                      />
                                      <Text style={{ fontSize: 10, color: '#919191', fontWeight: 'bold', paddingVertical: 6 }}>
                                          {item.name}
                                  </Text>
                                  </View>
                              </TouchableOpacity>
                            )
                          }}
                        />

                    </View>

                    <View style={{ flex: 1, paddingHorizontal: 10, marginBottom: 10 }}>
                        <View style={{ paddingVertical: 8, marginLeft: 6 }}>
                            <Text style={{ fontWeight: 'bold' }}>Click the menu to add cart</Text>
                        </View>

                        <FlatList
                          data={this.props.menu.data}
                          keyExtractor={(item, index) => item.id.toString()}
                          showsVerticalScrollIndicator={false}
                          extraData={this.state.refresh}
                          renderItem={({item}) => {

                            if(item.categoryId == this.props.category.categoryId) {
                              return (
                                <TouchableOpacity
                                    onPress={() => this.handleMenuItem(item)}
                                    style={{ marginVertical: 5, borderRadius: 100 / 25, minHeight: 100, elevation: 2.5, marginHorizontal: 4, backgroundColor: 'white' }}
                                >
                                    <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                        <View style={{ maxWidth: '40%', flex: 1, height: 100, paddingHorizontal: 8 }}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} />
                                        </View>
                                        <View style={{ maxWidth: '60%', paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'space-around' }}>
                                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                            <Text>
                                              <FontAwesome
                                                name="dollar-sign"
                                                size={15}
                                                color="#877dfa"
                                              />
                                              &nbsp;
                                              {converToPrice(item.price)}
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

                {
                    this.props.order.data.length > 0 &&
                    <View style={{minHeight: this.state.swipe, alignItems: 'center', elevation: 12, backgroundColor: '#f0f0ff'}}>
                        {
                          this.state.swipe == 110 ?
                          <TouchableOpacity
                              onPress={() => this.setState({swipe : 220})}
                              style={{paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#877dfa', position: 'absolute', top: 0, marginTop: -25, borderRadius: 100/20}}>
                              <FontAwesome name="chevron-up" color="white" size={25} />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                              onPress={() => this.setState({swipe : 110})}
                              style={{paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#877dfa', position: 'absolute', top: 0, marginTop: -25, borderRadius: 100/20}}>
                              <FontAwesome name="chevron-down" color="white" size={25} />
                          </TouchableOpacity>
                        }

                        <View style={{width: '100%',height: 80, marginTop: 30, marginHorizontal:5}}>
                          <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.props.order.data}
                            keyExtractor={(item, index) => item.menu.id.toString()}
                            contentContainerStyle={{paddingHorizontal: 6}}
                            renderItem={({item}) => (
                              <TouchableOpacity
                                onPress={() => this.handleOrderMenu(item)}
                                style={{minWidth: 120, backgroundColor: 'white', borderRadius: 100/25, marginHorizontal: 10, marginVertical: 10}}>
                                <View style={{flex: 1}}>
                                  <Text style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, marginTop: -10, right: 0, marginRight: -10, backgroundColor: 'red', color: 'white', paddingBottom:2, paddingHorizontal: 6, borderRadius:100/2}}>{item.qty}</Text>
                                  <Image
                                  source={{uri : item.menu.image}}
                                  style={{flex: 1, width: undefined, height: undefined, resizeMode: 'contain'}}
                                  />
                                </View>
                              </TouchableOpacity>
                            )}
                          />
                        </View>

                        {
                          this.state.swipe == 220 &&
                          <View style={{width: '100%', justifyContent: 'center', height: 120}}>
                            <View style={{backgroundColor: 'white', height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, marginHorizontal: 8, borderRadius: 6}}>
                              <Text>Price Estimation</Text>
                              <Text>
                                <FontAwesome
                                  name="dollar-sign"
                                  size={15}
                                  color="#877dfa"
                                />
                                &nbsp;
                                {converToPrice(this.props.order.subTotal)}
                              </Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 50, marginTop: 10}}>
                              <TouchableOpacity
                                onPress={this.handleResetOrder}
                                style={{backgroundColor: 'red', minWidth: '20%', paddingHorizontal: 12, justifyContent: 'center', marginHorizontal: 8, borderRadius: 100/10, elevation: 2}}>
                                <Text style={{color: 'white', textAlign: 'center'}}>Reset</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={this.handleConfirmOrder}
                                style={{backgroundColor: '#877dfa', minWidth: '20%', paddingHorizontal: 12, justifyContent: 'center', marginHorizontal: 8, borderRadius: 100/10, elevation: 2}}>
                                <Text style={{color: 'white', textAlign: 'center'}}>Confirm</Text>
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
    time: state.Time
  }
}

export default connect(mapStateToProps)(List)