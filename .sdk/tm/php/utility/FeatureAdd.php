<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK utility: feature_add

class AutomaticWeatherStationsFeatureAdd
{
    public static function call(AutomaticWeatherStationsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
