import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class DetailContent extends Component {
  render() {
    if (this.props.chosenTab == 'goodIntro') {
      return (
        <View>
          {
            this.props.goodsImages.map((v, i) => {
              return (
                <Image style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH * v.get('ratio')}} source={{uri: v.get('url')}} key={i}/>
              )
            })
          }
        </View>
      )
    } else if (this.props.chosenTab == 'specPara') {
      if(this.props.spuParams.count() > 0) {
        return (
          <View style={{borderTopWidth: 1, borderTopColor: '#000'}}>
            <View style={styles.table}>
              <View style={styles.caption}><Text style={styles.captionText}>详细参数</Text></View>
              {
                this.props.spuParams.map((v, i) => {
                  if(v.get('value')){
                    return(
                      <View style={styles.tr} key={i}>
                        <View style={styles.th}><Text style={styles.tdText}>{v.getIn(['goodsTypeParam', 'name'])}</Text></View>
                        <View style={styles.td}><Text style={styles.tdText}>{v.get('value')}</Text></View>
                      </View>
                    )
                  }
                })
              }
            </View>
          </View>
        )
      }else{
        return null;
      }
    }
   }
}


const styles = StyleSheet.create({
  detailImg: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  table: {
    backgroundColor: '#f5fafe'
  },
  caption: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 5
  },
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },
  th: {
    width: 100,
    padding: 5
  },
  td: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#000',
    padding: 5
  },
  captionText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  tdText: {
    fontSize: 14
  },
  csItem: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30
  },
  csText: {
    lineHeight: 20
  },

  webView: {
    flex:1,
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
    backgroundColor: 'rgba(245,247,250,0.99)'
  }
});

