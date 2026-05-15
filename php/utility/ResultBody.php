<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK utility: result_body

class AutomaticWeatherStationsResultBody
{
    public static function call(AutomaticWeatherStationsContext $ctx): ?AutomaticWeatherStationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
