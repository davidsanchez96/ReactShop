import React, {Component} from 'react';
import {
    Text,
    ActivityIndicator,
    StyleSheet,
    View,
    Modal,
} from 'react-native';

export default class Loading extends Component {
    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                }}
            >
                <View style={styles.loading}>
                    <ActivityIndicator color="#CCCCCC"/>
                    <Text style={styles.loadingTitle}>加载中…</Text>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingTitle: {
        fontSize: 12,
        color: '#CCCCCC'
    }
})