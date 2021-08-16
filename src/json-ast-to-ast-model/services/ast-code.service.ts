/**
 * Service managing Code objects
 */
import { AstFile } from '../../core/models/ast/ast-file.model';
import { AstCode } from '../../core/models/ast/ast-code.model';
import { AstLine } from '../../core/models/ast/ast-line.model';

export class AstCodeService {

    static generate(astFile: AstFile): AstCode {
        return undefined
    }

    /**
     * Creates a Code object from the content of a given code (as string)
     * @param text      // The content of the code
     * @param start
     */
    static getCode(text: string, start = 0): AstCode {
        if (!text) {
            return undefined;
        }
        const code: AstCode = new AstCode();
        code.start = start;
        code.text = text;
        const textLines: string[] = text.split('\n');
        let issue = 1;
        for (const textLine of textLines) {
            const line = new AstLine();
            line.code = code;
            line.text = textLine;
            line.issue = issue;
            line.start = start;
            line.end = start + textLine.length + 1;
            code.lines.push(line);
            issue++;
            start = line.end;
        }
        code.lines[code.lines.length - 1].end = text.length;
        return code;
    }


    /**
     * Returns the number of the CodeLine at a given pos in the code
     * @param code      // The Code where to search
     * @param position  // The pos where we search the number of its line
     * TODO : fix the case line = undefined
     */
    static getLineIssue(code: AstCode, position: number): number {
        if (position < 0 || position > code?.end) {
            return 0;
        }
        const line: AstLine = code.lines.filter(l => l.start <= position && l.end > position)?.[0];
        return line ? line.issue : 0;
    }



    isEndingWithBlockComments(line: AstLine): boolean {
        const text = line.textWithoutSlashComments;
        if (line.previousLine?.isEndingWithBlockComments) {
            const splitEndBlockComments = text.split(/\*\//);
            if (splitEndBlockComments.length === 1) {
                return true;
            }
            const lastElement = splitEndBlockComments[splitEndBlockComments.length - 1];
            return /\/\*/.test(lastElement) ?? false;
        }
        const splittedText = text?.split(/\/\*/);
        if (splittedText.length === 1) {
            return false;
        }
        const lastCommentedBlock = splittedText[splittedText.length - 1];
        return !/\*\//.test(lastCommentedBlock) ?? false;
    }


}
