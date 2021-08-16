/**
 * A line of a Code object
 */
import { AstNode } from '../ast/ast-node.model';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { AstCode } from './ast-code.model';
import { AstCodeService } from '../../../json-ast-to-ast-model/services/ast-code.service';

export class AstLine {

    astNodes?: AstNode[] = [];                              // The array of AstNodes corresponding to AST nodes in this line of code
    #code?: AstCode = undefined;
    cpxFactors?: CpxFactors = new CpxFactors();             // The complexity factors relative to this line (breakFlows, increments,...)
    end ?= 0;                                               // The pos (in number of characters) of the end of the line
    ignore ?= false;
    #isEndingWithBlockComments?: boolean;
    issue ?= 0;                                             // The number of the line in its Code parentFunction (method)
    start ?= 0;                                             // The absolute pos (in number of characters) of the extractHooksAndArrowFunctions of the line in the SourceFile
    text ?= '';                                             // The text of the line



    get code(): AstCode {
        return this.#code;
    }


    set code(code: AstCode) {
        this.#code = code;
    }


    get isEndingWithBlockComments(): boolean {
        if (this.#isEndingWithBlockComments !== undefined) {
            return this.#isEndingWithBlockComments;
        }
        this.#isEndingWithBlockComments = new AstCodeService().isEndingWithBlockComments(this);
        return this.#isEndingWithBlockComments;
    }


    /**
     * Checks if a line is commented
     */
    get isCommented(): boolean {
        return this.text.trim().slice(0, 2) === `//` || this.text.trim().slice(0, 2) === `/*`;
    }


    get previousLine(): AstLine {
        return this.issue > 1 ? this.code?.lines?.[this.issue - 2] : undefined;
    }


    get textWithoutComments(): string {
        let text = this.textWithoutSlashComments;
        if (this.previousLine?.isEndingWithBlockComments) {
            text = `/*${text}`;
        }
        if (this.isEndingWithBlockComments) {
            text = `${text}*/`
        }
        return text.split(/\/\*.*\*\//).join('');
    }


    get textWithoutSlashComments(): string {
        const splittedText = this.text?.split(/\/\//) ?? '';
        if (splittedText.length === 1) {
            return this.text;
        }
        return this.text.slice(0, splittedText[0].length - 1);
    }


    /**
     * Add a comment at the end of a line of the code
     * @param comment   // The comment to add
     * @param maxLineLength
     */
    addComment(comment: string, maxLineLength: number): void {
        const txt = `${this.text} // `;
        this.text = `${txt.padEnd(maxLineLength + 10, '-')} ${comment}`;
    }


    /**
     * Sets the depth and nesting complexity to this CodeLine
     */
    setDepthAndNestingCpx(): void {
        // this.cpxFactors.nesting = new NestingCpx();
        // this.cpxFactors.depth = new DepthCpx();
        // for (const astNode of this.astNodes) {
        //     if (astNode.intrinsicNestingCpx > 0) {
        //         this.cpxFactors.depth = addObjects(this.cpxFactors.depth, astNode.cpxFactors?.depth);
        //         this.cpxFactors.nesting = addObjects(this.cpxFactors.nesting, astNode.parent?.cpxFactors?.nesting);
        //     }
        //     if (astNode.intrinsicDepthCpx > 0) {
        //         this.cpxFactors.depth = addObjects(this.cpxFactors.depth, astNode.parent?.cpxFactors?.depth);
        //     }
        // }
    }
}
