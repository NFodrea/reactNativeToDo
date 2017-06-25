/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Main from "./src/main";

export default class AwesomeToDo extends Component {
  render() {
    return (
      <Main/>
    );
  }
}



AppRegistry.registerComponent('AwesomeToDo', () => AwesomeToDo);
