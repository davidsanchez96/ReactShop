import React, {Component} from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity, PixelRatio} from 'react-native';
import {SelectMultiple, SelectSingle} from "../../utils/actionTypes";


/**
 * 商品筛选每个条件的可选值
 */
export default class FilterSelectItem extends Component {
    render() {

        const displayValue = this.props.displayValue || this.props.value;
        const isSelected = this.props.isSelected;

        return (
            <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => this._onClickItem()}>
                <Text style={isSelected ? styles.selectedValueText : styles.valueText}
                      allowFontScaling={false}> {displayValue} </Text>
                {isSelected ?
                    <Image source={require('./img/filter_checked.png')} style={styles.selectedImage}/>
                    :
                    null
                }
            </TouchableOpacity>
        );
    }


    /**
     * 点击元素
     * @private
     */
    _onClickItem() {
        const isSelected = this.props.isSelected;
        const value = this.props.value;

        //如果是分类和价格,只能单选,点击元素即返回
        if (this.props.propName === 'cates' || this.props.propName === 'prices') {
            this.props.dispatch({type: SelectSingle, data: value})
            this.props.navigation.state.params.callBack(this.props.propName,value);
            this.props.navigation.goBack()
        } else {
            this.props.dispatch({type: SelectMultiple, data: value,has:isSelected});
            // if (isSelected) {
            //     msg.emit('goodsFilterConditionValue:delSelectedValue', value);
            // } else {
            //     msg.emit('goodsFilterConditionValue:addSelectedValue', value);
            // }

            //如果是品牌,需要清除掉排序品牌选择列表
            if (this.props.propName == 'brands') {
                // msg.emit('goodsFilterConditionValue:initSortBrandSelected');
            }
        }
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
    valueText: {
        flex: 1
    },
    selectedValueText: {
        flex: 1,
        color: '#e63a59',
    },
    selectedImage: {
        width: 15,
        height: 15,
    },
});

