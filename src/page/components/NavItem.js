import React, {Component} from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import RightArrow from "./RightArrow";

const noop = () => {
};

export default class NavItem extends Component {
    static defaultProps = {
        onPress: noop,
        imageSource: require('../components/img/c_order.png'),
        imageSourceLocal: '',
        showRightImage: true,
    }


    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.style]}
                onPress={this.props.onPress}
                activeOpacity={0.8}>
                <Image source={this.props.imageSource} style={styles.image}/>
                <Text style={styles.title} allowFontScaling={false}>{this.props.title}</Text>
                <RightArrow
                    text={this.props.content}
                    imageSourceLocal={this.props.imageSourceLocal}
                    picStyle={{width: 10, height: 10}}
                    showRightImage={this.props.showRightImage}/>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FFF',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        marginLeft: 20,
    },
    image: {
        width: 25,
        height: 25
    }
});


