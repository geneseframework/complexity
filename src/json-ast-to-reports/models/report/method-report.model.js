"use strict";
exports.__esModule = true;
exports.MethodReport = void 0;
/**
 * Defines the elements included in a method's report
 */
var MethodReport = /** @class */ (function () {
    function MethodReport() {
        this.code = ''; // The code of the method
        this.cognitiveColor = 'correct'; // The color of the method for cognitive complexity score
        this.cpxIndex = 0; // The cognitive complexity score
        this.cyclomaticColor = 'correct'; // The color of the method for cyclomatic complexity score
        this.cyclomaticValue = 0; // The cyclomatic complexity score
        this.methodName = ''; // The name of the method
    }
    return MethodReport;
}());
exports.MethodReport = MethodReport;
