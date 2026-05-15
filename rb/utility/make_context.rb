# AutomaticWeatherStations SDK utility: make_context
require_relative '../core/context'
module AutomaticWeatherStationsUtilities
  MakeContext = ->(ctxmap, basectx) {
    AutomaticWeatherStationsContext.new(ctxmap, basectx)
  }
end
