import React, {Component} from 'react';
import {
    Text,
    SectionList,
} from 'react-native';
import {connect} from 'react-redux';
import GoodsTop from "../components/GoodsTop";
import {goodsList} from "../../action/goodsListActions";

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
        this.props.dispatch(goodsList('1'));
    }

    render() {
        const sections = [];
        const {goodsListReducer} = this.props;
        let loading = goodsListReducer.loading;
        sections.push({title: ' 21321312', data: goodsListReducer.data});
        return (
            <SectionList
                renderItem={({item}) => <Text> 324</Text>}
                renderSectionHeader={({section}) => {
                    return (
                        section.title ?
                            <Text> {section.title}</Text> :
                            null
                    );
                }
                }
                stickySectionHeadersEnabled={true}
                keyExtractor={item => item.id}
                removeClippedSubviews={false}
                sections={sections}
                onRefresh={() => {
                    this.props.dispatch(goodsList());
                }}
                refreshing={loading}
            />
        );
    }

    _back = () => {
        const {goBack} = this.props.navigation;
        const {nav} = this.props;
        let key;
        for (let i = 0; i < nav.routes.length; i++) {
            if (nav.routes[i].routeName === 'Search') {
                key = nav.routes[i].key;
                break;
            }
        }
        goBack(key);
    }
}

const mapStateToProps = (state) => ({
    goodsListReducer: state.goodsListReducer,
    nav: state.nav,
});
export default connect(mapStateToProps)(GoodsList);