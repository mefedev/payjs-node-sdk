export interface IPayJSOptions {
  key: string
  mchId: string
}

export interface IPayJSResponse {
  return_code: number
  return_msg: string
  sign: string
}
