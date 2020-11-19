import { CpxFactorsInterface } from '../interfaces/cpx-factors.interface';

const complexityFactors: CpxFactorsInterface = {};


complexityFactors.aggregation = {
    arr: 1,                             // Array of arrays
    density: 0.05,                      // Accumulation of nodes on a same line of code
    differentLogicDoor: 2,              // A "or" after a "and" (or a "or" after a "and") without brackets
    regex: 0.1                          // Each element in a regex
};

complexityFactors.atomic = {
    declaration: 0,                     // Class, Method or Function declarations
    empty: 0,                           // Abstract nodes, without complexity weight
    keyword: 0.1,                       // Keyword alias ("AnyKeyword", "TrueKeyword", "VariableStatement", "VoidKeyword", ...)
    literal: 0.1,                       // Literal alias ("StringLiteral", "NumericLiteral", ...)
    node: 0.1,                          // Any AST node ("Identifier", "Parameter", "Block", IfStatement, ...)
};

complexityFactors.depth = {
    arr: 1.5,                           // Depth of elements inside an array
};

complexityFactors.nesting = {
    conditional: 0.5,                   // Inside a conditional
    func: 1,                            // Usage of a function or method inside a block of code
    loop: 0.5,                          // Inside a loop
    ternary: 2                          // Ternaries inside other ternaries
};

complexityFactors.recursion = {
    callback: 2,                        // Callback (call to a parameter of the parentFunction (ie method) of the node)
    recursivity: 2                      // Recursive method (call to the node's method)
};

complexityFactors.structural = {
    arr: 0.1,                           // "Array", "Set"
    asynchronicity: 1,                  // "Promise", "Observable"
    conditional: 1,                     // "if", "else", "else if", "switch", "catch", nullish coalescing
    externalBinding: 3,                 // A "this" inside a method which not refers to the method parentFunction (its class)
    func: 1,                            // Usage of a function or method inside a block of code
    jump: 1,                            // "break", "continue"
    logicDoor: 1,                       // "and", "or", "not"
    bitDoor: 2,                         // ">>", ">>", ">>>", "&", "|", "^"
    loop: 1,                            // "for", "foreach", "while"
    method: 1,                          // Usage of a method (located in the project or elsewhere)
    regex: 1,                           // Regular expression
    ternary: 1                          // Ternary expression
};

complexityFactors.use = {
    method: 1,                          // Usage of a method
};

export const cpxFactors: CpxFactorsInterface = complexityFactors;
