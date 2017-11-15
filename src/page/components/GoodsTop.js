'use strict';

import React, {Component} from 'react';
import {
    View,
    ListView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';


const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const isAndroid = Platform.OS === 'android';


export default class GoodsTop extends Component {
    static defaultProps = {
        validSearchText: '',
        viewType: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            validSearchText: ''
        }
    }


    render() {


        return (
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backBtn} activeOpacity={0.8} onPress={()=>this.props.onBack()}>
                    <Image style={styles.backIcon} source={require('./img/left.png')}/>
                </TouchableOpacity>
                <View
                    style={styles.searchBox}>
                    <Image
                        style={styles.searchIcon} source={require('./img/search.png')}/>
                    <TouchableOpacity style={styles.button} onPress={this._showSearchPage}>
                        <Text
                            ref={'input'}
                            style={styles.input}
                            clearButtonMode='while-editing'
                            value={this.props.searchText}
                            editable={true}
                            onChangeText={(search) => this.setProps({searchText: search})}
                            allowFontScaling={false}>
                            {this.props.searchText || '搜索商品'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.menuBtn} activeOpacity={0.8} onPress={this.props.changeView}>
                    <Image
                        style={styles.menuIcon}
                        source={this.props.viewType ? require('./img/menu.png') : require('./img/secMenu.png')}/>
                </TouchableOpacity>
            </View>
        )
    }


}

var styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: isAndroid ? 10 : 25
    },
    backBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 20
    },
    menuBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 5
    },
    backIcon: {
        width: 12,
        height: 22
    },
    menuIcon: {
        width: 30,
        height: 30
    },

    searchBox: {
        flex: 1,
        borderRadius: 5,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
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
    },
    searchPage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flex: 1,
    }
});

