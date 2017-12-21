import React, {Component} from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import RightArrow from "./RightArrow";

const noop = () => {
};

export default class NavItem extends Component {
    static defaultProps = {
        onPress: noop,
        imageSource: '',
        imageSourceLocal: '',
        showRightImage: true,
        showLeftImage: true,
        showImageSource: false,
    }


    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.style]}
                onPress={this.props.onPress}
                activeOpacity={0.8}>
                {
                    this.props.showLeftImage ? <Image source={this.props.imageSource} style={styles.image}/> : null
                }

                <Text style={styles.title} allowFontScaling={false}>{this.props.title}</Text>
                <RightArrow
                    text={this.props.content}
                    imageSourceLocal={this.props.imageSourceLocal}
                    picStyle={{width: 10, height: 10}}
                    showImageSource={this.props.showImageSource}
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
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 20,
    }
});


