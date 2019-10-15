import { PayJS } from '../payjs'

import {
  IPaymentResponse,
  INativePaymentOptions,
  INativePaymentResponse,
  IMicroPaymentOptions,
  ICashierPaymentOptions,
  IJsAPIPaymentOptions
} from '../interfaces/payment'

export class PaymentApi {
  constructor(public sdk: PayJS) {}

  /**
   * Native 支付
   *
   * @param options
   */
  async native(
    options: INativePaymentOptions
  ): Promise<INativePaymentResponse> {
    return this.sdk.request('POST', '/api/native', options)
  }

  /**
   * 付款码支付
   *
   * @param options
   */
  async microPay(options: IMicroPaymentOptions): Promise<IPaymentResponse> {
    return this.sdk.request('POST', '/api/micropay', options)
  }

  /**
   * 获取收银台地址
   *
   * @param options
   *
   * @returns 返回收银台链接地址
   */
  getCashierUri(options: ICashierPaymentOptions): string {
    return this.sdk.getUri('/api/cashier', options)
  }

  /**
   * JS API 支付
   *
   * @param options
   */
  async jsPay(
    options: IJsAPIPaymentOptions
  ): Promise<{ payjs_order_id: string; jsapi: string }> {
    return this.sdk.request('POST', '/api/jsapi', options)
  }
}
