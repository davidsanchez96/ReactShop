import React, {Component} from 'react';
import {
    TouchableOpacity, Text,
    View, Image, StyleSheet
} from 'react-native';
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


                <View>
                    <Text style={styles.title} allowFontScaling={false}>{this.props.title}</Text>
                    {
                        this.props.subTitle
                            ?
                            <Text style={styles.subTitle} allowFontScaling={false}>{this.props.subTitle}</Text>
                            :
                            null
                    }

                </View>

                <RightArrow
                    text={this.props.content}
                    imageSource={this.props.imageSource}
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
        padding: 20,
        backgroundColor: '#FFF',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: 1 ,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 20,
    },
    subTitle: {
        marginTop: 10,
        fontSize: 12,
        color: '#999'
    },
});


