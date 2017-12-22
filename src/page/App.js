import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import {
    TabNavigator,
    StackNavigator,
    NavigationActions,
    addNavigationHelpers
} from 'react-navigation';
import Main from './main/Main';
import Goods from './category/Category';
import {connect} from 'react-redux';
import GoodsDetail from "./category/GoodsDetail";
import Shopping from "./shopping/Shopping";
import User from "./user/User";
import Search from "./components/Search";
import {BackHandler} from "react-native";
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


const HomeNavigator = TabNavigator({
        Main: {screen: Main},
        Goods: {screen: Goods},
        Shopping: {screen: Shopping},
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