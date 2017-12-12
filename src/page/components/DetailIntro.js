import React, {Component} from 'react';
import {
    View,
    ScrollView,
    ListView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
    PanResponder,
    Platform
} from 'react-native';
import NativeModules from 'NativeModules';
import {fromJS} from 'immutable';

import GoodInfo from './GoodInfo';
import Coupon from './Coupon';
import Promotion from './Promotion';
import ChosenSpec from './ChosenSpec';
import Delivery from './Delivery';
import Comments from './Comments';
import StoreInfo from './StoreInfo';
import LoopPic from "./LoopPic";
import Loading from "./Loading";

const UIManager = NativeModules.UIManager;
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

export default class DetailIntro extends Component {
    render() {
        const store = this.props.store;
        this._loading = store.get('loading');
        //图片列表
        this._imageList = store.get('imageList');
        //商品详情信息
        this._product = store.get('goodsInfo');
        //规格展示
        this._specText = store.getIn(['spec', 'specText']);
        //评价列表
        this._commentList = store.get('commentList');
        //促销列表
        this._marketings = store.get('marketings');
        //商品组合信息
        this._groupList = store.get('groupList');
        //促销展示状态
        this._promotionVisible = store.get('promotionVisible');
        //选中地区
        this._region = store.get('region');
        //选中数量
        this._choosenNum = store.getIn(['spec', 'chosenNum']);
        //店铺信息
        this._storeInfo = store.get('storeInfo');
        //商品服务
        this._goodsSupports = store.get('goodsSupports');
        //列表传值过来的商品详情
        //这个逻辑只为体验
        this._goodsInfo = fromJS(this.props.goodsInfo) || this._imageList;
        //猜你喜欢
        this._guessProductLikeVisible = store.get('guessProductLikeVisible');
        this._guessProductLikeBarVisible = store.get('guessProductLikeBarVisible');
        //优惠券
        this._coupons = store.get('coupons');
        //折扣
        this._bounces = store.get('bounces');
        //货品查询状态
        this._goodsInfoExist = store.get('goodsInfoExist');

        return (
            <View style={{flex: 1}}>
                {this._renderContent()}
            </View>
        )
    }


    /**
     * 渲染内容
     */
    _renderContent() {
        if (this._loading && !this._goodsInfo && this._goodsInfoExist) {
            return (
                <Loading/>
            )
        } else {
            return (
                <View>
                    {this._renderContentDetail()}
                </View>
            )
        }
    }


    _renderContentDetail() {
        return (
            <View style={styles.container} onLayout={(e)=>this.onLayout(e)}>
                {/*商品图片*/}
                <LoopPic imgList={this._imageList || (this._goodsInfo && this._goodsInfo.get('imageList'))}
                         goodsInfoExist={this._goodsInfoExist}/>
                {/*商品信息*/}
                <View style={styles.wrapper}>
                    <GoodInfo
                        goodName={this._product.get('name') || (this._goodsInfo && this._goodsInfo.get('name'))}
                        description={this._product.get('subtitle') || (this.goodsInfo && this._goodsInfo.get('subtitle'))}
                        price={
                            window.token ? (
                                ((typeof this._product.get('warePrice') == 'number' && this._product.get('warePrice').toFixed(2))
                                    || (typeof this._product.get('preferPrice') == 'number' && this._product.get('preferPrice').toFixed(2)))
                                || (this._goodsInfo && typeof this._goodsInfo.get('preferPrice') == 'number' && this._goodsInfo.get('preferPrice').toFixed(2)))
                                : typeof this._product.get('marketPrice') == 'number' && (Math.round(this._product.get('marketPrice') * 100) / 100).toFixed(2)
                        }
                        goodsInfoExist={this._goodsInfoExist}
                    />

                    {/*领券，和促销一样判断一下没有就不显示了 */}
                    {
                        (this._coupons.count() > 0 && this._goodsInfoExist) ?
                            <Coupon coupon={this._coupons}
                                    goodsInfoId={this._product.get('id')}
                            /> : null
                    }

                    {/*商品促销*/}
                    {
                        ((this._groupList.count() > 0 || this._marketings.count() > 0) && this._goodsInfoExist) ?
                            <Promotion promotion={this._marketings}
                                       groups={this._groupList}
                                       promotionVisible={this._promotionVisible}/>
                            : null
                    }

                    {/*选择规格,已选中规格*/}
                    <ChosenSpec
                        chosenSpec={this._specText}
                        chosenNum={this._choosenNum}
                        setChoose={this.props.setChoose}/>

                    {/*地址服务*/}
                    <Delivery
                        dispatch={this.props.dispatch}
                        navigation={this.props.navigation}
                        region={this._region}
                        product={this._product}
                        storeInfo={this._storeInfo}
                        goodsSupports={this._goodsSupports}
                        goodsInfoExist={this._goodsInfoExist}
                    />

                    {/*商品评价*/}
                    <Comments product={this._product}
                              comments={this._commentList}/>
                    {/*店铺信息*/}
                    {
                        this._renderShopInfo()
                    }

                </View>
                <View style={styles.bottomView}>
                </View>
            </View>
        )
    }

    /**
     * 将组件高度回传
     */
    onLayout(e) {
        let height = e.nativeEvent.layout.height;
        this.props.callbackParent(height);
    }

    /**
     * 展示店铺信息
     */
    _renderShopInfo() {
        if (this._product.get('thirdType') == 1) {
            return (<StoreInfo storeInfo={this._storeInfo}/>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD'
    },
    wrapper: {
        backgroundColor: '#fff',
        marginTop: 15
    },
    detailNav: {
        flexDirection: 'row',
        padding: 20,
        marginTop: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navArrow: {
        width: 20,
        height: 10,
        marginRight: 5
    },
    recommendContainer: {
        flex: 1,
        //paddingTop: 20,
        marginTop: 15,
        backgroundColor: '#fff'
    },
    recommendText: {
        flex: 1,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        color: '#666',
        //fontSize: 16
    },

    bottomView: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'red'
    }
});



