"use strict";
exports.__esModule = true;
exports.NormalInterfaceDeclaration = void 0;
var location_model_1 = require("./location.model");
var normal_interface_declaration_children_model_1 = require("./normal-interface-declaration-children.model");
var NormalInterfaceDeclaration = /** @class */ (function () {
    function NormalInterfaceDeclaration() {
        this.name = '';
        this.children = new normal_interface_declaration_children_model_1.NormalInterfaceDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return NormalInterfaceDeclaration;
}());
exports.NormalInterfaceDeclaration = NormalInterfaceDeclaration;
