/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux';
import App from './src/page/App';
import store from './src/store/store';

export default class First extends Component {
  render() {
      return (
          <Provider store={store()}>
            <App/>
          </Provider>
      );
  }
}


AppRegistry.registerComponent('First', () => First);
