"use strict";
exports.__esModule = true;
exports.CodeService = void 0;
var code_model_1 = require("../models/code/code.model");
var code_line_model_1 = require("../models/code/code-line.model");
/**
 * Service managing Code objects
 */
var CodeService = /** @class */ (function () {
    function CodeService() {
    }
    /**
     * Creates a Code object from the content of a given code (as string)
     * @param text      // The content of the code
     * @param start
     */
    CodeService.getCode = function (text, start) {
        if (start === void 0) { start = 0; }
        if (!text) {
            return undefined;
        }
        var code = new code_model_1.Code();
        code.start = start;
        code.text = text;
        var textLines = text.split('\n');
        var issue = 1;
        for (var _i = 0, textLines_1 = textLines; _i < textLines_1.length; _i++) {
            var textLine = textLines_1[_i];
            var line = new code_line_model_1.CodeLine();
            line.code = code;
            line.text = textLine;
            line.issue = issue;
            line.start = start;
            line.end = start + textLine.length + 1;
            code.lines.push(line);
            issue++;
            start = line.end;
        }
        code.lines[code.lines.length - 1].end = text.length;
        return code;
    };
    /**
     * Returns the number of the CodeLine at a given pos in the code
     * @param code      // The Code where to search
     * @param position  // The pos where we search the number of its line
     */
    CodeService.getLineIssue = function (code, position) {
        var _a;
        if (position < 0 || position > (code === null || code === void 0 ? void 0 : code.end)) {
            return 0;
        }
        return (_a = code.lines.filter(function (l) { return l.start <= position && l.end > position; })) === null || _a === void 0 ? void 0 : _a[0].issue;
    };
    CodeService.prototype.isEndingWithBlockComments = function (line) {
        var _a, _b, _c;
        var text = line.textWithoutSlashComments;
        if ((_a = line.previousLine) === null || _a === void 0 ? void 0 : _a.isEndingWithBlockComments) {
            var splitEndBlockComments = text.split(/\*\//);
            if (splitEndBlockComments.length === 1) {
                return true;
            }
            var lastElement = splitEndBlockComments[splitEndBlockComments.length - 1];
            return (_b = /\/\*/.test(lastElement)) !== null && _b !== void 0 ? _b : false;
        }
        var splittedText = text === null || text === void 0 ? void 0 : text.split(/\/\*/);
        if (splittedText.length === 1) {
            return false;
        }
        var lastCommentedBlock = splittedText[splittedText.length - 1];
        return (_c = !/\*\//.test(lastCommentedBlock)) !== null && _c !== void 0 ? _c : false;
    };
    return CodeService;
}());
exports.CodeService = CodeService;
