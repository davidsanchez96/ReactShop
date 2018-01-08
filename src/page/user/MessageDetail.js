import React, {Component} from 'react';
import {View, Text, InteractionManager, StyleSheet} from 'react-native';
import {messageRead} from "../../action/messageListActions";


export default class MessageDetail extends Component {
    static navigationOptions = {
        title: '消息内容',
    };


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //设置消息为已读
            const data = this.props.navigation.state.params.data;
            const readed = data.readed;
            if (!readed) {
                this.props.dispatch(messageRead(data.id,false));
            }
        });
    }




    render() {
        const data = this.props.navigation.state.params.data;

        return (
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    {/*标题*/}
                    <Text style={{fontSize: 15, lineHeight: 20}} allowFontScaling={false}>
                        {data.title}
                    </Text>

                    {/*内容*/}
                    <Text style={styles.msgDetail} allowFontScaling={false}>
                        {data.content}
                    </Text>

                    <View style={styles.action}>
                        {/*发送时间*/}
                        <Text style={{color: '#999'}}
                              allowFontScaling={false}>{data.createTime && data.createTime.substring(0, 19)}</Text>
                    </View>
                </View>
            </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    messageContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10,
        backgroundColor: '#FFF'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    msgDetail: {
        color: '#999',
        lineHeight: 20,
        marginTop: 5
    },
    action: {
        marginTop: 10,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderTopColor: '#eee'
    },
    right: {
        flexDirection: 'row'
    }
});
