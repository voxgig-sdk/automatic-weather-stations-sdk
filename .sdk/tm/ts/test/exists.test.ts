
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AutomaticWeatherStationsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AutomaticWeatherStationsSDK.test()
    equal(null !== testsdk, true)
  })

})
