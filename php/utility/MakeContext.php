<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AutomaticWeatherStationsMakeContext
{
    public static function call(array $ctxmap, ?AutomaticWeatherStationsContext $basectx): AutomaticWeatherStationsContext
    {
        return new AutomaticWeatherStationsContext($ctxmap, $basectx);
    }
}
