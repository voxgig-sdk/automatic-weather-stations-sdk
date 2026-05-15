# AutomaticWeatherStations SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AutomaticWeatherStationsFeatures
  def self.make_feature(name)
    case name
    when "base"
      AutomaticWeatherStationsBaseFeature.new
    when "test"
      AutomaticWeatherStationsTestFeature.new
    else
      AutomaticWeatherStationsBaseFeature.new
    end
  end
end
