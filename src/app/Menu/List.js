import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome5'

export default class List extends Component {

    state = {
        menu : 0
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
                <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
                    <View style={{ justifyContent: 'center', backgroundColor: '#877dfa', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100 / 2 }}>
                        <Text style={{ color: 'white' }}>
                            <FontAwesome
                                name="slack"
                                size={15}
                            />
                            &nbsp;
                            2
                            </Text>
                    </View>
                    {/* <Text style={{fontSize: 20, fontFamily: 'monospace', fontWeight: 'bold'}}>MejaKoding</Text> */}

                    <View style={{ justifyContent: 'center', backgroundColor: '#877dfa', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100 / 2 }}>
                        <Text style={{ color: 'white' }}>
                            <FontAwesome
                                name="clock"
                                size={15}
                            />
                            &nbsp;
                            00:00:00
                            </Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>

                        <View style={{ height: 50, justifyContent: 'center', paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'monospace', fontWeight: 'bold' }}>MejaKoding Resto</Text>
                        </View>

                        <ScrollView
                            contentContainerStyle={{ height: 80, paddingVertical: 4 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome
                                        name="th-list"
                                        size={25}
                                        style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#877dfa' }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#877dfa', fontWeight: 'bold', paddingVertical: 6 }}>
                                        All Menu
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome
                                        name="gift"
                                        size={25}
                                        style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#919191' }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#919191', fontWeight: 'bold', paddingVertical: 6 }}>
                                        Promo
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome
                                        name="hamburger"
                                        size={25}
                                        style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#919191' }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#919191', fontWeight: 'bold', paddingVertical: 6 }}>
                                        Appetizer
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome
                                        name="utensils"
                                        size={25}
                                        style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#919191' }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#919191', fontWeight: 'bold', paddingVertical: 6 }}>
                                        Main Course
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome
                                        name="birthday-cake"
                                        size={25}
                                        style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#919191' }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#919191', fontWeight: 'bold', paddingVertical: 6 }}>
                                        Dessert
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome
                                        name="plus-square"
                                        size={25}
                                        style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#919191' }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#919191', fontWeight: 'bold', paddingVertical: 6 }}>
                                        Addition
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 12 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <FontAwesome
                                        name="beer"
                                        size={25}
                                        style={{ backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 10, marginHorizontal: 6, borderRadius: 100 / 20, elevation: 2, color: '#919191' }}
                                    />
                                    <Text style={{ fontSize: 10, color: '#919191', fontWeight: 'bold', paddingVertical: 6 }}>
                                        Drink
                                </Text>
                                </View>
                            </TouchableOpacity>

                        </ScrollView>

                    </View>

                    <View style={{ flex: 1, paddingHorizontal: 10, marginBottom: 10 }}>
                        <View style={{ paddingVertical: 8, marginLeft: 6 }}>
                            <Text style={{ fontWeight: 'bold' }}>Click the menu to add cart</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => this.setState({menu : 1})}
                            style={{ marginVertical: 5, borderRadius: 100 / 25, minHeight: 100, elevation: 2.5, marginHorizontal: 4, backgroundColor: 'white' }}
                        >
                            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                <View style={{ maxWidth: '40%', flex: 1, height: 100, paddingHorizontal: 8 }}>
                                    <Image
                                        source={{ uri: 'https://pngimage.net/wp-content/uploads/2018/06/menu-makanan-png-6.png' }}
                                        style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} />
                                </View>
                                <View style={{ maxWidth: '60%', paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'space-around' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Paket Ayam Geprek Resto Banyak Sambal</Text>
                                    <Text>Rp. 18.000</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.setState({menu : 1})}
                            style={{ marginVertical: 5, borderRadius: 100 / 25, minHeight: 100, elevation: 2.5, marginHorizontal: 4, backgroundColor: 'white' }}
                        >
                            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                <View style={{ maxWidth: '40%', flex: 1, height: 100, paddingHorizontal: 8 }}>
                                    <Image
                                        source={{ uri: 'https://peoplepng.com/wp-content/uploads/2019/03/prato-com-comida-png-2.png' }}
                                        style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} />
                                </View>
                                <View style={{ maxWidth: '60%', paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'space-around' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Ayam Sunda Istimewa</Text>
                                    <Text>Rp. 14.000</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.setState({menu : 1})}
                            style={{ marginVertical: 5, borderRadius: 100 / 25, minHeight: 100, elevation: 2.5, marginHorizontal: 4, backgroundColor: 'white' }}
                        >
                            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                <View style={{ maxWidth: '40%', flex: 1, height: 100, paddingHorizontal: 8 }}>
                                    <Image
                                        source={{ uri: 'https://img.okezone.com/content/2015/07/14/298/1181725/ayam-ikan-goreng-makanan-sahur-andika-kangen-lagi-v7yp8ZXVdW.png' }}
                                        style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} />
                                </View>
                                <View style={{ maxWidth: '60%', paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'space-around' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Paket Ayam Begadang</Text>
                                    <Text>Rp. 22.000</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.setState({menu : 1})}
                            style={{ marginVertical: 5, borderRadius: 100 / 25, minHeight: 100, elevation: 2.5, marginHorizontal: 4, backgroundColor: 'white' }}
                        >
                            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                <View style={{ maxWidth: '40%', flex: 1, height: 100, paddingHorizontal: 8 }}>
                                    <Image
                                        source={{ uri: 'https://www.esteler77.com/assets/uploads/products-images-nasi-goreng-77-0.png' }}
                                        style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} />
                                </View>
                                <View style={{ maxWidth: '60%', paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'space-around' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Nasi Goreng Crispy</Text>
                                    <Text>Rp. 13.500</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.setState({menu : 1})}
                            style={{ marginVertical: 5, borderRadius: 100 / 25, minHeight: 100, elevation: 2.5, marginHorizontal: 4, backgroundColor: 'white' }}
                        >
                            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                <View style={{ maxWidth: '40%', flex: 1, height: 100, paddingHorizontal: 8 }}>
                                    <Image
                                        source={{ uri: 'https://www.tobys.co.id/wp-content/uploads/2017/04/PAKET-MUJUR-2-TOBYS.png' }}
                                        style={{ width: undefined, height: undefined, resizeMode: 'contain', flex: 1 }} />
                                </View>
                                <View style={{ maxWidth: '60%', paddingVertical: 10, paddingHorizontal: 15, justifyContent: 'space-around' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Paket Chicken Murah</Text>
                                    <Text>Rp. 14.000</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                {
                    this.state.menu > 0 &&
                    <View style={{minHeight: 80, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => this.setState({menu : 0})}
                            style={{padding: 10, backgroundColor: 'red'}}>
                            <Text style={{color: 'white'}}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                }
                
            </View>
        )
    }

}