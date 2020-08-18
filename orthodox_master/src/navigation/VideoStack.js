import { createStackNavigator } from "react-navigation";
import ViewVideoScreen from "../pages/ViewVideo";
import VideoScreen from "../pages/Videos";

export default VideoStackNavigator = createStackNavigator(
  {
    videos: { screen: VideoScreen },
    viewVideo: {screen: ViewVideoScreen}
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

// VideoStackNavigator.navigationOptions = ({navigation}) => {
//     let tabBarVisible = true;
//     if (navigation.state.index == 1) {
//         tabBarVisible = false;
//       }
    
//       return {
//         tabBarVisible,
//       };
// }

