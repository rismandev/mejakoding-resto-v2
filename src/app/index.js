import React, { Component } from 'react'
import { View, Image, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class Auth extends Component {

    // State
    state = {
        number: 0
    }

    /*
     * Function Handle TextInput
     */
    handleChange = async (number) => {

        await this.setState({ number })

    }

    /*
     * Function Handle Button
     */
    handleButton = () => {

        alert(`Oke, Your Number ${this.state.number}`)

    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}>
                {/* Image */}
                <View style={styles.cardImage}>
                    <Image
                        source={require('../assets/illustration/first-icon.png')}
                        style={styles.itemImage}
                    />
                </View>
                {/* Form */}
                <View style={styles.cardForm}>
                    
                    {/* Text Input Number Table */}
                    <TextInput
                        onChangeText={(number) => this.handleChange(number)}
                        placeholder="Enter Your Number Table"
                        keyboardType="numeric"
                        style={styles.formTextInput}
                    />

                    {
                        // If Number Table Not Empty, Show Button
                        this.state.number > 0 &&

                        <TouchableOpacity 
                            onPress={this.handleButton}
                            style={styles.formButton}>
                            <Text style={styles.formTextButton}>ORDER</Text>
                        </TouchableOpacity>
                    }
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white'
    },
    cardImage : { 
        width: '100%', 
        height: 280 
    },
    itemImage : { 
        flex: 1, 
        width: undefined, 
        height: undefined, 
        resizeMode: 'contain' 
    },
    cardForm : { 
        width: '100%', 
        alignItems: 'center', 
        paddingVertical: 10 
    },
    formTextInput : { 
        paddingVertical: 10, 
        paddingHorizontal: 8, 
        borderWidth: .5, 
        borderColor: '#877dfa', 
        borderRadius: 4, 
        width: '80%', 
        textAlign: 'center' 
    },
    formButton : { 
        backgroundColor: '#877dfa', 
        marginVertical: 15, 
        width: '80%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 15, 
        borderRadius: 4 
    },
    formTextButton : {
        color: 'white'
    }
})