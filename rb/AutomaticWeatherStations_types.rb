# frozen_string_literal: true

# Typed models for the AutomaticWeatherStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Collection entity data model.
class Collection
end

# Request payload for Collection#list.
class CollectionListMatch
end

# Item entity data model.
#
# @!attribute [rw] features
#   @return [Array]
#
# @!attribute [rw] geometry
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] links
#   @return [Array, nil]
#
# @!attribute [rw] numberMatched
#   @return [Integer, nil]
#
# @!attribute [rw] numberReturned
#   @return [Integer, nil]
#
# @!attribute [rw] properties
#   @return [Hash]
#
# @!attribute [rw] type
#   @return [String]
Item = Struct.new(
  :features,
  :geometry,
  :id,
  :links,
  :numberMatched,
  :numberReturned,
  :properties,
  :type,
  keyword_init: true
)

# Request payload for Item#load.
#
# @!attribute [rw] id
#   @return [String]
ItemLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Item#list.
#
# @!attribute [rw] bbox
#   @return [Array, nil]
#
# @!attribute [rw] datetime
#   @return [String, nil]
#
# @!attribute [rw] granularity
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] station
#   @return [String, nil]
#
# @!attribute [rw] update_frequency
#   @return [String, nil]
ItemListMatch = Struct.new(
  :bbox,
  :datetime,
  :granularity,
  :limit,
  :station,
  :update_frequency,
  keyword_init: true
)

