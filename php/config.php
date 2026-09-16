<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK configuration

class AutomaticWeatherStationsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AutomaticWeatherStations",
                "slug" => "automatic-weather-stations",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://data.geo.admin.ch/api/stac/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "collection" => [],
                    "feature_collection" => [],
                    "item" => [],
                ],
            ],
            "entity" => [
        'collection' => [
          'fields' => [
            [
              'format' => 'uri',
              'name' => 'href',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rel',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'collection',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/collections/ch.meteoschweiz.ogd-smn',
                  'segments' => [
                    [
                      'lit' => 'collections',
                    ],
                    [
                      'lit' => 'ch.meteoschweiz.ogd-smn',
                    ],
                  ],
                  'select' => [
                    '$action' => 'chmeteoschweizogd_smn',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'collections',
                    'ch.meteoschweiz.ogd-smn',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'feature_collection' => [
          'fields' => [
            [
              'name' => 'features',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'links',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'numberMatched',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'numberReturned',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'feature_collection',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'bbox',
                        'orig' => 'bbox',
                        'type' => '`$ARRAY`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'datetime',
                        'orig' => 'datetime',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'granularity',
                        'orig' => 'granularity',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'station',
                        'orig' => 'station',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'update_frequency',
                        'orig' => 'update_frequency',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/collections/ch.meteoschweiz.ogd-smn/items',
                  'segments' => [
                    [
                      'lit' => 'collections',
                    ],
                    [
                      'lit' => 'ch.meteoschweiz.ogd-smn',
                    ],
                    [
                      'lit' => 'items',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'bbox',
                      'datetime',
                      'granularity',
                      'limit',
                      'station',
                      'update_frequency',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'collections',
                    'ch.meteoschweiz.ogd-smn',
                    'items',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'item' => [
          'fields' => [
            [
              'name' => 'geometry',
              'req' => true,
              'short' => 'GeoJSON Geometry',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'links',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'properties',
              'req' => true,
              'short' => 'Weather station measurement properties',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'item',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'item_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/collections/ch.meteoschweiz.ogd-smn/items/{itemId}',
                  'rename' => [
                    'param' => [
                      'itemId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'collections',
                    ],
                    [
                      'lit' => 'ch.meteoschweiz.ogd-smn',
                    ],
                    [
                      'lit' => 'items',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'collections',
                    'ch.meteoschweiz.ogd-smn',
                    'items',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AutomaticWeatherStationsFeatures::make_feature($name);
    }
}
