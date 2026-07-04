# AutomaticWeatherStations PHP SDK Reference

Complete API reference for the AutomaticWeatherStations PHP SDK.


## AutomaticWeatherStationsSDK

### Constructor

```php
require_once __DIR__ . '/automatic-weather-stations_sdk.php';

$client = new AutomaticWeatherStationsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AutomaticWeatherStationsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AutomaticWeatherStationsSDK::test();
```


### Instance Methods

#### `Collection($data = null)`

Create a new `CollectionEntity` instance. Pass `null` for no initial data.

#### `FeatureCollection($data = null)`

Create a new `FeatureCollectionEntity` instance. Pass `null` for no initial data.

#### `Item($data = null)`

Create a new `ItemEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CollectionEntity

```php
$collection = $client->Collection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `href` | ``$STRING`` | Yes |  |
| `rel` | ``$STRING`` | Yes |  |
| `title` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->Collection()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CollectionEntity`

Create a new `CollectionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FeatureCollectionEntity

```php
$feature_collection = $client->FeatureCollection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | ``$ARRAY`` | Yes |  |
| `link` | ``$ARRAY`` | No |  |
| `number_matched` | ``$INTEGER`` | No |  |
| `number_returned` | ``$INTEGER`` | No |  |
| `type` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->FeatureCollection()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FeatureCollectionEntity`

Create a new `FeatureCollectionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ItemEntity

```php
$item = $client->Item();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `geometry` | ``$OBJECT`` | Yes |  |
| `id` | ``$STRING`` | No |  |
| `link` | ``$ARRAY`` | No |  |
| `property` | ``$OBJECT`` | Yes |  |
| `type` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Item()->load(["id" => "item_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ItemEntity`

Create a new `ItemEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new AutomaticWeatherStationsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

