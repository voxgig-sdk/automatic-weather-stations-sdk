

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


describe('CollectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOMATIC_WEATHER_STATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOMATIC_WEATHER_STATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutomaticWeatherStationsSDK.test()
    const ent = testsdk.Collection()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'collection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"collection","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /collections/ch.meteoschweiz.ogd-smn","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/collections/ch.meteoschweiz.ogd-smn","q":{"$action":"chmeteoschweizogd_smn"},"r":{},"s":[{"lit":"collections"},{"lit":"ch.meteoschweiz.ogd-smn"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"collection","name__orig":"collection","Name":"Collection","name_":"collection","name-":"collection","NAME":"COLLECTION","index$":0}, {"active":true,"entity":"collection","key$":"BasicCollectionFlow","kind":"basic","name":"BasicCollectionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"collection_ref01"}}],"index$":0}]}, 'Collection', {"GET /collections/ch.meteoschweiz.ogd-smn":{"protocol":"http","operationId":"getWeatherStationsCollection","responses":{"200":{"description":"Successful response with collection metadata","content":{"application/json":{"schema":{"type":"object","description":"STAC Collection metadata for the automatic weather stations","properties":{"id":{"example":"ch.meteoschweiz.ogd-smn","key$":"id","type":"string"},"type":{"example":"Collection","key$":"type","type":"string"},"title":{"example":"Automatic Weather Stations - SwissMetNet","key$":"title","type":"string"},"description":{"example":"Data from around 160 automatic measurement stations within the SwissMetNet network","key$":"description","type":"string"},"extent":{"key$":"extent","properties":{"spatial":{"properties":{"bbox":{"items":{"items":{"type":"number"},"type":"array"},"type":"array"}},"type":"object"},"temporal":{"properties":{"interval":{"items":{"items":{"format":"date-time","nullable":true,"type":"string"},"type":"array"},"type":"array"}},"type":"object"}},"type":"object"},"license":{"example":"Open Data","key$":"license","type":"string"},"links":{"items":{"properties":{"href":{"format":"uri","type":"string"},"rel":{"type":"string"},"title":{"type":"string"},"type":{"type":"string"}},"required":["href","rel"],"type":"object","x-ref":"#/components/schemas/Link"},"key$":"links","type":"array"}},"x-ref":"#/components/schemas/Collection"}}}},"404":{"description":"Collection not found"},"500":{"description":"Internal server error"}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let collection_ref01_data = Object.values(setup.data.existing.collection)[0] as any

    // LIST
    const collection_ref01_ent = client.Collection()
    const collection_ref01_match: any = {}

    const collection_ref01_list = (await collection_ref01_ent.list(collection_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/collection/CollectionTestData.json')

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
    ['collection01','collection02','collection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOMATIC_WEATHER_STATIONS_TEST_COLLECTION_ENTID': idmap,
    'AUTOMATIC_WEATHER_STATIONS_TEST_LIVE': 'FALSE',
    'AUTOMATIC_WEATHER_STATIONS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOMATIC_WEATHER_STATIONS_TEST_COLLECTION_ENTID']

  const live = 'TRUE' === env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOMATIC_WEATHER_STATIONS_TEST_COLLECTION_ENTID']
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
  
