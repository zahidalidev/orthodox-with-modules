import React, { Component } from "react";
import { Header, Button } from "native-base";
import { Text, ImageBackground, Platform, View } from "react-native";
import colors from "../constants/colors";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { favoritePrayer } from "../helpers/functions";

class CustomHeader extends Component {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  favoritePrayer = () => {
    favoritePrayer({
      id: this.props.navigation.getParam("id"),
      title: this.props.navigation.getParam("title")
    }).then(() => this.props.checkFav());
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/4027.jpg")}
        style={{ width: "100%" }}
        resizeMode="cover"
      >
        <Header
          style={{ alignItems: "center", height: 75 }}
          transparent
          androidStatusBarColor={colors.primary_red}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            {this.props.back ? (
              <Button
                style={{ alignSelf: "flex-start" }}
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <AntIcon
                  name="arrowleft"
                  size={22}
                  color={colors.yellow_text}
                />
              </Button>
            ) : null}
          </View>
          <View
            style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: colors.yellow_text,
                fontSize: 19,
                fontWeight: Platform.OS === "ios" ? "500" : null
              }}
            >
              {this.props.title
                ? this.props.title.charAt(0).toUpperCase() +
                  this.props.title.slice(1)
                : ""}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "row"
            }}
          >
            {this.props.fav ? (
              <Button style={{paddingRight:0, flex:1, marginRight:0}} transparent onPress={this.props.handleFav}>
              <AntIcon
                name={this.props.favStatus  ? "heart" : "hearto"}
                size={19}
                color={colors.yellow_text}
              />
              </Button>
            ) : null}
            {this.props.menu ? (
              <Menu
                ref={this.setMenuRef}
                button={
                  <Button style={{paddingRight: 0, marginRight: 0}} onPress={this.showMenu} transparent>
                  <MaterialIcon
                    name="dots-vertical"
                    size={22}
                    color={colors.yellow_text}
                  />
                  </Button>
                }
              >
                <MenuItem
                  onPress={() => {
                    this.hideMenu();
                    this.props.navigation.navigate("about");
                  }}
                >
                  About Us
                </MenuItem>
                <MenuItem
                  onPress={() => {
                    this.hideMenu();
                    this.props.navigation.navigate("contactUs");
                  }}
                >
                  Contact Us
                </MenuItem>
                {/* <MenuItem
                  onPress={() => {
                    this.hideMenu();
                    this.props.navigation.navigate("otherApps");
                  }}
                >
                  Other Apps
                </MenuItem> */}
              </Menu>
            ) : null}
          </View>
        </Header>
      </ImageBackground>
    );
  }
}

export default CustomHeader;
