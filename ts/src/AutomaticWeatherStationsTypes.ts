// Typed models for the AutomaticWeatherStations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Collection {
}

export interface CollectionListMatch {

  // Selects a custom action instead of the plain list:
  //   'chmeteoschweizogd_smn'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Item {
  features: any[]
  geometry: Record<string, any>
  id?: string
  links?: any[]
  numberMatched?: number
  numberReturned?: number
  properties: Record<string, any>
  type: string
}

export interface ItemLoadMatch {
  id: string
}

export interface ItemListMatch {
  bbox?: any[]
  datetime?: string
  granularity?: string
  limit?: number
  station?: string
  update_frequency?: string
}

