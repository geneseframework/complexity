"use strict";
exports.__esModule = true;
exports.BarchartService = void 0;
/**
 * Service for BarCharts
 */
var BarchartService = /** @class */ (function () {
    function BarchartService() {
    }
    /**
     * Merge two BarCharts
     * @param chart1
     * @param chart2
     */
    BarchartService.concat = function (chart1, chart2) {
        if (!chart2) {
            return chart1;
        }
        for (var _i = 0, _a = chart2.data; _i < _a.length; _i++) {
            var bar = _a[_i];
            chart1 = chart1.addResult(bar.x, bar.y);
        }
        return chart1;
    };
    return BarchartService;
}());
exports.BarchartService = BarchartService;
