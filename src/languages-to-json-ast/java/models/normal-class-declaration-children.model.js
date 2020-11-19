"use strict";
exports.__esModule = true;
exports.NormalClassDeclarationChildren = void 0;
var infos_model_1 = require("./infos.model");
var type_identifier_element_model_1 = require("./type-identifier-element.model");
var class_body_element_model_1 = require("./class-body-element.model");
var NormalClassDeclarationChildren = /** @class */ (function () {
    function NormalClassDeclarationChildren() {
        this.Class = [new infos_model_1.Infos()];
        this.typeIdentifier = [new type_identifier_element_model_1.TypeIdentifierElement()];
        this.classBody = [new class_body_element_model_1.ClassBodyElement()];
    }
    return NormalClassDeclarationChildren;
}());
exports.NormalClassDeclarationChildren = NormalClassDeclarationChildren;
