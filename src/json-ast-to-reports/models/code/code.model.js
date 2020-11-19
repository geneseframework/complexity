"use strict";
exports.__esModule = true;
exports.Code = void 0;
/**
    The TypeScript code seen as an array of CodeLine
 */
var Code = /** @class */ (function () {
    function Code() {
        this.lines = []; // The lines of the code
        this.start = 0; // The absolute pos of the code in the SourceFile
        this.text = ''; // The code itself (as string)
    }
    Object.defineProperty(Code.prototype, "end", {
        get: function () {
            var _a, _b;
            return (_b = this.start + ((_a = this.text) === null || _a === void 0 ? void 0 : _a.length)) !== null && _b !== void 0 ? _b : 0;
        },
        enumerable: false,
        configurable: true
    });
    Code.prototype.getLine = function (issue) {
        return this.lines.find(function (l) { return l.issue === issue; });
    };
    /**
     * Sets the content of the code (as string) with its CodeLines
     */
    Code.prototype.setTextWithLines = function () {
        this.text = this.lines.map(function (e) { return e.text + "\n"; }).join('');
    };
    /**
     * Sets the nesting complexity to each CodeLine
     */
    Code.prototype.setLinesDepthAndNestingCpx = function () {
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            line.setDepthAndNestingCpx();
        }
    };
    return Code;
}());
exports.Code = Code;
