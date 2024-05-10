export function scannerOnce(str: string) {
  const tokens: string[] = []

  let i = 0
  const consume = () => {
    i++
    return str[i - 1]
  }
  const back = () => i--

  while (true) {
    let c = consume()
    if (c !== ' ') {
      back()
      break
    }
  }

  while (i < str.length) {
    let c = consume()
    let label: number
    switch (c) {
      case `"`:
        label = i
        while (true) {
          let c = consume()
          if (c === undefined) {
            console.log(`词法错误：缺少'"'符号`)
            return new Error(`缺少'"'符号`)
          }
          if (c === `"`) break
        }
        tokens.push(str.substring(label, i - 1))
        break
      case `:`:
        tokens.push(c)
        break
      case ` `:
        break
      default:
        label = i - 1
        while (true) {
          let c = consume()
          if (c === undefined) break
          if (c === ` ` || c === `:` || c === '"') {
            back()
            break
          }
        }
        tokens.push(str.substring(label, i))
        break
    }
  }

  console.log(tokens)

  return tokens
}

export function scannerTwice(tokens: string[]) {
  const tags: { namespace: string; value: string }[] = []

  let i = 0
  const consume = () => {
    i++
    return tokens[i - 1]
  }
  const back = () => i--

  while (i < tokens.length) {
    const c = consume()
    if (c === `:`) {
      console.log('词法错误：缺少命名空间')
      return new Error('缺少命名空间')
    } else {
      const t = consume()
      if (t === ':') {
        const v = consume()
        if (v === undefined) {
          console.log('词法错误：缺少标签值')
          return new Error('缺少标签值')
        }
        tags.push({
          namespace: c,
          value: v
        })
      } else {
        back()
        tags.push({
          namespace: 'temp',
          value: c
        })
      }
    }
  }

  console.log(tags)
  return tags
}

export function scanner(str: string) {
  const tokens = scannerOnce(str)
  if (!(tokens instanceof Error)) {
    return scannerTwice(tokens)
  } else return tokens
}
