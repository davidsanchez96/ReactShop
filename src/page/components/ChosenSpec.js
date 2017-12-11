import React, {Component} from 'react';
import {Image, PixelRatio, StyleSheet, Text, View} from 'react-native';
import Touch from "./Touch";


export default class ChosenSpec extends Component {
  render() {
    return (
      <Touch style={styles.box} onPress={this.props.setChoose}>
        <View style={styles.rowItem}>
          <Text style={[styles.label, {lineHeight: 18}]} allowFontScaling={false}>已选</Text>
          <View style={styles.rowCont}>
            <Text style={styles.contText} allowFontScaling={false}>
                <Text allowFontScaling={false}>{this.props.chosenSpec}</Text>
                <Text allowFontScaling={false}>&nbsp;&nbsp;{this.props.chosenNum}个</Text>
            </Text>
          </View>
        </View>
        <Image style={styles.arrow} source={require('./img/right.png')}/>
      </Touch>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#eee',
    padding: 20,
    paddingBottom: 10
  },
  rowItem: {
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10
  },
  label: {
    color: '#666',
    //fontSize: 16,
    marginRight: 10,
    lineHeight: 20
  },
  rowCont: {
    flex: 1
  },
  contText: {
    //fontSize: 16,
    lineHeight: 20
  },
  arrow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 18
  }
});