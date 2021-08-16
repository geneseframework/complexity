/**
 * Element of the TreeNode structure corresponding to a given folder
 */
import { Evaluate } from '../../interfaces/evaluate.interface';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { CpxFactors } from '../../../core/models/cpx-factor/cpx-factors.model';
import { Stats } from '../stats.model';
import { AstFile } from './ast-file.model';
import { AstFolderService } from '../../services/ast/ast-folder.service';
import { Logg } from '../../../core/interfaces/logg.interface';
import * as chalk from 'chalk';
import { AstNode } from './ast-node.model';
import { JsonAstFolderInterface } from '../../../core/interfaces/json-ast/json-ast-folder.interface';

export class AstFolder implements JsonAstFolderInterface, Evaluate, Logg {

    private _astFiles?: AstFile[] = [];                                                     // The array of files of this folder (not in the subfolders)
    private _astFolderService?: AstFolderService = new AstFolderService();                  // The service managing AstFolders
    private _children?: AstFolder[] = [];                                                   // The subfolders of this folder
    private _complexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();      // The folder complexities spread by complexity status
    private _cpxFactors?: CpxFactors = undefined;                                           // The complexity factors of the AstFolder
    private _cyclomaticCpx ?= 0;                                                            // The cyclomatic complexity of the AstFolder
    private _numberOfFiles: number = undefined;                                             // The number of files of the AstFolder
    private _numberOfMethods: number = undefined;                                           // The number of methods of the AstFolder
    private _parent?: AstFolder = undefined;                                                // The AstFolder corresponding to the parent folder of this AstFolder
    private _path?: string = undefined;                                                     // The absolute path of this folder
    private _relativePath?: string = undefined;                                             // The relative path of this folder compared to the root folder of the analyse
    private _stats: Stats = undefined;                                                      // The stats corresponding to this folder


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astFiles(): AstFile[] {
        return this._astFiles;
    }


    set astFiles(astFiles: AstFile[]) {
        this._astFiles = astFiles;
    }


    get children(): AstFolder[] {
        return this._children;
    }


    set children(children: AstFolder[]) {
        this._children = children;
    }


    get complexitiesByStatus(): ComplexitiesByStatus {
        return this._complexitiesByStatus;
    }


    set complexitiesByStatus(complexitiesByStatus: ComplexitiesByStatus) {
        this._complexitiesByStatus = complexitiesByStatus;
    }



    get cpxFactors(): CpxFactors {
        if (this._cpxFactors) {
            return this._cpxFactors;
        }
        this.evaluate();
        return this._cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this._cpxFactors = cpxFactors;
    }


    get cyclomaticCpx(): number {
        return this._cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this._cyclomaticCpx = cyclomaticCpx;
    }


    get numberOfFiles(): number {
        return this._numberOfFiles ?? this._astFolderService.getNumberOfFiles(this);
    }


    set numberOfFiles(numberOfFiles: number) {
        this._numberOfFiles = numberOfFiles;
    }


    get numberOfMethods(): number {
        return this._numberOfMethods ?? this._astFolderService.getNumberOfMethods(this);
    }


    set numberOfMethods(numberOfMethods: number) {
        this._numberOfMethods = numberOfMethods;
    }


    get parent(): AstFolder {
        return this._parent;
    }


    set parent(parent: AstFolder) {
        this._parent = parent;
    }


    get path(): string {
        return this._path;
    }


    set path(path: string) {
        this._path = path;
    }


    get relativePath(): string {
        return this._relativePath ?? this._astFolderService.getRelativePath(this);
    }


    get stats(): Stats {
        return this._stats;
    }


    set stats(stats: Stats) {
        this._stats = stats;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Evaluates and sets the complexities of the AstFiles of this AstFolder (including its subfolders)
     */
    evaluate(): void {
        this.cpxFactors = new CpxFactors();
        this.evaluateCpxFactors(this);
        this.numberOfMethods = this._astFolderService.getNumberOfMethods(this);
        this.stats = this._astFolderService.calculateStats(this);
    }


    /**
     * Evaluates and sets the complexities of the AstFiles of this AstFolder
     * But not based on methods
     */
    evaluateStandalone(): void {
        this.cpxFactors = new CpxFactors();
        const astFile = this.astFiles[0];
        astFile.evaluateStandalone();
        this.addCpx(astFile);
        this.numberOfMethods = 0;
        this.stats = this._astFolderService.calculateStats(this);
    }


    /**
     * Evaluates and sets the complexities of the AstFiles of a given AstFolder (including its subfolders)
     * @param astFolder     // The "parent" AstFolder
     */
    private evaluateCpxFactors(astFolder: AstFolder): void {
        for (const astFile of astFolder.astFiles) {
            astFile.evaluate();
            this.addCpx(astFile);
        }
        for (const childAstFolder of astFolder.children) {
            childAstFolder.evaluate();
            this.addCpx(childAstFolder);
        }
    }


    private addCpx(element: AstFile | AstFolder): void {
        this.cpxFactors = this.cpxFactors.add(element.cpxFactors);
        this.cyclomaticCpx = this.cyclomaticCpx + element.cyclomaticCpx;
        this.complexitiesByStatus = this.complexitiesByStatus.add(element.complexitiesByStatus);
    }


    /**
     * Logs the main elements of the AstFolder
     * @param message       // An optional message
     */
    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), this.parent?.path);
        for (const astFile of this.astFiles) {
            const name = astFile?.name ?? '';
            console.log(chalk.yellowBright(`  ${name}`));
            this.loggChildren(astFile?.astNode, `  `)
        }
    }


    /**
     * Logs the main elements of the children of the AstFolder's AstNode
     * @param astNode       // The AstNode of the AstFolder
     * @param indent        // The indentation of the current AstNode (in the log)
     */
    private loggChildren(astNode: AstNode, indent = ''): void {
        for (const childAstNode of astNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }

}
