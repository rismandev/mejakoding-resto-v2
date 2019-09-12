import React, { Component } from 'react'
import { View, Image, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { addTableNumber } from '../_actions/Payment'

class Auth extends Component {

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
    handleButton = async() => {

      await this.props.dispatch(addTableNumber(this.state.number))

      await this.props.navigation.navigate('List')

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
                        this.state.number > 0 ?

                        <TouchableOpacity
                            onPress={this.handleButton}
                            style={styles.formButton}>
                            <Text style={styles.formTextButton}>ORDER</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.Title}>
                          <Text style={styles.TextTitle}>Welcome to MejaKoding</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        )
    }

}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(Auth);

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
    },
    Title: {
      marginTop: 10,
      paddingVertical: 10,
      paddingHorizontal: 15
    },
    TextTitle: {
      fontSize: 18,
      fontFamily: 'monospace'
    }
})
