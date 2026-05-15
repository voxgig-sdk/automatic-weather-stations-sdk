package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCollectionEntityFunc func(client *AutomaticWeatherStationsSDK, entopts map[string]any) AutomaticWeatherStationsEntity

var NewFeatureCollectionEntityFunc func(client *AutomaticWeatherStationsSDK, entopts map[string]any) AutomaticWeatherStationsEntity

var NewItemEntityFunc func(client *AutomaticWeatherStationsSDK, entopts map[string]any) AutomaticWeatherStationsEntity

