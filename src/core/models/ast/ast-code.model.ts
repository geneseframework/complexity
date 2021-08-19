import { AstLine } from './ast-line.model';
import { flat } from '../../utils/arrays.util';
import { AstAbstract } from './ast-abstract.model';
import * as chalk from 'chalk';

/**
    The code of a given element
 */
export class AstCode {

    #astAbstract: AstAbstract = undefined;
    astClassOrFunctionCodes: AstCode[] = [];                // The lines of the code which are not in the context of the current element (the functions and the classes)
    linesOutsideClassesAndFunctions?: AstLine[] = [];       // The lines of the code which are in the context of the current element (not in classes or functions declared inside the code of the current element)
    start ?= 0;                                             // The absolute pos of the first element of the code in the SourceFile
    textOutsideClassesAndFunctions ?= '';                                             // The code itself (as string)

    constructor(astAbstract: AstAbstract, text: string) {
        this.#astAbstract = astAbstract;
        this.textOutsideClassesAndFunctions = text;
    }

    get astLines(): AstLine[] {
        return this.linesOutsideClassesAndFunctions.concat(flat(this.astClassOrFunctionCodes.map(a => a.astLines)))
            .sort((a, b) => a.issue - b.issue);
    }

    get end(): number {
        return this.start + this.textOutsideClassesAndFunctions?.length ?? 0;
    }


    getLine(issue: number): AstLine {
        return this.astLines.find(l => l.issue === issue);
    }

    logg(): void {
        console.log(chalk.cyanBright('AST CODE '), this.#astAbstract.jsonAstNode.kind, this.#astAbstract.name);
        console.log(this.textOutsideClassesAndFunctions);
    }


}
