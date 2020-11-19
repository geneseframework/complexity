/**
 * The Complexity Category "Structural"
 */
export class StructuralCpx {

    arr ?= 0;                               // "Array", "Set"
    asynchronicity ?= 0;                    // "Promise", "Observable"
    callback ?= 0;                          // Callback (call to a parameter of the parentFunction (ie method) of the node)
    conditional ?= 0;                       // "if", "else", "else if", "switch", "catch", nullish coalescing
    externalBinding ?= 0;                   // A "this" inside a method which not refers to the method parentFunction (its class)
    func ?= 0;                              // Usage of a function or method inside a block of code
    jump ?= 0;                              // "break", "continue"
    logicDoor ?= 0;                         // "and", "or", "not"
    bitDoor ?= 0;                           // ">>", ">>", ">>>", "&", "|", "^"
    loop ?= 0;                              // "for", "foreach", "while"
    method ?= 0;                            // Call of another method (ex : a.slice(1))
    recursion ?= 0;                         // Recursion (call to the node's method)
    regex ?= 0;                             // Regular expression
    ternary ?= 0;                           // Ternary expression

}
