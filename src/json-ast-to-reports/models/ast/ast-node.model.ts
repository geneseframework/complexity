import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { AstFile } from './ast-file.model';
import { AstMethod } from './ast-method.model';
import { Ast } from '../../services/ast/ast.service';
import { FactorCategoryService } from '../../services/factor-category.service';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { NodeFeature } from '../../enums/node-feature.enum';
import { cpxFactors } from '../../../core/const/cpx-factors';
import { addObjects } from '../../../core/services/tools.service';
import { AstNodeService } from '../../services/ast/ast-node.service';
import * as chalk from 'chalk';
import { Logg } from '../../../core/interfaces/logg.interface';
import { CodeService } from '../../services/code.service';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { IdentifierType } from '../../../core/interfaces/identifier-type.type';
import { CpxFactorsInterface } from '../../../core/interfaces/cpx-factors.interface';

export class AstNode implements AstNodeInterface, Evaluate, Logg {

    private _astFile?: AstFile = undefined;                                             // The AstFile containing the AST node of the AstNode
    private _astMethod?: AstMethod = undefined;                                         // The method at the root of the current ast (if this ast is inside a method)
    private _astNodeService?: AstNodeService = new AstNodeService();                    // The service managing AstNodes
    private _children?: AstNode[] = [];                                                 // The children AstNodes of the AstNode
    private _context?: AstNode = undefined;                                             // The context of the AstNode
    private _cpxFactors?: CpxFactors = undefined;                                       // The complexity factors of the AstNode
    private _cpxFactorsFromJsonAST?: CpxFactorsInterface = undefined;                   // The complexity factors added manually in JsonAST (have priority on calculated cpxFactors)
    private _cyclomaticCpx ?= 0;                                                        // The cyclomatic complexity of the AstNode
    private _end ?= 0;                                                                  // The pos of the end of the source code of the AstNode in the source code of the AstFile
    private _factorCategory?: NodeFeature = undefined;                                  // The NodeFeature of the node of the AstNode
    private _intrinsicDepthCpx: number = undefined;                                     // The depth of the AstNode inside its method (not including its parent's depth)
    private _intrinsicNestingCpx: number = undefined;                                   // The nesting of the AstNode inside its method (not including its parent's nesting)
    private _isCallback: boolean = undefined;                                           // True if the astNode is a method with a Callback, false if not
    private _isRecursiveMethod: boolean = undefined;                                    // True if the astNode is a recursive method, false if not
    private _kind?: SyntaxKind = undefined;                                             // The kind of the node ('MethodDeclaration, IfStatement, ...)
    private _lineEnd?: number = undefined;                                              // The issue of the line containing the character at the AstNode.end
    private _linePos?: number = undefined;                                              // The issue of the line containing the character at the AstNode.pos
    private _lineStart?: number = undefined;                                            // The issue of the line containing the character at the AstNode.extractHooksAndArrowFunctions
    private _name: string = undefined;                                                  // The name of the AstNode
    private _parent?: AstNode;                                                          // The ast of the parent of the current node
    private _pos ?= 0;                                                                  // The pos of the beginning of the AST node, including spaces and comments before it. (extractHooksAndArrowFunctions <= extractHooksAndArrowFunctions)
    private _start ?= 0;                                                                // The pos of the beginning of the AST node, without spaces and comments before it. (extractHooksAndArrowFunctions >= extractHooksAndArrowFunctions)
    private _text: string = undefined;                                                  // The code of the AstNode
    private _type: IdentifierType = undefined;                                          // The type of the AstNode (if given)



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get aggregationCpx(): number {
        return this.cpxFactors?.totalAggregation;
    }


    get astFile(): AstFile {
        return this._astFile;
    }


    set astFile(astFile: AstFile) {
        this._astFile = astFile;
    }


    get astMethod(): AstMethod {
        return this._astMethod;
    }


    set astMethod(astMethod: AstMethod) {
        this._astMethod = astMethod;
    }


    get atomicCpx(): number {
        return this.cpxFactors?.totalAtomic;
    }


    get children(): AstNode[] {
        return this._children;
    }


    set children(children: AstNode[]) {
        this._children = children;
    }


    get context(): AstNode {
        return this._context ?? this._astNodeService.getContext(this);
    }


    set context(treeNode: AstNode) {
        this._context = treeNode;
    }


    get cpxFactors(): CpxFactors {
        return this._cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this._cpxFactors = cpxFactors;
    }


    get cpxFactorsFromJsonAST(): CpxFactorsInterface {
        return this._cpxFactorsFromJsonAST;
    }


    set cpxFactorsFromJsonAST(cpxFactorsFromJsonAST: CpxFactorsInterface) {
        this._cpxFactorsFromJsonAST = cpxFactorsFromJsonAST;
    }


