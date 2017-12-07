'use strict';

import React, {Component} from 'react';
import {
    View,
    ListView,
    Text,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    PixelRatio
} from 'react-native';
import Immutable from 'immutable';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default class FilterBar extends Component {
    render() {
        const viewOption = this.props.viewOption;
        const selectedFilter = viewOption.selectedFilter;


        var isSelected = this._isFilterSelected();

        return (
            <View style={styles.filter}>
                <TouchableOpacity
                    style={styles.filterItem}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.props.typeFilter(!viewOption.filterOpen)
                    }
                    }>
                    <Text
                        style={[styles.filterText, selectedFilter === 'typeFilter' ? {color: '#e63a59'} : {}]}
                        allowFontScaling={false}>{viewOption.filterChecked}</Text>
                    <Image style={[styles.arrow,
                        selectedFilter === 'typeFilter' ? {tintColor: '#e63a59'} : {},
                        viewOption.filterOpen ? styles.rotate : '']} source={require('./img/arrow.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filterItem}
                    activeOpacity={0.8}
                    onPress={() => {
                        if (viewOption.selectedFilter !== 'salesFilter') {
                            this.props.salesFilter(viewOption)
                        }

                    }}>
                    <Text style={[styles.filterText, selectedFilter === 'salesFilter' ? {color: '#e63a59'} : {}]}
                          allowFontScaling={false}>销量</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filterItem}
                    activeOpacity={0.8}
                    onPress={() => {
                        const curDescending = viewOption.descending;
                        const descending = viewOption.selectedFilter === 'priceFilter' ? !curDescending : curDescending;
                        this.props.priceFilter(descending);
                    }}>
                    <Text style={[styles.filterText, selectedFilter === 'priceFilter' ? {color: '#e63a59'} : {}]}
                          allowFontScaling={false}>价格</Text>
                    <Image
                        style={[styles.arrow, selectedFilter === 'priceFilter' ? {tintColor: '#e63a59'} : {}, viewOption.descending ? '' : styles.rotate]}
                        source={require('./img/angle.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.filterItem}
                    activeOpacity={0.8}
                    onPress={this.props.showFilterPanel}>
                    <Text
                        style={[styles.filterText, isSelected ? {color: '#e63a59'} : {}]}
                        allowFontScaling={false}>筛选</Text>
                    <Image
                        style={[styles.filterIcon, selectedFilter === 'advancedFilter' ? {tintColor: '#e63a59'} : {}]}
                        source={isSelected ? require('./img/filter_selected.png') : require('./img/filter.png')}/>
                </TouchableOpacity>
            </View>
        )
    }


    /**
     * 判断是否选中过滤条件
     * @returns {boolean}
     * @private
     */
    _isFilterSelected() {
        var isSelected = false;
        const searchParam = Immutable.fromJS(this.props.searchParam);
        searchParam.map((v, k) => {
            if (k != 'searchText' && k != 'districtId' && v) {
                isSelected = true;
            }
        });

        return isSelected;
    }
}

var styles = StyleSheet.create({
    filter: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee',
        backgroundColor: '#fff'
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filterText: {
        color: '#666',
        fontSize: 16
    },
    arrow: {
        width: 10,
        height: 5,
        marginLeft: 5,
    },
    rotate: {
        transform: [{rotate: '180deg'}]
    },
    filterIcon: {
        width: 12,
        height: 12,
        marginLeft: 5
    }
});

