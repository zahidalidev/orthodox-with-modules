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
import { getPrayers } from "../helpers/api";
import { withNavigationFocus } from "react-navigation";
import {connect} from 'react-redux' 

class PrayerList extends Component {
  state = {
    prayer_list: []
  };
  componentDidMount() {
    this._getPrayers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this._getPrayers();
    }
    if (
      prevProps.notifications.notification !==
      this.props.notifications.notification
    ) {
      this._getPrayers();
    }
  }
  _getPrayers = () => {
    getPrayers(this.props.navigation.getParam("id")).then(res =>{
      if(res.success){
        this.setState({ prayer_list: res.sub_category_list })
      }else{
        this.setState({prayer_list: ''})
      }
    }
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          back
          title={this.props.navigation.getParam("cat_name")}
          {...this.props}
          menu
        />
        {this.state.prayer_list ? this.state.prayer_list.length > 0 ? (
          <ScrollView>
            {this.state.prayer_list.map(prayer => (
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
                key={prayer.subcat_id}
                onPress={() =>
                  this.props.navigation.navigate("viewPrayer", {
                    id: prayer.subcat_id,
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
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="small" color={colors.primary_red} />
          </View>
        )
        :
        (
          <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <Text>No data available.</Text>
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


export default connect(mapStateToProps)( withNavigationFocus(PrayerList));
