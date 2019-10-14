import assert from 'power-assert'

import PayJS from '../../src/index'

describe('test/api/order.spec.ts', () => {
  it('test order.query', async () => {
    const sdk = new PayJS({
      key: process.env.PAYJS_MCH_KEY,
      mchId: process.env.PAYJS_MCH_ID
    })

    const order = await sdk.order.query('2019101503054900456615858')
    assert(
      order.payjs_order_id === '2019101503054900456615858',
      '获取商户资料成功'
    )
  })
})
