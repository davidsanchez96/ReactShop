import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
    InteractionManager,
    AsyncStorage,
    Platform
} from 'react-native';

import DetailIntro from '../components/DetailIntro';
import DetailContent from '../components/DetailContent';
import BottomBar from '../components/BottomBar';
import SpecContent from '../components/SpecContent';
import {connect} from "react-redux";
import ReactScroll from "../components/ReactScroll";
import SlideMenu from "../components/SlideMenu";
import {getAddress} from "../../action/mainActions";
import {imageDetail, specsDetail} from "../../action/detailActions";
import {DetailClean, DetailTab, SpecsDetailVisible} from "../../utils/actionTypes";
import {reset} from "../../action/goodsListActions";

const isAndroid = Platform.OS === 'android';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

let scrolly = 0;

class GoodsDetail extends Component {
    static navigationOptions = {
        title: '商品详情',
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {

            this.props.dispatch(getAddress(this.props.navigation.state.params.goodsInfoId));
            this.props.dispatch(imageDetail(this.props.navigation.state.params.goodsInfoId));
            this.props.dispatch(specsDetail(this.props.navigation.state.params.goodsInfoId));
            //查看商品详情
            // msg.emit('goods:detail', this.props.goodsInfoId);
            //
            // msg.emit('browserecord:saveStore', this.props.goodsInfoId);
            // //查询商品图文详情
            // msg.emit("goods:goodsImageDetail", this.props.goodsInfoId);
            // //登录后执行
            // if (window.token) {
            //     msg.emit('goods:followerState', this.props.goodsInfoId);
            //     //购车统计
            //     msg.emit('goods:countShoppingCart');
            // }
        });
    }

    componentWillUnmount() {
        this.props.dispatch({type: DetailClean});
    }

    render() {
        const {dispatch, detailReducer,navigation} = this.props;
        const store = detailReducer;
        this._specVisible = store.get('specVisible');
        this._goodsInfo = store.get('goodsInfo');
        //规格列表
        this._specs = store.get('specs');
        //商品详情规格
        this._spec = store.get('spec');
        //规格状态数组
        this._specStatusArray = store.get('specStatusArray');
        //选中数
        this._chooseNum = store.getIn(['spec', 'chosenNum']);
        //购物车数量
        this._shoppingCartNum = store.get('shoppingCartCount');
        //购物车图片状态
        //this._shoppingGoodsView = store.get('shoppingGoodsView');
        //关注状态
        this._followerState = store.get('followerState');
        //商品规格参数
        this._spuParamItems = store.get('spuParamItems');
        //商品规格参数选中状态
        this._chosenTab = store.get('chosenTab');
        //图文详情
        this._goodsImages = store.get('goodsImages');
        //图文详情网页版
        this._goodsDesc = store.get('goodsDesc');
        //区域
        this._region = store.get('region');
        this._bounces = store.get('bounces');
        this._goodsInfoExist = store.get('goodsInfoExist');
        //添加状态
        this._addStatus = store.get('addStatus');


        return (
            <View style={{flex: 1}}>


                <ScrollView ref="scrollView" keyboardShouldPersistTaps={true} scrollEnabled={false}>
                    <ReactScroll
                        ref="internalScrollView1"
                        onBottomHeight={50}
                        onBottomPush={() => this._handleToggleButton(true)}
                        style={[styles.animateBox]}>
                        <DetailIntro
                            dispatch={dispatch}
                            navigation={navigation}
                            chosenNum={1}
                            store={store}
                            goodsInfo={this.props.goodsInfo}
                            goodsInfoId={this.props.goodsInfoId}
                            setChoose={() => {
                                dispatch({type: SpecsDetailVisible, data: true})
                            }}
                            callbackParent={(newState) => {
                                scrolly = newState
                            }}/>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this._handleToggleButton(true)}
                            style={styles.scrollBtn}>
                            <View style={styles.line}/>
                            <Text
                                allowFontScaling={false}
                                style={styles.btnText}>{isAndroid ? '点击查看图文详情' : '上拉查看图文详情'}</Text>
                        </TouchableOpacity>
                    </ReactScroll>

                    <ReactScroll
                        onTopHeight={50}
                        //android下图片详情可滑动
                        //scrollEnabled={isAndroid ? true : false}
                        scrollEnabled={true}
                        onTopPull={() => this._handleToggleButton(false)}
                        stickyHeaderIndices={[0]}
                        style={[styles.animateBox]}>
                        <View style={styles.detailTabs}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={styles.tabItem}
                                    activeOpacity={0.8}
                                    onPressIn={() => {
                                        dispatch({type: DetailTab, data: {chosenTab: 'goodIntro'}});
                                    }}>
                                    <Text
                                        style={[styles.tabText, this._chosenTab === 'goodIntro' ? {color: '#e63a59'} : {}]}
                                        allowFontScaling={false}>商品介绍</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.tabItem}
                                    activeOpacity={0.8}
                                    onPressIn={() => {
                                        dispatch({type: DetailTab, data: {chosenTab: 'specPara'}});
                                    }}>
                                    <Text
                                        style={[styles.tabText, this._chosenTab === 'specPara' ? {color: '#e63a59'} : {}]}
                                        allowFontScaling={false}>规格参数</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this._handleToggleButton(false)}
                            style={styles.scrollBtn}>
                            <View style={styles.line}/>
                            <Text
                                allowFontScaling={false}
                                style={styles.btnText}>{isAndroid ? '点击返回商品详情' : '下拉返回商品详情'}</Text>
                        </TouchableOpacity>
                        <DetailContent
                            chosenTab={this._chosenTab}
                            spuParams={this._spuParamItems}
                            goodsImages={this._goodsImages}
                            goodsDesc={this._goodsDesc}/>
                    </ReactScroll>
                </ScrollView>

                <BottomBar
                    shoppingCount={this._shoppingCartNum}
                    //goodsView={this._shoppingGoodsView}
                    goodsInfo={this._goodsInfo}
                    follower={this._followerState}
                    storeInfo={store.get('storeInfo')}
                    spec={this._spec}
                    region={this._region}
                    goodsInfoExist={this._goodsInfoExist}
                />
                <SlideMenu
                    visible={this._specVisible}
                    closeMenu={() => {
                        dispatch({type: SpecsDetailVisible, data: false});
                    }}>
                    {
                        <SpecContent
                            dispatch={dispatch}
                            specs={this._specs}
                            goodsInfo={this._goodsInfo}
                            chooseNum={this._chooseNum}
                            spec={this._spec}
                            goodsInfoExist={this._goodsInfoExist}
                            specStatusArray={this._specStatusArray}
                            addStatus={this._addStatus}/>
                    }
                </SlideMenu>
            </View>
        )
    }


    /**
     * 切换按钮触发
     * @param isShow
     * @private
     */
    _handleToggleButton(isShow) {
        const scrollY = isAndroid ? SCREEN_HEIGHT - 135 : SCREEN_HEIGHT - 120;
        let height = isShow ? scrollY : 0;

        if (!isShow) {
            this.refs.internalScrollView1.scrollTo({y: scrolly - SCREEN_HEIGHT + 120, animated: false});
        }
        this.refs.scrollView.scrollTo({y: height, animated: true});
    }


    /**
     * 规格选择
     */
    _handleChooseSpec() {
        //查询规格
        msg.emit('goods:specs', this._goodsInfo.get('spuId'));
        //显示规格界面
        msg.emit('goods:showSpec');
    }
}

const styles = StyleSheet.create({
    animateBox: {
        height: isAndroid ? SCREEN_HEIGHT - 135 : SCREEN_HEIGHT - 120
    },
    detailTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    tabItem: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        fontSize: 16,
        color: '#666'
    },
    scrollBtn: {
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35
    },
    line: {
        position: 'absolute',
        top: 18,
        left: 10,
        width: SCREEN_WIDTH - 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc'
    },
    btnText: {
        color: '#999',
        fontSize: 12,
        paddingHorizontal: isAndroid ? 0 : 10,
        backgroundColor: '#eee'
    }
});

const mapStateToProps = (state) => ({
    detailReducer: state.get('detailReducer')
});
export default connect(mapStateToProps)(GoodsDetail);
