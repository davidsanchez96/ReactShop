import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';

import SwipeOut from 'react-native-swipeout';
import {MessageListItem} from "../../utils/actionTypes";

const {width: WIDTH} = Dimensions.get('window');


export default class MessageItem extends Component {


    constructor(props) {
        super(props);
        const message = this.props.data;
        const isRead = message.get('readed');
        this.state = {
            left: new Animated.Value(0),
            isRead: isRead
        };
    }


    componentWillReceiveProps(nextProps) {
        this._isNeedAnimation = nextProps.isEdit != this.props.isEdit;
        this.setState({'isRead': nextProps.data.get('readed')});
    }


    componentDidUpdate() {
        if (this._isNeedAnimation) {
            Animated.timing(this.state.left, {
                toValue: this.props.isEdit ? 60 : 0,
                duration: 400
            }).start();
        }
    }


    render() {
        const message = this.props.data;
        const isRead = this.state.isRead;
        this._messageId = message.get('id');

        const swipeOutBtns = [];
        if (!isRead) {
            swipeOutBtns.push({
                text: '已读',
                onPress: () => {
                    if (__DEV__) {
                        console.log("已读：", this._messageId);
                    }
                    this.setState({'isRead': true});
                    msg.emit('message:setReaded', this._messageId);
                }
            });
        }

        swipeOutBtns.push({
            text: '删除',
            backgroundColor: '#e63a59',
            onPress: () => {
                if (__DEV__) {
                    console.log("删除：", this._messageId);
                }
                msg.emit('message:remove', this._messageId);
            }
        });


        return (

            <View style={{marginBottom: 10}}>
                {this.props.isEdit ? this._renderItem() :
                    <SwipeOut
                        right={swipeOutBtns}
                        autoClose={true}
                        scroll={(isOpen) => {
                            if (this.props.onSwipe) {
                                this.props.onSwipe(this['_swipeOut' + this.props.index])
                            }
                            if (this.props.listView && Platform.OS === 'ios') {
                                this.props.listView.changeScrollEnable(isOpen);
                            }
                        }}
                        ref={(swipeOut) => this['_swipeOut' + this.props.index] = swipeOut}
                    >
                        {this._renderItem()}
                    </SwipeOut>
                }
            </View>
        );
    }


    _renderItem() {
        const message = this.props.data;
        const isRead = this.state.isRead;
        const selected = this.props.checkedList.has(this._messageId);

        return (
            <View style={{width: WIDTH, height: 130, flexDirection: 'row'}}>

                <TouchableOpacity ref={(side) => this._side = side}
                                  activeOpacity={0.8}
                                  onPress={this._onPress.bind(this, this.props.index)}
                                  style={{
                                      width: 60,
                                      backgroundColor: '#eee',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                  }}>
                    <Image style={{width: 20, height: 20}}
                           source={selected ? require('./img/select.png') : require('./img/unselect.png')}/>
                </TouchableOpacity>

                <Animated.View style={[styles.container, {left: this.state.left}]}>
                    <TouchableOpacity onPress={this._onPress.bind(this, this.props.index)} activeOpacity={0.8}>
                        <View style={styles.info}>
                            <Image style={{width: 20, height: 20}}
                                   source={isRead ? require('./img/readed_msg.png') : require('./img/unread_msg.png')}/>
                            {/*标题*/}
                            <Text style={{flex: 1, fontSize: 15, marginLeft: 15}} numberOfLines={1}
                                  allowFontScaling={false}>{message.get('title')}</Text>
                        </View>

                        {/*内容*/}
                        <Text style={styles.msgDetail} numberOfLines={2} allowFontScaling={false}>
                            {message.get('content')}
                        </Text>

                        <View style={styles.action}>
                            {/*发送时间*/}
                            <Text style={{color: '#999'}} allowFontScaling={false}>
                                {message.get('createTime') && message.get('createTime').substring(0, 19)}
                            </Text>
                            <Text style={{color: '#999'}} allowFontScaling={false}>查看详情 ></Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }

    _onPress(index) {
        if (this.props.isEdit) {
            if (this.props.checkedList.has(this._messageId)) {
                this.props.dispatch({type:MessageListItem,checked:false,id:this._messageId});
            } else {
                this.props.dispatch({type:MessageListItem,checked:true,id:this._messageId});
            }
        } else {
            this.setState({'isRead': true});
            msg.emit('route:goToNext', {
                sceneName: 'MessageDetail',
                index: index,
                data: this.props.data
            });
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        //marginBottom: 10,
        backgroundColor: '#FFF',
        position: 'absolute',
        //left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    mobile: {
        marginLeft: 20,
        fontSize: 16
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    msgDetail: {
        color: '#999',
        lineHeight: 20,
        height: 40,
        marginTop: 5
    },
    action: {
        marginTop: 10,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1 / PixelRatio.get(),
        borderStyle: 'solid',
        borderTopColor: '#eee'
    },
    right: {
        alignItems: 'flex-end'
        //flexDirection: 'row'
    }
});

