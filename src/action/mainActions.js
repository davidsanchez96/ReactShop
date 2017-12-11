import NetUtils from "../utils/NetUtils";
import {AreaUrl, URL} from "../utils/Constant";
import {Address, Change, Loaded, Loading, NetError, Show} from "../utils/actionTypes";
import {AsyncStorage} from 'react-native';
import {detail} from "./detailActions";

export function getMain() {
    return (dispatch) => {
        dispatch({type: Loading});
        NetUtils.get(URL,
            (result) => {
                console.log(URL + result);
                dispatch({type: Loaded, data: result});
            },
            (error) => {
                console.log('---------' + error);
                dispatch({type: NetError});
            });
    }
}

export function getAddress(goodsInfoId) {
    return (dispatch) => {
        const data = AsyncStorage.getItem('KStoreApp@defaultRegion');
        if (data && data.districtId) {
            dispatch({type: Address, data: data});
            dispatch(detail( data.districtId,goodsInfoId))
        } else {
            NetUtils.get(AreaUrl,
                (result) => {
                    console.log(URL + result);
                    AsyncStorage.setItem('KStoreApp@defaultRegion', JSON.stringify(result));
                    dispatch({type: Address, data: result});
                    dispatch(detail(result.districtId,goodsInfoId ));
                },
                (error) => {
                    console.log('---------' + error);
                });
        }
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