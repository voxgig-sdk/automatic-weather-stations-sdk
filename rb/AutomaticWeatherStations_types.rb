# frozen_string_literal: true

# Typed models for the AutomaticWeatherStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Collection entity data model.
#
# @!attribute [rw] href
#   @return [String]
#
# @!attribute [rw] rel
#   @return [String]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Collection = Struct.new(
  :href,
  :rel,
  :title,
  :type,
  keyword_init: true
)

# Match filter for Collection#list (any subset of Collection fields).
#
# @!attribute [rw] href
#   @return [String, nil]
#
# @!attribute [rw] rel
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
CollectionListMatch = Struct.new(
  :href,
  :rel,
  :title,
  :type,
  keyword_init: true
)

# FeatureCollection entity data model.
#
# @!attribute [rw] feature
#   @return [Array]
#
# @!attribute [rw] link
#   @return [Array, nil]
#
# @!attribute [rw] number_matched
#   @return [Integer, nil]
#
# @!attribute [rw] number_returned
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String]
FeatureCollection = Struct.new(
  :feature,
  :link,
  :number_matched,
  :number_returned,
  :type,
  keyword_init: true
)

# Match filter for FeatureCollection#list (any subset of FeatureCollection fields).
#
# @!attribute [rw] feature
#   @return [Array, nil]
#
# @!attribute [rw] link
#   @return [Array, nil]
#
# @!attribute [rw] number_matched
#   @return [Integer, nil]
#
# @!attribute [rw] number_returned
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
FeatureCollectionListMatch = Struct.new(
  :feature,
  :link,
  :number_matched,
  :number_returned,
  :type,
  keyword_init: true
)

# Item entity data model.
#
# @!attribute [rw] geometry
#   @return [Hash]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [Array, nil]
#
# @!attribute [rw] property
#   @return [Hash]
#
# @!attribute [rw] type
#   @return [String]
Item = Struct.new(
  :geometry,
  :id,
  :link,
  :property,
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

