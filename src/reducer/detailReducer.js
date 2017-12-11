import * as types from '../utils/actionTypes';
import Immutable, {fromJS, List, Map} from 'immutable';

const initialState = Immutable.fromJS({
    //是否loading完成
    loading: true,
    //货品查询是否存在
    goodsInfoExist: true,
    //sku图片列表
    imageList: null,
    //商品详情
    goodsInfo: {},
    //商品详情规格
    spec: {
        //详情展示选中
        specText: '',
        specInfos: [],
        chosenNum: 1
    },
    //评价列表
    commentList: [],
    //促销信息
    marketings: [],
    //商品组合信息
    groupList: [],
    promotionVisible: false,

    //默认选中地区
    region: {
        province: '',
        city: '',
        district: '',
        districtId: null
    },

    //规格
    specVisible: false,
    //规格参数
    spuParamItems: [],
    //spu规格值
    specs: [],
    //addSatus
    addStatus: true,
    //sku规格值
    skuSpecs: [],
    //规格状态数组
    specStatusArray: [],
    //选中规格值
    specChoose: [],
    //店铺基本信息
    storeInfo: {},
    //添加购物车form
    shoppingCartForm: {
        goodsInfoId: '',
        districtId: '',
        goodsNum: ''
    },
    //购物车统计
    shoppingCartCount: 0,
    //shoppingGoodsView: false,
    //商品关注state
    followerState: false,
    //商品详情图文/规格/售后 展示切换状态
    chosenTab: 'goodIntro',
    //图文详情
    goodsImages: [],
    //图文详情
    goodsDesc: '',
    //商品服务支持
    goodsSupports: [],
    //因为商品详情父scrollview捕获滑动事件导致猜你喜欢无法获取滑动事件,先屏蔽掉该选项
    guessProductLikeVisible: false,
    guessProductLikeBarVisible: false,
    //优惠券
    coupons: [],
    bounces: true

});

export default function detailReducer(state = initialState, action) {
    switch (action.type) {
        case types.DetailLoading:
            return state.set('loading', true);
        case types.DetailLoaded:
            return state.withMutations((cursor) => {
                cursor.set('loading', false);
                const resMap = fromJS(action.data);
                cursor.set('goodsInfo', resMap);
                cursor.set('imageList', resMap.get('imageList'));

                //规格处理
                let specText = '';
                //清除原有规格
                cursor.deleteIn(['spec', 'specInfos']);
                (resMap.get('specItemList') || []).map((val, i) => {
                    specText += `${val.getIn(['spec', 'name'])} ${val.get('specValueRemark') || val.getIn(['specValue', 'name'])}`;
                    //设置选中的 specId 如颜色,specValueId 如金色
                    cursor.setIn(['spec', 'specInfos', i, 'specId'], val.get('specId'));
                    cursor.setIn(['spec', 'specInfos', i, 'specValueId'], val.get('specValueId'));
                });

                cursor.setIn(['spec', 'specText'], specText);
                //评价列表
                cursor.set('commentList', resMap.get('commentList') || new List);
                //促销信息
                cursor.set('marketings', resMap.get('marketingResponses') || new List);
                //店铺基本信息
                cursor.set('storeInfo', resMap.get('storeInfo') || new Map);
                //商品规格参数
                cursor.set('spuParamItems', resMap.get('paramItemList') || new List);
                //图文详情
                //cursor.set('goodsImages', resMap.getIn(['spuDesc', 'imageList']) || new List);
                ////图文下详情
                //cursor.set('goodsDesc', resMap.getIn(['spuDesc', 'desc']));
                ////商品服务支持
                cursor.set('goodsSupports', resMap.get('goodsSupports') || new List);
                //商品组合信息
                //debugger;
                cursor.set('groupList', resMap.get('groupList') || new List);
                //查询优惠券

            });
        case types.NetError:
            return state.set('loading', false);
        case types.Address:
            return state.withMutations((cursor) => {
                cursor
                    .setIn(['region', 'province'], action.data.provinceName)
                    .setIn(['region', 'city'], action.data.cityName)
                    .setIn(['region', 'district'], action.data.districtName)
                    .setIn(['region', 'districtId'], action.data.districtId);
            });
        default:
            return state;
            break;
    }
}