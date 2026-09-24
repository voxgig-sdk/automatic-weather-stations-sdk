
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AutomaticWeatherStationsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AutomaticWeatherStationsSDK.test()
    equal(testsdk instanceof AutomaticWeatherStationsSDK, true,
      'AutomaticWeatherStationsSDK.test() must return a client synchronously')
  })

})
