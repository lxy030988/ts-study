# ts-study
ts学习



```tsx
Parameters
ConstructorParameters
InstanceType
ReturnType
ThisType

Exclude
Extract
NonNullable 
Partial
Readonly
ReadonlyArray

Pick
Omit
Record
```



```tsx
typeof keyof instanceof
[k in O]
+(readonly) - ?(可选)
! 非空
<xxx>变量 === 变量 as xxx
is 函数返回类型的防护
```

- 函数的双向协变
- 类型保护
- unknown
- 交叉类型
- 类型推断
- infer
- 自定义类型 [utility-types](https://www.npmjs.com/package/utility-types)
- Proxy
- Merge
- 命名空间
- declare类型声明 
- 自己写声明文件并使用

```tsx
"baseUrl": "./",
"paths": {
    "*": ["types/*"] //声明文件写在types目录下面
}
```

- 类型扩展
- 给库写声明文件 12.ts
- 30-36  38