"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticWeatherStationsError = void 0;
class AutomaticWeatherStationsError extends Error {
    isAutomaticWeatherStationsError = true;
    sdk = 'AutomaticWeatherStations';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AutomaticWeatherStationsError = AutomaticWeatherStationsError;
//# sourceMappingURL=AutomaticWeatherStationsError.js.map