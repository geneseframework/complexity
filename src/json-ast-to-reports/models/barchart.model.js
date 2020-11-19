"use strict";
exports.__esModule = true;
exports.Barchart = void 0;
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var chart_color_enum_1 = require("../enums/chart-color.enum");
var options_model_1 = require("../../core/models/options.model");
/**
 * Barchart of complexities
 */
var Barchart = /** @class */ (function () {
    function Barchart(cpxType) {
        this.data = []; // The data of the chart
        this.cpxType = cpxType;
    }
    /**
     * Increases the height of a bar with a given complexity
     * @param complexity / The x abscissa
     * @param quantity / The y value to add for the bar with x abscissa
     */
    Barchart.prototype.addResult = function (complexity, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var roundedCpx = Math.round(complexity);
        if (this.abscissaAlreadyExists(roundedCpx)) {
            this.increaseOrdinate(roundedCpx, quantity);
        }
        else {
            this.newBar(roundedCpx, quantity);
        }
        return this;
    };
    /**
     * Checks if a bar exists on a given abscissa
     * @param complexity / The abscissa value
     */
    Barchart.prototype.abscissaAlreadyExists = function (complexity) {
        return this.data.map(function (p) { return p.x; }).includes(complexity);
    };
    /**
     * Increases the height of an existing bar
     * @param abscissa / The abscissa of the bar (the complexity value)
     * @param quantity / The height to add at the bar
     */
    Barchart.prototype.increaseOrdinate = function (abscissa, quantity) {
        if (quantity === void 0) { quantity = 1; }
        var index = this.data.findIndex(function (e) { return e.x === abscissa; });
        this.data[index].y = this.data[index].y + quantity;
    };
    /**
     * Adds a bar for a given abscissa
     * @param complexity
     * @param quantity
     */
    Barchart.prototype.newBar = function (complexity, quantity) {
        if (quantity === void 0) { quantity = 1; }
        this.data.push({ x: complexity, y: quantity, color: this.getColor(complexity) });
    };
    /**
     * Sorts the data by abscissa value (orders the complexities by ascending sort)
     */
    Barchart.prototype.sort = function () {
        this.data = this.data.sort(function (A, B) { return A.x - B.x; });
        return this;
    };
    /**
     * Gets the color of a bar with a given abscissa
     * @param complexity / The abscissa of the bar
     */
    Barchart.prototype.getColor = function (complexity) {
        var color = chart_color_enum_1.ChartColor.WARNING;
        var cpx = this.cpxType + "Cpx";
        if (complexity <= options_model_1.Options[cpx].warningThreshold) {
            color = chart_color_enum_1.ChartColor.CORRECT;
        }
        else if (complexity > options_model_1.Options[cpx].errorThreshold) {
            color = chart_color_enum_1.ChartColor.ERROR;
        }
        return color;
    };
    /**
     * Adds bars with height = 0 when there is no method with a given complexity value which is lower than the greatest value
     * Returns the chart himself
     */
    Barchart.prototype.plugChartHoles = function () {
        var _a;
        this.sort();
        var cpxMax = (_a = this.data[this.data.length - 1]) === null || _a === void 0 ? void 0 : _a.x;
        var cpxMin = this.cpxType === complexity_type_enum_1.ComplexityType.COGNITIVE ? 0 : 1;
        var _loop_1 = function (cpx) {
            if (!this_1.data.find(function (e) { return e.x === cpx; })) {
                this_1.addResult(cpx, 0);
            }
        };
        var this_1 = this;
        for (var cpx = cpxMin; cpx < cpxMax; cpx++) {
            _loop_1(cpx);
        }
        this.sort();
        return this;
    };
    return Barchart;
}());
exports.Barchart = Barchart;
