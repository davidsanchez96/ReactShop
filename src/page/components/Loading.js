import React, {Component} from 'react';
import {
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native';

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="#CCCCCC"/>
                <Text style={styles.loadingTitle}>加载中…</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loading: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    loadingTitle: {
        fontSize: 12,
        color: '#CCCCCC'
    }
})