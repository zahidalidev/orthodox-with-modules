import { createStackNavigator } from "react-navigation";
import ViewAudioScreen from "../pages/ViewAudio";
import AudioScreen from "../pages/Audibles";

export default VideoStackNavigator = createStackNavigator(
  {
    audios: { screen: AudioScreen },
    viewVideo: {screen: ViewAudioScreen}
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

