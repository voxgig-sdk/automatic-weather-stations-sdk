

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
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'item.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"features":{"a":true,"h":"Features","n":"features","r":true,"t":"`$ARRAY`","key$":"features","index$":0},"geometry":{"a":true,"h":"Geometry","n":"geometry","r":true,"sh":"GeoJSON Geometry","t":"`$OBJECT`","key$":"geometry","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$ARRAY`","key$":"links","index$":3},"numberMatched":{"a":true,"h":"Number Matched","n":"numberMatched","r":false,"t":"`$INTEGER`","key$":"numberMatched","index$":4},"numberReturned":{"a":true,"h":"Number Returned","n":"numberReturned","r":false,"t":"`$INTEGER`","key$":"numberReturned","index$":5},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"sh":"Weather station measurement properties","t":"`$OBJECT`","key$":"properties","index$":6},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":7}},"id":{"field":"id","name":"id"},"name":"item","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /collections/ch.meteoschweiz.ogd-smn/items","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$ARRAY`","index$":0},{"a":true,"k":"query","n":"datetime","or":"datetime","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"granularity","or":"granularity","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"station","or":"station","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"update_frequency","or":"updateFrequency","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/collections/ch.meteoschweiz.ogd-smn/items","q":{"exist":["bbox","datetime","granularity","limit","station","update_frequency"]},"r":{},"s":[{"lit":"collections"},{"lit":"ch.meteoschweiz.ogd-smn"},{"lit":"items"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /collections/ch.meteoschweiz.ogd-smn/items/{itemId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"itemId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/collections/ch.meteoschweiz.ogd-smn/items/{itemId}","q":{"exist":["id"]},"r":{"param":{"itemId":"id"}},"s":[{"lit":"collections"},{"lit":"ch.meteoschweiz.ogd-smn"},{"lit":"items"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"item","name__orig":"item","Name":"Item","name_":"item","name-":"item","NAME":"ITEM","index$":1}, {"active":true,"entity":"item","key$":"BasicItemFlow","kind":"basic","name":"BasicItemFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"item_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"item_ref01","srcdatavar":"item_ref01_data","suffix":"_dt0"},"m":{"id":"item01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-item_ref01"}}],"index$":1}]}, 'Item', {"GET /collections/ch.meteoschweiz.ogd-smn/items":{"protocol":"http","parameters":[{"name":"bbox","in":"query","description":"Bounding box to filter stations by geographic area (minLon,minLat,maxLon,maxLat)","required":false,"schema":{"type":"array","items":{"type":"number"},"minItems":4,"maxItems":4},"style":"form","explode":false,"index$":0},{"name":"datetime","in":"query","description":"Filter by datetime or datetime range (ISO 8601 format)","required":false,"schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","description":"Maximum number of items to return","required":false,"schema":{"type":"integer","minimum":1,"maximum":1000,"default":10},"index$":2},{"name":"station","in":"query","description":"Three-letter station identifier (e.g., BER for Bern/Zollikofen, LUG for Lugano)","required":false,"schema":{"type":"string","pattern":"^[A-Z]{3}$"},"index$":3},{"name":"granularity","in":"query","description":"Data granularity: 10-minute (t), hourly (h), daily (d), monthly (m), or yearly (y)","required":false,"schema":{"type":"string","enum":["t","h","d","m","y"]},"index$":4},{"name":"updateFrequency","in":"query","description":"Update frequency: current (now), recent, or historical data","required":false,"schema":{"type":"string","enum":["now","recent","historical"]},"index$":5}]},"GET /collections/ch.meteoschweiz.ogd-smn/items/{itemId}":{"protocol":"http","parameters":[{"name":"itemId","in":"path","description":"Unique identifier for the weather station data item","required":true,"schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let item_ref01_data = Object.values(setup.data.existing.item)[0] as any

    // LIST
    const item_ref01_ent = client.Item()
    const item_ref01_match: any = {}

    const item_ref01_list = (await item_ref01_ent.list(item_ref01_match)).map((e: any) => e.data())


    // LOAD
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
  
