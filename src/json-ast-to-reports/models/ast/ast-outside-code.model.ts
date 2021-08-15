import { AstNode } from './ast-node.model';
import { Code } from '../code/code.model';
import { Ast } from '../../services/ast/ast.service';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { CodeLine } from '../code/code-line.model';
import { cpxFactors } from '../../../core/const/cpx-factors';
import { FactorCategory } from '../../enums/factor-category.enum';
import { CpxLevel } from '../../enums/cpx-level.enum';

/**
 * Element of the AstNode structure corresponding to a given method
 */
export class AstOutsideNodes implements Evaluate {

    private _astNodes?: AstNode[] = [];                                     // The AST of the method itself
    private _codeLines?: CodeLine[] = [];                                       // The array of CodeLine of the AstMethod (elements of the array of CodeLine of the corresponding AstFile)
    private _cpxFactors?: CpxFactors = undefined;                               // The complexity factors of the AstMethod
    private _cyclomaticCpx ?= 0;                                                // The cyclomatic complexity of the AstMethod
    private _cpxIndex = undefined;                                              // The complexity index of the method
    private _cyclomaticStatus: CpxLevel = CpxLevel.LOW;             // The cyclomatic status of the method
    private _displayedCode?: Code = undefined;                                  // The code to display in the report
    private _maxLineLength ?= 0;                                                // The max length of the lines of the code



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astNodes(): AstNode[] {
        return this._astNodes;
    }


    set astNodes(astNodes: AstNode[]) {
        this._astNodes = astNodes;
    }


    get codeLines(): CodeLine[] {
        return this._codeLines;
    }


    set codeLines(codeLines: CodeLine[]) {
        this._codeLines = codeLines;
    }


    get cpxFactors(): CpxFactors {
        return this._cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this._cpxFactors = cpxFactors;
    }


    get cpxIndex(): number {
        return this._cpxIndex ?? this.cpxFactors.total;
    }


    get cyclomaticCpx(): number {
        return this._cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this._cyclomaticCpx = cyclomaticCpx;
    }


    get cyclomaticStatus(): CpxLevel {
        return this._cyclomaticStatus;
    }


    set cyclomaticStatus(cyclomaticStatus: CpxLevel) {
        this._cyclomaticStatus = cyclomaticStatus;
    }


    get displayedCode(): Code {
        return this._displayedCode;
    }


