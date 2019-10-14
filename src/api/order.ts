import { PayJS } from '../payjs'

import { IOrderResponse, IRefundResponse } from '../interfaces/order'

export class OrderApi {
  constructor(public sdk: PayJS) {}

  /**
   * 查询订单
   *
   * @param payjs_order_id 订单号
   */
  async query(payjs_order_id: string): Promise<IOrderResponse> {
    return this.send<IOrderResponse>('/api/check', payjs_order_id)
  }

  /**
   * 撤销订单
   *
   * @param payjs_order_id 订单号
   */
  async reverse(payjs_order_id: string): Promise<{ payjs_order_id: string }> {
    return this.send('/api/reverse', payjs_order_id)
  }

  /**
   * 关闭订单
   *
   * @param payjs_order_id 订单号
   */
  async close(payjs_order_id: string): Promise<{ payjs_order_id: string }> {
    return this.send('/api/close', payjs_order_id)
  }

  /**
   * 主动退款
   *
   * @param payjs_order_id 订单号
   */
  async refund(payjs_order_id: string): Promise<IRefundResponse> {
    return this.send('/api/refund', payjs_order_id)
  }

  /**
   * 发送数据 - 不稳定 api
   *
   * @param path 请求路径
   *
   * @returns PayJS 响应
   */
  private async send<T>(path: string, payjs_order_id: string): Promise<T> {
    return this.sdk.request('POST', path, {
      payjs_order_id: payjs_order_id
    })
  }
}
