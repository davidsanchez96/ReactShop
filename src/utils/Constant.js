export const URL='http://elife.hk0472.com';//'http://192.168.1.240:8080'//'http://api.hk0472.com';//
export const CategoryUrl=URL+'/goods/mobcates';
export const SuggestionUrl=URL+'/suggestions/completion?size=10&queryString=';

export const SearchUrl=URL+'/search/goods';
export const FilterUrl=URL+'/search/goods/aggregations';
export const AddressUrl=URL+'/area/all';

export const DetailUrl=URL+'/goods/';
export const AreaUrl=URL+'/area/defaultArea';

export const LoginUrl=URL+'/customer/login';
export const CheckPhoneUrl=URL+'/customer/refundpwd/checkphone';
export const SendPhoneUrl=URL+'/customer/refundpwd/send/smsverifycode';
export const VerifyPhoneUrl=URL+'/customer/refundpwd/validate/smsverifycode';
export const SetPasswordUrl=URL+'/customer/refundpwd/setpassword';

export const UserUrl=URL+'/customers';//用户基本信息
export const UserLevelUrl=URL+'/customers/point/level';//
export const UserFollowUrl=URL+'/customers/follows/total';//用户关注商品数量
export const UserRecordUrl=URL+'/customers/browserecord/totals';//用户浏览记录数量
export const UserStatusUrl=URL+'/orders/status/counts';//获取用户不同状态的订单数量
export const UserUnreadUrl=URL+'/customers/messages/unread/counts';//获取未读消息数
export const UserOrderUrl=URL+'/sys/settings/order';//校验订单设置
export const NicknameUrl=URL+'/customers/nickname';//修改昵称
export const GenderUrl=URL+'/customers/gender';//修改性别
export const BirthdayUrl=URL+'/customers/birthday';//修改出生日期
export const DefaultAddressUrl=URL+'/customers/addresses/default/';//默认收货地址
export const DeleteAddressUrl=URL+'/customers/addresses/';//删除收货地址
export const ReceiveAddressUrl=URL+'/customers/addresses';//收货地址

export const GetCodeUrl=URL+'/customers/security/password/send/smsverifycode';//获取验证码
export const VerifyCodeUrl=URL+'/customers/security/password/validate/smsverifycode';//验证验证码
export const SetCodeUrl=URL+'/customers/security/password/setpassword';//设置密码
export const PayGetUrl=URL+'/balance/pay/set/send/smsverifycode';//获取验证码
export const PayVerifyUrl=URL+'/balance/pay/set/validate/smsverifycode';//验证验证码