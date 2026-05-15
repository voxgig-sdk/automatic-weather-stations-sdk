<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AutomaticWeatherStationsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AutomaticWeatherStationsBaseFeature();
            case "test":
                return new AutomaticWeatherStationsTestFeature();
            default:
                return new AutomaticWeatherStationsBaseFeature();
        }
    }
}
