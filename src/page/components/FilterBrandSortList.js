import React, {Component} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Image, PixelRatio, ListView} from 'react-native';


import Immutable, {OrderedMap} from 'immutable';
import han from 'han';
import {SelectBrand, SelectMultiple} from "../../utils/actionTypes";
const bandLetterHeaderHeight = 30;
const bandRowHeight = 50;
const borderHeight = 1 / PixelRatio.get();
let data = [];


const ds = new ListView.DataSource({
    sectionHeaderHasChanged: (r1, r2) => r1 != r2,
    rowHasChanged: (r1, r2) => r1 != r2
});

/**
 * 根据首字母排序品牌列表
 */
export default class FilterBrandSortList extends Component {
    componentWillMount() {
        this._headerOffsetMap = {};
    }


    render() {
        const store = this.props.selectReducer;
        const brands = store.get('valueList');
        var firstLetterGroups = this._groupByPinyin(brands);
        if (__DEV__) {
            console.log('SortBrandValueItemList.render', JSON.stringify(store));
            console.log(Immutable.is(firstLetterGroups), firstLetterGroups.toJS())
        }

        return (
            <View style={styles.container}>
                <ListView
                    bounces={false}
                    initialListSize={10}
                    pageSize={10}
                    removeClippedSubviews={true}
                    style={styles.scrollContainer}
                    ref={(listView) => {
                        this.listView = listView;
                        window.listView = listView;
                    }}
                    renderSectionHeader={(data, id) => this._renderFirstLetterHeader(id)}
                    renderRow={(item) => this._renderBrandRow(item)}
                    dataSource={ds.cloneWithRowsAndSections(firstLetterGroups.toJS())}
                    showsVerticalScrollIndicator={true}
                >
                </ListView>
                <View style={styles.rightContainer}>
                {
                    data.map((item) => {
                            return <TouchableOpacity style={styles.rightBtn} activeOpacity={0.8}
                                                     onPress={() => {
                                                         var xPos = this._caculateY(item, firstLetterGroups);
                                                         this.listView.getScrollResponder().scrollWithoutAnimationTo(xPos, 0);
                                                     }
                                                     }>
                                <Text style={styles.rightValueText} allowFontScaling={false}>{item}</Text>
                            </TouchableOpacity>
                        }
                    )
                }
                </View>
            </View>
        );
    }


    /**
     *  渲染右侧品牌首字母
     * @private
     */
    _renderRightPanel(firstLetterGroups){
        return firstLetterGroups.map((v, k) =>
            <TouchableOpacity style={styles.rightBtn} activeOpacity={0.8}
                              onPress={() =>
                              {
                                  var xPos = this._caculateY(k, firstLetterGroups);
                                  this.listView.getScrollResponder().scrollWithoutAnimationTo(xPos, 0);
                              }
                              }>
                <Text style={styles.rightValueText} allowFontScaling={false}> {k} </Text>
            </TouchableOpacity>
        );
    }


    /**
     * 渲染字母抬头
     * @param letter
     * @returns {XML}
     * @private
     */
    _renderFirstLetterHeader(letter) {
        return (
            <View style={styles.letterBar} onLayout={(e) => {
                this._headerOffsetMap[letter] = e.nativeEvent.layout.y;
            }}>
                <Text style={styles.letterText} textAlign='left' allowFontScaling={false}>{letter}</Text>
            </View>
        );
    }


    /**
     * 渲染品牌行
     * @param row
     * @param _
     * @param index
     * @private
     */
    _renderBrandRow(row) {
        const sortSelectedBrands = this.props.selectReducer.get('sortBrandSelected');
        var isSelected = sortSelectedBrands.has(row);
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={0.8}
                onPress={() => this._onClickItem(row,isSelected)}>
                <Text style={isSelected ? styles.selectedValueText : styles.valueText}
                      allowFontScaling={false}> {row} </Text>
                {
                    isSelected
                        ?
                        <Image source={require('./img/filter_checked.png')} style={styles.selectedImage}/>
                        :
                        null
                }
            </TouchableOpacity>)
    }


    /**
     *  根据拼音首字母对品牌进行分组
     * @param brands
     * @private
     */
    _groupByPinyin(brands) {
        if (!brands) {
            return [];
        }

        var pinyinGroups = [];
        brands.map((v) => {
            var pinyin = han.letter(v.key);
            pinyin = pinyin ? pinyin : '#';
            var key = pinyin + v.key;
            pinyinGroups.push({pinyin: key, brand: v.key});
        });

        pinyinGroups.sort((a, b) => a['pinyin'].localeCompare(b['pinyin']));
        //默认排序#在最前面,将#调整到最后
        if (pinyinGroups.length > 1 && pinyinGroups[0]['pinyin'][0] == '#') {
            var temp = pinyinGroups[0];
            pinyinGroups = pinyinGroups.slice(1);
            pinyinGroups[pinyinGroups.length] = temp;
        }

        var firstLetterGroups = OrderedMap();
        data=[];
        pinyinGroups.map((v) => {
            var firstLetter = v['pinyin'][0];

            if (firstLetterGroups.has(firstLetter)) {
                firstLetterGroups.get(firstLetter).push(v['brand']);
            }
            else {
                data.push(firstLetter);
                firstLetterGroups = firstLetterGroups.set(firstLetter, [v['brand']]);
            }
        });

        return firstLetterGroups;
    }


    /**
     * 点击元素
     * @private
     */
    _onClickItem(value,isSelected) {
        this.props.dispatch({type: SelectBrand, data: value,has:isSelected});
        this.props.dispatch({type: SelectMultiple, data: value,has:isSelected});
    }


    /**
     *  计算控件显示位置
     * @param letter
     * @private
     */
    _caculateY(letter, pinyinGroups) {
        var xPos = 0;
        pinyinGroups = pinyinGroups.toJS();
        for (var k in pinyinGroups) {
            if (letter == k) {
                return xPos;
            }
            else {
                xPos += bandLetterHeaderHeight;
                xPos += (bandRowHeight + borderHeight) * pinyinGroups[k].length
            }
        }

        return xPos;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
    },
    scrollContainer: {
        //flex: 1,
        backgroundColor: '#FFF',
    },
    rightContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    letterBar: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEE',
        flexDirection: 'row'
    },
    letterText: {
        flex: 1,
        fontSize: 14,
        justifyContent: 'center',
    },
    itemContainer: {
        height: bandRowHeight,
        overflow: 'hidden',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: borderHeight,
        borderBottomColor: '#eee'
    },
    valueText: {},
    selectedValueText: {
        color: '#e63a59',
    },
    selectedImage: {
        width: 15,
        height: 15,
    },
    rightBtn: {
        //paddingTop: 5,
        //paddingBottom: 5
    },
    rightValueText: {
        //flex: 1,
        fontSize: 12,
    },
    separatorLine: {
        height: 1 ,
        backgroundColor: '#EEE',
    },
});


