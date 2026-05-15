# AutomaticWeatherStations SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AutomaticWeatherStationsUtility.registrar = ->(u) {
  u.clean = AutomaticWeatherStationsUtilities::Clean
  u.done = AutomaticWeatherStationsUtilities::Done
  u.make_error = AutomaticWeatherStationsUtilities::MakeError
  u.feature_add = AutomaticWeatherStationsUtilities::FeatureAdd
  u.feature_hook = AutomaticWeatherStationsUtilities::FeatureHook
  u.feature_init = AutomaticWeatherStationsUtilities::FeatureInit
  u.fetcher = AutomaticWeatherStationsUtilities::Fetcher
  u.make_fetch_def = AutomaticWeatherStationsUtilities::MakeFetchDef
  u.make_context = AutomaticWeatherStationsUtilities::MakeContext
  u.make_options = AutomaticWeatherStationsUtilities::MakeOptions
  u.make_request = AutomaticWeatherStationsUtilities::MakeRequest
  u.make_response = AutomaticWeatherStationsUtilities::MakeResponse
  u.make_result = AutomaticWeatherStationsUtilities::MakeResult
  u.make_point = AutomaticWeatherStationsUtilities::MakePoint
  u.make_spec = AutomaticWeatherStationsUtilities::MakeSpec
  u.make_url = AutomaticWeatherStationsUtilities::MakeUrl
  u.param = AutomaticWeatherStationsUtilities::Param
  u.prepare_auth = AutomaticWeatherStationsUtilities::PrepareAuth
  u.prepare_body = AutomaticWeatherStationsUtilities::PrepareBody
  u.prepare_headers = AutomaticWeatherStationsUtilities::PrepareHeaders
  u.prepare_method = AutomaticWeatherStationsUtilities::PrepareMethod
  u.prepare_params = AutomaticWeatherStationsUtilities::PrepareParams
  u.prepare_path = AutomaticWeatherStationsUtilities::PreparePath
  u.prepare_query = AutomaticWeatherStationsUtilities::PrepareQuery
  u.result_basic = AutomaticWeatherStationsUtilities::ResultBasic
  u.result_body = AutomaticWeatherStationsUtilities::ResultBody
  u.result_headers = AutomaticWeatherStationsUtilities::ResultHeaders
  u.transform_request = AutomaticWeatherStationsUtilities::TransformRequest
  u.transform_response = AutomaticWeatherStationsUtilities::TransformResponse
}
