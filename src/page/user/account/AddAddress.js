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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

class AddAddress extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '新建收货地址',
    });

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(this.props.addAddressReducer, nextProps.addAddressReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //编辑状态
            if (this.props.id) {
                // msg.emit('address-editor:init', this.props.id);
            }
        });
    }


    render() {
        const {addAddressReducer, dispatch, navigation} = this.props;

        return (
            <View style={[styles.container, {backgroundColor: '#eee'}]}>

                {this._renderContent(addAddressReducer)}

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
                            保存地址
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    _renderContent(addAddressReducer) {

        if (this.props.id && addAddressReducer.get('isLoading')) {
            return <Loading/>;
        } else {
            return this._renderForm(addAddressReducer);
        }
    }


    _renderForm(addAddressReducer) {
        const form = addAddressReducer.get('form');
        const note = '注意: 每次下单时会使用该地址';

        return (
            <Form style={styles.container}>
                <TextInputForm
                    label='收货人: '
                    value={form.get('name')}
                    maxLength={30}
                    onChangeText={this._handleFieldChange.bind(this, 'name')}
                />

                <TextInputForm
                    label='联系方式: '
                    value={form.get('mobile')}
                    keyboardType={'numeric'}
                    maxLength={15}
                    onChangeText={this._handleFieldChange.bind(this, 'mobile')}
                />

                <TextField
                    label='所在地区: '
                    text={addAddressReducer.get('region')}
                    showArrow={true}
                    onPress={() => msg.emit('route:goToNext', {sceneName: 'Region'})}/>

                <TextInputForm
                    label='详细地址: '
                    maxLength={40}
                    value={form.get('detail')}
                    onChangeText={this._handleFieldChange.bind(this, 'detail')}
                />

                <BasicField label='设为默认地址' note={note} noteStyle={styles.note}>
                    <Switch
                        style={[Platform.OS === 'android' && {
                            width: 100
                        }]}
                        value={form.get('defaultAddress')}
                        onTintColor='#e63a59'
                        onValueChange={this._handleFieldChange.bind(this, 'defaultAddress')}
                    />
                </BasicField>
            </Form>
        );
    }


    _handleFieldChange(field, value) {
        msg.emit('address-editor:fieldChange', field, value);
    }
}


const styles = StyleSheet.create({
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
