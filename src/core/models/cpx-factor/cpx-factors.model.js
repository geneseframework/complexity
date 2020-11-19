"use strict";
exports.__esModule = true;
exports.CpxFactors = void 0;
var factor_category_enum_1 = require("../../../json-ast-to-reports/enums/factor-category.enum");
var tools_service_1 = require("../../services/tools.service");
var aggregation_cpx_model_1 = require("./aggregation-cpx.model");
var nesting_cpx_model_1 = require("./nesting-cpx.model");
var atomic_cpx_model_1 = require("./atomic-cpx.model");
var structural_cpx_model_1 = require("./structural-cpx.model");
var depth_cpx_model_1 = require("./depth-cpx.model");
var context_cpx_model_1 = require("./context-cpx.model");
var recursion_cpx_model_1 = require("./recursion-cpx.model");
var use_cpx_model_1 = require("./use-cpx.model");
/**
 * The Complexity Factors
 */
var CpxFactors = /** @class */ (function () {
    function CpxFactors() {
        this.aggregation = new aggregation_cpx_model_1.AggregationCpx(); // Aggregation Complexity
        this.atomic = new atomic_cpx_model_1.AtomicCpx(); // Atomic Complexity
        this.context = new context_cpx_model_1.ContextCpx(); // Context Complexity
        this.depth = new depth_cpx_model_1.DepthCpx(); // Depth Complexity
        this.nesting = new nesting_cpx_model_1.NestingCpx(); // Nesting Complexity
        this.recursion = new recursion_cpx_model_1.RecursionCpx(); // Recursion Complexity
        this.structural = new structural_cpx_model_1.StructuralCpx(); // Structural Complexity
        this.use = new use_cpx_model_1.UseCpx(); // Use Complexity
    }
    Object.defineProperty(CpxFactors.prototype, "total", {
        // ---------------------------------------------------------------------------------
        //                                Getters and setters
        // ---------------------------------------------------------------------------------
        /**
         * Returns the total of Complexity Factors (the Complexity Index)
         */
        get: function () {
            var _a;
            var total = 0;
            for (var _i = 0, _b = Object.keys(this); _i < _b.length; _i++) {
                var key = _b[_i];
                total += (_a = this["total" + tools_service_1.capitalize(key)]) !== null && _a !== void 0 ? _a : 0;
            }
            return +total.toFixed(1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpxFactors.prototype, "totalAggregation", {
        get: function () {
            return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.AGGREGATION);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpxFactors.prototype, "totalAtomic", {
        get: function () {
            return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.ATOMIC);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpxFactors.prototype, "totalDepth", {
        get: function () {
            return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.DEPTH);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpxFactors.prototype, "totalNesting", {
        get: function () {
            return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.NESTING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpxFactors.prototype, "totalRecursion", {
        get: function () {
            return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.RECURSION);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpxFactors.prototype, "totalStructural", {
        get: function () {
            return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.STRUCTURAL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CpxFactors.prototype, "totalUse", {
        get: function () {
            return this.totalByFactorCategory(factor_category_enum_1.FactorCategory.USE);
        },
        enumerable: false,
        configurable: true
    });
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Returns the total Complexity Index for a given Category of Factors
     * @param factorCategory
     */
    CpxFactors.prototype.totalByFactorCategory = function (factorCategory) {
        var _a;
        var total = 0;
        for (var _i = 0, _b = Object.keys(this[factorCategory]); _i < _b.length; _i++) {
            var keyFeature = _b[_i];
            total += (_a = this[factorCategory][keyFeature]) !== null && _a !== void 0 ? _a : 0;
        }
        return total;
    };
    /**
     * Adds a CpxFactors object to another one
     * @param cpxFactors
     */
    CpxFactors.prototype.add = function (cpxFactors) {
        return tools_service_1.addObjects(this, cpxFactors, CpxFactors);
    };
    return CpxFactors;
}());
exports.CpxFactors = CpxFactors;
