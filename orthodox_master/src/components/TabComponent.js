import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import colors from "../constants/colors";
import Ionicon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import OneSignal from "react-native-onesignal";
import NavigationActions from '../navigation/NavigationActions';
import {storeNotification} from '../helpers/functions'

class TabComponent extends Component {
  componentWillMount() {
    OneSignal.init("b0d2c900-0d60-4906-9b67-b1d7d503d481");

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
    OneSignal.inFocusDisplaying(2);
    OneSignal.configure(); // triggers the ids event
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
    this.props.updateRoute('prayersStack')
  }

  onReceived = notification => {
    console.log('notification received', notification)
    this.props.updateNotification();
    if(notification.payload.additionalData.message_id != '0'){
      notification.payload.additionalData.message = notification.payload.body;
    }
    storeNotification(notification.payload.additionalData)
    .then(()=>this.props.updateNotification());
  };

  onOpened = openResult => {
    
    //this.handleRouteClick('notificationStack')
    let data = openResult.notification.payload.additionalData;
    if(data.subcat_id != '0'){
      NavigationActions.viewPrayer(this.props.navigation, data);
    }
    if(data.message_id != '0'){
      NavigationActions.viewNotification(this.props.navigation, data)
    }
    if(data.video_id != '0'){
      NavigationActions.viewVideo(this.props.navigation, data)
    }
    if(data.audio_id != '0'){
      NavigationActions.viewAudio(this.props.navigation, data)
    }else{
      this.props.navigation.navigate('notificationStack')
    }

  };

  onIds(device) {
    console.log("Device info: ", device);
  }
  state = {
    activeRoute: this.props.activeRoute
  };

  handleRouteClick = route => {
    this.props.updateRoute(route);
    this.setState({ activeRoute: route });
    this.props.navigation.navigate(route);
  };
  
  render() {
    return (
      <View
        style={{
          height: 55,
          width: "100%",
          backgroundColor: colors.greyish_white,
          flexDirection: "row",
          borderTopColor: colors.med_grey,
          borderTopWidth: 0.5
        }}
      >
        <TouchableOpacity
          style={
            this.props.activeRoute === "prayersStack"
              ? [styles.link_view, styles.active_view]
              : styles.link_view
          }
          onPress={() => this.handleRouteClick("prayersStack")}
        >
          <Ionicon
            name="ios-book"
            size={19}
            color={
              this.props.activeRoute === "prayersStack"
                ? colors.primary_red
                : colors.darkest_grey
            }
          />
          <Text
            style={
              this.props.activeRoute === "prayersStack"
                ? [styles.link_text, styles.active_text]
                : styles.link_text
            }
          >
            Prayers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.props.activeRoute === "favoriteStack"
              ? [styles.link_view, styles.active_view]
              : styles.link_view
          }
          onPress={() => this.handleRouteClick("favoriteStack")}
        >
          <Ionicon
            name="md-heart"
            size={18}
            color={
              this.props.activeRoute === "favoriteStack"
                ? colors.primary_red
                : colors.darkest_grey
            }
          />
          <Text
            style={
              this.props.activeRoute === "favoriteStack"
                ? [styles.link_text, styles.active_text]
                : styles.link_text
            }
          >
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.props.activeRoute === "notificationStack"
              ? [styles.link_view, styles.active_view]
              : styles.link_view
          }
          onPress={() => this.handleRouteClick("notificationStack")}
        >
          <Ionicon
            name="ios-notifications"
            size={20}
            color={
              this.props.activeRoute === "notificationStack"
                ? colors.primary_red
                : colors.darkest_grey
            }
          />
          <Text
            style={
              this.props.activeRoute === "notificationStack"
                ? [styles.link_text, styles.active_text]
                : styles.link_text
            }
          >
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.props.activeRoute === "videoStack"
              ? [styles.link_view, styles.active_view]
              : styles.link_view
          }
          onPress={() => this.handleRouteClick("videoStack")}
        >
          <Ionicon
            name="ios-play"
            size={21.5}
            color={
              this.props.activeRoute === "videoStack"
                ? colors.primary_red
                : colors.darkest_grey
            }
          />
          <Text
            style={
              this.props.activeRoute === "videoStack"
                ? [styles.link_text, styles.active_text]
                : styles.link_text
            }
          >
            Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.props.activeRoute === "audioStack"
              ? [styles.link_view, styles.active_view]
              : styles.link_view
          }
          onPress={() => this.handleRouteClick("audioStack")}
        >
          <Ionicon
            name="md-musical-note"
            size={20}
            color={
              this.props.activeRoute === "audioStack"
                ? colors.primary_red
                : colors.darkest_grey
            }
          />
          <Text
            style={
              this.props.activeRoute === "audioStack"
                ? [styles.link_text, styles.active_text]
                : styles.link_text
            }
          >
            Audio
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  link_text: { color: colors.darkest_grey, fontSize: 12, marginBottom: 5 },
  active_text: { color: colors.primary_red },
  link_view: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    paddingTop: 3,
    paddingBottom: 1
  },
  active_view: { backgroundColor: colors.white }
});

const mapStateToProps = state => {
  return {
    ...state.routes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateRoute: route => {
      dispatch({ type: "UPDATE_ROUTE", route: route });
    },
    updateNotification: () => dispatch({type: 'UPDATE_NOTIFICATION'})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabComponent);
