'use strict';
import React, {Component} from 'react';
import {
    AsyncStorage, Dimensions, InteractionManager, Navigator, Platform, StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';

import moment from 'moment';
import {connect} from "react-redux";
import NavItem from "../../components/NavItem";
import {GenderSet, NicknameSet} from "../../../utils/actionTypes";
import DatePicker from 'react-native-datepicker';
import {changeBirthday} from "../../../action/birthdayActions";
import Immutable from "immutable";
import Toast from 'react-native-root-toast';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadAvatar} from "../../../action/userActions";
import {Buttons} from "../../../utils/Constant";

const {width: SCREEN_WIDTH} = Dimensions.get('window');



class Account extends Component {
    static navigationOptions = {
        title: '我的账户',
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.is(Immutable.Map(this.props.accountReducer), Immutable.Map(nextProps.accountReducer)) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // this.props.dispatch(user());
        })
    }


    render() {
        const {accountReducer, navigation, dispatch} = this.props;
        const store = accountReducer;
        let gender = '保密';
        switch (store.getIn(['customer', 'gender'])) {
            case '0':
                gender = '保密';
                break;
            case '1':
                gender = '男';
                break;
            case '2':
                gender = '女';
                break;
            default:
                break;
        }
        let image = store.getIn(['customer', 'image']);
        return (
            <View style={styles.container}>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={Buttons}
                    cancelButtonIndex={0}
                    onPress={(i) => {
                       switch (i){
                           case 1:
                               ImagePicker.openCamera({
                                   width: 300,
                                   height: 300,
                                   mediaType:'photo',
                                   cropping: true
                               }).then(image => {
                                   console.log(image);
                                   this._fileTransfer(image.path)
                               });
                               break;
                           case 2:
                               ImagePicker.openPicker({
                                   width: 300,
                                   height: 300,
                                   cropping: true,
                                   mediaType:'photo'
                               }).then(image => {
                                   console.log(image);
                                   this._fileTransfer(image.path)
                               });
                               break;
                       }
                    }}
                />
                <View style={{flex: 1}}>
                    {
                            image
                                ?
                                <NavItem
                                    style={{paddingTop:10,paddingBottom:10}}
                                    title='头像'
                                    showLeftImage={false}
                                    showImageSource={true}
                                    imageSource={image}
                                    componentHeight={80}
                                    onPress={() => this._changeUserImage()}
                                />
                                :
                                <NavItem
                                    title='头像'
                                    showLeftImage={false}
                                    showImageSource={false}
                                    componentHeight={80}
                                    onPress={() => this._changeUserImage()}
                                />
                    }


                    <NavItem title='昵称'
                             showLeftImage={false}
                             content={store.getIn(['customer', 'nickname'])}
                             onPress={() => {
                                 navigation.navigate('Nickname', {
                                     nickname: store.getIn(['customer', 'nickname']),
                                     nicknameBack: (nickname) => {
                                         dispatch({type: NicknameSet, data: nickname})
                                     }
                                 })
                             }}/>
                    <NavItem title='性别'
                             showLeftImage={false}
                             content={gender}
                             onPress={() => {
                                 navigation.navigate('Gender', {
                                     gender: store.getIn(['customer', 'gender']),
                                     genderBack: (gender) => {
                                         dispatch({type: GenderSet, data: gender})
                                     }
                                 })
                             }}/>
                    <NavItem title='出生日期'
                             showLeftImage={false}
                             content={store.getIn(['customer', 'birthday'])}
                             onPress={() => {
                                 this.refs.datePicker.onPressDate()
                             }}/>
                    <DatePicker
                        ref="datePicker"
                        style={{width: 0, height: 0}}
                        date={accountReducer.getIn(['customer', 'birthday'])}
                        timeZoneOffsetInMinutes={(-1) * (new Date()).getTimezoneOffset()}
                        mode="date"
                        hideText={true}
                        showIcon={false}
                        customStyles={{
                            dateInput: {
                                width: 0,
                                height: 0,
                                borderWidth: 0
                            },
                            btnTextConfirm: {
                                color: '#666',
                            }
                        }}
                        onDateChange={(date) => {
                            dispatch(changeBirthday(date))
                        }}
                    />
                    <View style={{marginTop: 10}}>
                        <NavItem
                            title='地址管理'
                            showLeftImage={false}
                            content=''
                            onPress={() => {
                                navigation.navigate('ReceiveAddress')
                            }}/>
                        <NavItem
                            title='账户安全'
                            showLeftImage={false}
                            content='可修改密码'
                            onPress={() => {
                                navigation.navigate('Security', {
                                    phone: accountReducer.getIn(['customer', 'mobile']),
                                    mobileVerifyStatus: accountReducer.getIn(['customer', 'mobileVerifyStatus'])
                                })
                            }}/>
                    </View>

                    <View style={styles.buttonWrap}>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btnContainer}
                            onPress={
                                () => this._handleLogout(navigation)
                            }>
                            <Text
                                style={styles.text}
                                allowFontScaling={false}>
                                退出
                            </Text>
                        </TouchableOpacity>

                    </View>


                </View>


            </View>
        );
    }


    /**
     * 用户更改头像
     * @private
     */
    _changeUserImage() {

        this.ActionSheet.show()


        // //图片选项
        // const options = {
        //     title: '',
        //     cancelButtonTitle: '取消',
        //     takePhotoButtonTitle: '拍照',
        //     chooseFromLibraryButtonTitle: '我的相册',
        //     customButtons: {},
        //     quality: 0.2,
        //     storageOptions: {
        //         skipBackup: true,
        //         path: 'images'
        //     }
        // };
        //
        // //显示按钮
        // UIImagePickerManager.showImagePicker(options, async (didCancel, response) => {
        //
        //     if (didCancel) {
        //
        //     } else { //点击'拍照'或者'我的相册'或者'自定义按钮'
        //         if (response.customButton) {
        //         } else {
        //             if (__DEV__) {
        //                 console.log('response => ', response);
        //             }
        //             if (response.notImage) {
        //                 msg.emit('app:tip', "图片格式有误,请重新选择!");
        //                 return;
        //             } else {
        //                 if (__DEV__) {
        //                     console.log('response uri ==>', response.uri);
        //                 }
        //                 try {
        //                     let path = response.uri.replace('file://', '');
        //                     msg.emit('account:isLoading:change', true);
        //
        //                     if (Platform.OS !== 'ios') {
        //                         path = 'file://' + path;
        //                     }
        //                     const result = await ImageCrop.crop(path);
        //                     if (__DEV__) {
        //                         console.log('result => ', result);
        //                     }
        //                     this._fileTransfer(result)
        //                 } catch (err) {
        //                     if (__DEV__) {
        //                         console.log(err, err.message);
        //                     }
        //                     if (err.message != 'cancel') {
        //                         msg.emit('app:tip', '修改失败,请重试!');
        //                     }
        //                 } finally {
        //                     msg.emit('account:isLoading:change', false);
        //                 }
        //             }
        //         }
        //     }
        // });
    }

    _fileTransfer(uri) {
        if (__DEV__) {
            console.log('uri======>', uri);
        }
        Toast.show('正在上传请稍后...');
        const fileName = uri.substring(uri.lastIndexOf('/') + 1);
        //FileUpload
        // const obj = {
        //     uploadUrl: `${QMConfig.HOST}/customers/image`,
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': 'Bearer ' + (window.token || '')
        //     },
        //     fields: {},
        //     files: [{
        //         name: 'image',
        //         filename: fileName,
        //         filepath: uri.replace('file://', ''),
        //     }]
        // };
        let data = {
            fileName: fileName,
            filePath: uri,//uri.replace('file://', ''),
        };
        this.props.dispatch(uploadAvatar(data));
        // msg.emit('app:tip', '正在上传请稍后...');
        // FileUpload.upload(obj, function (err, result) {
        //     if (__DEV__) {
        //         console.log('upload:', err);
        //         console.log('upload:', result);
        //     }
        //     if (err) {
        //         msg.emit('app:tip', '修改失败');
        //     } else if (result && (result.status > 400 || result.status == 0)) {
        //         if (result.data != "") {
        //             const errData = JSON.parse(result.data);
        //             msg.emit('app:tip', errData.message);
        //         } else {
        //             msg.emit('app:tip', '图片过大或者网络异常');
        //         }
        //     } else if (result) {
        //         msg.emit('app:tip', '修改成功!')
        //         msg.emit('account:info');
        //     }
        // })
    }

    /**
     * 选择图片的方式
     * @param buttonIndex
     * @private
     */
    _chooseButtonIndex(buttonIndex) {
        switch (buttonIndex) {
            case 0://拍照
                break;
            case 1://从相机选择
                msg.emit('route:goToNext', {
                    sceneName: 'AccountPortrait',
                    sceneConfig: Navigator.SceneConfigs.FloatFromBottom
                });
                break;
            default:
                break;
        }
    }

    /**
     * 账户安全
     * @private
     */
    _security() {
        msg.emit('route:goToNext', {
            sceneName: 'SecurityManager',
            mobile: appStore.data().getIn(['customer', 'mobile']),
            mobileVerifyStatus: appStore.data().getIn(['customer', 'mobileVerifyStatus'])
        });
    }


    /**
     * 退出登录
     * @private
     */
    async _handleLogout(navigation) {
        try {

            if (__DEV__) {
                console.log('logout');
            }

            try {
                await AsyncStorage.setItem('hkshop@data', '{"token":""}');
                await AsyncStorage.setItem('KStoreApp@defaultRegion', '');
                window.token = '';
                // JPushModule.setAlias('.', () => {
                // }, () => {
                // });
                // if (Platform.OS !== 'ios') {
                //     JPushModule.clearAllNotifications();
                // } else {
                //     JPushModule.setBadge(0, (badgeNumber) => {
                //     });
                // }
                navigation.state.params.exitBack();
                navigation.goBack();

            } catch (err) {
                if (__DEV__) {
                    console.log(err);
                }
                Toast.show('系统错误，请重试!');
            }
        } catch (err) {
            if (__DEV__) {
                console.log(err);
            }
        }
    }


    /**
     * 修改gender
     * @private
     */
    _updateGender() {
        if (__DEV__) {
            console.log('update gender');
        }
        msg.emit('route:goToNext', {
            sceneName: 'GenderManager',
            gender: appStore.data().getIn(['customer', 'gender'])
        })
    }

    /**
     * 修改出生日期
     * @private
     */
    _updateBirthday() {
        if (__DEV__) {
            console.log('update birthday');
        }
        const birthday = appStore.data().getIn(['customer', 'birthday']);
        const birthdayDate = moment(birthday, 'YYYY-MM-DD');
        if (__DEV__) {
            console.log(birthday, birthdayDate);
        }
        if (Platform.OS === 'ios') {
            msg.emit('route:goToNext', {
                sceneName: 'BirthdayManager',
                birthday: birthday == undefined ? new Date() : moment(birthday, 'YYYY-MM-DD').toDate()
            })
        } else {
            QMDatePickerAndroid.show({
                year: birthdayDate.format('YYYY'),
                month: birthdayDate.format('MM') - 1, // 0-11,
                day: birthdayDate.format('DD'),
                //minDateInMillon: startTime.valueOf(),
                onOk: (year, month, day) => {
                    const date = new Date(year, month, day);
                    if (__DEV__) {
                        console.log(date);
                    }
                    msg.emit('account:birthday:android:save', moment(date).format('YYYY-M-D'));
                }
            })
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    buttonWrap: {
        flex: 1,
        marginBottom: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'flex-end'
    },
    btnContainer: {
        borderRadius: 5,
        height: SCREEN_WIDTH <= 320 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e63a59'
    },
    text: {
        fontSize: SCREEN_WIDTH <= 320 ? 16 : 18,
        color: '#fff',
    },

});

const mapStateToProps = (state) => ({
    accountReducer: state.get('accountReducer')
});
export default connect(mapStateToProps)(Account);
