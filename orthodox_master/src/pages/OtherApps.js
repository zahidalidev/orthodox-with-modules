import React, { Component } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { Content } from "native-base";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {getOtherApps} from '../helpers/api';
import base64 from 'react-native-base64'

class OtherApps extends Component {

    state = {
        font_size: 15,
        lineHeight: 20,
        other_apps: ''
    }

    handleFontIncrease = () => {
        if(this.state.font_size < 35){
            this.setState(state=>({font_size: state.font_size+1, lineHeight: state.lineHeight+0.7}))
        }
    }
    handleFontDecrease = () => {
        if(this.state.font_size > 10){
            this.setState(state=>({font_size: state.font_size-1, lineHeight: state.lineHeight-0.7}))
        }
    }
    componentDidMount(){
      getOtherApps()
      .then(res=>this.convertbase64(res.other_apps[0].description))
    }
    convertbase64 = str => {
      let converted = decodeURIComponent(
        base64.decode(str)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      this.setState({ other_apps: converted });
    };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="other Apps" back {...this.props} />
        <View
          style={{
            position: "absolute",
            width: 80,
            height: 35,
            zIndex: 1,
            flexDirection: "row",
            bottom: 20,
            alignSelf: "center",
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: colors.med_grey,
            backgroundColor: 'white'
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: this.state.font_size < 11 ? colors.greyish_white : colors.white,
              flex: 1,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderRightWidth: 0.5,
              borderRightColor: colors.med_grey,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={this.handleFontDecrease}
          >
              <EntypoIcon name='minus' size={20} color={this.state.font_size < 11 ? colors.med_grey : colors.darkest_grey}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: this.state.font_size > 34 ? colors.greyish_white : colors.white,
              flex: 1,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={this.handleFontIncrease}
          >
              <EntypoIcon name='plus' size={20} color={this.state.font_size > 34 ? colors.med_grey : colors.darkest_grey}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ padding: 8 }}>
          {/* <Image
            source={require("../assets/jesus.jpg")}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          /> */}
          <Text
            style={{
              color: colors.black,
              flex: 1,
              marginTop: 10,
              fontSize: this.state.font_size,
              marginBottom: 20,
              lineHeight: this.state.lineHeight
            }}
          >
            {this.state.other_apps}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default OtherApps;
