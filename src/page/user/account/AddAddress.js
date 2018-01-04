/**
 * Created by hufeng on 12/14/15.
 */
import React, {Component} from 'react';

import {
    Dimensions, TouchableOpacity,
    Text, InteractionManager, Platform, StyleSheet, Switch, View
} from 'react-native';


import {connect} from "react-redux";
import Form from "../../components/Form";
import TextInputForm from "../../components/TextInputForm";
import TextField from "../../components/TextField";
import BasicField from "../../components/BasicField";
import Immutable from "immutable";
import Loading from "../../components/Loading";
import {AddAddressClean, AddAddressSelect, AddressValue, DetailClean, FilterAddress} from "../../../utils/actionTypes";
import Toast from 'react-native-root-toast';
import {addAddress, getAddress, updateAddress} from "../../../action/addressActions";

const {width: SCREEN_WIDTH} = Dimensions.get('window');

class AddAddress extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.id ? '编辑收货地址' : '新建收货地址',
    });

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(this.props.addAddressReducer, nextProps.addAddressReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //编辑状态
            if (this.props.navigation.state.params.id) {
                this.props.dispatch(getAddress(this.props.navigation.state.params.id));
            }
        });
    }

    componentWillUnmount() {
        this.props.dispatch({type: AddAddressClean});
    }

    render() {
        const {addAddressReducer, dispatch, navigation} = this.props;
        InteractionManager.runAfterInteractions(() => {
            if (addAddressReducer.get('isSuccess')) {
                navigation.state.params.addressBack();
                navigation.goBack();
            }
        });
        return (
            <View style={[styles.container, {backgroundColor: '#fff'}]}>

                {this._renderContent(addAddressReducer, dispatch, navigation)}

                <View style={styles.btnViewContainer}>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnContainer}
                        onPress={
                            () => this._createAddress(addAddressReducer, dispatch,navigation)
                        }>
                        <Text
                            style={styles.btnText}
                            allowFontScaling={false}>
                            保存地址
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    _renderContent(addAddressReducer, dispatch, navigation) {

        if (this.props.id && addAddressReducer.get('isLoading')) {
            return <Loading/>;
        } else {
            return this._renderForm(addAddressReducer, dispatch, navigation);
        }
    }


    _renderForm(addAddressReducer, dispatch, navigation) {
        const form = addAddressReducer.get('form');
        const note = '注意: 每次下单时会使用该地址';
        const loading = addAddressReducer.get('loading');
        return (
            <Form style={styles.container}>
                <Loading visible={loading}/>
                <TextInputForm
                    label='收货人: '
                    value={form.get('name')}
                    maxLength={30}
                    onChangeText={(value) => {
                        dispatch({type: AddressValue, field: 'name', value: value})
                    }}
                />

                <TextInputForm
                    label='联系方式: '
                    value={form.get('mobile')}
                    keyboardType={'numeric'}
                    maxLength={15}
                    onChangeText={(value) => {
                        dispatch({type: AddressValue, field: 'mobile', value: value})
                    }}
                />

                <TextField
                    label='所在地区: '
                    text={addAddressReducer.get('region')}
                    showArrow={true}
                    onPress={() => {
                        navigation.navigate('Address', {
                            selectBack: (select) => {
                                console.log(select)
                                dispatch({type: AddAddressSelect, data: select});
                            }
                        })
                    }}/>

                <TextInputForm
                    label='详细地址: '
                    maxLength={40}
                    value={form.get('detail')}
                    onChangeText={(value) => {
                        dispatch({type: AddressValue, field: 'detail', value: value})
                    }}
                />

                <BasicField label='设为默认地址' note={note} noteStyle={styles.note}>
                    <Switch
                        style={[Platform.OS === 'android' && {
                            width: 100
                        }]}
                        value={form.get('defaultAddress')}
                        onTintColor='#e63a59'
                        onValueChange={(value) => {
                            dispatch({type: AddressValue, field: 'defaultAddress', value: value})
                        }}
                    />
                </BasicField>
            </Form>
        )
            ;
    }

    /**
     * 保存新的地址
     * @private
     */
    _createAddress(addAddressReducer, dispatch, navigation) {
        const name = addAddressReducer.getIn(['form', 'name']);
        const mobile = addAddressReducer.getIn(['form', 'mobile']);
        const province = addAddressReducer.getIn(['form', 'province']);
        const detail = addAddressReducer.getIn(['form', 'detail']);

        if (!name || name.trim().length === 0) {
            Toast.show('请填写收货人姓名');
        } else if (!mobile || mobile.trim().length === 0) {
            Toast.show('请填写联系方式');
        } else if (!/^((\d{10,11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/.test(mobile)) {
            Toast.show('手机号码格式有误');
        } else if (!province || province.trim().length === 0) {
            Toast.show('请选择所在地区');
        } else if (!detail || detail.trim().length === 0) {
            Toast.show('请填写地址详情');
        } else {
            const form = addAddressReducer.get('form').toJS();
            form['defaultAddress'] = form['defaultAddress'] ? '1' : '0';
            dispatch(navigation.state.params.id ? updateAddress(form) : addAddress(form))
        }
    }
}


const
    styles = StyleSheet.create({
        container: {
            flex: 1,

        },
        btnViewContainer: {
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10
        },
        note: {
            fontSize: 14,
            color: '#999',
            marginTop: 5,
            paddingRight: 80,
            lineHeight: 20
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
        addAddressReducer: state.get('addAddressReducer')
    });
export default connect(mapStateToProps)(AddAddress);
