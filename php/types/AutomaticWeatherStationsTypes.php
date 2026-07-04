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
    public string $href;
    public string $rel;
    public ?string $title = null;
    public ?string $type = null;
}

/** Match filter for Collection#list (any subset of Collection fields). */
class CollectionListMatch
{
    public ?string $href = null;
    public ?string $rel = null;
    public ?string $title = null;
    public ?string $type = null;
}

/** FeatureCollection entity data model. */
class FeatureCollection
{
    public array $feature;
    public ?array $link = null;
    public ?int $number_matched = null;
    public ?int $number_returned = null;
    public string $type;
}

/** Match filter for FeatureCollection#list (any subset of FeatureCollection fields). */
class FeatureCollectionListMatch
{
    public ?array $feature = null;
    public ?array $link = null;
    public ?int $number_matched = null;
    public ?int $number_returned = null;
    public ?string $type = null;
}

/** Item entity data model. */
class Item
{
    public array $geometry;
    public ?string $id = null;
    public ?array $link = null;
    public array $property;
    public string $type;
}

/** Request payload for Item#load. */
class ItemLoadMatch
{
    public string $id;
}

