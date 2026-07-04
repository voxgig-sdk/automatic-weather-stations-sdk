# Typed models for the AutomaticWeatherStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Collection:
    href: str
    rel: str
    title: Optional[str] = None
    type: Optional[str] = None


@dataclass
class CollectionListMatch:
    href: Optional[str] = None
    rel: Optional[str] = None
    title: Optional[str] = None
    type: Optional[str] = None


@dataclass
class FeatureCollection:
    feature: list
    type: str
    link: Optional[list] = None
    number_matched: Optional[int] = None
    number_returned: Optional[int] = None


@dataclass
class FeatureCollectionListMatch:
    feature: Optional[list] = None
    link: Optional[list] = None
    number_matched: Optional[int] = None
    number_returned: Optional[int] = None
    type: Optional[str] = None


@dataclass
class Item:
    geometry: dict
    property: dict
    type: str
    id: Optional[str] = None
    link: Optional[list] = None


@dataclass
class ItemLoadMatch:
    id: str

