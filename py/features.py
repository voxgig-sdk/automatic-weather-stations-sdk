# AutomaticWeatherStations SDK feature factory

from feature.base_feature import AutomaticWeatherStationsBaseFeature
from feature.test_feature import AutomaticWeatherStationsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AutomaticWeatherStationsBaseFeature(),
        "test": lambda: AutomaticWeatherStationsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
