import { AstLine } from './ast-line.model';
import { AstAbstract } from './ast-abstract.model';
import { flat } from '../../utils/arrays.util';

/**
    The code of a given element
 */
export class AstCode {

    astClassOrFunctionCodes: AstCode[] = [];                // The lines of the code which are not in the context of the current element (the functions and the classes)
    linesOutsideClassesAndFunctions?: AstLine[] = [];       // The lines of the code which are in the context of the current element (not in classes or functions declared inside the code of the current element)
    start ?= 0;                                             // The absolute pos of the code in the file
    text ?= '';                                             // The code itself (as string)

    constructor(text: string, astElement: AstAbstract) {
        this.text = text;
    }

    get astLines(): AstLine[] {
        return this.linesOutsideClassesAndFunctions.concat(flat(this.astClassOrFunctionCodes.map(a => a.astLines)))
            .sort((a, b) => a.issue - b.issue);
    }

    get end(): number {
        return this.start + this.text?.length ?? 0;
    }


    getLine(issue: number): AstLine {
        return this.astLines.find(l => l.issue === issue);
    }


}
