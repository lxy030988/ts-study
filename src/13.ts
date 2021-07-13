//Promise<string> => string
//提取Promise

// 把类型T中的函数名提取出来
type methodsPick<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
