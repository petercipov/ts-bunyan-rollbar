import Rollbar from 'rollbar'
import { Writable } from 'stream'

const levelMapping: { [key: number]: string } = {
  10: 'debug',
  20: 'debug',
  30: 'info',
  40: 'warning',
  50: 'error',
  60: 'critical'
}

export class RollbarStream extends Writable {
  constructor (
    readonly rollbar: Rollbar
  ) {
    super()
  }

  write (chunk: any): boolean {
    if (typeof chunk === 'string') {
      throw new Error('bunyan-rollbar requires a raw stream. Please define the type as raw when setting up the bunyan-rollbar stream.')
    }

    const { err, req, msg, ...custom } = chunk

    const payload = {
      level: levelMapping[chunk.level] || 'error',
      custom
    }

    this.rollbar.log(msg, err, req, payload)
    return true
  }
}
