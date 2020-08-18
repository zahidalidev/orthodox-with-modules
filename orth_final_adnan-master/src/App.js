/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation/Navigation";
import AppTab from "./navigation/AppTab";
import { Provider } from "react-redux";
import store from "./store/store";
import OneSignal from 'react-native-onesignal';

export default class App extends Component {
  
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </React.Fragment>
    );
  }
}
