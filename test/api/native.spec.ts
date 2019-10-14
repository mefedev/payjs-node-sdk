import assert from 'power-assert'

import PayJS from '../../src/index'

describe('test/api/payment.spec.ts', () => {
  it('test payment.query', async () => {
    const sdk = new PayJS({
      key: process.env.PAYJS_MCH_KEY,
      mchId: process.env.PAYJS_MCH_ID
    })

    const result = await sdk.payment.native({
      total_fee: 100,
      out_trade_no: '1000000'
    })
    assert(typeof result.payjs_order_id === 'string', '获取商户资料成功')
  })
})
