"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "collection",
        "accessor": "Collection",
        "op": "list",
        "method": "GET",
        "path": "/collections/ch.meteoschweiz.ogd-smn",
        "action": "chmeteoschweizogd_smn",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "ch.meteoschweiz.ogd-smn",
            "type": "Collection",
            "title": "Automatic Weather Stations - SwissMetNet",
            "description": "Data from around 160 automatic measurement stations within the SwissMetNet network",
            "extent": {
                "spatial": {
                    "bbox": [
                        [
                            1
                        ]
                    ]
                },
                "temporal": {
                    "interval": [
                        [
                            "2026-01-01T00:00:00Z"
                        ]
                    ]
                }
            },
            "license": "Open Data",
            "links": [
                {
                    "href": "x",
                    "rel": "x",
                    "title": "x",
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "item",
        "accessor": "Item",
        "op": "list",
        "method": "GET",
        "path": "/collections/ch.meteoschweiz.ogd-smn/items",
        "args": [],
        "select": {
            "bbox": "v1",
            "datetime": "v1",
            "granularity": "v1",
            "limit": "v1",
            "station": "v1",
            "update_frequency": "v1"
        },
        "headers": [],
        "query": [
            "bbox",
            "datetime",
            "limit",
            "station",
            "granularity",
            "updateFrequency"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "type": "FeatureCollection",
            "features": [
                {
                    "geometry": {
                        "coordinates": [
                            1
                        ],
                        "type": "Point"
                    },
                    "id": "x",
                    "links": [
                        {
                            "href": "x",
                            "rel": "x",
                            "title": "x",
                            "type": "x"
                        }
                    ],
                    "properties": {
                        "altitude": 1,
                        "canton": "x",
                        "datetime": "2026-01-01T00:00:00Z",
                        "dkl010z0": 1,
                        "dv1towz0": 1,
                        "fu3010z0": 1,
                        "fu3010z1": 1,
                        "fu3towz0": 1,
                        "gre000z0": 1,
                        "pp0qffs0": 1,
                        "pp0qnhs0": 1,
                        "ppz700s0": 1,
                        "ppz850s0": 1,
                        "prestas0": 1,
                        "rre150z0": 1,
                        "sre000z0": 1,
                        "stationId": "BER",
                        "stationName": "Bern/Zollikofen",
                        "ta1tows0": 1,
                        "tde200s0": 1,
                        "tdetows0": 1,
                        "tre200s0": 1,
                        "u3towz1": 1,
                        "ure200s0": 1,
                        "uretows0": 1,
                        "wigosId": "x"
                    },
                    "type": "Feature"
                }
            ],
            "links": [
                {
                    "href": "x",
                    "rel": "x",
                    "title": "x",
                    "type": "x"
                }
            ],
            "numberMatched": 1,
            "numberReturned": 1
        },
        "idField": "id"
    },
    {
        "entity": "item",
        "accessor": "Item",
        "op": "load",
        "method": "GET",
        "path": "/collections/ch.meteoschweiz.ogd-smn/items/{itemId}",
        "args": [
            {
                "name": "id",
                "wire": "itemId",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "type": "Feature",
            "id": "x",
            "geometry": {
                "coordinates": [
                    1
                ],
                "type": "Point"
            },
            "properties": {
                "altitude": 1,
                "canton": "x",
                "datetime": "2026-01-01T00:00:00Z",
                "dkl010z0": 1,
                "dv1towz0": 1,
                "fu3010z0": 1,
                "fu3010z1": 1,
                "fu3towz0": 1,
                "gre000z0": 1,
                "pp0qffs0": 1,
                "pp0qnhs0": 1,
                "ppz700s0": 1,
                "ppz850s0": 1,
                "prestas0": 1,
                "rre150z0": 1,
                "sre000z0": 1,
                "stationId": "BER",
                "stationName": "Bern/Zollikofen",
                "ta1tows0": 1,
                "tde200s0": 1,
                "tdetows0": 1,
                "tre200s0": 1,
                "u3towz1": 1,
                "ure200s0": 1,
                "uretows0": 1,
                "wigosId": "x"
            },
            "links": [
                {
                    "href": "x",
                    "rel": "x",
                    "title": "x",
                    "type": "x"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map