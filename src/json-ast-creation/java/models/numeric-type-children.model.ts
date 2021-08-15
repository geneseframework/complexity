import { IntegralType } from './integral-type.model';
import { FloatingPointType } from './floating-point-type.model';

export class NumericTypeChildren {
    integralType?: IntegralType[] = [new IntegralType()];
    floatingPointType?: FloatingPointType[] = [new FloatingPointType()];
}
