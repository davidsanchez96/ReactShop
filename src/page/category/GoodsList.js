import React, {Component} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    InteractionManager,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import GoodsTop from "../components/GoodsTop";
import {descending, goodsList, reset, searchPara, showBig} from "../../action/goodsListActions";
import FilterBar from "../components/FilterBar";
import NumberControl from "../components/NumberControl";
import Immutable from 'immutable';
import {GoodsListDescending, GoodsListNumber} from "../../utils/actionTypes";
import FilterBox from "../components/FilterBox";
import GoodsDetail from "./GoodsDetail";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
let page = 0;
let searchParam;

class GoodsList extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let header = (
            <GoodsTop
                searchText={params.searchText}
                onBack={params.onBack}
                show={params.show}
                viewType={params.viewType}
                goSearch={params.goSearch}
            />)
        return {header};
    }

    shouldComponentUpdate(nextProps, nextState) {

        return !Immutable.is(Immutable.Map(this.props.goodsListReducer), Immutable.Map(nextProps.goodsListReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
        let {goodsListReducer, dispatch, navigation} = this.props;
        let isTwo = goodsListReducer.isTwo;
        navigation.setParams({
            onBack: this._back,
            searchText: navigation.state.params.searchParam.searchText,
            show: this._show,
            viewType: isTwo,
            goSearch: this._goSearch,
        });
        dispatch(searchPara(navigation.state.params.searchParam));

        // goodsListReducer = this.props.goodsListReducer;
        searchParam = navigation.state.params.searchParam;
        page = 0;
        dispatch(goodsList(page, searchParam));

    }

    componentWillUnmount() {
        this.props.dispatch(reset());
        console.log('componentWillUnmount');
    }

    render() {
        const {goodsListReducer, dispatch} = this.props;
        let loading = goodsListReducer.loading;
        let isTwo = goodsListReducer.isTwo;
        let viewOption = goodsListReducer.viewOption;
        return (
            <View style={styles.container}>
                <FilterBar
                    salesFilter={() => {
                        page = 0;
                        this.props.dispatch(descending(page, searchParam, {
                            filterOpen: false,
                            selectedFilter: 'salesFilter',
                            descending: true
                        }));
                    }}
                    priceFilter={(desc) => {
                        page = 0;
                        this.props.dispatch(descending(page, searchParam, {
                            filterOpen: false,
                            selectedFilter: 'priceFilter',
                            descending: desc
                        }));
                    }}
                    typeFilter={(open) => {
                        this.props.dispatch({type: GoodsListDescending, viewOption: {filterOpen: open}})
                    }}
                    showFilterPanel={() => {
                        this.props.navigation.navigate('FilterPanel', {
                            searchParam: searchParam,
                            callBack: (para) => {
                                InteractionManager.runAfterInteractions(() => {
                                    searchParam = para;
                                    page = 0;
                                    dispatch(goodsList(page, searchParam));
                                    dispatch(searchPara(searchParam));
                                });
                            }
                        },)
                    }}
                    searchParam={goodsListReducer.searchParam}
                    viewOption={goodsListReducer.viewOption}/>
                <FlatList
                    renderItem={this._renderPro}
                    ListEmptyComponent={this._empty}
                    ListFooterComponent={() => this._renderFooter()}
                    key={(isTwo ? 'h' : 'v')}
                    numColumns={isTwo ? 2 : 1}
                    stickySectionHeadersEnabled={true}
                    keyExtractor={item => item.id}
                    removeClippedSubviews={false}
                    data={goodsListReducer.data}
                    onRefresh={() => {
                        page = 0;
                        this.props.dispatch(goodsList(page, searchParam, viewOption));
                    }}
                    refreshing={loading}
                    onEndReached={() => this._onEndReached()}
                    onEndReachedThreshold={0}
                />
                <FilterBox
                    filterClose={() => {
                        this.props.dispatch({type: GoodsListDescending, viewOption: {filterOpen: false}});
                    }}
                    filterFir={() => {
                        page = 0;
                        this.props.dispatch(descending(page, searchParam, {
                            filterOpen: false, selectedFilter: 'typeFilter', filterChecked: '综合'
                        }));
                    }}
                    filterSec={() => {
                        page = 0;
                        this.props.dispatch(descending(page, searchParam, {
                            filterOpen: false, selectedFilter: 'typeFilter', filterChecked: '新品', descending: true
                        }));
                    }}
                    viewOption={goodsListReducer.viewOption}/>
            </View>
        );
    }

    _onEndReached() {
        const {goodsListReducer, dispatch} = this.props;
        let hasMore = goodsListReducer.hasMore;
        let loading = goodsListReducer.loading;
        let loadingMore = goodsListReducer.loadingMore;
        let viewOption = goodsListReducer.viewOption;
        if (hasMore && !loading && !loadingMore) {
            page++;
            dispatch(goodsList(page, searchParam, viewOption));
        }

    }

    _empty = () => {
        const {goodsListReducer} = this.props;
        let loading = goodsListReducer.loading;
        let reloading = goodsListReducer.reloading;
        if (loading || reloading) {
            return null;
        } else {
            return <Text>暂无数据</Text>
        }

    }

    _renderFooter() {
        const {goodsListReducer} = this.props;
        let hasMore = goodsListReducer.hasMore;
        let loading = goodsListReducer.loading;
        if (loading || goodsListReducer.data.length == 0)
            return null;
        if (hasMore) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.footer}>
                    <Text>
                        没有更多数据了
                    </Text>
                </View>

            );
        }
    }

    /**
     * 商品row
     */
    _renderPro = ({item, index}) => {
        const {goodsListReducer} = this.props;
        let isTwo = goodsListReducer.isTwo;
        if (isTwo) {
            return (
                this._renderBigView(item, index)
            )
        } else {
            return this._renderContent(item, index)
        }
    }

    _renderBigView(item, index) {
        return (
            <View style={styles.goodsItem}>
                <TouchableOpacity
                    style={{flex: 1, alignItems: 'center'}}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.props.navigation.navigate('GoodsDetail', {
                            goodsInfoId: item.id,
                            goodsInfo: item
                        })

                    }}>

                    <Image style={styles.proImg}
                           source={{uri: item.image}}/>
                    <View style={{padding: 10}}>
                        <Text style={styles.proTitle} allowFontScaling={false} numberOfLines={2}>{item.name}</Text>
                    </View>
                </TouchableOpacity>

                <View style={{padding: 10, width: SCREEN_WIDTH / 2 - 15}}>


                    <View style={styles.priceStyle}>
                        <Text style={styles.advertPrice}
                              allowFontScaling={false}>
                            {window.token ? `￥${(Math.round(item.preferPrice * 100) / 100).toFixed(2)}` :
                                `￥${(Math.round(item.marketPrice * 100) / 100).toFixed(2)}`}
                        </Text>
                        <Text style={styles.stockStyle}>
                            {window.token ? `库存:${item.stock === null ? 0 : item.stock}` : (item.stock ? '库存有货' : '库存无货')}
                        </Text>
                    </View>
                    <View style={[styles.priceStyle, {flex: 1, justifyContent: 'space-between'}]}>
                        <NumberControl
                            chosenNum={item.clientCartNo}
                            maxNum={item.stock}
                            minNum={0}
                            width={80}
                            height={20}
                            callbackParent={(number) => {
                                item.clientCartNo = number;
                                this.props.dispatch({type: GoodsListNumber, index: index, item: item});
                            }}
                        />
                        <TouchableOpacity
                            style={item.clientCartNo ? styles.shopStyle : styles.shopDisableStyle}
                            activeOpacity={0.8}
                            disabled={item.clientCartNo ? false : true}
                            onPress={() => {
                                msg.emit('goods:addShoppingCart', item.id, item.clientCartNo, true);
                            }}>
                            <Image style={{width: 16, height: 16}}
                                   source={require('../components/img/shop.png')}
                            />
                        </TouchableOpacity>


                    </View>
                    <View style={[styles.priceStyle, {marginTop: 0}]}>
                        {
                            item.operatingType ? <View style={styles.imageStyle}>
                                <Text style={styles.textStyle}>
                                    {item.operatingType}
                                </Text>
                            </View> : null
                        }
                        {
                            item.marktingTags ? item.marktingTags.map((item) => {
                                return (
                                    <View key={item} style={styles.image2Style}>
                                        <Text style={styles.redTextStyle}>
                                            {item}
                                        </Text>
                                    </View>
                                )
                            }) : null
                        }
                    </View>
                </View>
            </View>
        );
    }


    _renderContent(item, index) {
        return (
            <View key={item.key} style={styles.smallView}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => msg.emit('route:goToNext', {
                        sceneName: 'GoodsDetail',
                        goodsInfoId: item.id,
                        goodsInfo: item
                    })}>
                    <Image style={styles.goodsImage}
                           source={{uri: item.image}}/>
                </TouchableOpacity>
                <View style={styles.listInfo}>
                    <TouchableOpacity

                        activeOpacity={0.8}
                        onPress={() => msg.emit('route:goToNext', {
                            sceneName: 'GoodsDetail',
                            goodsInfoId: item.id,
                            goodsInfo: item
                        })}>
                        <Text style={styles.goodsName} allowFontScaling={false} numberOfLines={2}>{item.name}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.goodsPrice} allowFontScaling={false}>&yen;{window.token ?
                                    (Math.round(item.preferPrice * 100) / 100).toFixed(2) :
                                    (Math.round(item.marketPrice * 100) / 100).toFixed(2)}</Text>
                                <Text style={[styles.stockStyle, {marginLeft: 5, flex: 1}]}>
                                    {window.token ? `库存:${item.stock === null ? 0 : item.stock}` : (item.stock ? '库存有货' : '库存无货')}
                                </Text>
                                <NumberControl
                                    chosenNum={item.clientCartNo}
                                    maxNum={item.stock}
                                    minNum={0}
                                    width={60}
                                    height={15}
                                    size={12}
                                    callbackParent={(number) => {
                                        item.clientCartNo = number;
                                        this.props.dispatch({type: GoodsListNumber, index: index, item: item});
                                    }}
                                />
                            </View>
                            <View style={[styles.priceStyle, {marginTop: 0}]}>
                                {
                                    item.operatingType ? <View style={styles.imageStyle}>
                                        <Text style={styles.textStyle}>
                                            {item.operatingType}
                                        </Text>
                                    </View> : null
                                }
                                {
                                    item.marktingTags ? item.marktingTags.map((item) => {
                                        return (
                                            <View key={item} style={styles.image2Style}>
                                                <Text style={styles.redTextStyle}>
                                                    {item}
                                                </Text>
                                            </View>
                                        )
                                    }) : null
                                }
                            </View>
                        </View>
                        <TouchableOpacity
                            style={item.clientCartNo ? [styles.imageStyle, {height: 26, marginLeft: 5, marginTop: 0}] :
                                styles.disableStyle}
                            activeOpacity={0.8}
                            disabled={item.clientCartNo ? false : true}
                            onPress={() => {
                                msg.emit('goods:addShoppingCart', item.id, item.clientCartNo, true);
                            }}>
                            <Text style={{color: 'white', fontSize: 12}}>加入购物车</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </View>
        )
    }

    _back = () => {
        const {goBack} = this.props.navigation;
        const {nav} = this.props;
        let key;
        for (let i = 0; i < nav.routes.length; i++) {
            if (nav.routes[i].routeName === 'Search') {
                key = nav.routes[i].key;
                break;
            }
        }
        goBack(key);

    }
    _goSearch = () => {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.navigate('Search', {
                searchText: this.props.navigation.state.params.searchParam.searchText,
                searchBack: (searchText) => {
                    this.props.dispatch(reset());
                    InteractionManager.runAfterInteractions(() => {
                        searchParam = searchText;
                        page = 0;
                        this.props.dispatch(goodsList(page, searchParam));
                    });

                }
            });
        });
    }
    _show = () => {
        this.props.dispatch(showBig());
    }
}

