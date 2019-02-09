# ts-bunyan-rollbar
Simple (0 dependencies) Rollbar adapter for Bunyan written in TypeScript

```
import Rollbar from 'rollbar'
import BunyanLogger from 'bunyan'
import { RollbarStream } from 'ts-bunyan-rollbar'

const rollbar = new Rollbar({
  accessToken: 'token',
  captureUncaught: true,
  captureUnhandledRejections: true
})

const logger = new BunyanLogger({
  name: 'ts-bunyan-rollbar',
  streams: [
    {
      level: 'info',
      type: 'raw',
      stream: new RollbarStream(rollbar)
    }
  ]
})

logger.error({ x: 'extra', err: new Error('some error message') }, 'abcd')

logger.info({ y: 'extra' }, 'abcedf')

logger.info('abcedf')

```
