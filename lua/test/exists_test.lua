-- ProjectName SDK exists test

local sdk = require("automatic-weather-stations_sdk")

describe("AutomaticWeatherStationsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
