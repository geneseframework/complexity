"use strict";
exports.__esModule = true;
exports.Stats = void 0;
var barchart_model_1 = require("./barchart.model");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var tools_service_1 = require("../../core/services/tools.service");
/**
 * The different statistics sent to handlebars templates of file reports and folder reports
 */
var Stats = /** @class */ (function () {
    function Stats() {
        this.barChartCognitive = new barchart_model_1.Barchart(complexity_type_enum_1.ComplexityType.COGNITIVE); // Bar chart of cognitive complexity
        this.barChartCyclomatic = new barchart_model_1.Barchart(complexity_type_enum_1.ComplexityType.CYCLOMATIC); // Bar chart of cyclomatic complexity
        this.numberOfMethodsByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus(); // Number of methods spread by status
        this.numberOfFiles = 0; // Number of files of the report (if it's a folder report)
        this.numberOfMethods = 0; // Number of methods of the report
        this.percentsByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus(); // Percentages of repartition by complexity status
        this.subject = ''; // The subject of the analysis (file or folder)
        this.totalCognitiveComplexity = 0; // Total of cognitive complexity scores
        this.totalCyclomaticComplexity = 0; // Total of cyclomatic complexity scores
    }
    /**
     * Sets the percentages of cognitive and cyclomatic complexities spread by complexity status
     */
    Stats.prototype.setPercentages = function () {
        this.setPercentagesByComplexity(complexity_type_enum_1.ComplexityType.COGNITIVE);
        this.setPercentagesByComplexity(complexity_type_enum_1.ComplexityType.CYCLOMATIC);
    };
    /**
     * Sets the percentages of cognitive or cyclomatic complexity spread by complexity status
     */
    Stats.prototype.setPercentagesByComplexity = function (cpx) {
        if (this.numberOfMethodsByStatus[cpx]) {
            this.percentsByStatus[cpx] = new complexities_by_status_interface_1.ComplexitiesByStatus();
            this.percentsByStatus[cpx].correct = tools_service_1.percent(this.numberOfMethodsByStatus[cpx].correct, this.numberOfMethods);
            this.percentsByStatus[cpx].warning = tools_service_1.percent(this.numberOfMethodsByStatus[cpx].warning, this.numberOfMethods);
            this.percentsByStatus[cpx].error = tools_service_1.percent(this.numberOfMethodsByStatus[cpx].error, this.numberOfMethods);
        }
    };
    /**
     * For each complexity chart, adds bars with height = 0 when there is no method with a given complexity value which is lower than the greatest value
     */
    Stats.prototype.plugChartHoles = function () {
        this.barChartCognitive = this.barChartCognitive.plugChartHoles();
        this.barChartCyclomatic = this.barChartCyclomatic.plugChartHoles();
        return this;
    };
    return Stats;
}());
exports.Stats = Stats;
