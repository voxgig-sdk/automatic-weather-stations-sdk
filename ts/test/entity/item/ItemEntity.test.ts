

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"geometry":{"a":true,"h":"Geometry","n":"geometry","r":true,"sh":"GeoJSON Geometry","t":"`$OBJECT`","key$":"geometry","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$ARRAY`","key$":"links","index$":2},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"sh":"Weather station measurement properties","t":"`$OBJECT`","key$":"properties","index$":3},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":4}},"id":{"field":"id","name":"id"},"name":"item","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /collections/ch.meteoschweiz.ogd-smn/items/{itemId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"item_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/collections/ch.meteoschweiz.ogd-smn/items/{itemId}","q":{"exist":["id"]},"r":{"param":{"itemId":"id"}},"s":[{"lit":"collections"},{"lit":"ch.meteoschweiz.ogd-smn"},{"lit":"items"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"item","name__orig":"item","Name":"Item","name_":"item","name-":"item","NAME":"ITEM","index$":2}, {"active":true,"entity":"item","key$":"BasicItemFlow","kind":"basic","name":"BasicItemFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"item_ref01","srcdatavar":"item_ref01_data","suffix":"_dt0"},"m":{"id":"item01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-item_ref01"}}],"index$":0}]}, 'Item', {"GET /collections/ch.meteoschweiz.ogd-smn/items/{itemId}":{"protocol":"http","operationId":"getWeatherStationItem","responses":{"200":{"description":"Successful response with specific weather station data","content":{"application/json":{"schema":{"type":"object","description":"GeoJSON Feature representing weather station data","required":["type","geometry","properties"],"properties":{"type":{"enum":["Feature"],"type":"string","key$":"type"},"id":{"type":"string","key$":"id"},"geometry":{"description":"GeoJSON Geometry","properties":{"coordinates":{"items":{"type":"number"},"maxItems":3,"minItems":2,"type":"array"},"type":{"enum":["Point"],"type":"string"}},"required":["type","coordinates"],"type":"object","x-ref":"#/components/schemas/Geometry","key$":"geometry"},"properties":{"description":"Weather station measurement properties","properties":{"altitude":{"description":"Station altitude in meters above sea level","type":"number"},"canton":{"description":"Swiss canton code","type":"string"},"datetime":{"description":"Measurement timestamp in UTC","format":"date-time","type":"string"},"dkl010z0":{"description":"Wind direction; ten minutes mean (degrees)","type":"number"},"dv1towz0":{"description":"Wind direction vectorial tower; ten minutes mean (degrees)","type":"number"},"fu3010z0":{"description":"Wind speed; ten minutes mean (km/h)","type":"number"},"fu3010z1":{"description":"Gust peak (one second); maximum (km/h)","type":"number"},"fu3towz0":{"description":"Wind speed scalar tower; ten minutes mean (km/h)","type":"number"},"gre000z0":{"description":"Global radiation; ten minutes mean (W/m²)","type":"number"},"pp0qffs0":{"description":"Pressure reduced to sea level (QFF); current value (hPa)","type":"number"},"pp0qnhs0":{"description":"Pressure reduced to sea level according to standard atmosphere (QNH); current value (hPa)","type":"number"},"ppz700s0":{"description":"Geopotential height of the 700 hPa level; current value (m)","type":"number"},"ppz850s0":{"description":"Geopotential height of the 850 hPa level; current value (m)","type":"number"},"prestas0":{"description":"Atmospheric pressure at barometric altitude (QFE); current value (hPa)","type":"number"},"rre150z0":{"description":"Precipitation; ten minutes total (mm)","type":"number"},"sre000z0":{"description":"Sunshine duration; ten minutes total (min)","type":"number"},"stationId":{"description":"Three-letter station identifier","example":"BER","type":"string"},"stationName":{"description":"Station name","example":"Bern/Zollikofen","type":"string"},"ta1tows0":{"description":"Air temperature tower; current value (°C)","type":"number"},"tde200s0":{"description":"Dew point 2m above ground; current value (°C)","type":"number"},"tdetows0":{"description":"Dew point tower; current value (°C)","type":"number"},"tre200s0":{"description":"Air temperature 2m above ground; current value (°C)","type":"number"},"u3towz1":{"description":"Gust peak (one second) tower; maximum (km/h)","type":"number"},"ure200s0":{"description":"Relative air humidity 2m above ground; current value (%)","type":"number"},"uretows0":{"description":"Relative air humidity tower; current value (%)","type":"number"},"wigosId":{"description":"WIGOS (WMO Integrated Global Observing System) identifier","type":"string"}},"type":"object","x-ref":"#/components/schemas/WeatherStationProperties","key$":"properties"},"links":{"items":{"properties":{"href":{"format":"uri","type":"string"},"rel":{"type":"string"},"title":{"type":"string"},"type":{"type":"string"}},"required":["href","rel"],"type":"object","x-ref":"#/components/schemas/Link"},"type":"array","key$":"links"}},"x-ref":"#/components/schemas/Feature","index$":0}},"text/csv":{"schema":{"type":"string"}}}},"404":{"description":"Item not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"itemId","in":"path","description":"Unique identifier for the weather station data item","required":true,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
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
  
