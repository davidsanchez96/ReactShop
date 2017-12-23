import React, {Component} from 'react';
import { AlertIOS, PixelRatio, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconButton from "./IconButton";

export default class AddressItem extends Component {


  render() {
    const data = this.props.data;
    const mobile = data.get('mobile');
    const isDefault = data.get('defaultAddress');

    return (
      <View style={styles.container}>

        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.choose?this._chooseAddress(data):null}
            >
        <View style={styles.info}>
          {/*用户名*/}
          <Text style={{fontSize: 16, flex: 1}} numberOfLines={1} allowFontScaling={false}>{data.get('name')}</Text>
        </View>
        {/*电话号码*/}
        <View style={styles.mobileView}>
          <Text style={styles.mobile} allowFontScaling={false}>
            {mobile && [mobile.substring(0, 3), '****', mobile.substring(7)]}
          </Text>
        </View>
        {/*地址详情*/}
        <Text
          style={styles.addrDetail}
          numberOfLines={2}
          allowFontScaling={false}>
          {data.get('detail')}
        </Text>
        </TouchableOpacity>
        <View style={styles.action}>
          <IconButton
            style={{paddingLeft: 0}}
            icon={isDefault ? require('./img/select.png') : require('./img/unselect.png')}
            onPress={() => msg.emit('address:setDefault', data.get('id'))}
            text='设为默认'/>

          <View style={styles.right}>
            <IconButton
              icon={require('./img/edit.png')}
              text='编辑'
              onPress={() => msg.emit('route:goToNext', {sceneName: 'AddressEditor', id: data.get('id')})}
            />
            {
              this.props.choose
                ? null
                : <IconButton
                    text='删除'
                    icon={require('./img/delete.png')}
                    onPress={this._handleDelete.bind(this, data.get('id'))}
                  />
            }
          </View>
        </View>
      </View>
    );
  }


  _handleDelete(id){
    Platform.OS === 'ios'
    ?
      AlertIOS.alert('提示', '确定删除收货地址?', [
        {text: '取消'},
        {text: '确定', onPress:() => {
          msg.emit('address:delete', id);
        }}
      ])
    :
      msg.emit('app:alert', {
        title: '提示',
        msgContent: '确定删除收货地址?',
        cancelText: '取消',
        okText: '确定',
        okHandle: () => {msg.emit('address:delete', id)}
      })
  }


  _chooseAddress(data){
    msg.emit('address:choose', data);
    msg.emit('route:backToLast');
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    backgroundColor: '#FFF'
  },
  mobileView: {
    alignItems: 'flex-end',
  },
  mobile: {
    //marginLeft: 20,
    fontSize: 16,
  },
  info: {
    //flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addrDetail: {
    color: '#999',
    lineHeight: 20,
    marginTop: 5,
  },
  action: {
    marginTop: 10,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1 / PixelRatio.get(),
    borderStyle: 'dotted',
    borderTopColor: '#eee',
  },
  right: {
    flexDirection: 'row'
  },
  btnIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  textBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  }
});
