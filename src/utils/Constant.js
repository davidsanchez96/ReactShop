export const URL='https://elife.hk0472.com';//'http://192.168.1.240:8080'//'http://api.hk0472.com';//
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
export const PayPasswordUrl=URL+'/balance/setpassword';//设置支付密码
export const PasswordCheckUrl=URL+'/customers/check/loginPassword?password=';//设置支付密码
export const GetPhoneCodeUrl=URL+'/customers/security/phone/send/binding/smsverifycode';//获取验证码
export const VerifyPhoneCodeUrl=URL+'/customers/security/phone/validate/binding/smsverifycode';//验证验证码
export const ModifyPhoneCodeUrl=URL+'/customers/security/phone/send/smsverifycode';//获取验证码
export const ModifyPhoneVerifyUrl=URL+'/customers/security/phone/validate/smsverifycode';//验证验证码
export const ModifyPhoneNewCodeUrl=URL+'/customers/security/phone/send/new/smsverifycode';//获取验证码

export const FollowListUrl=URL+'/customers/follows?region=';//获取关注
export const FollowDeleteUrl=URL+'/customers/follows/';//取消关注
export const BrowseListUrl=URL+'/customers/browserecord?region=';//获取浏览
export const BrowseCleanUrl=URL+'/customers/browserecord/clear';//清除浏览
export const BrowseAddUrl=URL+'/customers/browserecord';//添加浏览
export const BrowseGetUrl=URL+'/customers/browserecord/visitors';//获取浏览

export const PreDepositUrl=URL+'/depositInfo/queryDepositInfoByCustomerId';
export const CheckDepositUrl=URL+'/chargewithdraw/checkBalanceCanBeUsed';
export const TradeListUrl=URL+'/trandeInfo/findAll/';
export const IntegrationListUrl=URL+'/customers/point?type=';
export const IntegrationTotalUrl=URL+'/customers/point/total';
export const CouponListUrl=URL+'/store/coupons?codeStatus=';

export const OrderListUrl=URL+'/orders';
export const OrderDetailUrl=URL+'/order';
export const MessageListUrl=URL+'/customers/messages';
export const MessageReadUrl=URL+'/customers/read/messages/';
export const MessageReadAllUrl=URL+'/customers/read/messages/_all';
export const MessageDeleteUrl=URL+'/customers/messages/';
export const MessageDeleteAllUrl=URL+'/customers/clean/messages';