const mapStateToProps = (state) => ({
    goodsListReducer: state.get('goodsListReducer').toJS(),
    nav: state.get('nav').toJS(),
});
export default connect(mapStateToProps)(GoodsList);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between'
    },
    smallList: {
        flexDirection: 'column'
    },
    goodsItem: {
        width: SCREEN_WIDTH / 2 - 15,
        //paddingTop: 10,
        //overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 3,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    proImg: {
        width: SCREEN_WIDTH / 2 - 17,
        height: SCREEN_WIDTH / 2 - 17,
    },
    blockBox: {
        opacity: 0,
        width: SCREEN_WIDTH / 2 - 15,
        height: SCREEN_WIDTH / 2 + 5,
        position: 'absolute',
        top: -(SCREEN_WIDTH / 2 + 5),
        left: 0
    },
    proTitle: {
        fontSize: 13,
        height: 32,
    },
    proPrice: {
        fontSize: 15,
        color: '#e63a59'
    },
    smallView: {
        width: SCREEN_WIDTH,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ddd',
        padding: 10
    },
    goodsImage: {
        //width: 100,
        //height: 100,
        width: SCREEN_WIDTH / 4 - 5,
        height: SCREEN_WIDTH / 4 - 5,
        marginRight: 20
    },
    listInfo: {
        flex: 1
    },
    goodsName: {
        fontSize: 13,
        marginBottom: 10
    },
    goodsPrice: {
        fontSize: 15,
        color: '#e63a59',
    },
    praiseInfo: {
        fontSize: 13,
        color: '#999'
    },
    swiperBtn: {
        width: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceStyle: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    advertPrice: {
        fontSize: 16,
        fontWeight: '400',
        color: '#f00101',
        flex: 1
    },
    stockStyle: {
        color: '#696969',
        fontSize: 10,
    },
    textStyle: {
        backgroundColor: '#00000000',
        fontSize: 10,
        color: 'white',
    },
    redTextStyle: {
        backgroundColor: '#00000000',
        fontSize: 10,
        color: '#f00101',
    },
    imageStyle: {
        marginTop: 5,
        backgroundColor: '#f00101',
        borderRadius: 3,
        borderColor: '#f00101',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 1,
        paddingBottom: 1
    },
    disableStyle: {
        backgroundColor: '#afafaf',
        borderRadius: 3,
        borderColor: '#afafaf',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 1,
        paddingBottom: 1,
        height: 26,
        marginLeft: 5,
    },
    image2Style: {
        marginTop: 5,
        borderColor: '#f00101',
        borderWidth: 1,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 1,
        paddingBottom: 1
    },
    shopStyle: {
        backgroundColor: '#f00101',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    shopDisableStyle: {
        backgroundColor: '#afafaf',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});