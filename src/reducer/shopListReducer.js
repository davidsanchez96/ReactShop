import * as types from '../utils/actionTypes';
import Immutable, {fromJS, OrderedSet} from 'immutable';
import {ShopListLoaded} from "../utils/actionTypes";

const initialState = Immutable.fromJS({
    loading: true,
    page: 0,
    reloading: false,
    loadingMore: false,
    hasMore: false,
    data: [],
    total: 0,
    cart: [],
    goodChecked: false,
    editable: false,
    checkedList: new OrderedSet([]),

    sellerChecked: false,
    totalPrice: '0.00',
    sumPrice: '0.00',
    yhPrice: '0.00',
    cartNum: '0',

    checkedAll: false,
});
export default function shopListReducer(state = initialState, action) {
    switch (action.type) {
        case types.ShopListLoading:
            return state.set('loading', true);
        case types.ShopListLoaded:
            return state.withMutations((cursor) => {
                cursor
                    .set('cart', fromJS(action.data))
                    .set('isLoading', false);


                if (!cursor.get('checkedList').isEmpty()) {

                    cursor.get("cart").map((c, i) => {
                        var ck = true;
                        c.get("marketingList").map((m, j) => {
                            m.get("productResponseList").map((p, q) => {
                                ck = cursor.get("checkedList").has(p.get("shoppingCartId")) && ck;
                            });
                        });
                        c.get("productResponseList").map((p, q) => {
                            ck = cursor.get("checkedList").has(p.get("shoppingCartId")) && ck;
                        });

                        cursor.setIn(['cart', i, 'checked'], ck);

                    });

                    var ak = true;
                    cursor.get("cart").map((c, i) => {
                        ak = c.get("checked") && ak;
                    })
                    cursor.set("checkedAll", ak);
                }
                selectAll(cursor);
                jisuan(cursor);
            });
        case types.NetError:
            return state.set('loading', false);
        case types.ShopListAll:
            return state.withMutations((cursor) => {
                selectAll(cursor);

        });
        case types.MessageListEdit:
            return state.set('editable', !state.get('editable'));
        case types.MessageListItem:
            return state.withMutations((cursor) => {
                if (action.checked) {
                    cursor.set('checkedList', cursor.get('checkedList').concat(action.id));
                } else {
                    cursor.set('checkedList', cursor.get('checkedList').delete(action.id));
                }
            });
        case types.MessageListShowMore:
            return state.set('loadingMore', true);
        case types.MessageListClean:
            return initialState;
        default:
            return state;
    }
}
function selectAll(cursor) {
    if (cursor.get("checkedAll")) {
        cursor.set("checkedList", cursor.get("checkedList").clear());
        cursor.set("checkedAll", false);
        cursor.get("cart").map((c, i) => {
            cursor.setIn(['cart', i, 'checked'], false);

        });

    } else {
        cursor.get("cart").map((c, i) => {

            c.get("groupResponseList").map((p, q) => {
                cursor.set("checkedList", cursor.get("checkedList").add(p.get("shoppingCartId")));
            });

            c.get("marketingList").map((m, j) => {
                m.get("productResponseList").map((p, q) => {
                    cursor.set("checkedList", cursor.get("checkedList").add(p.get("shoppingCartId")));
                });

            });

            c.get("productResponseList").map((p, q) => {
                cursor.set("checkedList", cursor.get("checkedList").add(p.get("shoppingCartId")));
            });

        });
        cursor.set("checkedAll", true);
        cursor.get("cart").map((c, i) => {
            cursor.setIn(['cart', i, 'checked'], true);

        });

    }
}

