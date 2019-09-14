import React from 'react'
import { View, Text } from 'react-native'
// Using Icon From FontAwesome 5
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

const Header = (props) => {
  return (
    <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
        <View style={{ justifyContent: 'center', backgroundColor: '#877dfa', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100 / 2 }}>
            <Text style={{ color: 'white' }}>
                <FontAwesome
                    name={props.iconTableNumber}
                    size={15}
                />
                &nbsp;&nbsp;
                {props.tableNumber}
                </Text>
        </View>
        <View style={{ justifyContent: 'center', backgroundColor: '#877dfa', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 100 / 2 }}>
            <Text style={{ color: 'white' }}>
                <FontAwesome
                    name={props.iconTime}
                    size={15}
                />
                &nbsp;&nbsp;
                {props.time}
                </Text>
        </View>
    </View>
  )
}

export default Header;
