import { PayJS } from '../payjs'

export class WeChatApi {
  constructor(public sdk: PayJS) {}

  /**
   * 获取授权地址
   *
   * @param callbackURI 授权回调地址
   */
  getAuthUri(callbackURI: string): string {
    return this.sdk.getUri('/api/openid', { callback_url: callbackURI })
  }
}
