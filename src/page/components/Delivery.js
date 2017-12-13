import React, {Component} from 'react';
import {
    Image, PixelRatio, InteractionManager,
    StyleSheet, Text, TouchableOpacity, View,
    AsyncStorage,
} from 'react-native';
import {Address, DetailStock} from "../../utils/actionTypes";
import {goodsStock} from "../../action/detailActions";

export default class Delivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stockVisible: true
        };
    }


    render() {
        //库存状态
        const stockStatus = this.props.product.get('stock') > 0 && this.props.product.get('addedStatus') == 1 && this.props.goodsInfoExist;


        return (
            <View style={styles.box}>
                <TouchableOpacity style={styles.rowItem} activeOpacity={1} onPress={() => this._handleToRegion()}>
                    <Text style={styles.label}>送至</Text>
                    <View style={styles.rowCont}>
                        <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
                            <Text style={styles.addressItem} allowFontScaling={false}>
                                {
                                    (this.props.region.get('province') == this.props.region.get('city') && this.props.region.get('city') == this.props.region.get('district')) ?
                                        this.props.region.get('district') :
                                        this.props.region.get('province') + ' '
                                        + this.props.region.get('city') + ' '
                                        + this.props.region.get('district')
                                }
                            </Text>
                            <Image style={{width: 16, height: 16, marginTop: 3}} source={require('./img/address.png')}/>
                        </View>
                        <Text style={{color: '#e63a59'}} allowFontScaling={false}>{stockStatus ? '现货' : '无货'}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.rowItem}>
                    <Text style={styles.label} allowFontScaling={false}>服务</Text>
                    <View style={styles.rowCont}>
                        <Text style={styles.contText} allowFontScaling={false}>{this.props.goodsInfoExist &&
                        ('由' + (this.props.storeInfo.get('storeName') || this.props.product.get('basicName') || '') + '直接销售和发货，并提供售后服务')}</Text>
                    </View>
                </View>

                <View style={styles.rowItem}>
                    <Text style={styles.label} allowFontScaling={false}>提示</Text>
                    <View style={styles.rowCont}>
                        {
                            this.props.goodsInfoExist ? this.props.goodsSupports.map((v, i) => {
                                return (
                                    <Text style={styles.contText} allowFontScaling={false}
                                          key={i}>{v.get('serviceName')}</Text>
                                )
                            }) : null
                        }
                    </View>
                </View>
            </View>
        )
    }


    /**
     * 地址选择
     */
    _handleToRegion() {
        this.props.navigation.navigate('Address', {
            selectBack: (select) => {
                console.log(select)
                InteractionManager.runAfterInteractions(() => {
                    AsyncStorage.setItem('KStoreApp@defaultRegion', JSON.stringify(select));
                    this.props.dispatch({type: Address, data: select});
                    this.props.dispatch(goodsStock(this.props.product.get('id'), select.districtId));
                });

            }
        })
    }
}


const styles = StyleSheet.create({
    box: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee',
        padding: 20,
        paddingBottom: 10
    },
    rowItem: {
        flexDirection: 'row',
        marginBottom: 10
    },
    label: {
        color: '#666',
        //fontSize: 16,
        marginRight: 10,
        lineHeight: 19
    },
    rowCont: {
        flex: 1
    },
    contText: {
        //fontSize: 16,
        lineHeight: 20
    },
    addressItem: {
        flex: 1,
        //fontSize: 16,
        marginRight: 20,
        lineHeight: 20
    },
    cashTip: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cashIcon: {
        width: 22,
        height: 15,
        marginRight: 5
    },
    tipIcon: {
        width: 18,
        height: 18,
        marginLeft: 5
    }
});

