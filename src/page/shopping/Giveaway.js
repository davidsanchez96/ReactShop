/**
 * 修改赠品页
 */


'use strict';

import React, {Component} from 'react';
import {InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {connect} from "react-redux";
import {giveawayList} from "../../action/giveawayActions";
import GoodsItem from "../components/GoodsItem";
import {ShopListGiveaway} from "../../utils/actionTypes";


class Giveaway extends Component {
    static navigationOptions = {
        title: '修改赠品',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.giveawayReducer), Immutable.Map(nextProps.giveawayReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        const {navigation, dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            //查询赠品
            dispatch(giveawayList(navigation.state.params.fullBuyPresentMarketingId, navigation.state.params.store_index, navigation.state.params.marketing_index));
            // msg.emit('cart:queryPresents', this.props.fullBuyPresentMarketingId,this.props.store_index,this.props.marketing_index);
        });
    }

    render() {
        //是不是正在loading
        const {giveawayReducer, navigation, dispatch} = this.props;
        const loading = giveawayReducer.get('loading');
        //选中
        const presentCheckedList = giveawayReducer.get('presentCheckedList');
        const presentList = giveawayReducer.get('presentList');
        //满赠选中规则
        this._presentMode = giveawayReducer.get('presentMode');


        return (
            <View
                style={[{flex: 1, backgroundColor: '#eee'}]}
            >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => {
                                dispatch(giveawayList(navigation.state.params.fullBuyPresentMarketingId, navigation.state.params.store_index, navigation.state.params.marketing_index));
                            }}
                        />
                    }
                >
                    {this._renderContent(presentList)}
                </ScrollView>

                <View style={styles.settlement}>
                    <View style={styles.countText}>
                        <Text>{`已选中${presentCheckedList.count() || 0}件赠品`}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.settlementBtn}
                        activeOpacity={0.8}
                        onPress={() => this._sendPresentGoodsInfo(giveawayReducer.get('store_index'), giveawayReducer.get('marketing_index'), giveawayReducer.get('presentCheckedList'))}>
                        <Text style={{fontSize: 18, color: '#fff'}} allowFontScaling={false}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    /**
     * 赠品列表
     * @returns {*}
     * @private
     */
    _renderContent(presents) {
        return presents.map((val, key) => {
            return (<GoodsItem key={key} goods={val} goodsIndex={key} presentMode={this._presentMode}/>);
        });
    }


    /**
     * 传递赠品集合以及下标地址
     * @param store_index
     * @param marketing_index
     * @param product_index
     * @param presentCheckedList
     * @private
     */
    _sendPresentGoodsInfo(store_index, marketing_index, presentCheckedList) {
        this.props.navigation.goBack();
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch({
                type: ShopListGiveaway,
                store_index: store_index,
                marketing_index: marketing_index,
                presentCheckedList: presentCheckedList
            });
        });
        // msg.emit('cart:setSelectedPresents', store_index, marketing_index, presentCheckedList);
        // msg.emit('route:backToLast');
    }


}


//noinspection JSDuplicatedDeclaration
const styles = StyleSheet.create({
    check: {
        marginRight: 20,
        width: 20,
        height: 20
    },
    settlement: {
        height: 60,
        flexDirection: 'row',
        marginBottom: 0
    },
    settlementInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#333'
    },
    settlementBtn: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
    },
    totalPrice: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5
    },
    editBar: {
        backgroundColor: '#eaedf1',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    editBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginLeft: 10,
        backgroundColor: '#fff'
    },
    rightOps: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        height: 60,
        right: 20,
        top: 20
    },
    countText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});
const mapStateToProps = (state) => ({
    giveawayReducer: state.get('giveawayReducer')
});
export default connect(mapStateToProps)(Giveaway);
