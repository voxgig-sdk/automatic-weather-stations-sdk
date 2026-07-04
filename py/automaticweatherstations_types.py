# Typed models for the AutomaticWeatherStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CollectionRequired(TypedDict):
    href: str
    rel: str


class Collection(CollectionRequired, total=False):
    title: str
    type: str


class CollectionListMatch(TypedDict, total=False):
    href: str
    rel: str
    title: str
    type: str


class FeatureCollectionRequired(TypedDict):
    feature: list
    type: str


class FeatureCollection(FeatureCollectionRequired, total=False):
    link: list
    number_matched: int
    number_returned: int


class FeatureCollectionListMatch(TypedDict, total=False):
    feature: list
    link: list
    number_matched: int
    number_returned: int
    type: str


class ItemRequired(TypedDict):
    geometry: dict
    property: dict
    type: str


class Item(ItemRequired, total=False):
    id: str
    link: list


class ItemLoadMatch(TypedDict):
    id: str
