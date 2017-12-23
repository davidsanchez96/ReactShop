import React, {Component} from 'react';
import {View, Text, TextInput, Platform, StyleSheet} from 'react-native';

const noop = () => {
};


/**
 * 输入框公共组件
 */
export default class TextInputForm extends Component {

    static defaultProps = {
        onChangeText: noop
    };


    render() {
        return (
            <View
                style={styles.container}>

                {/*label*/}
                <Text style={[styles.text, this.props.textStyle]} allowFontScaling={false}>
                    {this.props.label}
                </Text>

                {/*text-input*/}
                <TextInput
                    underlineColorAndroid='transparent'
                    ref={(input) => this.input = input}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    value={this.props.value}
                    style={[styles.input, this.props.style]}
                    keyboardType={this.props.keyboardType}
                    maxLength={this.props.maxLength}
                    placeholder={this.props.placeholder}
                    placeholderTextColor='#ddd'
                    onFocus={this.props.onFocus}
                    onChangeText={this.props.onChangeText}
                    autoFocus={this.props.autoFocus}
                    clearButtonMode='while-editing'
                />
            </View>
        )
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
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginRight: 5
    },
    input: {
        flex: 1,
        height: Platform.OS === 'ios' ? 26 : 52,
        fontSize: 16,
        color: '#333',
        marginRight: 5,
        padding: 0
    }
});

