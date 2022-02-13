import { AstNode } from './ast-node.model';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { AstFileService } from '../../services/ast/ast-file.service';
import { AstFolder } from './ast-folder.model';
import { AstMethod } from './ast-method.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { Stats } from '../stats.model';
import { AstMethodService } from '../../services/ast/ast-method.service';
import { Logg } from '../../../core/interfaces/logg.interface';
import * as chalk from 'chalk';
import { Code } from '../code/code.model';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { NestingCpx } from '../../../core/models/cpx-factor/nesting-cpx.model';
import { DepthCpx } from '../../../core/models/cpx-factor/depth-cpx.model';
import { addObjects } from '../../../core/services/tools.service';
import { AstMethodOrOutsideNode, isAstMethod } from '../../types/ast-method-or-outside-node.type';
import { CpxLevel } from '../../enums/cpx-level.enum';
import { JsxElement } from 'ts-morph';

export class AstFile implements AstFileInterface, Evaluate, Logg {

    private _astFolder?: AstFolder = undefined;                         // The AstFolder which includes this AstFile
    private _astMethods?: AstMethod[] = [];                             // The AstMethods included in this AstFile
    private _astNode?: AstNode = undefined;                             // The AstNode corresponding to the file itself
    private _astNodes?: AstNode[] = undefined;                          // Array of all the AstNodes which are children of this.AstNode (including itself)
    private _astOutsideNodes?: AstNode[] = [];                          // The AstNodes outside classes and functions
    private _code?: Code = undefined;                                   // The Code object corresponding to the AstFile
    private _cognitiveLevel: CpxLevel = CpxLevel.LOW;                   // The cognitive level of the file
    private _complexitiesByStatus?: ComplexitiesByStatus = undefined;   // The file complexities spread by complexity status
    private _cpxFactors?: CpxFactors = undefined;                       // The complexity factors of the AstFile
    private _cpxIndex = undefined;                                      // The complexity index of the file
    private _cyclomaticCpx ?= 0;                                        // The complexity factors of the AstFile
    private _cyclomaticLevel: CpxLevel = CpxLevel.LOW;                  // The cyclomatic level of the file
    private _displayedCode?: Code = undefined;                          // The code to display in the report
    private _end: number = undefined;                                   // The pos of the end of the source code
    private _jsxElements: JsxElement[];
    private _name: string = undefined;                                  // The name of the AstFile
    private _stats?: Stats = undefined;                                 // The statistics of the AstFile



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astFolder(): AstFolder {
        return this._astFolder;
    }


    set astFolder(astFolder: AstFolder) {
        this._astFolder = astFolder;
    }


    get astMethods(): AstMethod[] {
        if (this._astMethods) {
            return this._astMethods;
        }
        return [];
    }


    set astMethods(astMethods: AstMethod[]) {
        this._astMethods = astMethods;
    }


    get astNode(): AstNode {
        return this._astNode;
    }


    set astNode(astNode: AstNode) {
        this._astNode = astNode;
    }


    get astNodes() : AstNode[] {
        return this._astNodes;
    }


    set astNodes(astNodes: AstNode[])  {
        this._astNodes = astNodes;
    }


    get astOutsideNodes(): AstNode[] {
        return this._astOutsideNodes;
    }


    set astOutsideNodes(astOutsideNodes: AstNode[]) {
        this._astOutsideNodes = astOutsideNodes;
    }


    get code() : Code {
        return this._code;
    }


    set code(code: Code)  {
        this._code = code;
    }


    get cognitiveLevel(): CpxLevel {
        return this._cognitiveLevel;
    }


    set cognitiveLevel(cognitiveStatus: CpxLevel) {
        this._cognitiveLevel = cognitiveStatus;
    }


    get complexitiesByStatus(): ComplexitiesByStatus {
        return this._complexitiesByStatus;
    }


