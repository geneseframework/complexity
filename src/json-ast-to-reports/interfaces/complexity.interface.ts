import { ComplexityType } from '../enums/complexity-type.enum';

/**
 * Complexity interface
 */
export interface Complexity {

    errorThreshold: number;     // The methods with a complexity score strictly greater than this threshold will have "error" status
    type: ComplexityType;       // The kind of complexity (cognitive or cyclomatic)
    warningThreshold: number;   // The methods with a complexity score strictly greater than this threshold and lower than errorThreshold will have "warning" status

}
