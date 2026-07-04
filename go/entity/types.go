// Typed models for the AutomaticWeatherStations SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Collection is the typed data model for the collection entity.
type Collection struct {
	Href string `json:"href"`
	Rel string `json:"rel"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// CollectionListMatch mirrors the collection fields as an all-optional match
// filter (Go analog of Partial<Collection>).
type CollectionListMatch struct {
	Href *string `json:"href,omitempty"`
	Rel *string `json:"rel,omitempty"`
	Title *string `json:"title,omitempty"`
	Type *string `json:"type,omitempty"`
}

// FeatureCollection is the typed data model for the feature_collection entity.
type FeatureCollection struct {
	Feature []any `json:"feature"`
	Link *[]any `json:"link,omitempty"`
	NumberMatched *int `json:"number_matched,omitempty"`
	NumberReturned *int `json:"number_returned,omitempty"`
	Type string `json:"type"`
}

// FeatureCollectionListMatch mirrors the feature_collection fields as an all-optional match
// filter (Go analog of Partial<FeatureCollection>).
type FeatureCollectionListMatch struct {
	Feature *[]any `json:"feature,omitempty"`
	Link *[]any `json:"link,omitempty"`
	NumberMatched *int `json:"number_matched,omitempty"`
	NumberReturned *int `json:"number_returned,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Item is the typed data model for the item entity.
type Item struct {
	Geometry map[string]any `json:"geometry"`
	Id *string `json:"id,omitempty"`
	Link *[]any `json:"link,omitempty"`
	Property map[string]any `json:"property"`
	Type string `json:"type"`
}

// ItemLoadMatch is the typed request payload for Item.LoadTyped.
type ItemLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
