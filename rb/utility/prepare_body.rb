# AutomaticWeatherStations SDK utility: prepare_body
require_relative 'media'
module AutomaticWeatherStationsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AutomaticWeatherStationsUtilities.raw_body(ctx.reqdata) if AutomaticWeatherStationsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
