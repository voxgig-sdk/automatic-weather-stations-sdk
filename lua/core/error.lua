-- AutomaticWeatherStations SDK error

local AutomaticWeatherStationsError = {}
AutomaticWeatherStationsError.__index = AutomaticWeatherStationsError


function AutomaticWeatherStationsError.new(code, msg, ctx)
  local self = setmetatable({}, AutomaticWeatherStationsError)
  self.is_sdk_error = true
  self.sdk = "AutomaticWeatherStations"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AutomaticWeatherStationsError:error()
  return self.msg
end


function AutomaticWeatherStationsError:__tostring()
  return self.msg
end


return AutomaticWeatherStationsError
