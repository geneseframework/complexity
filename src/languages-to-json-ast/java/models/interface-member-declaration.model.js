"use strict";
exports.__esModule = true;
exports.InterfaceMemberDeclaration = void 0;
var interface_member_declaration_children_model_1 = require("./interface-member-declaration-children.model");
var location_model_1 = require("./location.model");
var InterfaceMemberDeclaration = /** @class */ (function () {
    function InterfaceMemberDeclaration() {
        this.name = '';
        this.children = new interface_member_declaration_children_model_1.InterfaceMemberDeclarationChildren();
        this.location = new location_model_1.Location();
    }
    return InterfaceMemberDeclaration;
}());
exports.InterfaceMemberDeclaration = InterfaceMemberDeclaration;