function jisuan(cursor) {
    var totalPrice = 0;
    var sumPrice = 0;
    var yhPrice = 0;
    var cartNum = 0;
    //循环商家
    cursor.get("cart").map((c, i) => {
        var cartSumPrice = 0;
        var cartTotalPrice = 0;
        var cartYhPrice = 0;
        /**
         * 循环套装
         */
        c.get("groupResponseList").map((p, q) => {
            //如果选中的是当前这个
            if (cursor.get("checkedList").has(p.get("shoppingCartId"))) {
                var num = parseInt(p.get("groupNum"));

                cartNum += num;
                var warePrice = p.get("warePrice") * num;
                var preferAmount = p.get("groupPreferAmount") * num;

                cartTotalPrice += warePrice;
                cartYhPrice += preferAmount;
                cartSumPrice += warePrice + preferAmount;

            }
        });

        //循环促销
        c.get("marketingList").map((m, j) => {
            //原始总金额
            var mSumPrice = 0;
            //优惠后的总金额
            var mTotalPrice = 0;
            //当前优惠金额
            var mYhPrice = 0;
            //循环商品
            m.get("productResponseList").map((p, q) => {
                //如果选中的是当前这个
                if (cursor.get("checkedList").has(p.get("shoppingCartId"))) {
                    //原始金额
                    var num = parseInt(p.get("goodsNum"));
                    mSumPrice = mSumPrice + p.get("warePrice") * num;
                    if (m.get("codexType") == "1") {
                        //(价格-直降金额)*购买数量
                        if ((p.get("warePrice") - m.get("poffResponse").get("offValue")) > 0) {
                            mTotalPrice = mTotalPrice + (p.get("warePrice") - m.get("poffResponse").get("offValue")) * num;
                            mYhPrice += m.get("poffResponse").get("offValue") * num;
                        }
                    } else if (m.get("codexType") == "10" || m.get("codexType") == "11") {
                        //团购
                        //(价格*折扣)*购买数量
                        //mTotalPrice = mTotalPrice + (p.get("warePrice")*m.get("grouponPriceMarketingResponse").get("grouponDiscount"))*p.get("goodsNum");
                        mTotalPrice = mTotalPrice + p.get("warePrice") * num;
                        //优惠金额*数量
                        //mYhPrice = mYhPrice+(p.get("warePrice")*(1-m.get("grouponPriceMarketingResponse").get("grouponDiscount")))*p.get("goodsNum");
                        mYhPrice = 0.00;
                    } else {
                        //价格*数量
                        mTotalPrice = mTotalPrice + p.get("warePrice") * num;
                    }
                    cartNum += num;
                }
            });
            //满减
            if (m.get("codexType") == "5") {
                //循环满减规则
                var reducePrice = 0;
                m.get("frmResponseList").map((f, i) => {
                    if (mTotalPrice - f.get("fullPrice") >= 0) {
                        reducePrice = Math.max(f.get("reducePrice"), reducePrice);
                    }
                });

                if ((mTotalPrice - reducePrice) > 0) {
                    mYhPrice = reducePrice;
                    mTotalPrice = mTotalPrice - reducePrice;
                } else {
                    mYhPrice = mTotalPrice;
                    mTotalPrice = 0.00;
                }
            }
            querySelectGoodsPresent(cursor, m, i, j);
            //满折扣
            if (m.get("codexType") == "8") {
                //循环满减规则
                var fullBuyDiscount = 0;
                m.get("fdmResponseList").map((f, i) => {
                    if (mTotalPrice - f.get("fullPrice") >= 0) {
                        fullBuyDiscount = f.get("fullbuyDiscount");
                    }
                });
                if (fullBuyDiscount != 0) {
                    mYhPrice = mTotalPrice * (1 - fullBuyDiscount);
                }
                mTotalPrice = mTotalPrice - mYhPrice;
            }

            cartSumPrice += mSumPrice;
            cartTotalPrice += mTotalPrice;
            cartYhPrice += mYhPrice;
        });

        //循环不参与促销的商品
        //循环商品
        c.get("productResponseList").map((p, q) => {
            //如果选中的是当前这个
            if (cursor.get("checkedList").has(p.get("shoppingCartId"))) {
                var num = parseInt(p.get("goodsNum"));
                cartNum += num;
                cartTotalPrice += p.get("warePrice") * num;
                cartSumPrice += p.get("warePrice") * num;
            }
        });
        cursor.setIn(['cart', i, 'sumPrice'], cartTotalPrice.toFixed(2));
        totalPrice += cartTotalPrice;
        yhPrice += cartYhPrice;
        sumPrice += cartSumPrice;
    });

    cursor.set("totalPrice", totalPrice.toFixed(2));
    cursor.set("sumPrice", sumPrice.toFixed(2));
    cursor.set("yhPrice", yhPrice.toFixed(2));
    cursor.set("cartNum", cartNum);


}