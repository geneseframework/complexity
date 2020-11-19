"use strict";
exports.__esModule = true;
exports.NormalInterfaceDeclarationChildren = void 0;
var type_identifier_element_model_1 = require("./type-identifier-element.model");
var interface_body_model_1 = require("./interface-body.model");
var NormalInterfaceDeclarationChildren = /** @class */ (function () {
    function NormalInterfaceDeclarationChildren() {
        this.typeIdentifier = [new type_identifier_element_model_1.TypeIdentifierElement()];
        this.interfaceBody = [new interface_body_model_1.InterfaceBody()];
    }
    return NormalInterfaceDeclarationChildren;
}());
exports.NormalInterfaceDeclarationChildren = NormalInterfaceDeclarationChildren;
