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
import {SelectLoaded} from "../../utils/actionTypes";
import FilterSelectList from "../components/FilterSelectList";

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

/**
 * 商品筛选条件值选择面板
 */
class FilterSelect extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerRight:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8}>
                        <Text style={{color: '#999',}} allowFontScaling={false}>确定</Text>
                    </TouchableOpacity>
                ),
        };
    };

    componentDidMount() {
        var receivedProps = {
            propName: this.props.propName,
            displayPropName: this.props.displayPropName,
            selectedValue: this.props.selectedValue,
            valueList: this.props.valueList,
        };
        InteractionManager.runAfterInteractions(() => {
           this.props.dispatch({type:SelectLoaded,data:this.props.navigation.state.params})
        });
    }


    render() {
        const {selectReducer} = this.props;
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
                            <BrandValueItemList/>
                            :
                            <ScrollView bounces={false}>
                                <FilterSelectList
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

