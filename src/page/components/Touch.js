import React, {Component} from 'react';

import {View, TouchableHighlight} from 'react-native';

const noop = () => {
};


/**
 * 统一包装Touch
 */
export default class Touch extends Component {

    static defaultProps = {
        disabled: false,
        onPress: noop,
        disStyle: {backgroundColor: '#ddd'},
        underlayColor: '#fff'
    };

    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled !== this.props.disabled) {
            this.setState({
                disabled: nextProps.disabled
            })
        }
    }


    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.underlayColor}
                activeOpacity={(this.state.disabled || this.props.disabled) ? 1 : 0.8}
                onPress={()=>this._handlePress()}
                style={[this.props.style, this.state.disabled && this.props.disStyle]}>
                <View style={this.props.contentStyle}>
                    {this.props.children}
                </View>
            </TouchableHighlight>
        );
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    _handlePress() {
        if (!this.state.disabled && !this.props.disabled) {
            this.setState({
                disabled: true
            }, () => {
                this.timer = setTimeout(() => {
                    this.setState({
                        disabled: false
                    });
                }, 1500);
                this.props.onPress();
            });
        }
    }
}

