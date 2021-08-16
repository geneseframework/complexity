import { CpxFactorsInterface } from '../cpx-factors.interface';

export interface JsonAstNodeInterface {

    children?: JsonAstNodeInterface[];
    cpxFactors?: CpxFactorsInterface;
    end: number;
    kind: string;
    name?: string;
    pos: number;
    start?: number;
    type?: string;

}
