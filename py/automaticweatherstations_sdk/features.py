# AutomaticWeatherStations SDK feature factory

from automaticweatherstations_sdk.feature.base_feature import AutomaticWeatherStationsBaseFeature
from automaticweatherstations_sdk.feature.ratelimit_feature import AutomaticWeatherStationsRatelimitFeature
from automaticweatherstations_sdk.feature.retry_feature import AutomaticWeatherStationsRetryFeature
from automaticweatherstations_sdk.feature.test_feature import AutomaticWeatherStationsTestFeature
from automaticweatherstations_sdk.feature.timeout_feature import AutomaticWeatherStationsTimeoutFeature


_FEATURES = {
    "base": lambda: AutomaticWeatherStationsBaseFeature(),
    "ratelimit": lambda: AutomaticWeatherStationsRatelimitFeature(),
    "retry": lambda: AutomaticWeatherStationsRetryFeature(),
    "test": lambda: AutomaticWeatherStationsTestFeature(),
    "timeout": lambda: AutomaticWeatherStationsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
