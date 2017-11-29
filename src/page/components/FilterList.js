/**
 * Created by liuzhaoming on 15/12/15.
 */

import React, {Component} from 'react';

import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import Immutable from 'immutable';
import FilterItem from './FilterItem';


/**
 * 商品筛选条件列表
 */
export default class FilterList extends Component {
    render() {
        const aggregations = this._sortAggregations();
        return (
            <ScrollView
                showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={styles.container}>
                {aggregations.map(
                    (v) =>
                        <FilterItem propName={v.propName}/>
                )}
            </ScrollView>
        );
    }


    /**
     * 给聚合属性排序
     * @returns {Array}
     * @private
     */
    _sortAggregations() {
        let aggregations = this.props.aggregations;
        if(!Immutable.is(aggregations)){
            aggregations= Immutable.fromJS(aggregations);
        }
        var sortedAggregations = [];
        console.log(aggregations.get('cates').length);
        if (aggregations.get('cates') && aggregations.get('cates').length > 0) {
            sortedAggregations.push({propName: 'cates', 'valueList': aggregations.get('cates')})
        }

        if (aggregations.get('brands') && aggregations.get('brands').length > 0) {
            sortedAggregations.push({propName: 'brands', 'valueList': aggregations.get('brands')})
        }

        if (aggregations.get('prices') && aggregations.get('prices').length > 0) {
            sortedAggregations.push({propName: 'prices', 'valueList': aggregations.get('prices')})
        }

        var aggregationsObj = aggregations.toJS();
        for (var key in aggregationsObj) {
            var value = aggregationsObj[key];
            if (key != 'cates' && key != 'brands' && key != 'prices') {
                sortedAggregations.push({propName: key, 'valueList': value});
            }
        }

        if (__DEV__) {
            console.log('GoodsList filter-item-list sortedAggregations=>', JSON.stringify(sortedAggregations, null, 2));
        }
        return sortedAggregations;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#FFF',
    }
});
