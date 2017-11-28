import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    View,
    Text,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    InteractionManager,
    Platform,
    Image,
} from 'react-native';
import FilterButton from "../components/FilterButton";
import FilterList from "../components/FilterList";
import Loading from "../components/Loading";
import {filter} from "../../action/filterActions";


const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

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
        const {filterReducer} = this.props;
        const loading = filterReducer.get('loading');
        return (
            <View style={styles.flowLayerContainer}>
                <View style={styles.flowLayerRight}>
                    {loading ? <Loading/> :

                        <ScrollView bounces={false}>
                            <TouchableOpacity
                                style={styles.container}
                                activeOpacity={0.8}
                                onPress={() => msg.emit('route:goToNext', {sceneName: 'Region'})}
                            >
                                <Text style={styles.text} allowFontScaling={false}>配送至</Text>
                                <View style={styles.btnBlock}>
                                    <Text
                                        style={styles.btnText}
                                        allowFontScaling={false}
                                        numberOfLines={1}>
                                    </Text>
                                    <Image source={require('../components/img/right.png')}
                                           style={styles.rightImage}/>
                                </View>
                            </TouchableOpacity>
                            <FilterButton
                                selectedValues={filterReducer.get('selectedValues')}/>
                            <FilterList
                                aggregations={filterReducer.get('aggregations')}/>
                            <TouchableOpacity
                                style={styles.btnBlock}
                                activeOpacity={0.8}
                                onPress={() => msg.emit('goodsFilterCondition:clearSelectedValue')}>
                                <Text style={styles.btnText} allowFontScaling={false}>
                                    清除选项
                                </Text>
                            </TouchableOpacity>

                        </ScrollView>
                    }
                </View>
            </View>
        );
    }
}

const
    mapStateToProps = (state) => ({
        filterReducer: state.get('filterReducer'),
    });
export default connect(mapStateToProps)

(
    FilterPanel
)
;

const
    styles = StyleSheet.create({
        btnBlock: {
            backgroundColor: '#FFF',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 200,
            marginTop: 20,
            marginBottom: 20
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        flowLayerRight: {
            //width: WIDTH - 35,
            height: HEIGHT,
            backgroundColor: '#eee',
            flex: 1,
            marginTop: isAndroid ? 0 : 20,
            paddingBottom: 20,
        },
        text: {
            width: 100,
            height: 100,
        },
        btnText: {
            color: 'grey',
            fontSize: 14,
        },
        loadingView: {
            flex: 1,
            alignItems: 'stretch',
            height: HEIGHT / 2
        },
        container: {
            height: 50,
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: '#FFF',
            marginBottom: 1 / PixelRatio.get(),
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


