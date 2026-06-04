
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://data.geo.admin.ch/api/stac/v1',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      collection: {
      },

      feature_collection: {
      },

      item: {
      },

    }
  }


  entity = {
    "collection": {
      "fields": [
        {
          "name": "href",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "rel",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
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
                "ch.meteoschweiz.ogd-smn"
              ],
              "select": {
                "$action": "chmeteoschweizogd_smn"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "feature_collection": {
      "fields": [
        {
          "name": "feature",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "link",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "number_matched",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "number_returned",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        }
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
                    "reqd": false,
                    "type": "`$ARRAY`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "datetime",
                    "orig": "datetime",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "granularity",
                    "orig": "granularity",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "station",
                    "orig": "station",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "update_frequency",
                    "orig": "update_frequency",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/collections/ch.meteoschweiz.ogd-smn/items",
              "parts": [
                "collections",
                "ch.meteoschweiz.ogd-smn",
                "items"
              ],
              "select": {
                "exist": [
                  "bbox",
                  "datetime",
                  "granularity",
                  "limit",
                  "station",
                  "update_frequency"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "link",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "property",
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 3
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        }
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
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/collections/ch.meteoschweiz.ogd-smn/items/{itemId}",
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

