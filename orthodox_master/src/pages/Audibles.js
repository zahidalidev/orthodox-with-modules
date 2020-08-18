import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import FontIcon from "react-native-vector-icons/FontAwesome";
import AntIcon from "react-native-vector-icons/AntDesign";
import { getAudios } from "../helpers/api";
import {withNavigationFocus} from 'react-navigation';
import {connect} from 'react-redux'

class Audibles extends Component {
  state = {
    prayer: [1, 2, 3, 4, 5, 6, 7],
    audios: []
  };
  componentDidMount() {
    this.getAllAudios();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getAllAudios();
    }
    if (
      prevProps.notifications.notification !==
      this.props.notifications.notification
    ) {
      this.getAllAudios();
    }
  }

  getAllAudios = () => {
    getAudios().then(res => {
      let final_list = res.audio_list.map(v => this.getAudioId(v));
      this.setState({ audios: final_list });
    });
  };

  getAudioId = vidObj => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = vidObj.audio_link.match(regExp);
    vidObj.youtube_vid_id = match[7];
    return vidObj;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="audio" {...this.props} menu />
        <ScrollView style={{ paddingTop: 10 }}>
          {this.state.audios.map(prayer => (
            <TouchableOpacity
              style={{
                width: "100%",
                borderBottomWidth: 0,
                borderBottomColor: colors.med_grey,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
                justifyContent: "space-between",
                marginBottom: 12
              }}
              key={prayer.audio_id}
              onPress={() =>
                this.props.navigation.navigate("viewVideo", { ...prayer })
              }
            >
              <ImageBackground
                source={{
                  uri:
                    "https://img.youtube.com/vi/" +
                    prayer.youtube_vid_id +
                    "/default.jpg"
                }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                imageStyle={{ borderRadius: 5, width: "100%", height: "100%" }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.40)",
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <FontIcon color={colors.white} name="volume-up" size={25} />
                </View>
              </ImageBackground>
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: colors.darkest_grey,
                    marginLeft: 8,
                    marginTop: 2
                  }}
                >
                  {prayer.title}
                </Text>
                {/* <AntIcon
                  name="hearto"
                  size={15}
                  color={colors.dark_grey}
                  style={{ alignSelf: "flex-end", marginBottom: 3 }}
                /> */}
              </View>
              {/* <EvilIcon
                name="chevron-right"
                color={colors.dark_grey}
                size={25}
              /> */}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};  

export default connect(mapStateToProps)( withNavigationFocus( Audibles));
