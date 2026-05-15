<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK utility: prepare_body

class AutomaticWeatherStationsPrepareBody
{
    public static function call(AutomaticWeatherStationsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
