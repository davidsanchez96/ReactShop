'use strict';

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';


export default class SearchBar extends Component {


    render() {
        if (__DEV__) {
           // console.log('******* SearchBar button render is called====>', JSON.stringify(this.props, null, 2));
        }

        return (
            <View
                style={[styles.searchBox, this.props.style]}>
                <Image
                    style={styles.searchIcon} source={require('./img/search.png')}/>
                <TouchableOpacity style={styles.button}
                                  onPress={() => {
                                      const {navigate} = this.props.navigation;
                                      navigate('Search');
                                  }}>
                    <Text
                        ref={'input'}
                        style={styles.input}
                        placeholder={this.props.placeHolder}
                        clearButtonMode='while-editing'
                        value={this.props.searchText}
                        editable={true}
                        onChangeText={(search) => this.setProps({searchText: search})}
                        allowFontScaling={false}>
                        {this.props.searchText || this.props.placeHolder}
                    </Text>
                </TouchableOpacity>
                <View style={styles.searchPage}/>
            </View>
        )
            ;
    }

    _showSearchPage() {
        // if (__DEV__) {
        //   console.log('***** QMSearch _showSearchPage is called');
        // }
        // const topic = this.props.topic;
        // msg.emit(topic || 'searchPage:setVisible', true, this.props.searchText);
        const {navigate} = this.props.navigation;
        navigate('Search');
    }
}


const styles = StyleSheet.create({
    searchBox: {
        flex: 1,
        backgroundColor: '#edefec',
        borderRadius: 5,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    input: {
        fontSize: 14,
        color: 'grey',
    }
});

