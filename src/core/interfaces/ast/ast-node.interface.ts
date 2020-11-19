import { IdentifierType } from '../identifier-type.type';
import { CpxFactorsInterface } from '../cpx-factors.interface';

export interface AstNodeInterface {

    children?: AstNodeInterface[];
    cpxFactors?: CpxFactorsInterface;
    end: number;
    kind: string;
    name?: string;
    pos: number;
    start?: number;
    type?: IdentifierType;

}
