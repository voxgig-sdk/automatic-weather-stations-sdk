// Typed models for the AutomaticWeatherStations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Collection {
  href: string
  rel: string
  title?: string
  type?: string
}

export interface CollectionListMatch {
  href?: string
  rel?: string
  title?: string
  type?: string
}

export interface FeatureCollection {
  feature: any[]
  link?: any[]
  number_matched?: number
  number_returned?: number
  type: string
}

export interface FeatureCollectionListMatch {
  feature?: any[]
  link?: any[]
  number_matched?: number
  number_returned?: number
  type?: string
}

export interface Item {
  geometry: Record<string, any>
  id?: string
  link?: any[]
  property: Record<string, any>
  type: string
}

export interface ItemLoadMatch {
  id: string
}

