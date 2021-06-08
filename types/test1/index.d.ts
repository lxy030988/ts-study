declare function Test1(params: string): void
declare namespace Test1 {
  function ajax(): void
}
// export default Test1
export = Test1 //ts语法