    get maxLineLength(): number {
        if (this._maxLineLength) {
            return this._maxLineLength;
        }
        this._maxLineLength = Math.max(...this.codeLines?.map(l => l.end - l.start));
        return this._maxLineLength;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Creates the displayed code of this AstMethod and evaluates its complexity
     */
    evaluate(): void {
        // this.createDisplayedCodeAndCalculateCpxFactors();
        // LogService.logMethod(this);
        // this.cyclomaticCpx = CS.calculateCyclomaticCpx(this.astNode);
        // this.cyclomaticLevel = this.getComplexityStatus(ComplexityType.CYCLOMATIC);
    }


    /**
     * Creates the method's code to display, with comments
     * @param astNode  // The AstNode to analyse (by default: the AstNode associated to this AstMethod)
     */
    // createDisplayedCodeAndCalculateCpxFactors(astNode: AstNode = this.astNode): void {
    //     this.setDisplayedCodeLines();
    //     this.setDeclarationCpxFactors();
    //     this.setCpxFactorsToDisplayedCode(astNode, false);
    //     this._displayedCode.setLinesDepthAndNestingCpx();
    //     this.addCommentsToDisplayedCode();
    //     this.calculateCpxFactors();
    //     this._displayedCode.setTextWithLines();
    // }


    /**
     * Creates the Code object corresponding to the code to display
     */
    private setDisplayedCodeLines(): void {
        this._displayedCode = new Code();
        for (const line of this.codeLines) {
            const displayedLine = new CodeLine();
            displayedLine.issue = line.issue;
            displayedLine.end = line.end;
            displayedLine.start = line.start;
            displayedLine.text = line.text;
            displayedLine.text = this.getDisplayedLineText(displayedLine);
            this._displayedCode.lines.push(displayedLine);
        }
    }


    /**
     * Returns the text to display for a given line. Removes characters of the first and the last lines which are not inside the AstMethod
     * @param line      // The line to display
     */
    private getDisplayedLineText(line: CodeLine): string {
        let text = line.text;
        // if (line.issue === this.codeLines[0]?.issue) {
        //     const firstCharPosition = this.start - line.start;
        //     const indentation = text.slice(0, text.length - text.trimLeft().length)
        //     text = `\n${indentation}${text.slice(firstCharPosition)}`;
        // }
        // if (line.issue === this.codeLines[this.codeLines.length - 1]?.issue) {
        //     const lastCharPosition = this.end - line.start;
        //     text = text.slice(0, lastCharPosition);
        // }
        return text;
    }


    // private setDeclarationCpxFactors(): void {
    //     this.increaseLineCpxFactors(this.astNode, this._displayedCode.getLine(this.astNode.lineStart));
    //     this._displayedCode.getLine(this.astNode.lineStart).astNodes.push(this.astNode);
    // }


    /**
     * Calculates the complexity factors of each CodeLine
     * @param astNode                   // The AstNode of the method
     * @param startedUncommentedLines   // Param for recursion (checks if the current line is the first uncommented one)
     */
    private setCpxFactorsToDisplayedCode(astNode: AstNode, startedUncommentedLines = false): void {
        for (const childAst of astNode.children) {
            let issue = Math.max(childAst.lineStart, this.codeLines[0]?.issue);
            const codeLine: CodeLine = this._displayedCode.lines.find(l => l.issue === issue);
            if (Ast.isElseStatement(childAst)) {
                childAst.cpxFactors.atomic.node = cpxFactors.atomic.node;
                issue--;
            }
            this.increaseLineCpxFactors(childAst, codeLine);
            this._displayedCode.getLine(issue).astNodes.push(childAst);
            this.setCpxFactorsToDisplayedCode(childAst, startedUncommentedLines);
        }
    }


    /**
     * Adds the Complexity of a AstNode to its CodeLine
     * @param astNode      // The AstNode inside the line of code
     * @param codeLine      // The CodeLine containing the AstNode
     */
    private increaseLineCpxFactors(astNode: AstNode, codeLine: CodeLine): void {
        if (!codeLine.isCommented) {
            codeLine.cpxFactors = codeLine.cpxFactors.add(astNode?.cpxFactors);
        }
    }


    /**
     * Adds information about complexity factors for each line of the displayed code
     */
    private addCommentsToDisplayedCode(): void {
        this._displayedCode.lines
            .filter(line => line.cpxFactors.total > 0)
            .forEach(line => {
                let comment = `+${line.cpxFactors.total.toFixed(1)} Complexity index (+${line.cpxFactors.totalAtomic.toFixed(1)} ${FactorCategory.ATOMIC}`;
                comment = line.cpxFactors.totalStructural > 0 ? `${comment}, +${line.cpxFactors.totalStructural} ${FactorCategory.STRUCTURAL}` : comment;
                comment = line.cpxFactors.totalNesting > 0 ? `${comment}, +${line.cpxFactors.totalNesting} nesting` : comment;
                comment = line.cpxFactors.totalTyping > 0 ? `${comment}, +${line.cpxFactors.totalTyping} typing` : comment;
                comment = line.cpxFactors.totalAggregation > 0 ? `${comment}, +${line.cpxFactors.totalAggregation} ${FactorCategory.AGGREGATION}` : comment;
                comment = line.cpxFactors.totalDepth > 0 ? `${comment}, +${line.cpxFactors.totalDepth} depth` : comment;
                comment = line.cpxFactors.totalRecursion > 0 ? `${comment}, +${line.cpxFactors.totalRecursion} recursivity` : comment;
                comment = line.cpxFactors.totalUse > 0 ? `${comment}, +${line.cpxFactors.totalUse} ${FactorCategory.USE}` : comment;
                comment = `${comment})`;
                this._displayedCode.getLine(line.issue).addComment(comment, this.maxLineLength);
            });
    }


    /**
     * Calculates the Complexity Factors of the method
     */
    private calculateCpxFactors(): void {
        const lines: CodeLine[] = this._displayedCode?.lines;
        if (lines.length === 0) {
            // this.createDisplayedCodeAndCalculateCpxFactors();
        }
        this.cpxFactors = new CpxFactors();
        for (const line of this._displayedCode?.lines) {
            this.cpxFactors = this.cpxFactors.add(line.cpxFactors);
        }
    }
}
