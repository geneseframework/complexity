import { copyFile, createRelativeDir } from '../../../core/utils/file-system.util';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFolderReportService } from './ast-folder-report.service';
import { AstFileReportService } from './ast-file-report.service';
import { AstFile } from '../../models/ast/ast-file.model';
import { JsonAst } from '../../models/ast/json-ast.model';
import { Options } from '../../../core/models/options.model';
import { AstFolderMarkdownReportService } from './ast-folder-markdown-report.service';
import { AstFolderConsoleReportService } from './ast-folder-console-report.service';
import { RowFileReport } from '../../models/report/row-file-report.model';
import { AstFilesReportService } from './ast-files-report.service';


/**
 * Service for reports generation
 */
export class ReportsService {

    /**
     * LanguageToJsonAst reports generation process
     * @param jsonAst
     */
    static generateAllReports(jsonAst: JsonAst): void {
        ReportsService.createStyleFiles();
        const parentFolder: AstFolder = jsonAst.astFolder;
        ReportsService.generateSubfoldersReports(parentFolder);
    }

    /**
     * LanguageToJsonAst markdown reports generation process
     * @param jsonAst
     */
    static generateMarkdownReports(jsonAst: JsonAst): void {
        const parentFolder: AstFolder = jsonAst.astFolder;
        const folderMarkdownReportService = new AstFolderMarkdownReportService(parentFolder);
        folderMarkdownReportService.generateReport();
    }

    /**
     * LanguageToJsonAst console reports generation process
     * @param jsonAst
     */
    static generateConsoleReports(jsonAst: JsonAst): RowFileReport[] {
        const parentFolder: AstFolder = jsonAst.astFolder;
        const folderConsoleReport = new AstFolderConsoleReportService(parentFolder)
        return folderConsoleReport.generateReport();
    }

    /**
     * Generates reports of children recursively
     * @param astFolder        // The AstFolder to analyse
     */
    private static generateSubfoldersReports(astFolder: AstFolder): void {
        ReportsService.generateFolderReport(astFolder);
        for (const subFolder of astFolder.children) {
            ReportsService.generateSubfoldersReports(subFolder);
        }
    }

    /**
     * Generates a report for a given folder
     * @param astFolder        // The AstFolder to analyse
     */
    private static generateFolderReport(astFolder: AstFolder): void {
        const folderReportService = new AstFolderReportService(astFolder);
        folderReportService.generateReport();
        this.generateFilesOfFolderReport(astFolder);
        for (const file of astFolder.astFiles) {
            this.generateFileReport(file);
        }
    }

    /**
     * Generates a report for a given file
     * @param astFolder
     */
    private static generateFilesOfFolderReport(astFolder: AstFolder): void {
        new AstFilesReportService(astFolder).generateReport();
    }

    /**
     * Generates a report for a given file
     * @param astFile        // The AstFile to analyse
     */
    private static generateFileReport(astFile: AstFile): void {
        new AstFileReportService(astFile).generateReport();
    }

    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    private static createStyleFiles(): void {
        // createRelativeDir('reports-styles');
        // copyFile(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/styles/report.css`, `${Options.pathOutDir}/reports-styles/report.css`);
        // copyFile(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/styles/styles.css`, `${Options.pathOutDir}/reports-styles/styles.css`);
        // copyFile(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/styles/prettify.css`, `${Options.pathOutDir}/reports-styles/prettify.css`);
        // copyFile(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/styles/prism.css`, `${Options.pathOutDir}/reports-styles/prism.css`);
        // copyFile(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/styles/prism.js`, `${Options.pathOutDir}/reports-styles/prism.js`);
        // copyFile(`${Options.pathGeneseNodeJs}/core/chartjs/Chart.js`, `${Options.pathOutDir}/reports-styles/Chart.js`);
    }
}
