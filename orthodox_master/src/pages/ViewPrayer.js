import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from "react-native";
import { Content } from "native-base";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { viewPrayer } from "../helpers/api";
import base64 from "react-native-base64";
import { favoritePrayer, checkFavoritePrayer } from "../helpers/functions";
import Hyperlink from 'react-native-hyperlink'

class ViewPrayer extends Component {
  state = {
    font_size: 15,
    lineHeight: 21,
    prayer: "",
    description: "",
    fav: "",
    loader: false,
    replacePattern1: '', replacePattern2: '', replacePattern3: ''
  };

  componentDidMount() {
    this.getPrayer(this.props.navigation.getParam("id"));
    this.checkFav();
  }

  componentDidUpdate(prevProps){
    if(prevProps.navigation.getParam('id') != this.props.navigation.getParam('id')){
      this.getPrayer(this.props.navigation.getParam('id'))
    }
  }

  checkFav = () => {
    checkFavoritePrayer(this.props.navigation.getParam("id")).then(res =>
      this.setState({ fav: res })
    );
  };

  getPrayer = id => {
    this.setState({loader: true})
    viewPrayer(id).then(prayer => {
      this.setState({loader: false})
      if(prayer.success){
      this.setState({ prayer: prayer }, () => {
        this.convertbase64(this.state.prayer.category_details[0].description);
      });
    }else{
      this.setState({description: ''})
    }
    });
  };

  favoritePrayer = () => {
    favoritePrayer({
      id: this.props.navigation.getParam("id"),
      title: this.props.navigation.getParam("title")
    }).then(() => this.checkFav());
  };

  convertbase64 = str => {
    let converted = decodeURIComponent(
      base64
        .decode(str)
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
      console.log(".....................................arr:");
      arr.map(ar => {
        console.log("\n", ar)
      })
      converted = arr;
  
      this.setState({ description: converted, replacePattern1, replacePattern2, replacePattern3});
  };

  handleFontIncrease = () => {
    if (this.state.font_size < 35) {
      this.setState(state => ({
        font_size: state.font_size + 1,
        lineHeight: state.lineHeight + 0.7
      }));
    }
  };
  handleFontDecrease = () => {
    if (this.state.font_size > 10) {
      this.setState(state => ({
        font_size: state.font_size - 1,
        lineHeight: state.lineHeight - 0.7
      }));
    }
  };
  render() {
    const {replacePattern1, replacePattern2, replacePattern3} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          fav
          back
          {...this.props}
          id={this.props.navigation.getParam("id")}
          favTitle={this.props.navigation.getParam("title")}
          favStatus={this.state.fav}
          checkFav={this.checkFav}
          handleFav={this.favoritePrayer}
        />
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
            backgroundColor: "white"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                this.state.font_size < 11 ? colors.greyish_white : colors.white,
              flex: 1,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderRightWidth: 0.5,
              borderRightColor: colors.med_grey,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.handleFontDecrease}
          >
            <EntypoIcon
              name="minus"
              size={20}
              color={
                this.state.font_size < 11
                  ? colors.med_grey
                  : colors.darkest_grey
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor:
                this.state.font_size > 34 ? colors.greyish_white : colors.white,
              flex: 1,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.handleFontIncrease}
          >
            <EntypoIcon
              name="plus"
              size={20}
              color={
                this.state.font_size > 34
                  ? colors.med_grey
                  : colors.darkest_grey
              }
            />
          </TouchableOpacity>
        </View>
        {this.state.loader ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="small" color={colors.primary_red} />
          </View>
        ) : this.state.description  ?  (
          <ScrollView style={{ padding: 5 }}>
            {/* <Image
            source={require("../assets/jesus.jpg")}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          /> */}
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                marginBottom: 10,
                marginTop: 5,
                marginHorizontal: 3,
                color: "black"
              }}
            >
              {this.props.navigation.getParam("title")}
            </Text>
            <Text
                  style={{
                    color: "black",
                    flex: 1,
                    //marginTop: 10,
                    textAlign: "justify",
                    fontSize: this.state.font_size,
                    marginBottom: 20,
                    lineHeight: this.state.lineHeight,
                    fontWeight: "200",
                    marginHorizontal: 3
                  }}
                >
              {
                this.state.description.map((des, i) => {
                  if(des.match(replacePattern1) || des.match(replacePattern2) || des.match(replacePattern3)){
                    let includeHTpp = des.search("http");
                    if(includeHTpp === -1){
                      return <Text key = {i} style={{color: "red"}} onPress={ ()=> Linking.openURL("http://" + des) } >{` ${des}`}</Text>
                    }else{
                      return <Text key = {i} style={{color: "red"}} onPress={ ()=> Linking.openURL(des) } >{` ${des}`}</Text>
                    }
                  }else{
                    return ` ${des}`
                  }
                })
              }
              
              </Text>
            
          </ScrollView>
        ) : (
          <View><Text>No data available.</Text></View> 
        )}
      </View>
    );
  }
}

export default ViewPrayer;
