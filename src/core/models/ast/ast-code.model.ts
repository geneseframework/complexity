import { AstLine } from './ast-line.model';

/**
    The TypeScript code seen as an array of AstLine
 */
export class AstCode {

    lines?: AstLine[] = [];            // The lines of the code
    start ?= 0;                         // The absolute pos of the code in the SourceFile
    text ?= '';                         // The code itself (as string)


    get end(): number {
        return this.start + this.text?.length ?? 0;
    }


    getLine(issue: number): AstLine {
        return this.lines.find(l => l.issue === issue);
    }


    /**
     * Sets the content of the code (as string) with its AstLines
     */
    setTextWithLines(): void {
        this.text = this.lines.map(e => `${e.text}\n`).join('');
    }


    /**
     * Sets the nesting complexity to each AstLine
     */
    setLinesDepthAndNestingCpx(): void {
        for (const line of this.lines) {
            line.setDepthAndNestingCpx();
        }
    }

}
