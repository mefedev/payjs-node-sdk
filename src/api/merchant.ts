import { PayJS } from '../payjs'

import { IMerchantInfo } from '../interfaces/merchant'

export class MerchantApi {
  constructor(public sdk: PayJS) {}

  /**
   * 获取商户资料
   */
  async getInfo(): Promise<IMerchantInfo> {
    return this.sdk.request<IMerchantInfo>('GET', '/api/info')
  }
}
