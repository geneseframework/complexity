import { ts } from 'ts-morph';

export class Input {
    identifier?: string = undefined;
    type?: ts.TypeNode = undefined;
    isParameter?: boolean = false;
}
