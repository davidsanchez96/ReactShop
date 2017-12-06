import React, {Component} from 'react';

import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import FilterBrandBar from "./FilterBrandBar";
import FilterSelectItem from "./FilterSelectItem";
import FilterBrandSortList from "./FilterBrandSortList";


/**
 * 商品筛选条件列表
 */
export default class FilterBrandList extends Component {

    render() {
        const store = this.props.selectReducer;
        const propName = store.get('propName');
        const valueList = store.get('valueList');
        const dispatch = this.props.dispatch;

        return (
            <View style={styles.container}>
                <FilterBrandBar
                    dispatch={dispatch}
                    selectReducer={store}/>
                {
                    store.get('brandViewType') === 'sort'
                        ?
                        <FilterBrandSortList
                            dispatch={dispatch}
                            selectReducer={store}/>
                        :
                        <View style={{flex: 1}}>
                            <ScrollView
                                bounces={false}
                                showsVerticalScrollIndicator={true}
                                automaticallyAdjustContentInsets={false}>
                                <View style={{backgroundColor: '#eee'}}>
                                    <FilterSelectItem
                                        dispatch={dispatch}
                                        displayValue='全部'
                                        isSelected={this._isSelected('全部', 'recommend')}
                                        propName={propName}
                                    />
                                </View>
                                {valueList.map(v =>
                                    <View style={{backgroundColor: '#eee'}}>
                                        <FilterSelectItem
                                            dispatch={dispatch}
                                            value={v['key']}
                                            propName={propName}
                                            isSelected={this._isSelected(v['key'], 'recommend')}
                                        />
                                    </View>)
                                }
                            </ScrollView>
                        </View>
                }
            </View>
        );
    }


    /**
     * 判断选项是否选中
     * @private
     */
    _isSelected(value, brandViewType) {
        const store = this.props.selectReducer;
        if (brandViewType == 'recommend') {
            const selectedValueSet = store.get('selectedValue');

            if (!selectedValueSet || selectedValueSet.isEmpty()) {
                return value == '全部';
            }
            else {
                return selectedValueSet.get(value);
            }
        }
        else {
            const sortBrandSelected = store.get('sortBrandSelected');
            return sortBrandSelected.includes(value);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingBottom: 30
    }
});
