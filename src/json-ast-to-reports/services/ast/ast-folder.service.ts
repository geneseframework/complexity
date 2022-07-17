import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { BarchartService } from '../report/barchart.service';
import { constructLink, getOS } from '../../../core/services/file.service';
import { OS } from '../../enums/os.enum';
import { isArray } from '../../../core/utils/arrays.util';

/**
 * - AstFolders generation from Abstract Syntax AstNode of a folder
 * - Other services for AstFolders
 */
export class AstFolderService extends StatsService {

    protected _stats: Stats = undefined;                            // The statistics of the AstFolder
    astFolder: AstFolder = undefined;                               // The AstFolder corresponding to this service

    constructor() {
        super();
    }


    /**
     * Calculates the statistics of the AstFolder
     * @param astFolder        // The AstFolder to analyse
     */
    calculateStats(astFolder: AstFolder): Stats {
        this._stats = new Stats();
        this._stats.subject = astFolder.relativePath === '' ? astFolder.path : astFolder.relativePath;
        this._stats.numberOfFiles = astFolder.numberOfFiles;
        this._stats.numberOfMethods = astFolder.numberOfMethods;
        this._stats.totalCognitiveComplexity = astFolder.cpxFactors.total;
        this._stats.totalCyclomaticComplexity = astFolder.cyclomaticCpx;
        this.calculateAstFolderCpxByStatus(astFolder);
        this._stats.setPercentages();
        return this._stats;
    }


    /**
     * Calculates and sets to _stats the Complexities by Status of a given AstFolder
     * @param astFolder        // The AstFolder to analyse
     */
    private calculateAstFolderCpxByStatus(astFolder: AstFolder): void {
        for (const astFile of astFolder.astFiles) {
            this.calculateAstFileCpxByStatus(astFile);
        }
        for (const childAstFolder of astFolder.children) {
            this.calculateAstFolderCpxByStatus(childAstFolder);
        }
    }


    /**
     * Increments AstFolder statistics for a given astFile
     * @param astFile       // The AstFile to analyse
     */
    private calculateAstFileCpxByStatus(astFile: AstFile): void {
        this.incrementMethodsByStatus(ComplexityType.COGNITIVE, astFile.stats);
        this.incrementMethodsByStatus(ComplexityType.CYCLOMATIC, astFile.stats);
        this._stats.barChartCognitive = BarchartService.concat(this._stats.barChartCognitive, astFile.stats.barChartCognitive);
        this._stats.barChartCyclomatic = BarchartService.concat(this._stats.barChartCyclomatic, astFile.stats.barChartCyclomatic);
    }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param type              // The complexity type
     * @param tsFileStats
     */
    private incrementMethodsByStatus(type: ComplexityType, tsFileStats: Stats): void {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    }


    /**
     * Returns the relative path of an AstFolder
     */
    protected getNameOrPath(astFolder: AstFolder): void {
        this._stats.subject = astFolder.relativePath;
    }


    /**
     * Returns the number of files of an astFolder and its subfolders
     * @param astFolder     // The astFolder to analyse
     */
    getNumberOfFiles(astFolder: AstFolder): number {
        if (!astFolder?.astFiles) {
            return 0;
        }
        let nbFiles = astFolder.astFiles.length;
        nbFiles += this.getChildrenFoldersNumberOfFiles(astFolder);
        return nbFiles;
    }


    /**
     * Returns the number of files of the subfolders of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    private getChildrenFoldersNumberOfFiles(astFolder: AstFolder): number {
        let nbFiles = 0;
        for (const childAstFolder of astFolder.children) {
            nbFiles += childAstFolder.astFiles?.length;
            nbFiles += this.getChildrenFoldersNumberOfFiles(childAstFolder);
        }
        return nbFiles;
    }


    /**
     * Returns the number of lines of code of an astFolder and its subfolders
     * @param astFolder     // The astFolder to analyse
     */
    getNumberOfLinesOfCode(astFolder: AstFolder): number {
        if (!isArray(astFolder?.astFiles)) {
            return 0;
        }
        let nbLinesOfCode = 0;
        nbLinesOfCode += this.getChildrenFoldersNumberOfLinesOfCode(astFolder);
        astFolder.numberOfLinesOfCode = nbLinesOfCode;
        return nbLinesOfCode;
    }


