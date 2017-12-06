import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    InteractionManager,
    Platform
} from 'react-native';

import Loading from "../components/Loading";
import {SelectClean, SelectLoaded} from "../../utils/actionTypes";
import FilterSelectList from "../components/FilterSelectList";
import FilterBrandList from "../components/FilterBrandList";

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
import Immutable from 'immutable';

/**
 * 商品筛选条件值选择面板
 */
class FilterSelect extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.displayPropName,

            headerRight:
                (
                    navigation.state.params.propName === 'cates' || navigation.state.params.propName === 'prices'
                        ?
                        null
                        :
                        <TouchableOpacity
                            style={{padding: 10}}
                            activeOpacity={0.8}
                            onPress={navigation.state.params.onPress}>
                            <Text style={{color: '#999',}} allowFontScaling={false}>确定</Text>
                        </TouchableOpacity>
                ),
        };
    };

    shouldComponentUpdate(nextProps, nextState) {

        return !Immutable.is(this.props.selectReducer, nextProps.selectReducer) ||
            !Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState));
    }

    componentDidMount() {

        this.props.navigation.setParams({
                onPress: () => {
                    const {selectReducer} = this.props;
                    this.props.navigation.state.params.callBack(selectReducer.get('propName'), selectReducer.get('selectedValue').keySeq().toJS());
                    this.props.navigation.goBack();
                },
            }
        );
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch({type: SelectLoaded, data: this.props.navigation.state.params})
        });
    }

    componentWillUnmount() {
        this.props.dispatch({type: SelectClean});
    }

    render() {
        const {selectReducer, dispatch, navigation} = this.props;
        const propName = selectReducer.get('propName');
        const displayPropName = selectReducer.get('displayPropName');

        if (selectReducer.get('loading')) {
            return <Loading/>
        }

        return (
            <View style={styles.flowLayerContainer}>
                <View style={styles.container}>
                    {
                        propName === 'brands'
                            ?
                            <FilterBrandList
                                navigation={navigation}
                                dispatch={dispatch}
                                selectReducer={selectReducer}/>
                            :
                            <ScrollView bounces={false}>
                                <FilterSelectList
                                    navigation={navigation}
                                    dispatch={dispatch}
                                    selectReducer={selectReducer}/>
                            </ScrollView>
                    }
                </View>
            </View>
        );
    }
}


const mapStateToProps = (state) => ({
    selectReducer: state.get('selectReducer'),
});
export default connect(mapStateToProps)(FilterSelect);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
    },
    flowLayerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flex: 1,
    },
    flowLayerLeft: {
        width: 35,
        height: HEIGHT,
        backgroundColor: 'rgba(126, 126, 126, 0.6)'
    },
    text: {
        width: 100,
        height: 100,
    }
});

