<?php
declare(strict_types=1);

// AutomaticWeatherStations SDK exists test

require_once __DIR__ . '/../automaticweatherstations_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AutomaticWeatherStationsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
