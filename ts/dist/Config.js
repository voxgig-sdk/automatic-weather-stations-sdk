"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'AutomaticWeatherStations',
        slug: "automatic-weather-stations",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://data.geo.admin.ch/api/stac/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            collection: {},
            feature_collection: {},
            item: {},
        }
    };
    entity = {
        "collection": {
            "fields": [],
            "name": "collection",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/collections/ch.meteoschweiz.ogd-smn",
                            "segments": [
                                {
                                    "lit": "collections"
                                },
                                {
                                    "lit": "ch.meteoschweiz.ogd-smn"
                                }
                            ],
                            "parts": [
                                "collections",
                                "ch.meteoschweiz.ogd-smn"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {
                                "$action": "chmeteoschweizogd_smn"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "feature_collection": {
            "fields": [
                {
                    "name": "features",
                    "title": "Features",
                    "type": "`$ARRAY`",
                    "req": true
                },
                {
                    "name": "links",
                    "title": "Links",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "numberMatched",
                    "title": "Number Matched",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "numberReturned",
                    "title": "Number Returned",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "name": "feature_collection",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/collections/ch.meteoschweiz.ogd-smn/items",
                            "segments": [
                                {
                                    "lit": "collections"
                                },
                                {
                                    "lit": "ch.meteoschweiz.ogd-smn"
                                },
                                {
                                    "lit": "items"
                                }
                            ],
                            "parts": [
                                "collections",
                                "ch.meteoschweiz.ogd-smn",
                                "items"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "bbox",
                                        "orig": "bbox",
                                        "type": "`$ARRAY`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "datetime",
                                        "orig": "datetime",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "granularity",
                                        "orig": "granularity",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    },
                                    {
                                        "name": "station",
                                        "orig": "station",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "update_frequency",
                                        "orig": "update_frequency",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "bbox",
                                    "datetime",
                                    "granularity",
                                    "limit",
                                    "station",
                                    "update_frequency"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "item": {
            "fields": [
                {
                    "name": "geometry",
                    "title": "Geometry",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "GeoJSON Geometry"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "links",
                    "title": "Links",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "properties",
                    "title": "Properties",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "Weather station measurement properties"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "item",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/collections/ch.meteoschweiz.ogd-smn/items/{itemId}",
                            "segments": [
                                {
                                    "lit": "collections"
                                },
                                {
                                    "lit": "ch.meteoschweiz.ogd-smn"
                                },
                                {
                                    "lit": "items"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "collections",
                                "ch.meteoschweiz.ogd-smn",
                                "items",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "itemId": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "item_id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map