    get cyclomaticCpx(): number {
        return this._cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this._cyclomaticCpx = cyclomaticCpx;
    }


    get depthCpx(): number {
        return this.cpxFactors?.totalDepth;
    }


    get end(): number {
        return this._end;
    }


    set end(end: number) {
        this._end = end;
    }


    get factorCategory(): NodeFeature {
        return this._factorCategory ?? new FactorCategoryService().getNodeFeature(this.kind);
    }


    get firstSon(): AstNode {
        return this.getSon(0);
    }


    get hasArrowFunctionDescendant(): boolean {
        return !!Ast.getFirstDescendantOfKind(this, SyntaxKind.ArrowFunction);
    }


    get intrinsicDepthCpx(): number {
        return this._intrinsicDepthCpx;
    }


    set intrinsicDepthCpx(cpx: number) {
        this._intrinsicDepthCpx = cpx;
    }


    get intrinsicNestingCpx(): number {
        return this._intrinsicNestingCpx;
    }


    set intrinsicNestingCpx(cpx: number) {
        this._intrinsicNestingCpx = cpx;
    }


    get isCallback(): boolean {
        if (this._isCallback) {
            return this._isCallback;
        }
        this._isCallback = this._astNodeService.isCallback(this);
        return this._isCallback;
    }


    get isCallIdentifier(): boolean {
        return Ast.isCallIdentifier(this) && this === this.parent.firstSon;
    }


    get isExpressionStatement(): boolean {
        return Ast.isExpressionStatement(this);
    }


    get isFunctionOrMethodDeclaration(): boolean {
        return this.factorCategory === NodeFeature.DECLARATION;
    }


    get isIdentifier(): boolean {
        return Ast.isIdentifier(this);
    }


    get isKeyword(): boolean {
        return Ast.isKeyword(this);
    }


    get isParam(): boolean {
        return Ast.isParam(this);
    }


    get isVarArrowFunction(): boolean {
        const ancestor: AstNode = this.parent?.parent?.parent;
        return this.kind === 'ArrowFunction' && ancestor?.kind === 'VariableStatement' && ancestor.parent?.kind === 'SourceFile';
    }


    get isRecursiveMethod(): boolean {
        if (this._isRecursiveMethod) {
            return this._isRecursiveMethod;
        }
        this._isRecursiveMethod = this._astNodeService.isRecursiveMethod(this);
        return this._isRecursiveMethod;
    }


    get kind(): SyntaxKind {
        return this._kind;
    }


    set kind(kind: SyntaxKind) {
        this._kind = kind;
    }


    get lineEnd(): number {
        if (this._lineEnd) {
            return this._lineEnd;
        }
        this._lineEnd = CodeService.getLineIssue(this.astFile?.code, this.end);
        return this._lineEnd;
    }


    get linePos(): number {
        if (this._linePos) {
            return this._linePos;
        }
        this._linePos = CodeService.getLineIssue(this.astFile?.code, this.pos);
        return this._linePos;
    }


    get lineStart(): number {
        if (this._lineStart) {
            return this._lineStart;
        }
        this._lineStart = CodeService.getLineIssue(this.astFile?.code, this.start);
        return this._lineStart;
    }


    get mayDefineContext(): boolean {
        return Ast.mayDefineContext(this);
    }


    get name(): string {
        return this._name ?? '';
    }


    set name(name: string) {
        this._name = name;
    }


    get nestingCpx(): number {
        return this.cpxFactors?.totalNesting;
    }


    get parent(): AstNode {
        return this._parent;
    }


    set parent(treeNode: AstNode) {
        this._parent = treeNode;
    }


    get pos(): number {
        return this._pos;
    }


    set pos(pos: number) {
        this._pos = pos;
    }


    get start(): number {
        return this._start;
    }


    set start(start: number) {
        this._start = start;
    }


    get recursionCpx(): number {
        return this.cpxFactors?.totalRecursion;
    }


    get secondSon(): AstNode {
        return this.getSon(1);
    }


    get structuralCpx(): number {
        return this.cpxFactors?.totalStructural;
    }


    get text(): string {
        return this._text ?? this._astNodeService.getCode(this);
    }


    set text(text: string) {
        this._text = text;
    }


    get type(): IdentifierType {
        return this._type;
    }


