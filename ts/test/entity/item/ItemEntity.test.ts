

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AutomaticWeatherStationsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ItemEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOMATIC_WEATHER_STATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOMATIC_WEATHER_STATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutomaticWeatherStationsSDK.test()
    const ent = testsdk.Item()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'item.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"geometry","req":true,"short":"GeoJSON Geometry","type":"`$OBJECT`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"links","req":false,"type":"`$ARRAY`","index$":2},{"active":true,"name":"properties","req":true,"short":"Weather station measurement properties","type":"`$OBJECT`","index$":3},{"active":true,"name":"type","req":true,"type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"item","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"item_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /collections/ch.meteoschweiz.ogd-smn/items/{itemId}","json":"{\"operationId\":\"getWeatherStationItem\",\"parameters\":[{\"description\":\"Unique identifier for the weather station data item\",\"in\":\"path\",\"name\":\"itemId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON Feature representing weather station data\",\"properties\":{\"geometry\":{\"description\":\"GeoJSON Geometry\",\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"maxItems\":3,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"links\":{\"items\":{\"properties\":{\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"rel\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"required\":[\"href\",\"rel\"],\"type\":\"object\"},\"type\":\"array\"},\"properties\":{\"description\":\"Weather station measurement properties\",\"properties\":{\"altitude\":{\"description\":\"Station altitude in meters above sea level\",\"type\":\"number\"},\"canton\":{\"description\":\"Swiss canton code\",\"type\":\"string\"},\"datetime\":{\"description\":\"Measurement timestamp in UTC\",\"format\":\"date-time\",\"type\":\"string\"},\"dkl010z0\":{\"description\":\"Wind direction; ten minutes mean (degrees)\",\"type\":\"number\"},\"dv1towz0\":{\"description\":\"Wind direction vectorial tower; ten minutes mean (degrees)\",\"type\":\"number\"},\"fu3010z0\":{\"description\":\"Wind speed; ten minutes mean (km/h)\",\"type\":\"number\"},\"fu3010z1\":{\"description\":\"Gust peak (one second); maximum (km/h)\",\"type\":\"number\"},\"fu3towz0\":{\"description\":\"Wind speed scalar tower; ten minutes mean (km/h)\",\"type\":\"number\"},\"gre000z0\":{\"description\":\"Global radiation; ten minutes mean (W/m²)\",\"type\":\"number\"},\"pp0qffs0\":{\"description\":\"Pressure reduced to sea level (QFF); current value (hPa)\",\"type\":\"number\"},\"pp0qnhs0\":{\"description\":\"Pressure reduced to sea level according to standard atmosphere (QNH); current value (hPa)\",\"type\":\"number\"},\"ppz700s0\":{\"description\":\"Geopotential height of the 700 hPa level; current value (m)\",\"type\":\"number\"},\"ppz850s0\":{\"description\":\"Geopotential height of the 850 hPa level; current value (m)\",\"type\":\"number\"},\"prestas0\":{\"description\":\"Atmospheric pressure at barometric altitude (QFE); current value (hPa)\",\"type\":\"number\"},\"rre150z0\":{\"description\":\"Precipitation; ten minutes total (mm)\",\"type\":\"number\"},\"sre000z0\":{\"description\":\"Sunshine duration; ten minutes total (min)\",\"type\":\"number\"},\"stationId\":{\"description\":\"Three-letter station identifier\",\"example\":\"BER\",\"type\":\"string\"},\"stationName\":{\"description\":\"Station name\",\"example\":\"Bern/Zollikofen\",\"type\":\"string\"},\"ta1tows0\":{\"description\":\"Air temperature tower; current value (°C)\",\"type\":\"number\"},\"tde200s0\":{\"description\":\"Dew point 2m above ground; current value (°C)\",\"type\":\"number\"},\"tdetows0\":{\"description\":\"Dew point tower; current value (°C)\",\"type\":\"number\"},\"tre200s0\":{\"description\":\"Air temperature 2m above ground; current value (°C)\",\"type\":\"number\"},\"u3towz1\":{\"description\":\"Gust peak (one second) tower; maximum (km/h)\",\"type\":\"number\"},\"ure200s0\":{\"description\":\"Relative air humidity 2m above ground; current value (%)\",\"type\":\"number\"},\"uretows0\":{\"description\":\"Relative air humidity tower; current value (%)\",\"type\":\"number\"},\"wigosId\":{\"description\":\"WIGOS (WMO Integrated Global Observing System) identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"required\":[\"type\",\"geometry\",\"properties\"],\"type\":\"object\"}},\"text/csv\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response with specific weather station data\"},\"404\":{\"description\":\"Item not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/collections/ch.meteoschweiz.ogd-smn/items/{itemId}","rename":{"param":{"itemId":"id"}},"segments":[{"lit":"collections"},{"lit":"ch.meteoschweiz.ogd-smn"},{"lit":"items"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"item","name__orig":"item","Name":"Item","name_":"item","name-":"item","NAME":"ITEM","index$":2}, {"active":true,"entity":"item","key$":"BasicItemFlow","kind":"basic","name":"BasicItemFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"item_ref01","srcdatavar":"item_ref01_data","suffix":"_dt0"},"match":{"id":"item01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-item_ref01"}}],"index$":0}]}, 'Item')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let item_ref01_data = Object.values(setup.data.existing.item)[0] as any

    // LOAD
    const item_ref01_ent = client.Item()
    const item_ref01_match_dt0: any = {}
    item_ref01_match_dt0.id = item_ref01_data.id
    const item_ref01_data_dt0 = (await item_ref01_ent.load(item_ref01_match_dt0)).data()
    assert(item_ref01_data_dt0.id === item_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/item/ItemTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AutomaticWeatherStationsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['item01','item02','item03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOMATIC_WEATHER_STATIONS_TEST_ITEM_ENTID': idmap,
    'AUTOMATIC_WEATHER_STATIONS_TEST_LIVE': 'FALSE',
    'AUTOMATIC_WEATHER_STATIONS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOMATIC_WEATHER_STATIONS_TEST_ITEM_ENTID']

  const live = 'TRUE' === env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOMATIC_WEATHER_STATIONS_TEST_ITEM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AutomaticWeatherStationsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.AUTOMATIC_WEATHER_STATIONS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
