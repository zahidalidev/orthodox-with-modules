import { createStackNavigator } from "react-navigation";
import NotificationScreen from "../pages/Notifications";
import ViewNotificationScreen from '../pages/ViewNotification';
import ViewVideoScreen from '../pages/ViewVideo';
import ViewPrayerScreen from '../pages/ViewPrayer';
import viewAudioScreen from '../pages/ViewAudio'

export default NotificationStackNavigator = createStackNavigator(
  {
    notifications: { screen: NotificationScreen },
    viewNotification: {screen: ViewNotificationScreen},
    viewPrayer: {screen: ViewPrayerScreen},
    viewVideo: {screen: ViewVideoScreen},
    viewAudio: {screen: viewAudioScreen}
    
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// NotificationStackNavigator.navigationOptions = ({navigation}) => {
//     let tabBarVisible = true;
//     if (navigation.state.index == 1) {
//         tabBarVisible = false;
//       }
    
//       return {
//         tabBarVisible,
//       };
// }

