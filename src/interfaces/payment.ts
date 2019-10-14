export interface IPaymentOptions {
  /** 用户端订单号 */
  out_trade_no: string
  /** 订单金额，单位：分 */
  total_fee: number
  // 订单标题
  body?: string
  // 用户自定义数据，在notify的时候会原样返回
  attach?: string
}

export interface IPaymentResponse {
  /** PAYJS 订单号 */
  payjs_order_id: string
  /** 用户端订单号 */
  out_trade_no: string
  /** 订单金额，单位：分 */
  total_fee: number
}

export interface INativePaymentOptions extends IPaymentOptions {
  /** 留空表示微信支付。支付宝交易传值：alipay */
  type?: 'alipay'
  // 收银台显示的logo图片url
  logo?: string
  // auto=1：无需点击支付按钮，自动发起支付。默认手动点击发起支付
  auto?: boolean
  // hide=1：隐藏收银台背景界面。默认显示背景界面（这里hide为1时，自动忽略auto参数）
  hide?: boolean
  /** 用户支付成功后，前端跳转地址。留空则支付后关闭webview */
  callback_url?: string
  // 接收微信支付异步通知的回调地址。
  notify_url?: string
}

export interface INativePaymentResponse extends IPaymentResponse {
  /** 字符二维码 */
  qrcode: string
  /** 微信二维码地址 */
  code_url: string
}

export interface IMicroPaymentOptions extends IPaymentOptions {
  // 扫码支付授权码，设备读取用户微信中的条码或者二维码信息(注：用户刷卡条形码规则：18位纯数字，以10、11、12、13、14、15开头)
  auth_code?: string
}

export interface ICashierPaymentOptions extends IPaymentOptions {
  // 收银台显示的logo图片url
  logo?: string
  // auto=1：无需点击支付按钮，自动发起支付。默认手动点击发起支付
  auto?: boolean
  // hide=1：隐藏收银台背景界面。默认显示背景界面（这里hide为1时，自动忽略auto参数）
  hide?: boolean
  /** 用户支付成功后，前端跳转地址。留空则支付后关闭webview */
  callback_url?: string
  // 接收微信支付异步通知的回调地址。
  notify_url?: string
}

export interface IJsAPIPaymentOptions extends IPaymentOptions {
  // 微信用户的 openid
  openid: string
  // 接收微信支付异步通知的回调地址。
  notify_url?: string
}
