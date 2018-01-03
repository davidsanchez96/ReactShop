'use strict'

import React, {Component} from 'react';
import {Dimensions, Image, InteractionManager, StyleSheet, Text, RefreshControl, ScrollView, View} from 'react-native';
import Immutable from "immutable";
import {connect} from "react-redux";
import {couponList} from "../../action/couponActions";
import CouponItem from "../components/CouponItem";
import CouponDetail from "./CouponDetail";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


class Coupon extends Component {
    static navigationOptions = {
        title: '我的优惠券',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.couponReducer), Immutable.Map(nextProps.couponReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }


    componentDidMount() {
        //initialize
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(couponList())
        });
    }


    render() {
        const {couponReducer, dispatch} = this.props;
        const isLoading = couponReducer.get('loading');

        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                dispatch(couponList())
                            }}
                        />
                    }
                >
                    {this._coupons(couponReducer)}
                </ScrollView>


            </View>
        );
    }


    _coupons(couponReducer) {
        const data = couponReducer.getIn(['coupons', 'data']);
        const isLoading = couponReducer.get('loading');
        if (isLoading && data.isEmpty()) {
            return null;
        }
        else if (data.isEmpty()) {
            return (
                <View style={styles.emptyContainer}>
                    <Image style={[styles.emptyIcon]} source={require('../components/img/list_empty.png')}/>
                    <Text style={[styles.grey, {fontSize: 16}]} allowFontScaling={false}>暂无可用的优惠劵</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.couponView}>
                    {this._listCoupons(data, true)}
                </View>
            )
        }
    }

    _listCoupons(data, status) {
        if (__DEV__) {
            console.log("coupon is ", data);
        }
        return data.map((d, k) => {
            return (
                <CouponItem
                    key={k}
                    status={status}
                    name={d.get('shopName')}
                    price={d.get('price')}
                    startTime={d.get('startTime')}
                    endTime={d.get('endTime')}
                    couponRuleType={d.get('couponRuleType')}
                    fullPrice={d.get('fullPrice')}
                    handlePress={() => {
                        this.props.navigation.navigate('CouponDetail', {
                            couponRuleType: d.get('couponRuleType'),
                            remark: d.get('remark')
                        })
                    }}
                />
            )
        });
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    couponView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    grey: {
        fontSize: 14,
        color: '#666',
        alignItems: 'center'
    },
    emptyIcon: {
        width: 110,
        height: 110,
        marginBottom: 50,
    },
    emptyContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => ({
    couponReducer: state.get('couponReducer')
});
export default connect(mapStateToProps)(Coupon);
