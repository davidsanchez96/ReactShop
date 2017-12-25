'use strict'

import React, {Component} from 'react';
import {Image, InteractionManager, PixelRatio, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import Immutable from "immutable";
import Loading from "../../components/Loading";
import {GenderChange, GenderClean} from "../../../utils/actionTypes";
import {changeGender} from "../../../action/genderActions";


class Gender extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '修改性别',
            headerRight:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8}
                                      onPress={navigation.state.params.onPress}>
                        <Text style={styles.text} allowFontScaling={false}>确定</Text>
                    </TouchableOpacity>
                ),
        };
    };

    shouldComponentUpdate(nextProps, nextState) {

        return !Immutable.is(this.props.genderReducer, nextProps.genderReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        this.props.navigation.setParams({
                onPress: () => {
                    const {genderReducer, dispatch} = this.props;
                    dispatch(changeGender(genderReducer.get('gender')))
                },
            }
        );
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch({type: GenderChange, data: this.props.navigation.state.params.gender})
        })
    }
    componentWillUnmount() {
        this.props.dispatch({type: GenderClean});
    }
    render() {
        const {genderReducer, navigation, dispatch} = this.props;
        const loading = genderReducer.get('loading');
        const gender = genderReducer.get('gender');
        InteractionManager.runAfterInteractions(() => {
            if (genderReducer.get('isSuccess')) {
                navigation.state.params.genderBack(gender);
                navigation.goBack();
            }
        });
        return (
            <View style={styles.container}>
                <Loading visible={loading}/>
                <TouchableOpacity
                    onPress={() => {
                        dispatch({type: GenderChange, data: '1'})
                    }}
                    activeOpacity={0.8}>
                    <View style={styles.view}>
                        <Text style={{fontSize: 16}} allowFontScaling={false}>男</Text>
                        {
                            gender === '1'
                                ?
                                <Image style={[styles.image]}
                                       source={require('../../components/img/filter_checked.png')}/>
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        dispatch({type: GenderChange, data: '2'})
                    }}
                    activeOpacity={0.8}>
                    <View style={styles.view}>
                        <Text style={{fontSize: 16}} allowFontScaling={false}>女</Text>
                        {
                            gender === '2'
                                ?
                                <Image style={[styles.image]}
                                       source={require('../../components/img/filter_checked.png')}/>
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        dispatch({type: GenderChange, data: '0'})
                    }}
                    activeOpacity={0.8}>
                    <View style={styles.view}>

                        <Text style={{fontSize: 16}} allowFontScaling={false}>保密</Text>
                        {
                            gender === '0'
                                ?
                                <Image style={[styles.image]}
                                       source={require('../../components/img/filter_checked.png')}/>
                                :
                                null
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 修改store
     * @private
     */
    _chooseGender(gender) {
        if (__DEV__) {
            console.log(gender);
        }
        msg.emit('account:gender:change', gender);
    }

    /**
     * 保存
     * @private
     */
    _saveGender() {
        msg.emit('account:gender:save');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    view: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1 / PixelRatio.get(),
        justifyContent: 'space-between',
    },
    image: {
        width: 20,
        height: 20,
    },
    text: {
        color: '#666',
        fontSize: 14,
        marginLeft: 20
    }
})

const mapStateToProps = (state) => ({
    genderReducer: state.get('genderReducer')
});
export default connect(mapStateToProps)(Gender);
