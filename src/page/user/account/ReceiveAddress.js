import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    InteractionManager,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';


import {connect} from "react-redux";
import {receiveAddress} from "../../../action/receiveAddressActions";
import Loading from "../../components/Loading";
import AddressItem from "../../components/AddressItem";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
/**
 * 地址管理
 */
class ReceiveAddress extends Component {
    static navigationOptions = {
        title: '地址管理',
    };


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //初始化数据
            this.props.dispatch(receiveAddress())
        });
    }


    render() {
        const {receiveAddressReducer, dispatch, navigation} = this.props;
        //是不是正在loading
        const loading = receiveAddressReducer.get('loading');


        return (
            <View style={styles.container}>

                <Loading visible={loading}/>

                {/* 内容区域 */}
                {/*{this._renderContent(receiveAddressReducer)}*/}

                {/* 按钮区域 */}
                <View style={styles.btnViewContainer}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnContainer}
                        onPress={
                            () => this._createAddress()
                        }>
                        <Text
                            style={styles.btnText}
                            allowFontScaling={false}>
                            新建地址
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    /**
     * 创建新的地址
     * @private
     */
    _createAddress() {
        const store = appStore.data();
        if (store.get('addrList').count() >= 10) {
            msg.emit('app:tip', '您最多可以创建10个地址');
        } else {
            msg.emit('route:goToNext', {sceneName: 'AddressEditor'});
        }
    }

    /**
     * 内容区域
     *
     * @returns {*}
     * @private
     */
    _renderContent(receiveAddressReducer) {



        //地址列表是否为空
        const isEmpty = receiveAddressReducer.get('addrList').count() === 0;

        return (
            <View style={styles.container}>
                {
                    isEmpty
                        ? <View style={styles.empty}>
                            <Image style={styles.icon} source={require('../../components/img/address_icon.png')}/>
                            <Text style={styles.text} allowFontScaling={false}>暂无收货地址</Text>
                        </View>
                        : <ScrollView
                            bounces={false}
                            showsVerticalScrollIndicator={true}
                            automaticallyAdjustContentInsets={false}>
                            {/*{receiveAddressReducer.get('addrList').map((v, k) =>*/}
                                {/*<AddressItem data={v}*/}
                                             {/*choose={this.props.choose}*/}
                                             {/*key={k}/>)}*/}
                        </ScrollView>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, icon: {
        width: 110,
        height: 110
    },
    text: {
        marginTop: 20,
        fontSize: 16,
        color: '#666'
    },
    btnViewContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
    },
    btnText: {
        fontSize: SCREEN_WIDTH <= 320 ? 16 : 18,
        color: '#fff',
    },
});


const mapStateToProps = (state) => ({
    receiveAddressReducer: state.get('receiveAddressReducer')
});
export default connect(mapStateToProps)(ReceiveAddress);