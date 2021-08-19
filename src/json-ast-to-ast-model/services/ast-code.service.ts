/**
 * Service managing Code objects
 */
import { AstCode } from '../../core/models/ast/ast-code.model';
import { Interval, isInInterval } from '../types/interval.type';
import { AstAbstract } from '../../core/models/ast/ast-abstract.model';
import * as chalk from 'chalk';
import { firstElement } from '../../core/utils/arrays.util';
import { AstLineService } from './ast-line.service';

export class AstCodeService {

    static generate(astAbstract: AstAbstract): AstCode {
        const intervalsOutsideClassesAndFunctions: Interval[] = this.getComplementaryIntervals(astAbstract);
        const text: string = this.getText(astAbstract, intervalsOutsideClassesAndFunctions);
        const astCode = new AstCode(astAbstract, text);
        this.generateAstClassOrFunctionCodes(astAbstract, astCode);
        astCode.linesOutsideClassesAndFunctions = AstLineService.generate(astCode);
        astCode.logg();
        // console.log(chalk.magentaBright('AST CODEEEEEEE'), astAbstract.astNode.kind, astCode.astLines);
        return astCode;
    }

    private static getComplementaryIntervals(astAbstract: AstAbstract): Interval[] {
        if (astAbstract.length === 0) {
            return [[0, astAbstract.length]];
        }
        const nestedIntervals = astAbstract.astAbstracts.map(a => a.interval).sort((a, b) => a[0] - b[0]);
        let position = astAbstract.jsonAstNode.pos;
        let intervals: Interval[] = [];
        while (position < astAbstract.jsonAstNode.end) {
            const firstInterval: Interval = firstElement(nestedIntervals);
            if (isInInterval(position, firstInterval)) {
                position = firstInterval[1] + 1;
                nestedIntervals.shift();
            } else if (nestedIntervals.length > 0) {
                intervals.push([position, firstInterval[0] - 1]);
                position = firstInterval[1] + 1;
                nestedIntervals.shift();
            } else {
                intervals.push([position, astAbstract.jsonAstNode.end]);
                position = astAbstract.jsonAstNode.end;
            }
        }
        return intervals;
    }

    private static getText(astAbstract: AstAbstract, intervals: Interval[]): string {
        let txt = '';
        for (const interval of intervals) {
            const firstPos: number = interval[0] - astAbstract.jsonAstNode.pos;
            const lastPos: number = interval[1] - astAbstract.jsonAstNode.pos + 1;
            txt = `${txt}${astAbstract.text.slice(firstPos, lastPos)}`;
        }
        return txt;
    }

    private static generateAstClassOrFunctionCodes(astAbstract: AstAbstract, astCode: AstCode): void {
        for (const astAbs of astAbstract.astAbstracts) {
            astCode.astClassOrFunctionCodes.push(this.generate(astAbs));
        }
    }


    /**
     * Returns the number of the CodeLine at a given pos in the code
     * @param code      // The Code where to search
     * @param position  // The pos where we search the number of its line
     * TODO : fix the case line = undefined
     */
    // static getLineIssue(code: AstCode, position: number): number {
    //     if (position < 0 || position > code?.end) {
    //         return 0;
    //     }
    //     const line: AstLine = code.linesOutsideClassesAndFunctions.filter(l => l.start <= position && l.end > position)?.[0];
    //     return line ? line.issue : 0;
    // }
    //
    //
    //
    // isEndingWithBlockComments(line: AstLine): boolean {
    //     const text = line.textWithoutSlashComments;
    //     if (line.previousLine?.isEndingWithBlockComments) {
    //         const splitEndBlockComments = text.split(/\*\//);
    //         if (splitEndBlockComments.length === 1) {
    //             return true;
    //         }
    //         const lastElement = splitEndBlockComments[splitEndBlockComments.length - 1];
    //         return /\/\*/.test(lastElement) ?? false;
    //     }
    //     const splittedText = text?.split(/\/\*/);
    //     if (splittedText.length === 1) {
    //         return false;
    //     }
    //     const lastCommentedBlock = splittedText[splittedText.length - 1];
    //     return !/\*\//.test(lastCommentedBlock) ?? false;
    // }


}
