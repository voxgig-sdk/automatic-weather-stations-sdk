"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FeatureCollectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AUTOMATIC_WEATHER_STATIONS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AUTOMATIC_WEATHER_STATIONS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AutomaticWeatherStationsSDK.test();
        const ent = testsdk.FeatureCollection();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'feature_collection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "features", "req": true, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "links", "req": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "numberMatched", "req": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "numberReturned", "req": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "type", "req": true, "type": "`$STRING`", "index$": 4 }], "name": "feature_collection", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "bbox", "orig": "bbox", "reqd": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "kind": "query", "name": "datetime", "orig": "datetime", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "granularity", "orig": "granularity", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "kind": "query", "name": "station", "orig": "station", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "kind": "query", "name": "update_frequency", "orig": "update_frequency", "reqd": false, "type": "`$STRING`", "index$": 5 }] }, "contract": { "id": "GET /collections/ch.meteoschweiz.ogd-smn/items", "json": "{\"operationId\":\"getWeatherStationItems\",\"parameters\":[{\"description\":\"Bounding box to filter stations by geographic area (minLon,minLat,maxLon,maxLat)\",\"explode\":false,\"in\":\"query\",\"name\":\"bbox\",\"required\":false,\"schema\":{\"items\":{\"type\":\"number\"},\"maxItems\":4,\"minItems\":4,\"type\":\"array\"},\"style\":\"form\"},{\"description\":\"Filter by datetime or datetime range (ISO 8601 format)\",\"in\":\"query\",\"name\":\"datetime\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of items to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":1000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Three-letter station identifier (e.g., BER for Bern/Zollikofen, LUG for Lugano)\",\"in\":\"query\",\"name\":\"station\",\"required\":false,\"schema\":{\"pattern\":\"^[A-Z]{3}$\",\"type\":\"string\"}},{\"description\":\"Data granularity: 10-minute (t), hourly (h), daily (d), monthly (m), or yearly (y)\",\"in\":\"query\",\"name\":\"granularity\",\"required\":false,\"schema\":{\"enum\":[\"t\",\"h\",\"d\",\"m\",\"y\"],\"type\":\"string\"}},{\"description\":\"Update frequency: current (now), recent, or historical data\",\"in\":\"query\",\"name\":\"updateFrequency\",\"required\":false,\"schema\":{\"enum\":[\"now\",\"recent\",\"historical\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON FeatureCollection of weather station data\",\"properties\":{\"features\":{\"items\":{\"description\":\"GeoJSON Feature representing weather station data\",\"properties\":{\"geometry\":{\"description\":\"GeoJSON Geometry\",\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"maxItems\":3,\"minItems\":2,\"type\":\"array\"},\"type\":{\"enum\":[\"Point\"],\"type\":\"string\"}},\"required\":[\"type\",\"coordinates\"],\"type\":\"object\"},\"id\":{\"type\":\"string\"},\"links\":{\"items\":{\"properties\":{\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"rel\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"required\":[\"href\",\"rel\"],\"type\":\"object\"},\"type\":\"array\"},\"properties\":{\"description\":\"Weather station measurement properties\",\"properties\":{\"altitude\":{\"description\":\"Station altitude in meters above sea level\",\"type\":\"number\"},\"canton\":{\"description\":\"Swiss canton code\",\"type\":\"string\"},\"datetime\":{\"description\":\"Measurement timestamp in UTC\",\"format\":\"date-time\",\"type\":\"string\"},\"dkl010z0\":{\"description\":\"Wind direction; ten minutes mean (degrees)\",\"type\":\"number\"},\"dv1towz0\":{\"description\":\"Wind direction vectorial tower; ten minutes mean (degrees)\",\"type\":\"number\"},\"fu3010z0\":{\"description\":\"Wind speed; ten minutes mean (km/h)\",\"type\":\"number\"},\"fu3010z1\":{\"description\":\"Gust peak (one second); maximum (km/h)\",\"type\":\"number\"},\"fu3towz0\":{\"description\":\"Wind speed scalar tower; ten minutes mean (km/h)\",\"type\":\"number\"},\"gre000z0\":{\"description\":\"Global radiation; ten minutes mean (W/m²)\",\"type\":\"number\"},\"pp0qffs0\":{\"description\":\"Pressure reduced to sea level (QFF); current value (hPa)\",\"type\":\"number\"},\"pp0qnhs0\":{\"description\":\"Pressure reduced to sea level according to standard atmosphere (QNH); current value (hPa)\",\"type\":\"number\"},\"ppz700s0\":{\"description\":\"Geopotential height of the 700 hPa level; current value (m)\",\"type\":\"number\"},\"ppz850s0\":{\"description\":\"Geopotential height of the 850 hPa level; current value (m)\",\"type\":\"number\"},\"prestas0\":{\"description\":\"Atmospheric pressure at barometric altitude (QFE); current value (hPa)\",\"type\":\"number\"},\"rre150z0\":{\"description\":\"Precipitation; ten minutes total (mm)\",\"type\":\"number\"},\"sre000z0\":{\"description\":\"Sunshine duration; ten minutes total (min)\",\"type\":\"number\"},\"stationId\":{\"description\":\"Three-letter station identifier\",\"example\":\"BER\",\"type\":\"string\"},\"stationName\":{\"description\":\"Station name\",\"example\":\"Bern/Zollikofen\",\"type\":\"string\"},\"ta1tows0\":{\"description\":\"Air temperature tower; current value (°C)\",\"type\":\"number\"},\"tde200s0\":{\"description\":\"Dew point 2m above ground; current value (°C)\",\"type\":\"number\"},\"tdetows0\":{\"description\":\"Dew point tower; current value (°C)\",\"type\":\"number\"},\"tre200s0\":{\"description\":\"Air temperature 2m above ground; current value (°C)\",\"type\":\"number\"},\"u3towz1\":{\"description\":\"Gust peak (one second) tower; maximum (km/h)\",\"type\":\"number\"},\"ure200s0\":{\"description\":\"Relative air humidity 2m above ground; current value (%)\",\"type\":\"number\"},\"uretows0\":{\"description\":\"Relative air humidity tower; current value (%)\",\"type\":\"number\"},\"wigosId\":{\"description\":\"WIGOS (WMO Integrated Global Observing System) identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"enum\":[\"Feature\"],\"type\":\"string\"}},\"required\":[\"type\",\"geometry\",\"properties\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"items\":{\"properties\":{\"href\":{\"format\":\"uri\",\"type\":\"string\"},\"rel\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"},\"type\":{\"type\":\"string\"}},\"required\":[\"href\",\"rel\"],\"type\":\"object\"},\"type\":\"array\"},\"numberMatched\":{\"minimum\":0,\"type\":\"integer\"},\"numberReturned\":{\"minimum\":0,\"type\":\"integer\"},\"type\":{\"enum\":[\"FeatureCollection\"],\"type\":\"string\"}},\"required\":[\"type\",\"features\"],\"type\":\"object\"}},\"text/csv\":{\"schema\":{\"description\":\"CSV format weather data (≤5.3 MB per file)\",\"type\":\"string\"}}},\"description\":\"Successful response with weather station data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"No data found for the specified criteria\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/collections/ch.meteoschweiz.ogd-smn/items", "segments": [{ "lit": "collections" }, { "lit": "ch.meteoschweiz.ogd-smn" }, { "lit": "items" }], "select": { "exist": ["bbox", "datetime", "granularity", "limit", "station", "update_frequency"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "feature_collection", "name__orig": "feature_collection", "Name": "FeatureCollection", "name_": "feature_collection", "name-": "feature-collection", "NAME": "FEATURE_COLLECTION", "index$": 1 }, { "active": true, "entity": "feature_collection", "key$": "BasicFeatureCollectionFlow", "kind": "basic", "name": "BasicFeatureCollectionFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "feature_collection_ref01" } }], "index$": 0 }] }, 'FeatureCollection');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let feature_collection_ref01_data = Object.values(setup.data.existing.feature_collection)[0];
        // LIST
        const feature_collection_ref01_ent = client.FeatureCollection();
        const feature_collection_ref01_match = {};
        const feature_collection_ref01_list = (await feature_collection_ref01_ent.list(feature_collection_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/feature_collection/FeatureCollectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AutomaticWeatherStationsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['feature_collection01', 'feature_collection02', 'feature_collection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AUTOMATIC_WEATHER_STATIONS_TEST_FEATURE_COLLECTION_ENTID': idmap,
        'AUTOMATIC_WEATHER_STATIONS_TEST_LIVE': 'FALSE',
        'AUTOMATIC_WEATHER_STATIONS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AUTOMATIC_WEATHER_STATIONS_TEST_FEATURE_COLLECTION_ENTID'];
    const live = 'TRUE' === env.AUTOMATIC_WEATHER_STATIONS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AUTOMATIC_WEATHER_STATIONS_TEST_FEATURE_COLLECTION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AutomaticWeatherStationsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=FeatureCollectionEntity.test.js.map