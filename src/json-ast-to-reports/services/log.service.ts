import { AstNode } from '../models/ast/ast-node.model';
import { CodeLine } from '../models/code/code-line.model';
import { AstMethod } from '../models/ast/ast-method.model';

const chalk = require('chalk');

export class LogService {



    // ------------------------------------------------------------------------------------------------
    // -----------------------------------------   LOG AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------



    /**
     * Logs all the AST of the AstNode of a given AstMethod
     * This method runs, but is not yet used
     */
    static logMethod(astMethod: AstMethod, logLines = false): void {
        if (!astMethod?.astNode) {
            console.log('Method undefined');
            return;
        }
        console.log('------------------------------------');
        console.log('METHOD ', astMethod.name, ' : ', astMethod.cpxIndex);
        console.log('------------------------------------');
        this.logAstNode(astMethod.astNode, '');
        this.logMethodChildren(astMethod.astNode, ' ');
        if (logLines) {
            this.logCodeLines(astMethod.codeLines, astMethod.astNode);
        }
    }


    /**
     * Logs the AST of the children asts
     * This method runs, but is not yet used
     * @ast // The ast to print
     * @indent // the indentation to use for the print
     */
    private static logMethodChildren(astNode: AstNode, indent: string) {
        for (const childAst of astNode.children) {
            this.logAstNode(childAst, indent);
            const newIndent = indent + '  ';
            this.logMethodChildren(childAst, newIndent);
        }
    }


    /**
     * Logs the AST of a AstNode with its complexity factors, its context and its parent
     * @param astNode       // The AstNode to log
     * @param indent        // The current indentation
     */
    static logAstNode(astNode: AstNode, indent: string): void {
        let color = '';
        if (astNode.cpxFactors?.total < 0.5) {
            color = 'white';
        } else {
            color = astNode.cpxFactors?.total > 1 ? 'red' : 'yellow';
        }
        let logs: string[] = [];
        logs.push(indent);
        logs.push(chalk[color](astNode.kind));
        logs = logs.concat(LogService.addLog('line', astNode.linePos));
        logs = logs.concat(LogService.addLog('atomic', astNode.atomicCpx));
        logs = logs.concat(LogService.addLog('structural', astNode.structuralCpx));
        logs = logs.concat(LogService.addLog('nesting', astNode.nestingCpx));
        logs = logs.concat(LogService.addLog('depth', astNode.depthCpx));
        logs = logs.concat(LogService.addLog('aggregation', astNode.aggregationCpx));
        logs = logs.concat(LogService.addLog('recursivity', astNode.recursionCpx));
        logs.push('context :');
        logs.push(chalk.blueBright(astNode.context?.name));
        logs.push('parent :');
        logs.push(chalk.greenBright(astNode.parent?.kind));
        console.log(...logs)
    }


    static logCodeLines(codeLines: CodeLine[] = [], methodAstNode: AstNode): void {
        for (const line of codeLines) {
            this.logCodeLine(line, methodAstNode);
        }
    }


    static logCodeLine(line: CodeLine, methodAstNode: AstNode): void {
        console.log('LINE ', chalk.greenBright(line.issue), line.start, '-', line.end, line.isEndingWithBlockComments, line.text)
        console.log(...this.logCodeLineNode(line, methodAstNode, methodAstNode.pos));
    }


    private static logCodeLineNode(line: CodeLine, astNode: AstNode, methodPosition: number, logs: string[] = []): string[] {
        if (this.isAstNodeInCodeLine(astNode.start, line)) {
            logs.push(chalk.blueBright(astNode.kind));
            logs.push(astNode.start.toString())
        }
        for (const childAstNode of astNode.children) {
            if (childAstNode.start < line.end) {
                this.logCodeLineNode(line, childAstNode, methodPosition, logs);
            }
        }
        return logs;
    }


    private static isAstNodeInCodeLine(astNodeStart: number, line: CodeLine): boolean {
        return astNodeStart >= line.start && astNodeStart <= line.end;
    }

    /**
     * Adds a text with its value in a console.logg if the value is positive
     * @param text      // The text to add
     * @param value     // The corresponding value
     */
    private static addLog(text: string, value: number): any[] {
        return value > 0 ? [text, value] : [];
    }

}
