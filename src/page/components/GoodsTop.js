'use strict';

import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform
} from 'react-native';


const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const isAndroid = Platform.OS === 'android';


export default class GoodsTop extends Component {
    static defaultProps = {
        validSearchText: '',
        viewType: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            validSearchText: '',
            viewType: '',
        }
    }

    componentDidMount() {
        this.setState(
            {viewType: this.props.viewType}
        );
    }

    render() {


        return (
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backBtn} activeOpacity={0.8} onPress={() => this.props.onBack()}>
                    <Image style={styles.backIcon} source={require('./img/left.png')}/>
                </TouchableOpacity>
                <View
                    style={styles.searchBox}>
                    <Image
                        style={styles.searchIcon} source={require('./img/search.png')}/>
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.goSearch()}>
                        <TextInput
                            style={styles.input}
                            value={this.props.searchText}
                            editable={false}
                            placeholder={'搜索商品'}
                            pointerEvents="none"
                            Value={this.props.searchText}
                            allowFontScaling={false}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.menuBtn} activeOpacity={0.8} onPress={() => {
                    this.setState(previousState => {
                        return {viewType: !previousState.viewType};
                    });
                    this.props.show();
                }}>
                    <Image
                        style={styles.menuIcon}
                        source={this.state.viewType ? require('./img/menu.png') : require('./img/secMenu.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    _showSearchPage = () => {
        // if (__DEV__) {
        //   console.log('***** QMSearch _showSearchPage is called');
        // }
        // const topic = this.props.topic;
        // msg.emit(topic || 'searchPage:setVisible', true, this.props.searchText);
        const {navigate} = this.props.navigation;
        navigate('Search', {searchText: this.props.searchText});
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

