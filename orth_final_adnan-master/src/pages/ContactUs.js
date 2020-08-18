import React, { Component } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, Linking} from "react-native";
import { Content } from "native-base";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {getContact} from '../helpers/api';
import base64 from 'react-native-base64'

class ContactUs extends Component {

    state = {
        font_size: 15,
        lineHeight: 20,
        contact_us: [],
        replacePattern1: '', replacePattern2: '', replacePattern3: ''
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
      getContact()
      .then(res=>this.convertbase64(res.contact_us[0].description))
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

      var replacedText, replacePattern1, replacePattern2, replacePattern3;
  
      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      
      var arr = converted.split(/\r| /);
      // (" ", "\\")
      converted = arr;
      this.setState({ contact_us: converted, replacePattern1, replacePattern2, replacePattern3 });
    };
  render() {
    const {replacePattern1, replacePattern2, replacePattern3} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="contact Us" back {...this.props} />
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
            {
                this.state.contact_us.map((des, i) => {
                  if(des.match(replacePattern1) || des.match(replacePattern2) || des.match(replacePattern3)){
                    return <Text key={i} style={{color: "red"}} onPress={ ()=> Linking.openURL("http://" + des) } >{` ${des}`}</Text>
                  }else{
                    return ` ${des}`
                  }
                })
              }
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default ContactUs;
