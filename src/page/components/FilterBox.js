'use strict';

import React, {Component} from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Modal, Image,
} from 'react-native';



export default class FilterBox extends Component {
    render() {
        const viewOption = this.props.viewOption;
        var isTypeSelected = viewOption.selectedFilter === 'typeFilter';
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={viewOption.filterOpen}
                onRequestClose={() => {
                }}>
                <TouchableOpacity
                    style={{flex:1}}
                    activeOpacity={1}
                    onPress={this.props.filterClose}>
                    <View style={styles.filterCont}>
                        <TouchableOpacity
                            style={styles.filterItem}
                            activeOpacity={0.8}
                            onPress={this.props.filterFir}>
                            <Text
                                style={[styles.filterText, (isTypeSelected && viewOption.filterChecked === '综合') && {color: '#e63a59'}]}
                                allowFontScaling={false}>综合</Text>
                            <Image
                                style={[styles.filterChecked, (isTypeSelected && viewOption.filterChecked === '综合') && {opacity: 1}]}
                                source={require('./img/filter_checked.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.filterItem}
                            activeOpacity={0.8}
                            onPress={this.props.filterSec}>
                            <Text
                                style={[styles.filterText, (isTypeSelected && viewOption.filterChecked === '新品') && {color: '#e63a59'}]}
                                allowFontScaling={false}>新品</Text>
                            <Image
                                style={[styles.filterChecked, (isTypeSelected && viewOption.filterChecked === '新品') && {opacity: 1}]}
                                source={require('./img/filter_checked.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)',flex:1}}/>
                </TouchableOpacity>
            </Modal>
        )

    }
}

const styles = StyleSheet.create({

    filterCont: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop:103,
    },
    filterItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    filterText: {
        color: '#666'
    },
    filterChecked: {
        width: 20,
        height: 20,
        opacity: 0
    }
});

