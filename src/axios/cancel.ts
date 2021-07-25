class Cancel {
  constructor(public msg: string) {}
}

export function isCancel(e: any) {
  return e instanceof Cancel
}

export class CancelToken {
  public resolve: any
  source() {
    return {
      token: new Promise((resolve) => {
        this.resolve = resolve
      }),
      cancel: (msg: string) => {
        this.resolve(new Cancel(msg))
      }
    }
  }
}
