/**
 * The Complexity Category "atomic"
 */
export class AtomicCpx {

    declaration ?= 0;                       // Declaration of a Class, a Function, a Method, ...
    empty ?= 0;
    imp ?= 0;                               // Element imported from another file
    keyword ?= 0;
    literal ?= 0;
    node ?= 0;                              // Any AST node ("Identifier", " ", "Block", IfStatement, ...)

}