    set complexitiesByStatus(cpxByStatus: ComplexitiesByStatus) {
        this._complexitiesByStatus = cpxByStatus;
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


    get cyclomaticLevel(): CpxLevel {
        return this._cyclomaticLevel;
    }


    set cyclomaticLevel(cyclomaticStatus: CpxLevel) {
        this._cyclomaticLevel = cyclomaticStatus;
    }


    get displayedCode(): Code {
        return this._displayedCode;
    }


    set displayedCode(displayedCode: Code) {
        this._displayedCode = displayedCode;
    }


    get end(): number {
        return this._end ?? this._astNode?.end;
    }


    set end(end: number) {
        this._end = end;
    }


    get jsxElements(): JsxElement[] {
        return this._jsxElements;
    }


    set jsxElements(jsxElements: JsxElement[]) {
        this._jsxElements = new AstFileService().getJsxElements(this);
    }


    get name(): string {
        return this._name;
    }


    set name(name: string) {
        this._name = name;
    }


    get stats(): Stats {
        if (!this._stats) {
            this._stats = new AstFileService().getStats(this);
        }
        return this._stats;
    }


    set stats(stats: Stats) {
        this._stats = stats;
    }


    get text(): string {
        return this._code?.text;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Evaluates the complexities of the AstNodes and the AstMethods of this AstFile
     */
    evaluate(): void {
        this.cpxFactors = new CpxFactors();
        this.setDisplayedCode();
        this.astNode.evaluate();
        const methodsAndOutsideNodes: AstMethodOrOutsideNode[] = (this.astMethods as AstMethodOrOutsideNode[]).concat(this.astOutsideNodes);
        for (const methodOrOutsideNode of methodsAndOutsideNodes) {
            this.evaluateMethodOrOutsideNode(methodOrOutsideNode);
        }
        this.getJsx();
    }


    private setDisplayedCode(): void {
        const code = new Code();
        code.text = this.astNode.text;
        this.displayedCode = code;
    }


    private getJsx(): any[] {
        return [];
    }


    private evaluateMethodOrOutsideNode(methodOrOutsideNode: AstMethodOrOutsideNode): void {
        methodOrOutsideNode.evaluate();
        this.cpxFactors = this.cpxFactors.add(methodOrOutsideNode.cpxFactors);
        this.cyclomaticCpx = this.cyclomaticCpx + methodOrOutsideNode.cyclomaticCpx;
        if (isAstMethod(methodOrOutsideNode)) {
            const astMethodService = new AstMethodService();
            this.complexitiesByStatus = astMethodService.addMethodCpxByStatus(this.complexitiesByStatus, methodOrOutsideNode as AstMethod);
        }
    }


    /**
     * Evaluates the complexities of the AstNodes of this AstFile
     * But not based on methods
     */
    evaluateStandalone(): void {
        this.astMethods = [];
        this.cpxFactors = new CpxFactors();
        this.astNode.evaluate();
        for (const node of this.astNodes) {
            node.cpxFactors.nesting = new NestingCpx();
            node.cpxFactors.depth = new DepthCpx();
            for (const astNode of node.children) {
                if (astNode.intrinsicNestingCpx > 0) {
                    node.cpxFactors.depth = addObjects(this.cpxFactors.depth, astNode.cpxFactors?.depth);
                    node.cpxFactors.nesting = addObjects(this.cpxFactors.nesting, astNode.parent?.cpxFactors?.nesting);
                }
                if (astNode.intrinsicDepthCpx > 0) {
                    node.cpxFactors.depth = addObjects(this.cpxFactors.depth, astNode.parent?.cpxFactors?.depth);
                }
            }

            this.cpxFactors = this.cpxFactors.add(node.cpxFactors);
        }
    }


    /**
     * Logs the main elements of an AstFile
     * @param message       // Optional message
     */
    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('astNode :'), this.astNode?.kind);
        console.log(chalk.blueBright('astFolder :'), this.astFolder?.path);
    }


}
