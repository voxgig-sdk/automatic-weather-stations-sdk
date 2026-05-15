<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AutomaticWeatherStationsUtility::setRegistrar(function (AutomaticWeatherStationsUtility $u): void {
    $u->clean = [AutomaticWeatherStationsClean::class, 'call'];
    $u->done = [AutomaticWeatherStationsDone::class, 'call'];
    $u->make_error = [AutomaticWeatherStationsMakeError::class, 'call'];
    $u->feature_add = [AutomaticWeatherStationsFeatureAdd::class, 'call'];
    $u->feature_hook = [AutomaticWeatherStationsFeatureHook::class, 'call'];
    $u->feature_init = [AutomaticWeatherStationsFeatureInit::class, 'call'];
    $u->fetcher = [AutomaticWeatherStationsFetcher::class, 'call'];
    $u->make_fetch_def = [AutomaticWeatherStationsMakeFetchDef::class, 'call'];
    $u->make_context = [AutomaticWeatherStationsMakeContext::class, 'call'];
    $u->make_options = [AutomaticWeatherStationsMakeOptions::class, 'call'];
    $u->make_request = [AutomaticWeatherStationsMakeRequest::class, 'call'];
    $u->make_response = [AutomaticWeatherStationsMakeResponse::class, 'call'];
    $u->make_result = [AutomaticWeatherStationsMakeResult::class, 'call'];
    $u->make_point = [AutomaticWeatherStationsMakePoint::class, 'call'];
    $u->make_spec = [AutomaticWeatherStationsMakeSpec::class, 'call'];
    $u->make_url = [AutomaticWeatherStationsMakeUrl::class, 'call'];
    $u->param = [AutomaticWeatherStationsParam::class, 'call'];
    $u->prepare_auth = [AutomaticWeatherStationsPrepareAuth::class, 'call'];
    $u->prepare_body = [AutomaticWeatherStationsPrepareBody::class, 'call'];
    $u->prepare_headers = [AutomaticWeatherStationsPrepareHeaders::class, 'call'];
    $u->prepare_method = [AutomaticWeatherStationsPrepareMethod::class, 'call'];
    $u->prepare_params = [AutomaticWeatherStationsPrepareParams::class, 'call'];
    $u->prepare_path = [AutomaticWeatherStationsPreparePath::class, 'call'];
    $u->prepare_query = [AutomaticWeatherStationsPrepareQuery::class, 'call'];
    $u->result_basic = [AutomaticWeatherStationsResultBasic::class, 'call'];
    $u->result_body = [AutomaticWeatherStationsResultBody::class, 'call'];
    $u->result_headers = [AutomaticWeatherStationsResultHeaders::class, 'call'];
    $u->transform_request = [AutomaticWeatherStationsTransformRequest::class, 'call'];
    $u->transform_response = [AutomaticWeatherStationsTransformResponse::class, 'call'];
});
