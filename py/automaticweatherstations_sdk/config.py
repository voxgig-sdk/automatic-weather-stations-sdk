# AutomaticWeatherStations SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
          },
          {
            "name": "rel",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
        "name": "collection",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "feature_collection": {
        "fields": [
          {
            "name": "features",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "links",
            "type": "`$ARRAY`",
          },
          {
            "name": "numberMatched",
            "type": "`$INTEGER`",
          },
          {
            "name": "numberReturned",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "feature_collection",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "bbox",
                      "orig": "bbox",
                      "type": "`$ARRAY`",
                    },
                    {
                      "kind": "query",
                      "name": "datetime",
                      "orig": "datetime",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "granularity",
                      "orig": "granularity",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "station",
                      "orig": "station",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "update_frequency",
                      "orig": "update_frequency",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "links",
            "type": "`$ARRAY`",
          },
          {
            "name": "properties",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "item",
        "op": {
          "load": {
            "input": "data",
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
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
