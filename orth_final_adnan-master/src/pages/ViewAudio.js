import React, { Component } from "react";
import { View, WebView, Text } from "react-native";
import {} from "native-base";
import CustomHeader from "../components/CustomHeader";
import { setFavoriteAudio, checkFavoriteAudios } from "../helpers/functions";

class ViewAudio extends Component {
  state = { fav: "" };
  componentDidMount() {
    this.checkFav();
  }

  favoriteAudio = () => {
    setFavoriteAudio({
      id: this.props.navigation.getParam("audio_id"),
      title: this.props.navigation.getParam("title"),
      link: this.props.navigation.getParam("audio_link"),
      youtube_vid_id: this.props.navigation.getParam('youtube_vid_id')
    }).then(() => this.checkFav());
  };

  checkFav = () => {
    checkFavoriteAudios(this.props.navigation.getParam("audio_id")).then(res =>
      this.setState({ fav: res })
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          favStatus={this.state.fav}
          handleFav={this.favoriteAudio}
          fav
          back
          {...this.props}
        />
        <WebView
          style={{ flex: 1 }}
          source={{ uri: this.props.navigation.getParam("audio_link") }}
        />
      </View>
    );
  }
}

export default ViewAudio;
