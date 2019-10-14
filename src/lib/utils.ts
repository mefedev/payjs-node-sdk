import { createHash, Utf8AsciiLatin1Encoding } from 'crypto'

import { Method } from 'axios'

export function md5(
  value: string,
  encoding: Utf8AsciiLatin1Encoding = 'utf8'
): string {
  const hash = createHash('md5')
  return hash.update(value, encoding).digest('hex')
}

export function isPostRequest(method: Method): boolean {
  return /post|put|path/i.test(method)
}
