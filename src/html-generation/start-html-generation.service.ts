import { InitService } from './services/init.service';
import { JsonAst } from './models/ast/json-ast.model';
import { ReportsService } from './services/report/reports.service';
import { AstFolder } from './models/ast/ast-folder.model';
import * as terminalLink from 'terminal-link';


/**
 * Main process jsonAst analysis and reports
 */
export class StartHtmlGenerationService {

    static astFolder: AstFolder;

    /**
     * Starts the analysis
     * @param pathCommand       // The path of the directory where is typed the command-line
     * @param jsonAstPath       // The path to the file ast.json
     * @param markdown          // True if the user wants to get a report on markdown format
     * @param consoleMode       // True if the user wants to get a report on the console
     */
    // static start(pathCommand: string, markdown: boolean, consoleMode: boolean, jsonAstPath = '/ast.json'): any {
    //     let result = undefined;
    //     const jsonAst: JsonAst = new InitService().generateAllFromJsonAst(StartHtmlGenerationService.getJsonAst(pathCommand + jsonAstPath));
    //     // jsonAst.astFolder.evaluate();
    //     // const jsonReport: JsonReport = EvaluationService.createJsonReport();
    //     if(markdown){
    //         ReportsService.generateMarkdownReports(jsonReport)
    //     } else if (consoleMode) {
    //         result = ReportsService.generateConsoleReports(jsonReport)
    //     } else {
    //         ReportsService.generateAllReports(jsonReport)
    //         const link = terminalLink('folderPath-report.html', `file://${pathCommand}/genese/complexity/reports/folder-report.html`);
    //         result = `Please open in your browser the file ${link} located in your genese reports folder.`
    //     }
    //     this.astFolder = jsonAst.astFolder;
    //     return result;
    // }

    static start(pathCommand: string, markdown: boolean, consoleMode: boolean, jsonAstPath = '/ast.json'): any {
        let result = undefined;
        const jsonAst: JsonAst = new InitService().generateAllFromJsonAst(StartHtmlGenerationService.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        // const jsonReport: JsonReport = EvaluationService.createJsonReport();
        if(markdown){
            ReportsService.generateMarkdownReports(jsonAst)
        } else if (consoleMode) {
            result = ReportsService.generateConsoleReports(jsonAst)
        } else {
            ReportsService.generateAllReports(jsonAst)
            const link = terminalLink('folderPath-report.html', `file://${pathCommand}/genese/complexity/reports/folder-report.html`);
            result = `Please open in your browser the file ${link} located in your genese reports folder.`
        }
        this.astFolder = jsonAst.astFolder;
        return result;
    }

    /**
     * Get the complexity value of the given JsonAst
     * @param jsonAst
     * @returns {number}
     */
    static getTotalCpx(jsonAst: JsonAst): number {
        const json = new InitService().generateAllFromJsonAst(jsonAst);
        json.astFolder.evaluateStandalone();
        return json.astFolder.stats.totalCognitiveComplexity;
    }

    /**
     * Returns the content of the JsonAst file
     * @param jsonAstPath
     */
    private static getJsonAst(jsonAstPath: string): JsonAst {
        return require(jsonAstPath);
    }

}
