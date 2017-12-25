import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    InteractionManager,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';


import {connect} from "react-redux";
import {receiveAddress} from "../../../action/receiveAddressActions";
import Loading from "../../components/Loading";
import AddressItem from "../../components/AddressItem";
import Immutable from "immutable";
import AddAddress from "./AddAddress";
import Toast from 'react-native-root-toast';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

/**
 * 地址管理
 */
class ReceiveAddress extends Component {
    static navigationOptions = {
        title: '地址管理',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(this.props.receiveAddressReducer, nextProps.receiveAddressReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

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
                {this._renderContent(receiveAddressReducer, dispatch,navigation)}

                {/* 按钮区域 */}
                <View style={styles.btnViewContainer}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnContainer}
                        onPress={
                            () => {
                                if (receiveAddressReducer.get('addrList').count() >= 10) {
                                    Toast.show('您最多可以创建10个地址');
                                } else {
                                    navigation.navigate('AddAddress',{addressBack:()=>{
                                            InteractionManager.runAfterInteractions(() => {
                                                //初始化数据
                                               dispatch(receiveAddress())
                                            });
                                        }});
                                }
                            }
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
     * 内容区域
     *
     * @returns {*}
     * @private
     */
    _renderContent(receiveAddressReducer, dispatch,navigation) {
        const isLoading = receiveAddressReducer.get('loading');

        //地址列表是否为空
        const isEmpty = receiveAddressReducer.get('addrList').count() === 0;

        return (
            <View style={styles.container}>
                {
                    isLoading ? null : isEmpty
                        ? <View style={styles.empty}>
                            <Image style={styles.icon} source={require('../../components/img/address_icon.png')}/>
                            <Text style={styles.text} allowFontScaling={false}>暂无收货地址</Text>
                        </View>
                        : <ScrollView
                            bounces={false}
                            showsVerticalScrollIndicator={true}
                            automaticallyAdjustContentInsets={false}>
                            {receiveAddressReducer.get('addrList').map((v, k) =>
                                <AddressItem data={v}
                                             dispatch={dispatch}
                                             navigation={navigation}
                                             choose={this.props.choose}
                                             key={k}/>)}
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