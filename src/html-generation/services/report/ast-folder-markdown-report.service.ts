import * as fs from 'fs-extra';
import * as eol from 'eol';
import * as Handlebars from 'handlebars';
import { RowFileReport } from '../../models/report/row-file-report.model';
import {
    constructLink,
    createRelativeDir,
    deleteLastSlash
} from '../../../core/utils/file-system.util';
import { AstFile } from '../../models/ast/ast-file.model';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFolderService } from '../ast/ast-folder.service';
import { Options } from '../../../core/models/options.model';
import { AstMethodService } from '../ast/ast-method.service';

/**
 * Service generating folders reports
 */
export class AstFolderMarkdownReportService {

    astFolder: AstFolder = undefined;                                       // The AstFolder relative to this service
    astFolderService: AstFolderService = new AstFolderService();            // The service relative to AstFolders
    private methodsArrayReport: RowFileReport[] = [];                       // The array of methods reports
    template: HandlebarsTemplateDelegate = undefined;                       // The HandleBar template used to generate the report


    constructor(astFolder: AstFolder) {
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }

    /**
     * Generates the folder's report
     */
    generateReport(): void {
        this.setMethodsArraySortedByDecreasingCognitiveCpx(this.astFolder);
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/handlebars/folder-markdown-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }

    /**
     * Set the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    private setMethodsArraySortedByDecreasingCognitiveCpx(astFolder: AstFolder): void {
        this.setTsFileReport(astFolder);
        this.setMethodsArrayReport(astFolder);
        this.methodsArrayReport = AstMethodService.sortByDecreasingCognitiveCpx(this.methodsArrayReport);
    }

    /**
     * Recursion setting the array of methods reports of each subFolder
     * @param astFolder    // The AstFolder to analyse
     */
    private setMethodsArrayReport(astFolder: AstFolder): void {
        for (const subFolder of astFolder.children) {
            this.setTsFileReport(subFolder);
            this.setMethodsArrayReport(subFolder);
        }
    }

    /**
     * Recursion setting the array of methods reports of each subFolder's files
     * @param astFolder    // The AstFolder to analyse
     */
    private setTsFileReport(astFolder: AstFolder): void{
        for (const tsFile of astFolder.astFiles){
            this.setAstMethodReport(tsFile)
        }
    }

    /**
     * Recursion setting the array of methods reports of each file's methods
     * @param astFile    // The AstFile to analyse
     */
    private setAstMethodReport(astFile: AstFile): void{
        for (const astMethod of astFile.astMethods) {
            this.methodsArrayReport.push({
                cognitiveColor: astMethod.cognitiveLevel.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticLevel.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: astFile.name,
                linkFile: undefined,
                methodName: astMethod.name
            })
        }
    }

    /**
     * Fills the HandleBar's template
     */
    private writeReport() {
        const template = this.template({
            rowFile: this.methodsArrayReport,
        });
        if (this.astFolder.relativePath) {
            createRelativeDir(this.astFolder.relativePath);
        }
        const pathOutDir = constructLink(Options.pathOutDir);
        const relativePath = constructLink(this.astFolder.relativePath);
        const pathReport = `${deleteLastSlash(pathOutDir)}/${deleteLastSlash(
            relativePath
        )}/folder-report.md`;
        try {
            fs.writeFileSync(pathReport, template, { encoding: "utf-8" });
        } catch (err) {
            console.log(err);
        }
    }
}
