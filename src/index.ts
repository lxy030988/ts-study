let a: string | number = '1'
a = 1
const b: [string, number] = ['1', 1]

enum ROLE {
  USER,
  ADMIN
}

const aaa: any = '22'
console.log(aaa)
// 返回当前版本号
function getVersion(version: string = '1.0.0'): string {
  return version
}

console.log(getVersion('1.0.122'))
