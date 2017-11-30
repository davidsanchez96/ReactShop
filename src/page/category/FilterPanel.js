import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
    Image,
} from 'react-native';
import FilterButton from "../components/FilterButton";
import FilterList from "../components/FilterList";
import Loading from "../components/Loading";
import {filter} from "../../action/filterActions";
import {FilterAddress, FilterType} from "../../utils/actionTypes";


/**
 * 商品筛选条件面板
 */
class FilterPanel extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '筛选',
            headerLeft:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8} onPress={() => {
                        navigation.goBack()
                    }
                    }>
                        <Text style={{color: '#999',}} allowFontScaling={false}>取消</Text>
                    </TouchableOpacity>
                ),
            headerRight:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8}>
                        <Text style={{color: '#999',}} allowFontScaling={false}>确定</Text>
                    </TouchableOpacity>
                ),
        };
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.dispatch(filter(this.props.navigation.state.params.searchParam));
        });
    }


    render() {
        const {filterReducer, navigation, dispatch} = this.props;
        const loading = filterReducer.get('loading');
        return (
            <View style={styles.flowLayerRight}>
                {loading ? <Loading/> :

                    <ScrollView bounces={false}>
                        <TouchableOpacity
                            style={styles.container}
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.navigate('Address', {
                                    selectBack: (select) => {
                                        console.log(select)
                                        dispatch({type: FilterAddress, data: select});
                                    }
                                })
                            }}
                        >
                            <Text style={styles.text} allowFontScaling={false}>配送至</Text>
                            <Text
                                style={styles.btnText}
                                allowFontScaling={false}
                                numberOfLines={1}>
                                {filterReducer.get('address').get('region')}
                            </Text>
                            <Image source={require('../components/img/right.png')}
                                   style={styles.rightImage}/>
                        </TouchableOpacity>
                        <FilterButton
                            selectedValues={filterReducer.get('selectedValues')}
                            setSelect={(propName) => {
                                dispatch({type: FilterType, data: propName});
                            }}/>
                        <FilterList
                            filterReducer={filterReducer}/>
                        <TouchableOpacity
                            style={styles.clean}
                            activeOpacity={0.8}
                            onPress={() => msg.emit('goodsFilterCondition:clearSelectedValue')}>
                            <Text style={styles.cleanText} allowFontScaling={false}>
                                清除选项
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                }
            </View>
        );
    }
}

const
    mapStateToProps = (state) => ({
        filterReducer: state.get('filterReducer'),
    });
export default connect(mapStateToProps)(FilterPanel);

const
    styles = StyleSheet.create({
        clean: {
            backgroundColor: '#FFF',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 200,
            marginTop: 20,
            marginBottom: 20
        },

        flowLayerRight: {
            backgroundColor: '#eee',
            flex: 1,
            paddingBottom: 20,
        },

        cleanText: {
            color: 'grey',
            fontSize: 14,
        },
        container: {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: '#FFF',
            marginBottom: 1,
        },
        btnBlock: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        btnText: {
            color: '#e63a59',
            textAlign: 'right',
            flex: 1,
            paddingLeft: 20
        },
        text: {
            color: 'gray',
        },
        rightImage: {
            alignSelf: 'center',
            width: 10,
            height: 10,
        }
    });


