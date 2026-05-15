package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/automatic-weather-stations-sdk"
	"github.com/voxgig-sdk/automatic-weather-stations-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestFeatureCollectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.FeatureCollection(nil)
		if ent == nil {
			t.Fatal("expected non-nil FeatureCollectionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := feature_collectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "feature_collection." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AUTOMATICWEATHERSTATIONS_TEST_FEATURE_COLLECTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		featureCollectionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.feature_collection", setup.data)))
		var featureCollectionRef01Data map[string]any
		if len(featureCollectionRef01DataRaw) > 0 {
			featureCollectionRef01Data = core.ToMapAny(featureCollectionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = featureCollectionRef01Data

		// LIST
		featureCollectionRef01Ent := client.FeatureCollection(nil)
		featureCollectionRef01Match := map[string]any{}

		featureCollectionRef01ListResult, err := featureCollectionRef01Ent.List(featureCollectionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, featureCollectionRef01ListOk := featureCollectionRef01ListResult.([]any)
		if !featureCollectionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", featureCollectionRef01ListResult)
		}

	})
}

func feature_collectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "feature_collection", "FeatureCollectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read feature_collection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse feature_collection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"feature_collection01", "feature_collection02", "feature_collection03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AUTOMATICWEATHERSTATIONS_TEST_FEATURE_COLLECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AUTOMATICWEATHERSTATIONS_TEST_FEATURE_COLLECTION_ENTID": idmap,
		"AUTOMATICWEATHERSTATIONS_TEST_LIVE":      "FALSE",
		"AUTOMATICWEATHERSTATIONS_TEST_EXPLAIN":   "FALSE",
		"AUTOMATICWEATHERSTATIONS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["AUTOMATICWEATHERSTATIONS_TEST_FEATURE_COLLECTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AUTOMATICWEATHERSTATIONS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["AUTOMATICWEATHERSTATIONS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewAutomaticWeatherStationsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AUTOMATICWEATHERSTATIONS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AUTOMATICWEATHERSTATIONS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
