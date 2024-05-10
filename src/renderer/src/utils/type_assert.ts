export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw `参数验证错误，val未定义，接收值: ${val}`
  }
}

export function assertIsString(val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw `参数验证错误，val不为string，接收值： ${val}`
  }
}

export function assertIsNumber(val: any): asserts val is string {
  if (typeof val !== 'number' || Number.isNaN(val)) {
    throw `参数验证错误，val不为number，接收值： ${val}`
  }
}

