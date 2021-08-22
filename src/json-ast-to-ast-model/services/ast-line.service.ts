import { AstCode } from '../models/ast-code.model';
import { AstAbstract } from '../models/ast-abstract.model';
import { AstLine } from '../models/ast-line.model';
import { AstNode } from '../models/ast-node.model';
import { firstElement } from '../../core/utils/arrays.util';
import { Interval } from '../types/interval.type';

export class AstLineService {

    static generate(astCode: AstCode): AstLine[] {
        if (!astCode?.textOutsideClassesAndFunctions) {
            return [];
        }
        let textLines: string[] = astCode.textOutsideClassesAndFunctions.split('\n');
        this.removeLastLineBreak(textLines);
        let issue = 1;
        const astLines: AstLine[] = [];
        let position: number = astCode.astAbstract.interval[0];
        for (const textLine of textLines) {
            const line = new AstLine();
            line.text = textLine;
            line.issue = issue;
            line.pos = this.getLinePos(position, astCode.astAbstract, issue);
            line.end = line.pos + textLine.length;
            line.astNodes = this.getAstNodes(astCode.astAbstract, line.pos, line.end);
            issue++;
            position += textLine.length;
            astLines.push(line);
        }
        return astLines;
    }

    private static removeLastLineBreak(textLines: string[]): void {
        if (firstElement(textLines) === '') {
            textLines.shift();
        }
    }

    private static getAstNodes(astAbstract: AstAbstract, linePos: number, lineEnd: number): AstNode[] {
        return astAbstract.astNode.descendants.filter(d => d.start >= linePos && d.start < lineEnd);
    }

    private static getLinePos(position: number, astAbstract: AstAbstract, lineIssue: number): number {
        const posInterval: Interval = astAbstract.positionInterval(position);
        return posInterval ? posInterval[1] + 1 : position + lineIssue - 1;
    }

}
