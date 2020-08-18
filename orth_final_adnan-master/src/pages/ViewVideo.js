import React, { Component } from "react";
import { View, WebView, Text } from "react-native";
import {} from "native-base";
import CustomHeader from "../components/CustomHeader";
import { setFavoriteVideo, checkFavoriteVideos } from "../helpers/functions";

class ViewVideo extends Component {
  state = { fav: "" };
  componentDidMount() {
    this.checkFav();
  }

  favoriteVideo = () => {
    setFavoriteVideo({
      id: this.props.navigation.getParam("video_id"),
      title: this.props.navigation.getParam("title"),
      link: this.props.navigation.getParam("video_link"),
      youtube_vid_id: this.props.navigation.getParam('youtube_vid_id')
    }).then(() => this.checkFav());
  };

  checkFav = () => {
    checkFavoriteVideos(this.props.navigation.getParam("video_id")).then(res =>
      this.setState({ fav: res })
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          favStatus={this.state.fav}
          handleFav={this.favoriteVideo}
          fav
          back
          {...this.props}
        />
        <WebView
          style={{ flex: 1 }}
          source={{ uri: this.props.navigation.getParam("video_link") }}
        />
      </View>
    );
  }
}

export default ViewVideo;
