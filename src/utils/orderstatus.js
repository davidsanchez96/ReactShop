const orderStatusDict = {
    //dp: 相当于数据字典 订单状态的数据字典
    0: '待付款',
    1: '待发货',
    2: '待收货',
    3: '已完成',
    4: '已取消',
    5: '未发货',
    6: '未发货',
    7: '退单审核中',
    8: '同意退货',
    9: '拒绝退货',
    10: '待商家收货',
    11: '退单结束',
    12: '退款审核中',
    13: '拒绝退款',
    14: '已提交退货审核',
    15: '退款审核中',
    16: '商家收货失败',
    17: '已退款',
    18: '退款成功',
};


/**
 * 订单模块数据字典
 */
export const orderDataDict = {
    //获取订单状态描述
    getOrderStatusDesc(order) {
        if (!order) {
            return '';
        }
        if (order.orderStatus === '0') {
            return order.orderLinePay === '0' ? '待发货' : '待付款';
        }
        return orderStatusDict[order.orderStatus];
    },

    //格式化价格
    formatPrice(price) {
        if (price == undefined || price == null) {
            return (0).toFixed(2);
        }
        return (Math.round(price * 100) / 100).toFixed(2);
    }
};




