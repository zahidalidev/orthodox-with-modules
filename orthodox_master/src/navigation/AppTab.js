import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator
  } from "react-navigation";
  import React from "react";
  import TabComponent from '../components/TabComponent';
  import PrayerStackNavigator from './PrayerStackNavigator';
  import FavoriteStackNavigator from './FavoriteStack';
  import AudibleScreen from '../pages/Audibles';
  import NotificationStackNavigator from './NotificationStack';
  import VideoStackNavigator from './VideoStack';
  import AudioStackNavigator from './AudioStack';
  
  const AppNavigator = createBottomTabNavigator(
    {
      prayersStack: PrayerStackNavigator,
      favoriteStack: FavoriteStackNavigator,
      notificationStack: NotificationStackNavigator,
      audioStack: AudioStackNavigator,
      videoStack: VideoStackNavigator
    },
    {
        tabBarComponent: (props)=> <TabComponent {...props}/>,
        backBehavior: 'none'
    }
      
  );
  
  export default  AppNavigator;
  