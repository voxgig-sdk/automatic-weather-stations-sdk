-- Typed models for the AutomaticWeatherStations SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Collection
---@field href string
---@field rel string
---@field title? string
---@field type? string

---@class CollectionListMatch
---@field href? string
---@field rel? string
---@field title? string
---@field type? string

---@class FeatureCollection
---@field features table
---@field links? table
---@field numberMatched? number
---@field numberReturned? number
---@field type string

---@class FeatureCollectionListMatch
---@field features? table
---@field links? table
---@field numberMatched? number
---@field numberReturned? number
---@field type? string

---@class Item
---@field geometry table
---@field id? string
---@field links? table
---@field properties table
---@field type string

---@class ItemLoadMatch
---@field id string

local M = {}

return M
