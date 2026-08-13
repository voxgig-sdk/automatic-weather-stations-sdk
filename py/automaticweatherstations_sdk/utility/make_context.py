# AutomaticWeatherStations SDK utility: make_context

from automaticweatherstations_sdk.core.context import AutomaticWeatherStationsContext


def make_context_util(ctxmap, basectx):
    return AutomaticWeatherStationsContext(ctxmap, basectx)
