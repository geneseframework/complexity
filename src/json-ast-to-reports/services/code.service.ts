import { Code } from '../models/code/code.model';
import { CodeLine } from '../models/code/code-line.model';

/**
 * Service managing Code objects
 */
export class CodeService {


    /**
     * Creates a Code object from the content of a given code (as string)
     * @param text      // The content of the code
     * @param start
     */
    static getCode(text: string, start = 0): Code {
        if (!text) {
            return undefined;
        }
        const code: Code = new Code();
        code.start = start;
        code.text = text;
        const textLines: string[] = text.split('\n');
        let issue = 1;
        for (const textLine of textLines) {
            const line = new CodeLine();
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
     */
    static getLineIssue(code: Code, position: number): number {
        if (position < 0 || position > code?.end) {
            return 0;
        }
        return  code.lines.filter(l => l.start <= position && l.end > position)?.[0].issue;
    }



    isEndingWithBlockComments(line: CodeLine): boolean {
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
