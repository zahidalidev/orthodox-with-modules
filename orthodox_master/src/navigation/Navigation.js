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
import AppTabNavigator from './AppTab';
import AboutScreen from '../pages/About';
import ContactScreen from '../pages/ContactUs';
import OtherAppScreen from '../pages/OtherApps'

const AppNavigator = createStackNavigator(
  {
    appTab: AppTabNavigator,
    about: AboutScreen,
    contactUs: ContactScreen,
    otherApps: OtherAppScreen
  },
  {
    initialRouteName: 'appTab',
    defaultNavigationOptions: {
      header: null
    }
  }
  
    
);

export default createAppContainer(AppNavigator);
