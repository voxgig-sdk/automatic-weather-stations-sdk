package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/automatic-weather-stations-sdk/go"
	"github.com/voxgig-sdk/automatic-weather-stations-sdk/go/core"

	vs "github.com/voxgig-sdk/automatic-weather-stations-sdk/go/utility/struct"
)

func TestItemEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Item(nil)
		if ent == nil {
			t.Fatal("expected non-nil ItemEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := itemBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "item." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set AUTOMATICWEATHERSTATIONS_TEST_ITEM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		itemRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.item", setup.data)))
		var itemRef01Data map[string]any
		if len(itemRef01DataRaw) > 0 {
			itemRef01Data = core.ToMapAny(itemRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = itemRef01Data

		// LOAD
		itemRef01Ent := client.Item(nil)
		itemRef01MatchDt0 := map[string]any{
			"id": itemRef01Data["id"],
		}
		itemRef01DataDt0Loaded, err := itemRef01Ent.Load(itemRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		itemRef01DataDt0LoadResult := core.ToMapAny(itemRef01DataDt0Loaded)
		if itemRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if itemRef01DataDt0LoadResult["id"] != itemRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func itemBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "item", "ItemTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read item test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse item test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"item01", "item02", "item03"},
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
	entidEnvRaw := os.Getenv("AUTOMATICWEATHERSTATIONS_TEST_ITEM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AUTOMATICWEATHERSTATIONS_TEST_ITEM_ENTID": idmap,
		"AUTOMATICWEATHERSTATIONS_TEST_LIVE":      "FALSE",
		"AUTOMATICWEATHERSTATIONS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["AUTOMATICWEATHERSTATIONS_TEST_ITEM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AUTOMATICWEATHERSTATIONS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
