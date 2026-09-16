# AutomaticWeatherStations SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AutomaticWeatherStationsFeatures
  def self.make_feature(name)
    case name
    when "base"
      AutomaticWeatherStationsBaseFeature.new
    when "ratelimit"
      AutomaticWeatherStationsRatelimitFeature.new
    when "retry"
      AutomaticWeatherStationsRetryFeature.new
    when "test"
      AutomaticWeatherStationsTestFeature.new
    when "timeout"
      AutomaticWeatherStationsTimeoutFeature.new
    else
      AutomaticWeatherStationsBaseFeature.new
    end
  end
end
