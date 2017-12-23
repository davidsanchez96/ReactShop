import React, {Component} from 'react';

import {StyleSheet, Text, TextInput, View} from 'react-native';

export default class DateInput extends Component {

  render() {
    return (
      <View style={[styles.view, this.props.style]}>
          <Text style={[styles.text, this.props.textStyle]} allowFontScaling={false}>
            {this.props.text}
          </Text>
          <TextInput
            value={this.props.value}
            style={[styles.input, this.props.inputStyle]}
            textAlign={'end'}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  view: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 26,
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
  },
});

