import assert from 'assert'
import { URL, URLSearchParams } from 'url'
import { stringify } from 'querystring'
import { isObject, isNullOrUndefined } from 'util'

import axios, { Method, AxiosRequestConfig, AxiosInstance } from 'axios'
import extend from 'extend'

import { BASE_URL } from './lib/constants'
import { md5, isPostRequest } from './lib/utils'

import { MerchantApi } from './api/merchant'
import { PaymentApi } from './api/payment'
import { OrderApi } from './api/order'
import { WeChatApi } from './api/wechat'

import { IPayJSOptions, IPayJSResponse } from './interfaces/options'

export class PayJS {
  /** 签名密钥 */
  private key: string

  /** PayJS 商户号 */
  public mchId: string

  /** 请求客户端 */
  public client: AxiosInstance

  /** 商户 api */
  public merchant: MerchantApi

  /** 支付 api */
  public payment: PaymentApi

  /** 订单 api */
  public order: OrderApi

  /** 微信相关 api */
  public wechat: WeChatApi

  constructor(public options: IPayJSOptions) {
    assert(options && options.key, '签名的密钥不能为空')
    assert(options && options.mchId, '商户id不能为空')

    this.key = options.key
    this.mchId = options.mchId

    this.__init__()
  }

  private __init__(): void {
    const client = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 2000
    })

    client.interceptors.request.use(function onResolved(config): any {
      const formData = config.data
      if (isPostRequest(config.method as Method) && isObject(formData)) {
        config.data = stringify(formData)
      }

      return config
    })

    client.interceptors.response.use((response): any => {
      const result = response.data as IPayJSResponse
      if (isObject(result)) {
        if (result.return_code === 1) {
          if (this.checkSign(result)) {
            return result
          }
          return Promise.reject(Error('请求签名校验失败'))
        }
        return Promise.reject(Error(result.return_msg || '请求失败'))
      }

      return Promise.reject(new Error('解析错误'))
    })

    this.client = client

    this.merchant = new MerchantApi(this)
    this.payment = new PaymentApi(this)
    this.order = new OrderApi(this)
    this.wechat = new WeChatApi(this)
  }

  /**
   * 获取 URI
   *
   * @param path    路径片段
   * @param params  url 参数
   */
  public getUri(path: string, params?: any): string {
    const baseURL = this.client.defaults.baseURL
    const url = new URL(path, baseURL)
    const urlParams = new URLSearchParams(
      Object.assign({ mchid: this.mchId }, params)
    )

    // 覆盖查询条件
    url.search = urlParams.toString()

    return url.href
  }

  /**
   * 发起 http 请求
   *
   * @param method   请求方法
   * @param path     请求路径
   * @param data     发送数据
   * @param config   其他配置项目
   */
  public request<T>(
    method: Method,
    path: string,
    data: { [key: string]: any } = {},
    config?: AxiosRequestConfig
  ): Promise<T> {
    // 添加商户id
    data.mchid = this.mchId

    // 添加签名
    data.sign = this.genSign(data)

    // 发起请求
    return this.client.request(
      extend({}, config, {
        method: method,
        url: path,
        [isPostRequest(method) ? 'data' : 'params']: data
      })
    )
  }

  /**
   * 生成签名字符串
   *
   * @param data   签名数据
   */
  public genSign(data: { [key: string]: any }): string {
    const keys = Object.keys(data).filter(key => !isNullOrUndefined(data[key]))
    const params = keys.sort().map(key => `${key}=${data[key]}`)
    return md5(params.concat('key=' + this.key).join('&')).toUpperCase()
  }

  /**
   * 校验签名
   *
   * @param res   PayJS 响应内容
   */
  public checkSign(res: IPayJSResponse): boolean {
    const sign = res.sign
    delete res.sign
    return sign === this.genSign(res)
  }
}
