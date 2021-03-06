import React from 'react';
import {BackHandler, Image, StyleSheet, TouchableOpacity, View,} from 'react-native'
import {addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator} from 'react-navigation';
import Main from './main/Main';
import Goods from './category/Category';
import {connect} from 'react-redux';
import GoodsDetail from "./category/GoodsDetail";
import User from "./user/User";
import Search from "./components/Search";
import GoodsList from "./category/GoodsList";
import FilterPanel from "./category/FilterPanel";
import Address from "./category/Address";
import FilterSelect from "./category/FilterSelect";
import Comment from "./category/Comment";
import Login from "./user/Login";
import FindPasswordFirst from "./user/FindPasswordFirst";
import FindPasswordSecond from "./user/FindPasswordSecond";
import FindPasswordThird from "./user/FindPasswordThird";
import Account from "./user/account/Account";
import Nickname from "./user/account/Nickname";
import Gender from "./user/account/Gender";
import ReceiveAddress from "./user/account/ReceiveAddress";
import AddAddress from "./user/account/AddAddress";
import Security from "./user/account/Security";
import ModifyPasswordFirst from "./user/account/ModifyPasswordFirst";
import ModifyPasswordSecond from "./user/account/ModifyPasswordSecond";
import PayPasswordFirst from "./user/account/PayPasswordFirst";
import PayPasswordSecond from "./user/account/PayPasswordSecond";
import PayPasswordThird from "./user/account/PayPasswordThird";
import SetPhoneFirst from "./user/account/SetPhoneFirst";
import SetPhoneSecond from "./user/account/SetPhoneSecond";
import SetPhoneThird from "./user/account/SetPhoneThird";
import ModifyPhoneFirst from "./user/account/ModifyPhoneFirst";
import ModifyPhoneSecond from "./user/account/ModifyPhoneSecond";
import ModifyPhoneThird from "./user/account/ModifyPhoneThird";
import Follow from "./user/Follow";
import Browse from "./user/Browse";
import PreDeposit from "./user/PreDeposit";
import TradeDetail from "./user/TradeDetail";
import Integration from "./user/Integration";
import Coupon from "./user/Coupon";
import CouponDetail from "./user/CouponDetail";
import SecurityTip from "./user/account/SecurityTip";
import Order from "./user/Order";
import Message from "./user/Message";
import MessageDetail from "./user/MessageDetail";
import OrderDetail from "./user/OrderDetail";
import OrderCancel from "./user/OrderCancel";
import CommentDetail from "./user/CommentDetail";
import Shop from "./shopping/Shop";
import SalesPromotion from "./shopping/SalesPromotion";
import Giveaway from "./shopping/Giveaway";


const HomeNavigator = TabNavigator({
        Main: {screen: Main},
        Goods: {screen: Goods},
        Shop: {screen: Shop},
        User: {screen: User}
    }, {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#fd4062',
            inactiveTintColor: 'gray', // 文字和图片未选中颜色
            showIcon: true,
            showLabel: true,
            indicatorStyle: {
                height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
            style: {
                backgroundColor: 'white', // TabBar 背景色
                padding: 0,
                margin: 0,
            },
            labelStyle: {
                fontSize: 12,
                padding: 0,
                margin: 0,
            },
            iconStyle: {
                width: 150,
                padding: 0,
                margin: 0,
            },
            tabStyle: {
                padding: 0,
                margin: 0,
            }

        },

    }
);
export const AppNavigator = StackNavigator({
        Home: {
            screen: HomeNavigator,
        },
        GoodsDetail: {
            screen: GoodsDetail,
        },
        Search: {
            screen: Search,
        },
        GoodsList: {
            screen: GoodsList,
        },
        FilterPanel: {
            screen: FilterPanel,
        },
        Address: {
            screen: Address,
        },
        FilterSelect: {
            screen: FilterSelect,
        },
        Comment: {
            screen: Comment,
        },
        CommentDetail: {
            screen: CommentDetail,
        },
        Login: {
            screen: Login,
        },
        FindPasswordFirst: {
            screen: FindPasswordFirst,
        },
        FindPasswordSecond: {
            screen: FindPasswordSecond,
        },
        FindPasswordThird: {
            screen: FindPasswordThird,
        },
        Account: {
            screen: Account,
        },
        Nickname: {
            screen: Nickname,
        },
        Gender: {
            screen: Gender,
        },
        ReceiveAddress: {
            screen: ReceiveAddress,
        },
        AddAddress: {
            screen: AddAddress,
        },
        Security: {
            screen: Security,
        },
        SecurityTip: {
            screen: SecurityTip,
        },
        ModifyPasswordFirst: {
            screen: ModifyPasswordFirst,
        },
        ModifyPasswordSecond: {
            screen: ModifyPasswordSecond,
        },
        PayPasswordFirst: {
            screen: PayPasswordFirst,
        },
        PayPasswordSecond: {
            screen: PayPasswordSecond,
        },
        PayPasswordThird: {
            screen: PayPasswordThird,
        },
        SetPhoneFirst: {
            screen: SetPhoneFirst,
        },
        SetPhoneSecond: {
            screen: SetPhoneSecond,
        },
        SetPhoneThird: {
            screen: SetPhoneThird,
        },
        ModifyPhoneFirst: {
            screen: ModifyPhoneFirst,
        },
        ModifyPhoneSecond: {
            screen: ModifyPhoneSecond,
        },
        ModifyPhoneThird: {
            screen: ModifyPhoneThird,
        },
        Follow: {
            screen: Follow,
        },
        Browse: {
            screen: Browse,
        },
        PreDeposit: {
            screen: PreDeposit,
        },
        TradeDetail: {
            screen: TradeDetail,
        },
        Integration: {
            screen: Integration,
        },
        Coupon: {
            screen: Coupon,
        },
        CouponDetail: {
            screen: CouponDetail,
        },
        Order: {
            screen: Order,
        },
        OrderDetail: {
            screen: OrderDetail,
        },
        OrderCancel: {
            screen: OrderCancel,
        },
        Message: {
            screen: Message,
        },
        MessageDetail: {
            screen: MessageDetail,
        },
        SalesPromotion: {
            screen: SalesPromotion,
        },
        Giveaway: {
            screen: Giveaway,
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            headerBackTitle: null,
            headerTintColor: 'gray',
            headerTitleStyle: {
                color: '#333',
                backgroundColor: 'white',
                alignSelf: 'center',
                textAlign: 'center',
            },
            headerLeft: navigation.state.routeName === 'Home' ? <View/> : (
                <TouchableOpacity style={styles.backBtn}
                                  activeOpacity={0.8}
                                  onPress={() => {
                                      navigation.goBack();
                                  }}>
                    <Image style={styles.backIcon}
                           source={require('./components/img/left.png')}/>
                </TouchableOpacity>
            ),
        })
    }
    )
;


class App extends React.PureComponent {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })}/>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };
}

const styles = StyleSheet.create({
    backBtn: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 20
    },
    backIcon: {
        width: 12,
        height: 22
    },

});

const mapStateToProps = (state) => ({
    nav: state.get('nav').toJS()
});

export default connect(mapStateToProps)(App);