<?php
declare(strict_types=1);

// Typed models for the AutomaticWeatherStations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Collection entity data model. */
class Collection
{
}

/** Request payload for Collection#list. */
class CollectionListMatch
{
}

/** FeatureCollection entity data model. */
class FeatureCollection
{
    public array $features;
    public ?array $links = null;
    public ?int $numberMatched = null;
    public ?int $numberReturned = null;
    public string $type;
}

/** Request payload for FeatureCollection#list. */
class FeatureCollectionListMatch
{
    public ?array $bbox = null;
    public ?string $datetime = null;
    public ?string $granularity = null;
    public ?int $limit = null;
    public ?string $station = null;
    public ?string $update_frequency = null;
}

/** Item entity data model. */
class Item
{
    public array $geometry;
    public ?string $id = null;
    public ?array $links = null;
    public array $properties;
    public string $type;
}

/** Request payload for Item#load. */
class ItemLoadMatch
{
    public string $id;
}

