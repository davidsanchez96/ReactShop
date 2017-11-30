import React, {Component} from 'react';
import {
    View,
    Text,
    PixelRatio,
    ListView,
    AsyncStorage,
    InteractionManager,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {HeaderBackButton} from 'react-navigation';
import Loading from "../components/Loading";
import {address} from "../../action/addressActions";
import {AddressSelect} from "../../utils/actionTypes";
import Immutable from 'immutable';

const noop = () => {
};

const FIELDS = [
    ['provinceId', 'provinceName'],
    ['cityId', 'cityName'],
    ['districtId', 'districtName']
];

/**
 * 公共的省市区的级联组件
 */
class Address extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: '选择地址',
            headerRight:
                (
                    <TouchableOpacity style={{padding: 10}} activeOpacity={0.8}>
                        <Text style={{color: '#999',}} allowFontScaling={false}> 刷新</Text>
                    </TouchableOpacity>
                ),
            headerLeft: <HeaderBackButton
                onPress={() => params.onBack()}/>,
        };
    };

    static defaultProps = {
        onSubmit: noop
    };

    constructor(props) {
        super(props);
        /*当前已经选择的数据*/
        this._selected = [];

        /*初始化数据源*/
        this._ds = new ListView.DataSource({
            rowHasChanged(r1, r2) {
                return r1 != r2;
            }
        });
        this.state = {
            /*当前需要渲染的数据的路径*/
            dataPath: [],
            /*是否正在loading,默认true*/
            isLoading: true
        }
    }


    componentWillMount() {
        //是不是onPress正在处理
        this._resolve = false;
    }


    componentDidUpdate() {
        this._listRegion && this._listRegion.scrollTo({x: 0, y: 0, animated: false});
    }


    componentDidMount() {
        this.props.navigation.setParams({
            onBack: this._handleBack,
        });
        InteractionManager.runAfterInteractions(
            // async
            () => {
                // try {
                //     const regionStr = await AsyncStorage.getItem('KStoreApp@Region');
                //     if (regionStr) {
                //         this._cache = fromJS(JSON.parse(regionStr));
                //
                //         this.setState({
                //             isLoading: false,
                //             dataPath: []
                //         });
                //
                //         return;
                //     }
                // } catch (e) {
                // }
                this.props.dispatch(address());

                // //获取数据
                // fetchAll().then((res) => {
                //     this._cache = fromJS(res);
                //
                //     this.setState({
                //         isLoading: false,
                //         dataPath: []
                //     });
                //
                //     AsyncStorage.setItem('KStoreApp@Region', JSON.stringify(res));
                // });
            }
        );
    }


    render() {
        const {addressReducer} = this.props;
        const loading = addressReducer.get('loading');
        return (
            loading ? <Loading/> :
                <FlatList
                    keyExtractor={item => item.areaId}
                    data={addressReducer.get('showData')}
                    renderItem={this._renderItem}/>
        );
    }

    /**
     * 手动触发刷新列表
     * @private
     */
    _refreshList() {
        this.setState({
            isLoading: true,
            dataPath: []
        });
        this._selected = [];
        this.setState({
            dataPath: []
        });

        // fetchAll().then((res) => {
        //     this._cache = fromJS(res);
        //
        //     this.setState({
        //         isLoading: false,
        //         dataPath: []
        //     });
        //
        //     AsyncStorage.setItem('KStoreApp@Region', JSON.stringify(res));
        // });
    }


    /**
     * 渲染每一行
     *
     * @param row
     * @param _
     * @param index
     * @returns {XML}
     * @private
     */
    _renderItem = ({item, index}) => {
        const id = item.areaId;
        const name = item.areaName;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                key={id}
                style={styles.row}
                onPress={() => this._handlePress(index, id, name)}>
                <Text style={styles.grey} allowFontScaling={false}>{name}</Text>
            </TouchableOpacity>
        );
    }


    /**
     * 处理点击事件
     *
     * @param index
     * @param id
     * @param name
     * @private
     */
    _handlePress(index, id, name) {

        if (this._resolve) {
            return;
        }


        this._resolve = true;
        const {addressReducer, navigation} = this.props;
        //获取子元素
        const path = [...this.state.dataPath, index, 'child'];
        console.log(Immutable.is(addressReducer.get('data')))
        const data = Immutable.fromJS(addressReducer.get('data')).getIn(path);

        if (data.count() > 0) {
            this._selected.push([id, name]);
            InteractionManager.runAfterInteractions(() => {
                this._resolve = false;

                this.setState({
                    dataPath: path
                });


                this.props.dispatch({type: AddressSelect, data: data.toJS()});
            });
        } else {
            this._selected.push([id, name]);
            //防止重复点击
            if (this._selected.length - 1 > this.state.dataPath.length / 2) {
                this._selected = [...this._selected.slice(0, -1)];
            }

            //组合对象
            const selected = this._selected.reduce((init, v, k) => {
                init[FIELDS[k][0]] = v[0];
                init[FIELDS[k][1]] = v[1];
                return init;
            }, {});

            if (this._selected.length < 3) {
                //如果省市区未选完全,不让提交
                this._selected = [];
                this.setState({
                    dataPath: []
                });
                this._resolve = false;
                // msg.emit('app:tip', '省市区数据有误,请重新选择!');
            } else {
                this.props.onSubmit(selected);
                navigation.state.params.selectBack(selected);
                navigation.goBack()
                // msg.emit('region:data', selected);
                // msg.emit('route:backToLast');
            }
        }
    }


    /**
     * 处理返回事件
     *
     * @private
     */
    _handleBack = () => {
        const {navigation, addressReducer} = this.props;
        if (this._selected.length === 0) {
            navigation.goBack();
            return;
        }

        this._selected = [...this._selected.slice(0, -1)];
        const path = this.state.dataPath.slice(0, -2);
        const data = Immutable.fromJS(addressReducer.get('data')).getIn(path);
        this.props.dispatch({type: AddressSelect, data: data.toJS()});
        this.setState({
            dataPath: this.state.dataPath.slice(0, -2)
        });
    }


}

const mapStateToProps = (state) => ({
    addressReducer: state.get('addressReducer'),
});
export default connect(mapStateToProps)(Address);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        height: 50,
        paddingLeft: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1 / PixelRatio.get()
    },
    grey: {
        color: '#666',
        fontSize: 16
    },
    text: {
        color: '#666',
        fontSize: 14,
        marginLeft: 20
    }
});

