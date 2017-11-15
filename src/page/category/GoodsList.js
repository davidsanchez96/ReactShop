import React, {Component} from 'react';
import {
    Text,
} from 'react-native';
import {connect} from 'react-redux';
import GoodsTop from "../components/GoodsTop";

class GoodsList extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let header = (
            <GoodsTop
                searchText={params.searchText}
                onBack={params.onBack}
            />)
        return {header};
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onBack: this._back,
            searchText: this.props.searchText,
        });
    }

    render() {
        return <Text>GoodsDetail</Text>
    }

    _back = () => {
        const {goBack} = this.props.navigation;
        const {nav} = this.props;
        let key;
        for(let i=0;i<nav.routes.length;i++){
            if(nav.routes[i].routeName==='Search'){
                key=nav.routes[i].key;
                break;
            }
        }
        goBack(key);
    }
}

const mapStateToProps = (state) => ({
    searchReducer: state.searchReducer,
    nav: state.nav,
});
export default connect(mapStateToProps)(GoodsList);