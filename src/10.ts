// 命名空间 就是一个对象; 命名空间可以套命名空间
export namespace a {
  class Pig {} //不导出 在命名空间外不能使用
  export class Dog {
    eat() {
      console.log('a Dog')
    }
  }
}

let d = new a.Dog()
d.eat()
