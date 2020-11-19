"use strict";
exports.__esModule = true;
exports.RepartitionByStatus = void 0;
/**
 * Number of elements by complexity status
 */
var RepartitionByStatus = /** @class */ (function () {
    function RepartitionByStatus() {
        this.correct = 0; // Number of elements with status "correct"
        this.warning = 0; // Number of elements with status "warning"
        this.error = 0; // Number of elements with status "error"
    }
    /**
     * Adds other repartitionByStatus
     * @param repartitionByStatus
     */
    RepartitionByStatus.prototype.add = function (repartitionByStatus) {
        var newStatuses = new RepartitionByStatus();
        newStatuses.correct = this.correct + repartitionByStatus.correct;
        newStatuses.warning = this.warning + repartitionByStatus.warning;
        newStatuses.error = this.error + repartitionByStatus.error;
        return newStatuses;
    };
    return RepartitionByStatus;
}());
exports.RepartitionByStatus = RepartitionByStatus;
