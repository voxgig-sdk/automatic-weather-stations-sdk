

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


describe('FeatureCollectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOMATIC_WEATHER_STATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOMATIC_WEATHER_STATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutomaticWeatherStationsSDK.test()
    const ent = testsdk.FeatureCollection()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'feature_collection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"features","req":true,"type":"`$ARRAY`","index$":0},{"active":true,"name":"links","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"numberMatched","req":false,"type":"`$INTEGER`","index$":2},{"active":true,"name":"numberReturned","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"type","req":true,"type":"`$STRING`","index$":4}],"name":"feature_collection","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"bbox","orig":"bbox","reqd":false,"type":"`$ARRAY`","index$":0},{"active":true,"kind":"query","name":"datetime","orig":"datetime","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"granularity","orig":"granularity","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"station","orig":"station","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"update_frequency","orig":"update_frequency","reqd":false,"type":"`$STRING`","index$":5}]},"contract":{"id":"GET /collections/ch.meteoschweiz.ogd-smn/items","json":"{\"operationId\":\"getWeatherStationItems\",\"parameters\":[{\"description\":\"Bounding box to filter stations by geographic area (minLon,minLat,maxLon,maxLat)\",\"explode\":false,\"in\":\"query\",\"name\":\"bbox\",\"required\":false,\"schema\":{\"items\":{\"type\":\"number\"},\"maxItems\":4,\"minItems\":4,\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"Filter by datetime or datetime range (ISO 8601 format)\",\"in\":\"query\",\"name\":\"datetime\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of items to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":1000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Three-letter station identifier (e.g., BER for Bern/Zollikofen, LUG for Lugano)\",\"in\":\"query\",\"name\":\"station\",\"required\":false,\"schema\":{\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},{\"description\":\"Data granularity: 10-minute (t), hourly (h), daily (d), monthly (m), or yearly (y)\",\"in\":\"query\",\"name\":\"granularity\",\"required\":false,\"schema\":{\"enum\":[\"t\",\"h\",\"d\",\"m\",\"y\"],\"type\":\"string\"}},{\"description\":\"Update frequency: current (now), recent, or historical data\",\"in\":\"query\",\"name\":\"updateFrequency\",\"required\":false,\"schema\":{\"enum\":[\"now\",\"recent\",\"historical\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON FeatureCollection of weather station data\",\"properties\":{\"features\":{\"items\":{\"description\":\"GeoJSON Feature representing weather station data\",\"properties\":{\"geometry\":{\"description\":\"GeoJSON Geometry\",\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"maxItems\":3,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"links\":{\"items\":{\"properties\":{\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"rel\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"required\":[\"href\",\"rel\"],\"type\":\"object\"},\"type\":\"array\"},\"properties\":{\"description\":\"Weather station measurement properties\",\"properties\":{\"altitude\":{\"description\":\"Station altitude in meters above sea level\",\"type\":\"number\"},\"canton\":{\"description\":\"Swiss canton code\",\"type\":\"string\"},\"datetime\":{\"description\":\"Measurement timestamp in UTC\",\"format\":\"date-time\",\"type\":\"string\"},\"dkl010z0\":{\"description\":\"Wind direction; ten minutes mean (degrees)\",\"type\":\"number\"},\"dv1towz0\":{\"description\":\"Wind direction vectorial tower; ten minutes mean (degrees)\",\"type\":\"number\"},\"fu3010z0\":{\"description\":\"Wind speed; ten minutes mean (km/h)\",\"type\":\"number\"},\"fu3010z1\":{\"description\":\"Gust peak (one second); maximum (km/h)\",\"type\":\"number\"},\"fu3towz0\":{\"description\":\"Wind speed scalar tower; ten minutes mean (km/h)\",\"type\":\"number\"},\"gre000z0\":{\"description\":\"Global radiation; ten minutes mean (W/m²)\",\"type\":\"number\"},\"pp0qffs0\":{\"description\":\"Pressure reduced to sea level (QFF); current value (hPa)\",\"type\":\"number\"},\"pp0qnhs0\":{\"description\":\"Pressure reduced to sea level according to standard atmosphere (QNH); current value (hPa)\",\"type\":\"number\"},\"ppz700s0\":{\"description\":\"Geopotential height of the 700 hPa level; current value (m)\",\"type\":\"number\"},\"ppz850s0\":{\"description\":\"Geopotential height of the 850 hPa level; current value (m)\",\"type\":\"number\"},\"prestas0\":{\"description\":\"Atmospheric pressure at barometric altitude (QFE); current value (hPa)\",\"type\":\"number\"},\"rre150z0\":{\"description\":\"Precipitation; ten minutes total (mm)\",\"type\":\"number\"},\"sre000z0\":{\"description\":\"Sunshine duration; ten minutes total (min)\",\"type\":\"number\"},\"stationId\":{\"description\":\"Three-letter station identifier\",\"example\":\"BER\",\"type\":\"string\"},\"stationName\":{\"description\":\"Station name\",\"example\":\"Bern/Zollikofen\",\"type\":\"string\"},\"ta1tows0\":{\"description\":\"Air temperature tower; current value (°C)\",\"type\":\"number\"},\"tde200s0\":{\"description\":\"Dew point 2m above ground; current value (°C)\",\"type\":\"number\"},\"tdetows0\":{\"description\":\"Dew point tower; current value (°C)\",\"type\":\"number\"},\"tre200s0\":{\"description\":\"Air temperature 2m above ground; current value (°C)\",\"type\":\"number\"},\"u3towz1\":{\"description\":\"Gust peak (one second) tower; maximum (km/h)\",\"type\":\"number\"},\"ure200s0\":{\"description\":\"Relative air humidity 2m above ground; current value (%)\",\"type\":\"number\"},\"uretows0\":{\"description\":\"Relative air humidity tower; current value (%)\",\"type\":\"number\"},\"wigosId\":{\"description\":\"WIGOS (WMO Integrated Global Observing System) identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"required\":[\"type\",\"geometry\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"items\":{\"properties\":{\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"rel\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"required\":[\"href\",\"rel\"],\"type\":\"object\"},\"type\":\"array\"},\"numberMatched\":{\"minimum\":0,\"type\":\"integer\"},\"numberReturned\":{\"minimum\":0,\"type\":\"integer\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"required\":[\"type\",\"features\"],\"type\":\"object\"}},\"text/csv\":{\"schema\":{\"description\":\"CSV format weather data (≤5.3 MB per file)\",\"type\":\"string\"}}},\"description\":\"Successful response with weather station data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"No data found for the specified criteria\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/collections/ch.meteoschweiz.ogd-smn/items","segments":[{"lit":"collections"},{"lit":"ch.meteoschweiz.ogd-smn"},{"lit":"items"}],"select":{"exist":["bbox","datetime","granularity","limit","station","update_frequency"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"feature_collection","name__orig":"feature_collection","Name":"FeatureCollection","name_":"feature_collection","name-":"feature-collection","NAME":"FEATURE_COLLECTION","index$":1}, {"active":true,"entity":"feature_collection","key$":"BasicFeatureCollectionFlow","kind":"basic","name":"BasicFeatureCollectionFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"feature_collection_ref01"}}],"index$":0}]}, 'FeatureCollection')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let feature_collection_ref01_data = Object.values(setup.data.existing.feature_collection)[0] as any

    // LIST
    const feature_collection_ref01_ent = client.FeatureCollection()
    const feature_collection_ref01_match: any = {}

    const feature_collection_ref01_list = (await feature_collection_ref01_ent.list(feature_collection_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/feature_collection/FeatureCollectionTestData.json')

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
    ['feature_collection01','feature_collection02','feature_collection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOMATIC_WEATHER_STATIONS_TEST_FEATURE_COLLECTION_ENTID': idmap,
    'AUTOMATIC_WEATHER_STATIONS_TEST_LIVE': 'FALSE',
    'AUTOMATIC_WEATHER_STATIONS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOMATIC_WEATHER_STATIONS_TEST_FEATURE_COLLECTION_ENTID']

  const live = 'TRUE' === env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOMATIC_WEATHER_STATIONS_TEST_FEATURE_COLLECTION_ENTID']
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
  
