import assert from 'power-assert'

import PayJS from '../../src/index'

describe('test/api/merchant.spec.ts', () => {
  it('test merchant.getInfo', async () => {
    const sdk = new PayJS({
      key: process.env.PAYJS_MCH_KEY,
      mchId: process.env.PAYJS_MCH_ID
    })

    const merchant = await sdk.merchant.getInfo()
    assert(typeof merchant.doudou === 'number', '获取商户资料成功')
  })
})
