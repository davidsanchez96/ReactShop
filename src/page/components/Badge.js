'use strict';
import React, {Component} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {connect} from "react-redux";


/**
 * badge组件
 */
 class Badge extends Component {

    render() {
        const {badgeReducer}=this.props;
        let count = badgeReducer.get('count');

        if (count > 99) {
            count = '99+';
        } else if (count < 10) {
            count = ' ' + count + ' ';
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
        top: 2
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 8
    }
});
const mapStateToProps = (state) => ({
    badgeReducer: state.get('badgeReducer')
});
export default connect(mapStateToProps)(Badge);