    set type(type: IdentifierType) {
        this._type = type;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Evaluates the complexity factors of this AstNode and its children
     */
    evaluate(): void {
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
        for (const child of this._children) {
            child.evaluate();
        }
    }

    /**
     * Gets the xth son of this AstNode
     * @param sonNumber     // The number of the son (0 for the first one)
     */
    getSon(sonNumber: number): AstNode {
        return this.children[sonNumber];
    }


    /**
     * Calculates the complexity factors of the AstNode
     */
    calculateAndSetCpxFactors(): CpxFactors {
        this.cpxFactors = new CpxFactors();
        this.setGeneralCaseCpxFactors();
        this.setVarStatementCpxFactors();
        this.setFunctionStructuralCpx();
        this.setArrowFunctionStructuralCpx();
        this.setRecursionOrCallbackCpxFactors();
        this.setElseCpxFactors();
        this.setRegexCpxFactors();
        this.setDepthCpxFactors();
        this.setAggregationCpxFactors();
        this.intrinsicNestingCpx = this.cpxFactors.totalNesting;
        this.intrinsicDepthCpx = this.cpxFactors.totalDepth;
        this.forceCpxFactors();
        return this._cpxFactors;
    }


    /**
     * Sets the nesting and structural complexities for "usual" cases
     */
    private setGeneralCaseCpxFactors(): void {
        this.cpxFactors.nesting[this.factorCategory] = cpxFactors.nesting[this.factorCategory];
        this.cpxFactors.structural[this.factorCategory] = cpxFactors.structural[this.factorCategory];
        this.cpxFactors.atomic.node = cpxFactors.atomic[this.factorCategory] ?? cpxFactors.atomic.node;
    }


    private setVarStatementCpxFactors(): void {
        if (this.kind === SyntaxKind.VariableStatement) {
            console.log(chalk.blueBright('KINDDDD AST NODDDD'), this.kind);
            console.log(chalk.cyanBright('KINDDDD AST NODDDD children'), this.children.map(c => c.kind));
            const varDeclaration: AstNode = Ast.getFirstDescendantOfKind(this, SyntaxKind.VariableDeclaration);
            console.log(chalk.magentaBright('KINDDDD AST varDeclaration'), varDeclaration);
        }
    }

z
    private setFunctionStructuralCpx(): void {
        if (this.type === 'function' && this.parent?.kind !== SyntaxKind.MethodDeclaration) {
            this.cpxFactors.structural.method = cpxFactors.structural.method;
        }
    }


    private setArrowFunctionStructuralCpx(): void {
        if (this.isVarArrowFunction) {
            this.cpxFactors.nesting.func = 0;
            this.cpxFactors.structural.func = 0;
            this.cpxFactors.atomic.node = 0;
        }
    }


    private forceCpxFactors(): void {
        if (this.cpxFactorsFromJsonAST) {
            for (const category of Object.keys(this.cpxFactorsFromJsonAST)) {
                for (const factor of Object.keys(this.cpxFactorsFromJsonAST[category])) {
                    this.cpxFactors[category][factor] = this.cpxFactorsFromJsonAST[category][factor];
                }
            }
        }
    }


    /**
     * Sets depth complexity factor
     * Example : array in array, like a[b[c]]
     */
    private setDepthCpxFactors(): void {
        if (Ast.isArrayIndex(this)) {
            this.cpxFactors.depth.arr = cpxFactors.depth.arr;
        }
    }


    /**
     * Sets aggregation complexity factor
     */
    private setAggregationCpxFactors(): void {
        if (Ast.isArrayOfArray(this)) {
            this.cpxFactors.aggregation.arr = cpxFactors.aggregation.arr;
        } else if (Ast.isDifferentLogicDoor(this)) {
            this.cpxFactors.aggregation.differentLogicDoor = cpxFactors.aggregation.differentLogicDoor;
        }
    }


    /**
     * Sets complexity factor for "else" case
     */
    private setElseCpxFactors(): void {
        if (Ast.isElseStatement(this)) {
            this.cpxFactors.structural.conditional = cpxFactors.structural.conditional;
        }
        if (Ast.isElseIfStatement(this)) {
            this.cpxFactors.nesting.conditional = 0;
        }
    }


    /**
     * Sets complexity factor for callbacks and recursions
     */
    private setRecursionOrCallbackCpxFactors(): void {
        this.cpxFactors.recursion.recursivity = this.isRecursiveMethod ? cpxFactors.recursion.recursivity : 0;
        this.cpxFactors.recursion.callback = this.isCallback ? cpxFactors.recursion.callback : 0;
    }


    /**
     * Sets complexity factor for regex
     */
    private setRegexCpxFactors(): void {
        if (this.factorCategory === NodeFeature.REGEX) {
            this.cpxFactors.aggregation.regex = +((this['text'].length - 2) * cpxFactors.aggregation.regex).toFixed(2);
        }
    }


    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    private addParentCpx(): void {
        if (this && this.parent && this.parent?.cpxFactors?.nesting) {
            this.cpxFactors.nesting = addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this && this.parent?.parent && this.parent?.cpxFactors?.depth) {
            this.cpxFactors.depth = addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    }


    /**
     * Logs the main information about the AstNode
     * @param message
     */
    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST NODE'));
        console.log(this.kind, this.name);
        console.log('-----------------------------');
        console.log('pos', this.pos, 'end', this.end);
        console.log('text', this.text);
    }


}
