
import { Context } from './Context'


class AutomaticWeatherStationsError extends Error {

  isAutomaticWeatherStationsError = true

  sdk = 'AutomaticWeatherStations'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AutomaticWeatherStationsError
}

