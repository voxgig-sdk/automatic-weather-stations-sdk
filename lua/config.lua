-- AutomaticWeatherStations SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AutomaticWeatherStations",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://data.geo.admin.ch/api/stac/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["collection"] = {},
        ["feature_collection"] = {},
        ["item"] = {},
      },
    },
    entity = {
      ["collection"] = {
        ["fields"] = {
          {
            ["name"] = "href",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rel",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "collection",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/collections/ch.meteoschweiz.ogd-smn",
                ["parts"] = {
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                },
                ["select"] = {
                  ["$action"] = "chmeteoschweizogd_smn",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["feature_collection"] = {
        ["fields"] = {
          {
            ["name"] = "features",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "links",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "numberMatched",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "numberReturned",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "feature_collection",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "bbox",
                      ["orig"] = "bbox",
                      ["type"] = "`$ARRAY`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "datetime",
                      ["orig"] = "datetime",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "granularity",
                      ["orig"] = "granularity",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "station",
                      ["orig"] = "station",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "update_frequency",
                      ["orig"] = "update_frequency",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/collections/ch.meteoschweiz.ogd-smn/items",
                ["parts"] = {
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                  "items",
                },
                ["select"] = {
                  ["exist"] = {
                    "bbox",
                    "datetime",
                    "granularity",
                    "limit",
                    "station",
                    "update_frequency",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["item"] = {
        ["fields"] = {
          {
            ["name"] = "geometry",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "links",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "properties",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "item",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "item_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/collections/ch.meteoschweiz.ogd-smn/items/{itemId}",
                ["parts"] = {
                  "collections",
                  "ch.meteoschweiz.ogd-smn",
                  "items",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["itemId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
