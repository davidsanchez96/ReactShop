import React from 'react';
import {TabNavigator, StackNavigator, addNavigationHelpers} from 'react-navigation';
import Main from './main/Main';
import Goods from './goods/Category';
import {connect} from 'react-redux';
import GoodsDetail from "./goods/GoodsDetail";
import Shopping from "./shopping/Shopping";
import User from "./user/User";
import Search from "./components/Search";
import SearchBar from "./components/SearchBar";
import MainTopBar from "./components/MainTopBar";


const HomeNavigator = TabNavigator({
        Main: {screen: Main},
        Goods: {screen: Goods},
        Shopping: {screen: Shopping},
        User: {screen: User}
    }, {
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
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
                margin:0,
            },
            labelStyle: {
                fontSize: 12,
                padding: 0,
                margin:0,
            },
            iconStyle: {
                width: 150,
                padding: 0,
                margin:0,
            },
            tabStyle:{
                padding: 0,
                margin:0,
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
    SearchBar: {
        screen: SearchBar,
    },
    MainTopBar: {
        screen: MainTopBar,
    },
});


class App extends React.Component {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })}/>
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

export default connect(mapStateToProps)(App);