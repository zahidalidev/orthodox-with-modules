import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Content } from "native-base";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { getNotificationMessage } from "../helpers/api";

class Notification extends Component {
  state = {
    font_size: 15,
    lineHeight: 21,
    message: "",
    loader: false
  };

  componentDidMount() {
    this.getMessage(this.props.navigation.getParam("message_id"));
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.navigation.getParam("message_id") !=
      this.props.navigation.getParam("message_id")
    ) {
      this.getMessage(this.props.navigation.getParam("message_id"));
    }
  }

  getMessage = id => {
    this.setState({ loader: true });
    getNotificationMessage(id).then(res => {
      this.setState({ loader: false });
      if (res.success) {
        this.setState({ message: res.data[0].message });
      } else {
        this.setState({ message: "" });
      }
    });
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
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader back {...this.props} />
        {/* <View
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
        </View> */}
        {this.state.loader ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator color={colors.primary_red} size="small" />
          </View>
        ) : this.state.message ? (
          <ScrollView style={{ padding: 5 }}>
            {/* <Image
            source={require("../assets/jesus.jpg")}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          /> */}
            {/* {this.props.navigation.getParam("title") ? (
                <Text
                  style={{
                    marginVertical: 3,
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "black"
                  }}
                >
                  {this.props.navigation.getParam("title")}
                </Text>
              ) : null} */}
            <Text
              style={{
                color: colors.black,
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
              {this.state.message}
            </Text>
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No data available.</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Notification;
