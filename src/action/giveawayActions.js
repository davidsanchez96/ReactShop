import NetUtils from "../utils/NetUtils";
import {GiveawayRuleUrl, GiveawayUrl} from "../utils/Constant";
import {AsyncStorage} from 'react-native';
import {GiveawayLoaded, GiveawayLoading, NetError} from "../utils/actionTypes";

export function giveawayList(fullBuyPresentMarketingId, store_index, marketing_index) {
    return (dispatch) => {
        dispatch({type: GiveawayLoading});
        AsyncStorage.getItem('KStoreApp@defaultRegion', (error, result) => {
            const districtId = JSON.parse(result).districtId;
            NetUtils.get(GiveawayUrl + `${fullBuyPresentMarketingId}/${districtId}/goods`,
                (result) => {
                    console.log(result);
                    NetUtils.get(GiveawayRuleUrl + fullBuyPresentMarketingId + '/fullBuyPresentMarketing',
                        (res) => {
                            console.log(result);
                            dispatch({
                                type: GiveawayLoaded,
                                data: result,
                                store_index: store_index,
                                marketing_index: marketing_index,
                                result: res
                            });
                        },
                        (error) => {
                            console.log(error);
                            dispatch({type: NetError});
                        });
                },
                (error) => {
                    console.log(error);
                    dispatch({type: NetError});
                });
        });

    }
}




