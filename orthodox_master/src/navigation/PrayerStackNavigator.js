import { createStackNavigator } from "react-navigation";
import ViewPrayerScreen from "../pages/ViewPrayer";
import PrayersScreen from "../pages/Prayers";
import PrayerListScreen from '../pages/PrayerList'

export default PrayerStackNavigator = createStackNavigator(
  {
    prayers: { screen: PrayersScreen },
    viewPrayer: {
      screen: ViewPrayerScreen
    },
    prayerList: {screen: PrayerListScreen}
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// PrayerStackNavigator.navigationOptions = ({navigation}) => {
//     let tabBarVisible = true;
//     if (navigation.state.index == 2) {
//         tabBarVisible = false;
//       }
    
//       return {
//         tabBarVisible,
//       };
// }

