import NetUtils from "../utils/NetUtils";
import {AreaUrl, URL} from "../utils/Constant";
import {Address, Change, Loaded, Loading, NetError, Show} from "../utils/actionTypes";
import {AsyncStorage} from 'react-native';
import {detail} from "./detailActions";
import {shopListCount} from "./shopListActions";

export function getMain() {
    return (dispatch) => {
        dispatch({type: Loading});
        AsyncStorage.getItem('hkshop@data',(error, result)=>{
            if(result){
                window.token =JSON.parse(result).token
            }
            dispatch(shopListCount());
            NetUtils.get(URL,
                (result) => {
                    console.log(URL + result);
                    dispatch({type: Loaded, data: result});
                },
                (error) => {
                    console.log('---------' + error);
                    dispatch({type: NetError});
                });
        });

    }
}

export function getAddress(goodsInfoId) {
    return (dispatch) => {
        AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
            if (result) {
                const data = JSON.parse(result);
                dispatch({type: Address, data: data});
                dispatch(detail(data.districtId, goodsInfoId))
            } else {
                NetUtils.get(AreaUrl,
                    (result) => {
                        console.log(URL + result);
                        AsyncStorage.setItem('KStoreApp@defaultRegion', JSON.stringify(result));
                        dispatch({type: Address, data: result});
                        dispatch(detail(result.districtId, goodsInfoId));
                    },
                    (error) => {
                        console.log('---------' + error);
                    });
            }
        });

    }

}

export function getDefaultAddress() {
    return (dispatch) => {
        AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
            if (result) {
                console.log( result);
            } else {
                NetUtils.get(AreaUrl,
                    (result) => {
                        console.log(URL + result);
                        AsyncStorage.setItem('KStoreApp@defaultRegion', JSON.stringify(result));
                    },
                    (error) => {
                        console.log('---------' + error);
                    });
            }
        });

    }

}

export function show(index) {
    return {
        type: Show,
        show: index,
    }
}

export function change(index) {
    return {
        type: Change,
        change: index,
    }
}