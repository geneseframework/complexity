/**
 * Defines the elements included in a file div in a files report
 */
import { CpxLevel } from '../../enums/cpx-level.enum';

export class FileReport {

    code ?= '';                                         // The code of the file
    cognitiveColor ?= CpxLevel.LOW;                     // The color of the file for cognitive complexity score
    cpxIndex ?= 0;                                      // The cognitive complexity score
    cyclomaticColor ?= CpxLevel.LOW;                    // The color of the file for cyclomatic complexity score
    cyclomaticValue ?= 0;                               // The cyclomatic complexity score
    name ?= '';                                     // The name of the file

}
