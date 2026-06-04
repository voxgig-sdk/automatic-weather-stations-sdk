# AutomaticWeatherStations SDK

Ten-minute readings from ~160 SwissMetNet automatic weather stations, served as a STAC catalog

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Automatic Weather Stations

This SDK wraps the `ch.meteoschweiz.ogd-smn` collection of the [Swiss Federal Spatial Data Infrastructure STAC API](https://data.geo.admin.ch/api/stac/v1), operated by the [Federal Office of Meteorology and Climatology MeteoSwiss](https://www.meteoswiss.admin.ch/). It surfaces measurements from SwissMetNet, the network of around 160 automatic monitoring stations distributed across Switzerland.

What you get from the API:

- Current and historical observations at 10-minute, hourly, daily, monthly, and yearly resolutions
- Parameters including temperature, precipitation, wind, pressure, snow, humidity, sunshine duration, and radiation
- Per-collection metadata assets covering the data inventory, parameter definitions, and station locations
- Spatial coverage of Switzerland (roughly 6.10°E–10.43°E, 45.84°N–47.70°N), with historical archives organised in 10-year increments

The API is a STAC (SpatioTemporal Asset Catalog) v1.0.0 endpoint that also conforms to OGC API — Features 1.0, so collections, items, and search are reachable via standard STAC paths under `https://data.geo.admin.ch/api/stac/v1`. CORS is enabled and responses are GeoJSON; no authentication is documented for read access.

## Try it

**TypeScript**
```bash
npm install automatic-weather-stations
```

**Python**
```bash
pip install automatic-weather-stations-sdk
```

**PHP**
```bash
composer require voxgig/automatic-weather-stations-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/automatic-weather-stations-sdk/go
```

**Ruby**
```bash
gem install automatic-weather-stations-sdk
```

**Lua**
```bash
luarocks install automatic-weather-stations-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AutomaticWeatherStationsSDK } from 'automatic-weather-stations'

const client = new AutomaticWeatherStationsSDK({})

// List all collections
const collections = await client.Collection().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o automatic-weather-stations-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "automatic-weather-stations": {
      "command": "/abs/path/to/automatic-weather-stations-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Collection** | A STAC Collection describing the SwissMetNet automatic weather stations dataset, listed under `/collections` and addressable as `/collections/ch.meteoschweiz.ogd-smn`. | `/collections/ch.meteoschweiz.ogd-smn` |
| **FeatureCollection** | A GeoJSON FeatureCollection of STAC Items returned by `/collections/ch.meteoschweiz.ogd-smn/items`, paging through the stations and their observation assets. | `/collections/ch.meteoschweiz.ogd-smn/items` |
| **Item** | An individual STAC Item (GeoJSON Feature) for a station or observation snapshot, retrieved from `/collections/ch.meteoschweiz.ogd-smn/items/{itemId}` with links to the underlying measurement and metadata assets. | `/collections/ch.meteoschweiz.ogd-smn/items/{itemId}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from automaticweatherstations_sdk import AutomaticWeatherStationsSDK

client = AutomaticWeatherStationsSDK({})

# List all collections
collections, err = client.Collection(None).list(None, None)
```

### PHP

```php
<?php
require_once 'automaticweatherstations_sdk.php';

$client = new AutomaticWeatherStationsSDK([]);

// List all collections
[$collections, $err] = $client->Collection(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/automatic-weather-stations-sdk/go"

client := sdk.NewAutomaticWeatherStationsSDK(map[string]any{})

// List all collections
collections, err := client.Collection(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "AutomaticWeatherStations_sdk"

client = AutomaticWeatherStationsSDK.new({})

# List all collections
collections, err = client.Collection(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("automatic-weather-stations_sdk")

local client = sdk.new({})

-- List all collections
local collections, err = client:Collection(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AutomaticWeatherStationsSDK.test()
const result = await client.Collection().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AutomaticWeatherStationsSDK.test(None, None)
result, err = client.Collection(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AutomaticWeatherStationsSDK::test(null, null);
[$result, $err] = $client->Collection(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Collection(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AutomaticWeatherStationsSDK.test(nil, nil)
result, err = client.Collection(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Collection(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Automatic Weather Stations

- Upstream: [https://data.geo.admin.ch/api/stac/v1](https://data.geo.admin.ch/api/stac/v1)
- API docs: [https://data.geo.admin.ch/api/stac/v1/collections/ch.meteoschweiz.ogd-smn](https://data.geo.admin.ch/api/stac/v1/collections/ch.meteoschweiz.ogd-smn)

- Data is published as Swiss Open Government Data under a Creative Commons Attribution (CC-BY) licence
- Attribute the Federal Office of Meteorology and Climatology MeteoSwiss as the source
- The underlying STAC catalog is part of the Swiss Federal Spatial Data Infrastructure (`data.geo.admin.ch`)
- Verify current terms on the collection page before redistributing data

---

Generated from the Automatic Weather Stations OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
