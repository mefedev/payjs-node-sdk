export interface IOrderResponse {
  /** PAYJS 订单号 */
  payjs_order_id: string
  /** 用户端订单号 */
  out_trade_no: string
  /** 支付状态，0：未支付，1：支付成功 */
  status: 0 | 1

  /** 订单金额，单位：分 */
  total_fee?: number

  /** 订单支付时间 */
  paid_time?: string

  /** 用户自定义数据 */
  attach?: string

  // 微信相关

  /** 微信显示订单号 */
  transaction_id?: string
  /** 微信用户 OPENID */
  openid?: string
}

export interface IRefundResponse {
  /** PAYJS 订单号 */
  payjs_order_id: string
  /** 用户端订单号 */
  out_trade_no: string
  /** 微信显示订单号 */
  transaction_id?: string
}
