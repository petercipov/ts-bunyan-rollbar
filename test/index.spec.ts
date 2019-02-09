import Rollbar from 'rollbar'
import BunyanLogger from 'bunyan'
import { RollbarStream } from '../src'

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
})

describe('RollbarStream initialization', () => {
  test('should fail when not raw', () => {
    const logger = new BunyanLogger({
      name: 'ts-bunyan-rollbar',
      streams: [
        {
          level: 'info',
          stream: new RollbarStream(rollbar)
        }
      ]
    })

    try {
      logger.info('abcd')
      fail('')
    } catch (err) {
      // should fail
    }
  })
})

describe('RollbarStream logging', () => {
  let logger: BunyanLogger

  beforeEach(() => {
    logger = new BunyanLogger({
      name: 'ts-bunyan-rollbar',
      streams: [
        {
          level: 'info',
          type: 'raw',
          stream: new RollbarStream(rollbar)
        }
      ]
    })
  })

  test('should work when raw type', () => {
    logger.error({ x: 'extra', err: new Error('some error message') }, 'abcd')
  })

  test('should send only message if nothing else specified', () => {
    logger.info('abcedf')
  })
})
