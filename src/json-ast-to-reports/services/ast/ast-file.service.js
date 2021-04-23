"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AstFileService = void 0;
var evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
var stats_service_1 = require("../report/stats.service");
var complexity_type_enum_1 = require("../../enums/complexity-type.enum");
/**
 * - AstFiles generation from Abstract Syntax AstNode of a file
 * - Other services for AstFiles
 */
var AstFileService = /** @class */ (function (_super) {
    __extends(AstFileService, _super);
    function AstFileService() {
        var _this = _super.call(this) || this;
        _this._stats = undefined; // The statistics of the AstFile
        _this.astFile = undefined; // The AstFile corresponding to this service
        return _this;
    }
    /**
     * Calculates the statistics of the AstFile
     * @param astFile    // The AstFile to analyse
     */
    AstFileService.prototype.calculateStats = function (astFile) {
        var _a, _b;
        this._stats.numberOfMethods = (_b = (_a = astFile.astMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        for (var _i = 0, _c = astFile.astMethods; _i < _c.length; _i++) {
            var method = _c[_i];
            this.incrementStats(method);
        }
    };
    /**
     * Increments AstFile statistics for a given method
     * @param astMethod    // The AstMethod to analyse
     */
    AstFileService.prototype.incrementStats = function (astMethod) {
        this.incrementStatsMethodsByStatus(astMethod, complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.incrementStatsMethodsByStatus(astMethod, complexity_type_enum_1.ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(astMethod.cpxIndex);
        this._stats.barChartCyclomatic.addResult(astMethod.cyclomaticCpx);
    };
    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param astMethod        // The AstMethod to analyse
     * @param type              // The complexity type
     */
    AstFileService.prototype.incrementStatsMethodsByStatus = function (astMethod, type) {
        var status = (type === complexity_type_enum_1.ComplexityType.COGNITIVE) ? astMethod.cognitiveStatus : astMethod.cyclomaticStatus;
        switch (status) {
            case evaluation_status_enum_1.MethodStatus.CORRECT:
                this._stats.numberOfMethodsByStatus[type].correct++;
                break;
            case evaluation_status_enum_1.MethodStatus.ERROR:
                this._stats.numberOfMethodsByStatus[type].error++;
                break;
            case evaluation_status_enum_1.MethodStatus.WARNING:
                this._stats.numberOfMethodsByStatus[type].warning++;
                break;
            default:
                break;
        }
    };
    /**
     * Adds the filename to the stats
     */
    AstFileService.prototype.getNameOrPath = function (astFile) {
        this._stats.subject = astFile.name;
    };
    return AstFileService;
}(stats_service_1.StatsService));
exports.AstFileService = AstFileService;
