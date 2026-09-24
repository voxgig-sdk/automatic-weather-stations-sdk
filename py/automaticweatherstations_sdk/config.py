# AutomaticWeatherStations SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "automatic-weather-stations",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
                    "lit": "collections",
                  },
                  {
                    "lit": "ch.meteoschweiz.ogd-smn",
                  },
                ],
                "parts": [
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "chmeteoschweizogd_smn",
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
            "title": "Features",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "links",
            "title": "Links",
            "type": "`$ARRAY`",
          },
          {
            "name": "numberMatched",
            "title": "Number Matched",
            "type": "`$INTEGER`",
          },
          {
            "name": "numberReturned",
            "title": "Number Returned",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
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
                    "lit": "collections",
                  },
                  {
                    "lit": "ch.meteoschweiz.ogd-smn",
                  },
                  {
                    "lit": "items",
                  },
                ],
                "parts": [
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                  "items",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "bbox",
                      "orig": "bbox",
                      "type": "`$ARRAY`",
                      "kind": "query",
                    },
                    {
                      "name": "datetime",
                      "orig": "datetime",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "granularity",
                      "orig": "granularity",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "station",
                      "orig": "station",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "update_frequency",
                      "orig": "update_frequency",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
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
            "title": "Geometry",
            "type": "`$OBJECT`",
            "req": True,
            "short": "GeoJSON Geometry",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "links",
            "title": "Links",
            "type": "`$ARRAY`",
          },
          {
            "name": "properties",
            "title": "Properties",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Weather station measurement properties",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "collections",
                  },
                  {
                    "lit": "ch.meteoschweiz.ogd-smn",
                  },
                  {
                    "lit": "items",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "item_id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
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
