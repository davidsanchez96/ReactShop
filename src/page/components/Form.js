/**
 * Form
 */
import React, {Component} from 'react';

import {View} from 'react-native';



/**
 * Usage:
 */
export default class Form extends Component {

  render() {
    return (
      <View style={this.props.style}>
        {this.props.children}
      </View>
    )
  }
}



