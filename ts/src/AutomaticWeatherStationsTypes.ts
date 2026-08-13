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

  // Selects a custom action instead of the plain list:
  //   'chmeteoschweizogd_smn'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface FeatureCollection {
  features: any[]
  links?: any[]
  numberMatched?: number
  numberReturned?: number
  type: string
}

export interface FeatureCollectionListMatch {
  features?: any[]
  links?: any[]
  numberMatched?: number
  numberReturned?: number
  type?: string
}

export interface Item {
  geometry: Record<string, any>
  id?: string
  links?: any[]
  properties: Record<string, any>
  type: string
}

export interface ItemLoadMatch {
  id: string
}

