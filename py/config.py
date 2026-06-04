# AutomaticWeatherStations SDK configuration


def make_config():
    return {
        "main": {
            "name": "AutomaticWeatherStations",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://data.geo.admin.ch/api/stac/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "collection": {},
                "feature_collection": {},
                "item": {},
            },
        },
        "entity": {
      "collection": {
        "fields": [
          {
            "name": "href",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "rel",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "title",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "collection",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/collections/ch.meteoschweiz.ogd-smn",
                "parts": [
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                ],
                "select": {
                  "$action": "chmeteoschweizogd_smn",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "feature_collection": {
        "fields": [
          {
            "name": "feature",
            "req": True,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "link",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "number_matched",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "number_returned",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "feature_collection",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "bbox",
                      "orig": "bbox",
                      "reqd": False,
                      "type": "`$ARRAY`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "datetime",
                      "orig": "datetime",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "granularity",
                      "orig": "granularity",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "station",
                      "orig": "station",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "update_frequency",
                      "orig": "update_frequency",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/collections/ch.meteoschweiz.ogd-smn/items",
                "parts": [
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                  "items",
                ],
                "select": {
                  "exist": [
                    "bbox",
                    "datetime",
                    "granularity",
                    "limit",
                    "station",
                    "update_frequency",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "item": {
        "fields": [
          {
            "name": "geometry",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "link",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "property",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "item",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "item_id",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/collections/ch.meteoschweiz.ogd-smn/items/{itemId}",
                "parts": [
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                  "items",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "itemId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
