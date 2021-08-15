import { CodeLine } from './code-line.model';

/**
    The TypeScript code seen as an array of CodeLine
 */
export class Code {

    lines?: CodeLine[] = [];            // The lines of the code
    start ?= 0;                         // The absolute pos of the code in the SourceFile
    text ?= '';                         // The code itself (as string)


    get end(): number {
        return this.start + this.text?.length ?? 0;
    }


    getLine(issue: number): CodeLine {
        return this.lines.find(l => l.issue === issue);
    }


    /**
     * Sets the content of the code (as string) with its CodeLines
     */
    setTextWithLines(): void {
        this.text = this.lines.map(e => `${e.text}\n`).join('');
    }


    /**
     * Sets the nesting complexity to each CodeLine
     */
    setLinesDepthAndNestingCpx(): void {
        for (const line of this.lines) {
            line.setDepthAndNestingCpx();
        }
    }

}