    /**
     * Returns the number of lines of code of the subfolders of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    private getChildrenFoldersNumberOfLinesOfCode(astFolder: AstFolder): number {
        let nbLinesOfCode = 0;
        for (const childAstFolder of astFolder.children) {
            const astFiles: AstFile[] = childAstFolder.astFiles || [];
            for (const astFile of astFiles) {
                nbLinesOfCode += astFile.numberOfLinesOfCode;
            }
            nbLinesOfCode += this.getChildrenFoldersNumberOfLinesOfCode(childAstFolder);
        }
        return nbLinesOfCode;
    }


    /**
     * Returns the number of methods of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    getNumberOfMethods(astFolder: AstFolder): number {
        if (!astFolder?.astFiles) {
            return 0;
        }
        let nbMethods = this.getCurrentFolderNumberOfMethods(astFolder);
        nbMethods += this.getChildrenFoldersNumberOfMethods(astFolder);
        return nbMethods;
    }


    /**
     * Returns the number of methods of a given AstFolder without its subfolders
     * @param astFolder     // The astFolder to analyse
     */
    private getCurrentFolderNumberOfMethods(astFolder: AstFolder): number {
        let nbMethods = 0;
        for (const astFile of astFolder.astFiles) {
            nbMethods += astFile.astMethods?.length ?? 0;
        }
        return nbMethods;
    }


    /**
     * Returns the number of methods of the subfolders of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    private getChildrenFoldersNumberOfMethods(astFolder: AstFolder): number {
        let nbMethods = 0;
        for (const childAstFolder of astFolder.children) {
            nbMethods += this.getCurrentFolderNumberOfMethods(childAstFolder);
            nbMethods += this.getChildrenFoldersNumberOfMethods(childAstFolder);
        }
        return nbMethods;
    }


    /**
     * Returns the route from the root ancestor to the folder of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    getRelativePath(astFolder: AstFolder): string {
        return astFolder?.path?.slice(this.getRootPath(astFolder).length);
    }


    /**
     * Returns the ancestor of all the astFolders
     * @param astFolder     // The astFolder to analyse
     */
    private getAstFolderRoot(astFolder: AstFolder): AstFolder {
        if (!astFolder?.parent) {
            return astFolder;
        }
        return this.getAstFolderRoot(astFolder.parent);
    }


    /**
     * Returns the path of the ancestor of all the astFolders
     * @param astFolder     // The astFolder to analyse
     */
    private getRootPath(astFolder: AstFolder): string {
        return this.getAstFolderRoot(astFolder)?.path;
    }


    /**
     * Returns the path between a AstFolder's path and a AstFile's path which is inside it or inside one of its subfolders
     * @param astFolder      // The path of the AstFolder
     * @param astFile        // The path of the AstFile
     */
    getRouteFromFolderToFile(astFolder: AstFolder, astFile: AstFile): string {
        if (!astFile || !astFolder) {
            return undefined;
        }
        if (astFile.astFolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log(`The file ${astFile.name} is not inside the folder ${astFolder.path}`);
            return undefined;
        } else {
            const linkStarter = this.getLinkStarter(astFolder);

            return `${linkStarter}${astFile.astFolder.path.slice(
                astFolder.path.length + 1
            )}`;

        }
    }

    getLinkStarter(astFolder: AstFolder) {
        return getOS() !== OS.WINDOWS ? "./" : astFolder?.relativePath === "" ? "./" : ""
    }

    /**
     * Returns the route from the folder of a AstFolder to one of its subfolders
     * @param astFolder
     * @param astSubfolder
     */
    getRouteFromFolderToSubFolder(astFolder: AstFolder, astSubfolder: AstFolder): string {
        if (!astFolder || !astSubfolder|| astSubfolder.path === astFolder.path ) {
            return undefined;
        }
        if (astSubfolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log(`The folder ${astSubfolder.path} is not a subfolder of ${astFolder.path}`);
            return undefined;
        } else {

            const linkStarter = this.getLinkStarter(astFolder);

            const finalLink = `${linkStarter}${this.linkSlicer(
                astSubfolder.path,
                astFolder.path
            )}`;

            return finalLink;
        }
    }

    isSlashExist(text: string, parentText: string) {
        return constructLink(text[parentText.length + 1]) === constructLink("/");
    }

    linkSlicer(text: string, parentText: string): string {
        return this.isSlashExist(text, parentText)
            ? text.slice(parentText.length + 2)
            : text.slice(parentText.length + 1);
    }

}
