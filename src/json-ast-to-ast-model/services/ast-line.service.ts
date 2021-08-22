import { AstCode } from '../../core/models/ast/ast-code.model';
import { AstAbstract } from '../../core/models/ast/ast-abstract.model';
import { AstLine } from '../../core/models/ast/ast-line.model';
import { AstNode } from '../../core/models/ast/ast-node.model';
import { firstElement } from '../../core/utils/arrays.util';
import { Interval } from '../types/interval.type';
import * as chalk from 'chalk';

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
            // line.start = this.getLineStart(position, astCode.astAbstract);
            line.end = line.pos + textLine.length;
            // line.end = line.pos + textLine.length + 1;
            console.log(chalk.blueBright('LINEEEEE'), position, ' / ', line.issue, line.pos, line.end);
            line.astNodes = this.getAstNodes(astCode.astAbstract, line.pos, line.end);
            console.log(chalk.magentaBright('EVAL LINEEEEE'), line.issue, line.text,  line.astNodes.map(a => a.kind));
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
        // console.log(chalk.greenBright('GET LINE POSSSS'), astAbstract.kind, astAbstract.name, astAbstract.classesAndFunctionsIntervals, position, posInterval);
        return posInterval ? posInterval[1] + 1 : position + lineIssue - 1;
    }

    private static getLineStart(position: number, astAbstract: AstAbstract): number {
        const firstNode: AstNode = astAbstract.astNode.descendants.find(d => d.pos <= position && d.start >= position);
        console.log(chalk.greenBright('GET LINE STARTTTT'), position, firstNode?.kind, firstNode?.pos, firstNode?.start, firstNode?.end);
        return undefined;
    }

}
