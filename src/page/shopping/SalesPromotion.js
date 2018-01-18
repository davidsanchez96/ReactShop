'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ListView,
    InteractionManager,
    Dimensions,
} from 'react-native';

import {List, fromJS, toJS, default as Immutable} from 'immutable';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
import {connect} from "react-redux";
import Tag from "../components/Tag";
import Loading from "../components/Loading";
import {salesPromotionList} from "../../action/salesPromotionActions";
import {SalesPromotionSelect} from "../../utils/actionTypes";
import {shopListPromotion} from "../../action/shopListActions";


class SalesPromotion extends Component {
    static navigationOptions = {
        title: '选择促销信息',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.salesPromotionReducer), Immutable.Map(nextProps.salesPromotionReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }


    componentDidMount() {
        const { navigation, dispatch} = this.props;
        dispatch(salesPromotionList(navigation.state.params.goodsInfoId));
        // msg.emit('marketing:marketingList', this.props.goodsInfoId);
    }

    render() {
        const {salesPromotionReducer, navigation, dispatch} = this.props;
        const marketingList = salesPromotionReducer.get("marketingList");
        const loading = salesPromotionReducer.get("loading");
        //是否展示不使用优惠按钮
        let isShowNotUse = navigation.state.params.marketingId == '' ? false : true;
        //展示不使用优惠按钮内容
        let selectContent = (
            <TouchableOpacity style={styles.promotionCon} activeOpacity={0.8}
                              onPress={() => !salesPromotionReducer.get('checked') ? this._changeMarketing('') : null}>
                <View style={styles.promotionDet}>
                    <Tag tag={"选择"}/>
                    <Text style={styles.grey}
                          allowFontScaling={false}>不使用活动优惠</Text>
                </View>
                {
                    navigation.state.params.marketingId == '' ?
                        <Image style={styles.checkedImg} source={require('../components/img/filter_checked.png')}/> : null
                }
            </TouchableOpacity>
        );

        return (
            <View style={{backgroundColor: '#eee', flex: 1}}>
                <Loading visible={loading}/>

                <ScrollView automaticallyAdjustContentInsets={false}>
                    {
                        marketingList.map((v, i) => {

                            //如果是团购,选择了团购,则设置np_order表中的active_id为空
                            //如果等于抢购,则不展示任何选择信息 ,11是抢购
                            if (v.get('codexType') == '11') {
                                isShowNotUse = false;
                            }

                            return (
                                <View key={i}>
                                    {
                                        // v.get('codexType') != "10" 原来有这个判断 如果等于抢购,则不展示任何选择信息
                                        v.get('codexType') != "15" && v.get('codexType') != "12" && v.get('codexType') != "10" && v.get('codexType') != "11" ?
                                            <TouchableOpacity style={styles.promotionCon} activeOpacity={0.8}
                                                              onPress={() => !salesPromotionReducer.get('checked') ? this._changeMarketing(v.get('marketingId')) : null}>
                                                <View style={styles.promotionDet}>
                                                    <Tag tag={v.get("tag")}/>
                                                    <Text style={styles.grey}
                                                          allowFontScaling={false}>{v.get("marketingName")}</Text>
                                                </View>
                                                {
                                                    navigation.state.params.marketingId == v.get('marketingId') ?
                                                        <Image style={styles.checkedImg}
                                                               source={require('../components/img/filter_checked.png')}/> : null
                                                }
                                            </TouchableOpacity>
                                            : null
                                    }
                                </View>
                            )
                        })
                    }
                    {(!marketingList.isEmpty() || isShowNotUse == true) ? selectContent : null}
                    {
                        (marketingList.isEmpty() && isShowNotUse == false) ?
                            (
                                <View style={{marginTop: 20}}>
                                    <Text style={{textAlign: 'center', color: '#666'}}
                                          allowFontScaling={false}>该商品没有参加促销</Text>
                                </View>
                            ) : null
                    }
                </ScrollView>


            </View>
        )
    }

    _changeMarketing(activeId) {
        this.props.dispatch({type:SalesPromotionSelect});
        this.props.navigation.goBack();
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(shopListPromotion(this.props.navigation.state.params.shoppingCartId,activeId));
        });
        // msg.emit('marketing:chooseMarketing', activeId, this.props.shoppingCartId);
    }

}

const styles = StyleSheet.create({
    promotionCon: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    promotionDet: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    grey: {
        color: '#666',
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
        paddingRight: 30
    },
    checkedImg: {
        width: 19,
        height: 15
    }


});
const mapStateToProps = (state) => ({
    salesPromotionReducer: state.get('salesPromotionReducer')
});
export default connect(mapStateToProps)(SalesPromotion);
