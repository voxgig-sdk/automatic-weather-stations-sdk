import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
          "type": "x",
          "title": "x"
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
      "limit": 10,
      "station": "v1",
      "update_frequency": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json",
      "text/csv"
    ],
    "query": [
      "bbox",
      "datetime",
      "limit",
      "station",
      "granularity",
      "updateFrequency"
    ],
    "queryArgs": [
      {
        "name": "bbox",
        "wire": "bbox"
      },
      {
        "name": "datetime",
        "wire": "datetime"
      },
      {
        "name": "granularity",
        "wire": "granularity"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "station",
        "wire": "station"
      },
      {
        "name": "update_frequency",
        "wire": "updateFrequency"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "id": "x",
          "geometry": {
            "type": "Point",
            "coordinates": [
              1
            ]
          },
          "properties": {
            "stationId": "BER",
            "stationName": "Bern/Zollikofen",
            "canton": "x",
            "wigosId": "x",
            "altitude": 1,
            "datetime": "2026-01-01T00:00:00Z",
            "tre200s0": 1,
            "rre150z0": 1,
            "sre000z0": 1,
            "gre000z0": 1,
            "ure200s0": 1,
            "tde200s0": 1,
            "dkl010z0": 1,
            "fu3010z0": 1,
            "fu3010z1": 1,
            "prestas0": 1,
            "pp0qffs0": 1,
            "pp0qnhs0": 1,
            "ppz850s0": 1,
            "ppz700s0": 1,
            "dv1towz0": 1,
            "fu3towz0": 1,
            "u3towz1": 1,
            "ta1tows0": 1,
            "uretows0": 1,
            "tdetows0": 1
          },
          "links": [
            {
              "href": "x",
              "rel": "x",
              "type": "x",
              "title": "x"
            }
          ]
        }
      ],
      "links": [
        {
          "href": "x",
          "rel": "x",
          "type": "x",
          "title": "x"
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
    "cookies": [],
    "responseMedia": [
      "application/json",
      "text/csv"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "type": "Feature",
      "id": "x",
      "geometry": {
        "type": "Point",
        "coordinates": [
          1
        ]
      },
      "properties": {
        "stationId": "BER",
        "stationName": "Bern/Zollikofen",
        "canton": "x",
        "wigosId": "x",
        "altitude": 1,
        "datetime": "2026-01-01T00:00:00Z",
        "tre200s0": 1,
        "rre150z0": 1,
        "sre000z0": 1,
        "gre000z0": 1,
        "ure200s0": 1,
        "tde200s0": 1,
        "dkl010z0": 1,
        "fu3010z0": 1,
        "fu3010z1": 1,
        "prestas0": 1,
        "pp0qffs0": 1,
        "pp0qnhs0": 1,
        "ppz850s0": 1,
        "ppz700s0": 1,
        "dv1towz0": 1,
        "fu3towz0": 1,
        "u3towz1": 1,
        "ta1tows0": 1,
        "uretows0": 1,
        "tdetows0": 1
      },
      "links": [
        {
          "href": "x",
          "rel": "x",
          "type": "x",
          "title": "x"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
