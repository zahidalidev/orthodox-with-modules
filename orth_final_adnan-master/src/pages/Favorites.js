import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import { Tab, Tabs } from "native-base";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontIcon from "react-native-vector-icons/FontAwesome";
import {
  getFavoritePrayer,
  getFavoriteVideos,
  getFavoriteAudios
} from "../helpers/functions";
import { withNavigationFocus } from "react-navigation";

class Favorites extends Component {
  state = {
    prayer: [1, 2, 3, 4, 5],
    favPrayers: "",
    favVideos: "",
    favAudios: ""
  };
  componentDidMount() {
    getFavoritePrayer().then(res => this.setState({ favPrayers: res }));
    getFavoriteVideos().then(res => this.setState({ favVideos: res }));
    getFavoriteAudios().then(res => this.setState({ favAudios: res }));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      getFavoritePrayer().then(res => this.setState({ favPrayers: res }));
      getFavoriteVideos().then(res => this.setState({ favVideos: res }));
      getFavoriteAudios().then(res => this.setState({ favAudios: res }));
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="Favorites" menu {...this.props} />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: colors.primary_red }}>
          <Tab
            heading="Prayer"
            activeTextStyle={{ color: colors.primary_red }}
            activeTabStyle={{ backgroundColor: "white" }}
            tabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: colors.black }}
          >
            {this.state.favPrayers ? (
              this.state.favPrayers.length > 0 ? (
                <ScrollView>
                  {this.state.favPrayers.map(prayer => (
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        borderBottomWidth: 0.5,
                        borderBottomColor: colors.med_grey,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        justifyContent: "space-between",
                        paddingVertical: 15
                      }}
                      key={prayer.id}
                      onPress={() =>
                        this.props.navigation.navigate("viewPrayer", {
                          id: prayer.id,
                          title: prayer.title
                        })
                      }
                    >
                      <Text
                        style={{
                          color: colors.dark_grey,
                          fontSize: 14,
                          width: "95%"
                        }}
                      >
                        {prayer.title}
                      </Text>
                      <EvilIcon
                        name="chevron-right"
                        color={colors.dark_grey}
                        size={25}
                      />
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
                  <Text style={{ color: colors.darkest_grey }}>
                    No Favorites.
                  </Text>
                </View>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: colors.darkest_grey }}>
                  No Favorites.
                </Text>
              </View>
            )}
          </Tab>
          <Tab
            heading="Video"
            activeTextStyle={{ color: colors.primary_red }}
            activeTabStyle={{ backgroundColor: "white" }}
            tabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: colors.black }}
          >
            {this.state.favVideos ? (
              this.state.favVideos.length > 0 ? (
                <ScrollView style={{ paddingTop: 10 }}>
                  {this.state.favVideos.map(prayer => (
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
                      key={prayer.id}
                      onPress={() =>
                        this.props.navigation.navigate("viewVideo", {
                          video_link: prayer.link,
                          video_id: prayer.id
                        })
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
                          width: 105,
                          height: 80,
                          borderRadius: 5,
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                        imageStyle={{
                          borderRadius: 5,
                          width: "100%",
                          height: "100%"
                        }}
                      >
                        <AntIcon
                          color={colors.white}
                          name="playcircleo"
                          size={30}
                        />
                      </ImageBackground>
                      <View
                        style={{ flex: 1, justifyContent: "space-between" }}
                      >
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
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: colors.darkest_grey }}>
                    No Favorites.
                  </Text>
                </View>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: colors.darkest_grey }}>
                  No Favorites.
                </Text>
              </View>
            )}
          </Tab>

          <Tab
            heading="Audio"
            activeTextStyle={{ color: colors.primary_red }}
            activeTabStyle={{ backgroundColor: "white" }}
            tabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: colors.black }}
          >
            {this.state.favAudios ? (
              this.state.favAudios.length > 0 ? (
                <ScrollView style={{ paddingTop: 10 }}>
                  {this.state.favAudios.map(prayer => (
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
                      key={prayer.id}
                      onPress={() =>
                        this.props.navigation.navigate("viewAudio", {
                          audio_link: prayer.link,
                          audio_id: prayer.id
                        })
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
                        imageStyle={{
                          borderRadius: 5,
                          width: "100%",
                          height: "100%"
                        }}
                      >
                        <FontIcon
                          color={colors.white}
                          name="volume-up"
                          size={25}
                        />
                      </ImageBackground>
                      <View
                        style={{ flex: 1, justifyContent: "space-between" }}
                      >
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
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: colors.darkest_grey }}>
                    No Favorites.
                  </Text>
                </View>
              )
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: colors.darkest_grey }}>
                  No Favorites.
                </Text>
              </View>
            )}
          </Tab>
        </Tabs>

        {/* <ScrollView>
          {this.state.prayer.map(prayer => (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 50,
                borderBottomWidth: 0.5,
                borderBottomColor: colors.med_grey,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                justifyContent: "space-between"
              }}
              key={prayer}
              onPress={()=>this.props.navigation.navigate('viewPrayer')}
            >
              <Text style={{ color: colors.dark_grey, fontSize: 15 }}>
                Favorite prayer will be here
              </Text>
              <EvilIcon
                name="chevron-right"
                color={colors.dark_grey}
                size={25}
              />
            </TouchableOpacity>
          ))}
        </ScrollView> */}
      </View>
    );
  }
}

export default withNavigationFocus(Favorites);
