'use strict';

import React, {Component} from 'react';
import {
    View, StyleSheet, AsyncStorage, Dimensions, Text, Platform, StatusBarIOS,
    FlatList,
} from 'react-native';

import SearchTop from "./SearchTop";
import SearchHistory from "./SearchHistory";
import SearchSuggest from "./SearchSuggest";
import {connect} from 'react-redux';
import Loading from "./Loading";
import {suggestion} from "../../action/searchActions";
import {NavigationActions} from 'react-navigation';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

//最大显示的搜索关键字历史数目
var MAX_SHOW_KEY_WORD = 10;
//最大保存的搜索关键字历史数目
var MAX_STORE_KEY_WORD = 30;
let inputText;
class Search extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let header = (
            <SearchTop
                callbackParent={(newState) => params.callbackParent(newState)}
                onAddSearch={params.onAddSearch}
                goSearchList={params.goSearchList}
                searchText={params.searchText}
                onBack={params.onBack}
                ref={(searchBar) => inputText = searchBar}
            />)
        return {header};
    }

    constructor(props) {
        super(props);
        this.state = {
            //查询字段
            searchText: '',
            //查询数据源
            dataSource: [],
        }
    }


    componentDidMount() {
        this._fetchCache();
        this.setState({searchText: this.props.searchText});


        this.props.navigation.setParams({
            callbackParent: this._onChildChanged,
            onAddSearch: this._handleOnAddSearch,
            goSearchList: this._handleGoGoodsList,
            searchText: this.props.searchText,
            onBack: this._back,
            searchBar: this.props._searchBar,
        })
    }


    render() {
        if (__DEV__) {
            console.log("searchPage render", this.state)
        }

        if (Platform.OS === 'ios' && this.props.statusBarStyle != undefined) {
            StatusBarIOS.setStyle(this.props.statusBarStyle);
        }
        const {searchReducer} = this.props;
        let loading = searchReducer.loading;
        let data = searchReducer.data;
        return (
            <View style={styles.container}>
                {/*查询bar*/}
                {/*<SearchTop callbackParent={(newState) => this.onChildChanged(newState)}*/}
                {/*onAddSearch={this._handleOnAddSearch}*/}
                {/*goSearchList={this._handleGoGoodsList}*/}
                {/*onBack={this._onBack}*/}
                {/*searchText={this.props.searchText}*/}
                {/*ref={(searchBar) => this._searchBar = searchBar}*/}
                {/*/>*/}
                {
                    this.state.searchText
                        ? (loading ? <Loading/> :
                            <FlatList
                                data={data}
                                renderItem={({item}) => {
                                    <TouchableOpacity
                                        style={styles.suggestion}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                        }
                                        }>
                                        <Text style={styles.keywordText}>{item}</Text>
                                    </TouchableOpacity>
                                }
                                }
                            />
                        )
                        :
                        <SearchHistory
                            searchText={this.state.searchText}
                            onClearData={() => {
                                console.log('--->onClearDataCallback----');
                                inputText.blur();
                            }}
                            isLoaded={this.state.isLoaded}
                            dataSource={this.state.dataSource}
                            goSearchList={(v)=>this._handleGoGoodsList(v)}
                            onClearSearch={()=>this._handleClearSearchCache()}
                        />
                }
            </View>
        )
    }


    _onChildChanged = (newState) => {
        this.setState({
            searchText: newState
        });

        this.props.dispatch(suggestion(newState));

    }

    _back = ()=> {
        const topic = this.props.topic || 'searchPage:setVisible';
        // msg.emit(topic, false);
        // if (Platform.OS === 'ios' && this.props.statusBarStyle != undefined) {
        //     StatusBarIOS.setStyle('light-content');
        // }
        const {goBack} = this.props.navigation;
        goBack();

    }


    /**
     * 查询历史记录
     */
    async _fetchCache() {
        try {
            var history = await AsyncStorage.getItem('@hkshop_app:history');
            if (__DEV__) {
                console.log("search-page get search history ", JSON.stringify(history));
            }
            this.setState({
                isLoaded: true,
                dataSource: history != null ? history.split('*#*').slice(0, MAX_SHOW_KEY_WORD) : []
            });
        } catch (err) {
            if (__DEV__) {
                console.log("search-page get search history error", JSON.stringify(err));
            }
        }
    }


    /**
     * 添加历史记录,如果存在相同的记录,则删除已有的记录再添加新的
     */
    async _handleOnAddSearch(searchText) {

        if (!searchText || searchText === '') {
            return;
        }

        if (__DEV__) {
            console.log("search-page _handleOnAddSearch searchText ", searchText);
        }

        var searchHistory = await AsyncStorage.getItem('@hkshop_app:history');

        if (__DEV__) {
            console.log("search-page _handleOnAddSearch histore ", JSON.stringify(searchHistory));
        }

        var storeArray = deleteArrayByValue(searchHistory ? searchHistory.split('*#*') : [], searchText);

        storeArray.unshift(searchText);
        var dataSource = storeArray.slice(0, MAX_SHOW_KEY_WORD);

        storeArray = storeArray.slice(0, MAX_STORE_KEY_WORD);

        this.setState({
            dataSource: dataSource
        }, await AsyncStorage.setItem('@hkshop_app:history', storeArray.join('*#*')));
    }


    /**
     * 清空历史记录
     */
    async _handleClearSearchCache() {
        try {
            var history = await AsyncStorage.removeItem('@hkshop_app:history');
            if (history == null) {
                this.setState({
                    dataSource: []
                });
            }
        } catch (err) {
        }
    }


    /**
     * 商品查询
     */
    _handleGoGoodsList=(searchText)=> {
        // this._onBack();
        var nextSceneName = this.props.resultSceneName || 'GoodsList';
        if (__DEV__) {
            console.log('Searchpage _handleGoGoodsList state====>', JSON.stringify(this.state, null, 2));
        }

        this._handleOnAddSearch(searchText);

        // msg.emit('route:popAndReplaceByName', {
        //     sceneName: nextSceneName,
        //     searchParam: {searchText: searchText || this.state.searchText}
        // }, nextSceneName);

        const {navigate} = this.props.navigation;
        navigate('GoodsList', { searchParam: {searchText: searchText || this.state.searchText} });
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        //paddingTop: 20,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: HEIGHT,
        width: WIDTH,
        paddingBottom: 50
    },
    suggestion: {
        backgroundColor: '#fff',
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    keywordText: {
        color: '#666'
    },
    countText: {
        color: '#666',
        fontSize: 12
    },
});


/**
 * 删除数组中得某个元素,并返回新的数组
 * @param array
 * @param value
 */
function deleteArrayByValue(array, value) {
    var pos = -1;
    for (var index = 0; index < array.length; index++) {
        if (array[index] === value) {
            pos = index;
            break;
        }
    }

    if (pos === -1) {
        return array;
    }

    return array.slice(0, pos).concat(array.slice(pos + 1, array.length));
}

const mapStateToProps = (state) => ({
    searchReducer: state.searchReducer,

});
export default connect(mapStateToProps)(Search);
