import React, {Component} from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const noop = () => {
};


export default class IconButton extends Component {
    static defaultProps = {
        icon: null,
        text: '',
        onPress: noop
    };


    render() {
        const icon = this.props.icon;
        const text = this.props.text;

        return (
            <TouchableOpacity
                style={[styles.container, this.props.style]}
                onPress={this.props.onPress}>
                <View style={styles.inner}>
                    {icon ? <Image source={icon} style={styles.img}/> : null}
                    <Text style={styles.text} allowFontScaling={false}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: 30,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    img: {
        width: 20,
        height: 20
    },
    text: {
        color: 'gray',
        marginLeft: 10
    }
});
