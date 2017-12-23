import React, {Component} from 'react';
import {Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const noop = () => {
};


export default class TextField extends Component {


    static defaultProps = {
        onPress: noop,
        showArrow: false
    };


    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={[styles.text, this.props.textStyle]} allowFontScaling={false}>
                    {this.props.label}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={() => this.props.onPress()}>
                    <Text style={[styles.input, this.props.textColor]} numberOfLines={1} allowFontScaling={false}>
                        {this.props.text}
                    </Text>
                    {
                        this.props.showArrow
                            ? <Image source={require('./img/right.png')} style={styles.right}/>
                            : null
                    }
                </TouchableOpacity>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#eee'
    },
    btn: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: '#333'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        alignItems: 'center'
    },
    right: {
        height: 20,
        width: 15
    }
});

