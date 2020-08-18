import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import { withNavigationFocus } from "react-navigation";
import { getNotifications } from "../helpers/api";
import Ionicon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import {
  getLocalNotifications,
  deleteLocalNotification
} from "../helpers/functions";

class Notifications extends Component {
  state = {
    notifications: [],
    selected: []
  };
  componentDidMount() {
    this.getNotifications();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getNotifications();
    }
    if (
      prevProps.notifications.notification !==
      this.props.notifications.notification
    ) {
      this.getNotifications();
    }
  }
  getNotifications = () => {
    getLocalNotifications().then(res => {
      if (res) {
        if (res.length > 0) {
          this.setState({ notifications: res });
        }else{
          this.setState({ notifications: "" });

        }
      } else {
        this.setState({ notifications: "" });
      }
    });
    // getNotifications().then(res =>{
    //   if(res.success){
    //     this.setState({ notifications: res.notification })

    //   }else{
    //     this.setState({notifications: ''})
    //   }
    // }
    // );
  };

  deleteNotification = index => {
    deleteLocalNotification(index).then(() => this.getNotifications());
  };

  handleClick = not => {
    if (not.subcat_id != "0") {
      this.props.navigation.navigate("viewPrayer", {
        id: not.subcat_id,
        title: not.title
      });
    }
    if (not.video_id != "0") {
      this.props.navigation.navigate("viewVideo", {
        ...not,
        youtube_vid_id: this.getVideoId({ video_link: not.video_link })
      });
    }
    if (not.audio_id != "0") {
      this.props.navigation.navigate("viewAudio", {
        audio_link: not.audio_link,
        audio_id: not.audio_id,
        title: not.title,
        youtube_vid_id: this.getVideoId({ video_link: not.audio_link })
      });
    }
    if (not.message_id != "0") {
      this.props.navigation.navigate("viewNotification", { ...not });
    }
  };

  getVideoId = vidObj => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = vidObj.video_link.match(regExp);
    return match[7];
  };

  handleSelection = index => {
    let arr = [...this.state.selected];
    arr.push(index);
    this.setState({ selected: arr });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="Notifications" {...this.props} menu />
        {this.state.notifications ? (
          this.state.notifications.length > 0 ? (
            <ScrollView>
              {this.state.notifications.map((prayer, i) => (
                <TouchableOpacity
                  style={{
                    width: "100%",
                    borderBottomWidth: 0.5,
                    borderBottomColor: colors.med_grey,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 10,
                    justifyContent: "space-between"
                  }}
                  key={prayer.id}
                  onPress={() => this.handleClick(prayer)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "85%",
                      marginVertical: 15
                    }}
                  >
                    <Ionicon
                      name={
                        prayer.subcat_id != "0"
                          ? "ios-book"
                          : prayer.video_id != "0"
                          ? "ios-play"
                          : prayer.audio_id != "0"
                          ? "md-musical-note"
                          : "md-mail"
                      }
                      size={
                        prayer.video_id != "0"
                          ? 19
                          : prayer.message_id != "0"
                          ? 16
                          : 17
                      }
                      color={colors.primary_red}
                    />
                    <Text
                      style={{
                        color: colors.dark_grey,
                        fontSize: 14,
                        marginLeft: 10
                      }}
                    >
                      {prayer.message_id != "0"
                        ? prayer.message.substring(0, 45).replace(/(\r\n|\n|\r)/gm, " ") + "..."
                        : prayer.title}
                    </Text>
                  </View>

                  {/* <EvilIcon
                  name="chevron-right"
                  color={colors.dark_grey}
                  size={25}
                /> */}
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      flex: 1
                    }}
                    onPress={i => this.deleteNotification(i)}
                  >
                    <EvilIcon
                      name="trash"
                      color={colors.dark_grey}
                      size={20}
                      style={{ marginVertical: 15 }}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator color={colors.primary_red} size="small" />
            </View>
          )
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No notifications available.</Text>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(mapStateToProps)(withNavigationFocus(Notifications));
