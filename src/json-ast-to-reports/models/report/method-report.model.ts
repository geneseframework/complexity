/**
 * Defines the elements included in a method's report
 */
export class MethodReport {

    code ?= '';                                         // The code of the method
    cognitiveColor ?= 'correct';                        // The color of the method for cognitive complexity score
    cpxIndex ?= 0;                                      // The cognitive complexity score
    cyclomaticColor ?= 'correct';                       // The color of the method for cyclomatic complexity score
    cyclomaticValue ?= 0;                               // The cyclomatic complexity score
    methodName ?= '';                                   // The name of the method

}
