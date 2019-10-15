# PayJS SDK 的 nodejs 版本

[![typescript](https://badgen.net/badge/lang/typescript)](https://www.typescriptlang.org)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=square)

使用 typescript 编写，用于对接 [PayJS](https://payjs.cn/) 的非官方 sdk.

## 安装

```bash
$ npm install @mefedev/payjs-node-sdk --save
```

## 演示

**支付二维码**

<img src="./screenshots/paycode.png" width="280">

**微信扫码截图**

<img src="./screenshots/wechat_scan_result.jpg" width="280">

## 使用

**支付**

```javascript
import PayJS from '@mefedev/payjs-node-sdk'

const sdk = PayJS({
  key: 'PayJS 通信密钥',
  mchId: 'PayJS 商户号'
})

// 获取支付二维码
const result = await sdk.payment.native({
  total_fee: 100,
  out_trade_no: '内部系统订单'
})

// 付款码支付
const result = await sdk.payment.microPay({
  total_fee: 100,
  out_trade_no: '内部系统订单'
})

// JS API 支付
const result = await sdk.payment.jsPay({
  total_fee: 100,
  out_trade_no: '内部系统订单',
  openid: '微信 openid'
})

// 获取收银台地址
const redirectUri = sdk.payment.getCashierUri({
  total_fee: 100,
  out_trade_no: '内部系统订单'
})
```

**订单接口**

```javascript
import PayJS from '@mefedev/payjs-node-sdk'

const sdk = PayJS({
  key: 'PayJS 通信密钥',
  mchId: 'PayJS 商户号'
})

// 查询订单
const order = await sdk.order.query('payjs_order_id')

// 撤销订单
const result = await sdk.order.reverse('payjs_order_id')

// 关闭订单
const result = await sdk.order.close('payjs_order_id')

// 主动退款
const result = await sdk.order.refund('payjs_order_id')
```

**其他 API**

```javascript
import PayJS from '@mefedev/payjs-node-sdk'

const sdk = PayJS({
  key: 'PayJS 通信密钥',
  mchId: 'PayJS 商户号'
})

// 生成微信授权地址
// 注意: 这会同步方法
const authUri = sdk.wechat.getAuthUri('http://example.com')

// 获取商户数据
const merchant = await sdk.merchant.getInfo()
```

## 本地开发

你需要安装 [node.js][node.js] 的版本为 `nodejs >= 8.0`。

克隆此仓库后运行:

```shell
# 推荐使用 yarn 或 cnpm 来管理依赖
$ npm install

# 监听文件变化
$ npm run watch

# 生成 API 文档.
$ npm run doc
```

在 `package.json` 文件的 `scripts` 部分还有一些其他脚本可用.

## 版本发布

```bash
# 更新版本号，内置代码检查
$ npm version <new_version|major|minor|patch>
```

可使用 `npm version --help` 查看帮助信息

## 升级日志

[ChangeLog](./CHANGELOG.md).

[node.js]: https://nodejs.org/
[TypeScript]: https://www.typescriptlang.org/
