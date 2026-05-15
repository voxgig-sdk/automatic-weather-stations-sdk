package voxgigautomaticweatherstationssdk

import (
	"github.com/voxgig-sdk/automatic-weather-stations-sdk/core"
	"github.com/voxgig-sdk/automatic-weather-stations-sdk/entity"
	"github.com/voxgig-sdk/automatic-weather-stations-sdk/feature"
	_ "github.com/voxgig-sdk/automatic-weather-stations-sdk/utility"
)

// Type aliases preserve external API.
type AutomaticWeatherStationsSDK = core.AutomaticWeatherStationsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AutomaticWeatherStationsEntity = core.AutomaticWeatherStationsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AutomaticWeatherStationsError = core.AutomaticWeatherStationsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCollectionEntityFunc = func(client *core.AutomaticWeatherStationsSDK, entopts map[string]any) core.AutomaticWeatherStationsEntity {
		return entity.NewCollectionEntity(client, entopts)
	}
	core.NewFeatureCollectionEntityFunc = func(client *core.AutomaticWeatherStationsSDK, entopts map[string]any) core.AutomaticWeatherStationsEntity {
		return entity.NewFeatureCollectionEntity(client, entopts)
	}
	core.NewItemEntityFunc = func(client *core.AutomaticWeatherStationsSDK, entopts map[string]any) core.AutomaticWeatherStationsEntity {
		return entity.NewItemEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAutomaticWeatherStationsSDK = core.NewAutomaticWeatherStationsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
