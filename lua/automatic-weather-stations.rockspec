package = "voxgig-sdk-automatic-weather-stations"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/automatic-weather-stations-sdk.git"
}
description = {
  summary = "AutomaticWeatherStations SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["automatic-weather-stations_sdk"] = "automatic-weather-stations_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
