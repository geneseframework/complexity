"use strict";
exports.__esModule = true;
exports.ClassBodyChildren = void 0;
var infos_model_1 = require("./infos.model");
var class_body_declaration_element_model_1 = require("./class-body-declaration-element.model");
var ClassBodyChildren = /** @class */ (function () {
    function ClassBodyChildren() {
        this.LCurly = [new infos_model_1.Infos()];
        this.classBodyDeclaration = [new class_body_declaration_element_model_1.ClassBodyDeclarationElement()];
        this.RCurly = [new infos_model_1.Infos()];
    }
    return ClassBodyChildren;
}());
exports.ClassBodyChildren = ClassBodyChildren;
