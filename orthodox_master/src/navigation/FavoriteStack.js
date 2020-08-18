import { createStackNavigator } from "react-navigation";
import ViewPrayerScreen from "../pages/ViewPrayer";
import FavoriteScreen from "../pages/Favorites";
import ViewVideoScreen from '../pages/ViewVideo';
import ViewAudioScreen from '../pages/ViewAudio';

export default FavoriteStackNavigator = createStackNavigator(
  {
    prayers: { screen: FavoriteScreen },
    viewPrayer: {
      screen: ViewPrayerScreen
    },
    viewVideo: {
      screen: ViewVideoScreen
    },
    viewAudio: {
      screen: ViewAudioScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// FavoriteStackNavigator.navigationOptions = ({navigation}) => {
//     let tabBarVisible = true;
//     if (navigation.state.index == 1) {
//         tabBarVisible = false;
//       }
    
//       return {
//         tabBarVisible,
//       };
// }

