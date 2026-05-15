<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK utility: result_headers

class AutomaticWeatherStationsResultHeaders
{
    public static function call(AutomaticWeatherStationsContext $ctx): ?AutomaticWeatherStationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
