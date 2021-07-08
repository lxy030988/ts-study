//给库写类型声明

import { EventEmmitter } from 'events'
let e = new EventEmmitter()
e.on('message', (text: string) => {
  console.log(text)
})
e.emit('message', 'lxy')
