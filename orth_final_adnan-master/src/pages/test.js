import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CustomHeader from '../components/CustomHeader'

class Test extends Component {
    render(){
        return(
            <View style={{flex: 1}}>
            <CustomHeader/>
            </View>
        )
    }
}

export default Test