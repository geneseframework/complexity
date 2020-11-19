"use strict";
exports.__esModule = true;
exports.AstMethodService = void 0;
var complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
var complexity_type_enum_1 = require("../../enums/complexity-type.enum");
var evaluation_status_enum_1 = require("../../enums/evaluation-status.enum");
var AstMethodService = /** @class */ (function () {
    function AstMethodService() {
    }
    /**
     * The method sorting the rows of the methods report by decreasing cognitive complexity
     * @param methodsReport     // The array to sort
     */
    AstMethodService.sortByDecreasingCognitiveCpx = function (methodsReport) {
        return methodsReport.sort(function (a, b) { return b.cpxIndex - a.cpxIndex; });
    };
    /**
     * Returns the addition of a ComplexitiesByStatus object and the complexities scores of a given astMethod
     * @param cpxByStatus   // The object to add
     * @param astMethod    // The AstMethod in question
     */
    AstMethodService.prototype.addMethodCpxByStatus = function (cpxByStatus, astMethod) {
        var cpx = cpxByStatus !== null && cpxByStatus !== void 0 ? cpxByStatus : new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.COGNITIVE, astMethod.cognitiveStatus);
        cpx = this.incrementMethodByCpxType(cpx, complexity_type_enum_1.ComplexityType.CYCLOMATIC, astMethod.cyclomaticStatus);
        return cpx;
    };
    /**
     * For a given complexity type, returns the value of a ComplexitiesByStatus object incremented of one for a given MethodStatus
     * @param cpxByStatus       // The ComplexitiesByStatus object
     * @param complexityType    // The type of complexity to increment
     * @param methodStatus      // The complexity status
     */
    AstMethodService.prototype.incrementMethodByCpxType = function (cpxByStatus, complexityType, methodStatus) {
        var status = cpxByStatus;
        switch (methodStatus) {
            case evaluation_status_enum_1.MethodStatus.CORRECT:
                status[complexityType].correct = status[complexityType].correct + 1;
                break;
            case evaluation_status_enum_1.MethodStatus.WARNING:
                status[complexityType].warning++;
                break;
            case evaluation_status_enum_1.MethodStatus.ERROR:
                status[complexityType].error++;
                break;
            default:
                break;
        }
        return status;
    };
    return AstMethodService;
}());
exports.AstMethodService = AstMethodService;
