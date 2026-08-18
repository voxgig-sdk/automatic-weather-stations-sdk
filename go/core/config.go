package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AutomaticWeatherStations",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://data.geo.admin.ch/api/stac/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"collection": map[string]any{},
				"feature_collection": map[string]any{},
				"item": map[string]any{},
			},
		},
		"entity": map[string]any{
			"collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "href",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rel",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
				},
				"name": "collection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/collections/ch.meteoschweiz.ogd-smn",
								"parts": []any{
									"collections",
									"ch.meteoschweiz.ogd-smn",
								},
								"select": map[string]any{
									"$action": "chmeteoschweizogd_smn",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"feature_collection": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "features",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "links",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "numberMatched",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "numberReturned",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "feature_collection",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "bbox",
											"orig": "bbox",
											"type": "`$ARRAY`",
										},
										map[string]any{
											"kind": "query",
											"name": "datetime",
											"orig": "datetime",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "granularity",
											"orig": "granularity",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "station",
											"orig": "station",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "update_frequency",
											"orig": "update_frequency",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/collections/ch.meteoschweiz.ogd-smn/items",
								"parts": []any{
									"collections",
									"ch.meteoschweiz.ogd-smn",
									"items",
								},
								"select": map[string]any{
									"exist": []any{
										"bbox",
										"datetime",
										"granularity",
										"limit",
										"station",
										"update_frequency",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"item": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "geometry",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "links",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "properties",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "item",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "item_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/collections/ch.meteoschweiz.ogd-smn/items/{itemId}",
								"parts": []any{
									"collections",
									"ch.meteoschweiz.ogd-smn",
									"items",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"itemId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
