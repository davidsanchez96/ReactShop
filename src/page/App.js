import React from 'react';
import {TabNavigator, StackNavigator, addNavigationHelpers} from 'react-navigation';
import Main from './main/Main';
import Goods from './goods/Category';
import {connect} from 'react-redux';
import GoodsDetail from "./goods/GoodsDetail";
import Shopping from "./shopping/Shopping";
import User from "./user/User";


const HomeNavigator = TabNavigator({
        Main: {screen: Main},
        Goods: {screen: Goods},
        Shopping: {screen: Shopping},
        User: {screen: User}
    }, {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#fd4062',
            showIcon: true,
            indicatorStyle: {
                height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
            style: {
                backgroundColor: '#fff', // TabBar 背景色
                // height: 44
            },
        }
    }
);
export const AppNavigator = StackNavigator({
    Home: {
        screen: HomeNavigator,

    },
    GoodsDetail: {
        screen: GoodsDetail,
    }
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