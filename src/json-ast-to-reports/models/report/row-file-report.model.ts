/**
 * Defines the model of a row in the arrays of files reports
 */
export class RowFileReport {

    cognitiveColor ?= 'correct';    // The color associated to the cognitive complexity score of the method analysed in the row
    cpxIndex ?= 0;                  // The complexity index of the method analysed in the row
    cyclomaticColor ?= 'correct';   // The color associated to the cyclomatic complexity score of the method analysed in the row
    cyclomaticValue ?= 0;           // The cyclomatic complexity score of the method analysed in the row
    filename ?= '';                 // The name of the file
    linkFile ?= '';                 // The relative link to the file report
    methodName ?= '';               // The name of the method analysed in the row

}
