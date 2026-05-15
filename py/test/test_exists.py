# ProjectName SDK exists test

import pytest
from automaticweatherstations_sdk import AutomaticWeatherStationsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AutomaticWeatherStationsSDK.test(None, None)
        assert testsdk is not None
