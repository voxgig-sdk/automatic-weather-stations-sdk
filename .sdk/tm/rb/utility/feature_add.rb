# AutomaticWeatherStations SDK utility: feature_add
module AutomaticWeatherStationsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
