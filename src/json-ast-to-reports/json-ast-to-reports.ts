import { InitService } from './services/init.service';
import { JsonAst } from './models/ast/json-ast.model';
import { ReportsService } from './services/report/reports.service';
import * as chalk from 'chalk';
import { AstFolder } from './models/ast/ast-folder.model';
import * as terminalLink from 'terminal-link';


/**
 * Main process jsonAst analysis and reports
 */
export class JsonAstToReports {

    static astFolder: AstFolder;

    /**
     * Starts the analysis
     * @param pathCommand
     * @param jsonAstPath
     * @param markdown
     * @param consoleMode
     */
    static start(pathCommand: string, jsonAstPath = '/json-ast.json', markdown: boolean, consoleMode: boolean): any {
        let result = undefined;
        const jsonAst = new InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        if(markdown){
            ReportsService.generateMarkdownReports(jsonAst)
        } else if (consoleMode) {
            result = ReportsService.generateConsoleReports(jsonAst)
        } else {
            ReportsService.generateAllReports(jsonAst)
            const link = terminalLink('folder-report.html', `file://${pathCommand}/genese/complexity/reports/folder-report.html`);
            result = `Please open in your browser the file "${link}" located in your genese reports folder.`
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
