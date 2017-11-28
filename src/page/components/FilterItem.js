/**
 * Created by liuzhaoming on 15/12/15.
 */

import React, {Component} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, PixelRatio} from 'react-native';


const {width: WIDTH} = Dimensions.get('window');


/**
 * 商品筛选条件
 */
export default class FilterItem extends Component {
    render() {
        const displayName = this._getPropDisplayName(this.props.propName);
        const selectedValue = this._renderSelectedValue();

        return (
            <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={this._showSelectPanel}>
                <Text style={styles.keyText} allowFontScaling={false}>{displayName}</Text>
                <View style={styles.rightView}>
                    <Text
                        style={!selectedValue || selectedValue == '全部' ? styles.valueText : styles.selectedValueText}
                        numberOfLines={1}
                        textAlign={'right'}
                        allowFontScaling={false}>
                        {selectedValue}
                    </Text>
                    <Image source={require('./img/right.png')} style={styles.rightImage}/>
                </View>
            </TouchableOpacity>
        );
    }


    /**
     * 渲染选中的值
     * @private
     */
    _renderSelectedValue() {
        const name = this.props.propName;
        const allSelectedValueMap = appStore.data().get('selectedValues');
        var text = null;

        if (__DEV__) {
            console.log('GoodsFilterValue filter item _renderSelectedValue =>', JSON.stringify(allSelectedValueMap, null, 2));
        }

        if (allSelectedValueMap && allSelectedValueMap.get(name)) {
            text = allSelectedValueMap.get(name).join('、');
        }

        if (!text) {
            text = name == 'cates' ? '' : '全部';
        }

        return text;
    }


    /**
     * 显示选择页面
     * @private
     */
    _showSelectPanel() {
        const store = appStore.data();
        const propName = this.props.propName;
        var sceneParam = {propName: propName, displayPropName: this._getPropDisplayName(propName)};
        if (store.get('selectedValues') && store.get('selectedValues').get(propName)) {
            sceneParam['selectedValue'] = store.get('selectedValues').get(propName);
        }

        if (store.get('aggregations') && store.get('aggregations').get(propName)) {
            sceneParam['valueList'] = store.get('aggregations').get(propName);
        }

        if (__DEV__) {
            console.log('GoodsFilter filter-item _showSelectPanel is called', JSON.stringify(sceneParam, null, 2));
        }

        msg.emit('route:goToNext', {
            sceneName: 'GoodsFilterValue',
            ...sceneParam,
        });
    }


    /**
     * 获取属性的显示名称
     * @param propName
     * @private
     */
    _getPropDisplayName(propName) {
        if (propName == 'cates') {
            return '全部分类';
        }

        if (propName == 'prices') {
            return '价格';
        }

        if (propName == 'brands') {
            return '品牌';
        }

        return propName;
    }
}


var styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 1 / PixelRatio.get(),
        backgroundColor: '#FFF',
    },
    keyText: {
        flex: 1
    },
    rightView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    valueText: {
        width: WIDTH * 0.4,
        textAlign: 'right',
        color: '#999'
    },
    selectedValueText: {
        color: '#e63a59',
        width: WIDTH * 0.4,
        textAlign: 'right'
    },
    rightImage: {
        width: 8,
        height: 10,
        marginLeft: 5
    },
});


