'use strict';
import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';


/**
 * badge组件
 */
export default class Badge extends Component {
    static defaultProps = {
        badge: 0
    };


    render() {
        let count = this.props.badge;

        if (count > 99) {
            count = '99+';
        } else if (count < 10) {
            count = ' ' + this.props.badge + ' ';
        }

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{count}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        height: 16,
        minWidth: 16,
        paddingLeft: 2,
        paddingRight: 2,
        backgroundColor: '#f00',
        borderRadius: 8,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: -8,
        top: 3
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 8
    }
});

