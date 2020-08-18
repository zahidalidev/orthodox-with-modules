import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Accordion } from "native-base";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import { getPrayerCategories, getPrayers } from "../helpers/api";
import { withNavigationFocus } from "react-navigation";
import { connect } from "react-redux";

class Prayers extends Component {
  state = {
    categories: [],
    prayers: [],
    active_category: ""
  };

  componentDidMount() {
    this.getCategories();

  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getCategories();
    }
    if (
      prevProps.notifications.notification !==
      this.props.notifications.notification
    ) {
      this.getCategories();
    }
  }

  getCategories = () => {
    getPrayerCategories().then(res =>
      this.setState({ categories: res.category_list })
    );
  };

  getPrayers = id => {
    if (!this.state[id]) {
      getPrayers(id).then(res => {
        console.log("subCat: ", res.sub_category_list)
        this.setState({ [id]: res.sub_category_list });
      });
    }
  };
  // _renderHeader = (item, expanded) => {
  //   if (expanded) {
  //     if (this.state.active_category != item.cat_id) {
  //       this.setState({ active_category: item.cat_id });
  //     }
  //     this.getPrayers(item.cat_id);
  //   }
  //   return (
  //     <View
  //       style={{
  //         width: "100%",
  //         height: 50,
  //         borderBottomWidth: 0.5,
  //         borderBottomColor: colors.med_grey,
  //         flexDirection: "row",
  //         alignItems: "center",
  //         paddingHorizontal: 10,
  //         justifyContent: "space-between",
  //         backgroundColor: colors.white
  //       }}
  //     >
  //       <Text style={{ color: colors.dark_grey, fontSize: 15 }}>
  //         {item.cat_name}
  //       </Text>
  //       <EvilIcon name="chevron-down" color={colors.dark_grey} size={25} />
  //     </View>
  //   );
  // };

  // _renderContent = item => {
  //   <TouchableOpacity
  //     style={{
  //       width: "100%",
  //       height: 50,
  //       borderBottomWidth: 0.5,
  //       borderBottomColor: colors.med_grey,
  //       flexDirection: "row",
  //       alignItems: "center",
  //       paddingHorizontal: 10,
  //       justifyContent: "space-between",
  //       backgroundColor: "#f2f5f7"
  //     }}
  //     onPress={() => this.props.navigation.navigate("viewPrayer")}
  //   >
  //     <Text style={{ color: colors.dark_grey, fontSize: 15 }}>
  //       {item.title}
  //     </Text>
  //     <EvilIcon name="chevron-right" color={colors.dark_grey} size={25} />
  //   </TouchableOpacity>;
  // };

  render() {
    // const content = (
    //   <TouchableOpacity
    //     style={{
    //       width: "100%",
    //       height: 50,
    //       borderBottomWidth: 0.5,
    //       borderBottomColor: colors.med_grey,
    //       flexDirection: "row",
    //       alignItems: "center",
    //       paddingHorizontal: 10,
    //       justifyContent: "space-between",
    //       backgroundColor: "#f2f5f7"
    //     }}
    //     onPress={() => this.props.navigation.navigate("viewPrayer")}
    //   >
    //     <Text style={{ color: colors.dark_grey, fontSize: 15 }}>
    //       {prayer.title}
    //     </Text>
    //     <EvilIcon name="chevron-right" color={colors.dark_grey} size={25} />
    //   </TouchableOpacity>
    // );

    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="Categories" {...this.props} menu />
        {this.state.categories.length > 0 ? (
          <ScrollView>
            {this.state.categories.map(prayer => (
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
                key={prayer.cat_id}
                onPress={() =>
                  this.props.navigation.navigate("prayerList", {
                    id: prayer.cat_id,
                    cat_name: prayer.cat_name
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
                  {prayer.cat_name}
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={colors.primary_red} size="small" />
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

export default connect(mapStateToProps)(withNavigationFocus(Prayers));
