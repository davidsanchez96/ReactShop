import React, {Component} from 'react';

import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import FilterSelectItem from "./FilterSelectItem";


/**
 * 商品筛选条件列表
 */
export default class FilterSelectList extends Component {

    render() {
        const store = this.props.selectReducer;
        const propName = store.get('propName');
        const valueList = store.get('valueList');



        return (
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={true}
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={styles.container}>
                <FilterSelectItem
                    dispatch={this.props.dispatch}
                    navigation={this.props.navigation}
                    displayValue='全部'
                    isSelected={this._isSelected('全部')}
                    propName={propName}
                />
                {valueList.map(v =>
                    <FilterSelectItem
                        navigation={this.props.navigation}
                        dispatch={this.props.dispatch}
                        value={v['key']}
                        propName={propName}
                        isSelected={this._isSelected(v['key'])}
                    />)
                }
            </ScrollView>
        );
    }


    /**
     * 判断选项是否选中
     * @private
     */
    _isSelected(value) {
        const store = this.props.selectReducer;
        const selectedValueSet = store.get('selectedValue');

        if (!selectedValueSet || selectedValueSet.isEmpty()) {
            return value == '全部';
        }
        else {
            return selectedValueSet.get(value)===1;
        }
    }


    /**
     * 获取选项显示值
     * @param propName
     * @param propValue
     * @private
     */
    _getPropDisplayValue(propName, propValueObj) {
        if (propName === 'prices') {
            if (propValueObj['to'] <= 0) {
                return propValueObj['from'] + '以上';
            }
        }

        return propValueObj['key'];
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingBottom: 30
    }
});
