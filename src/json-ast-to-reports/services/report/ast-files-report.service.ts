import * as fs from 'fs-extra';
import * as eol from 'eol';
import * as Handlebars from 'handlebars';
import {
    constructLink,
    deleteLastSlash,
    getPathWithDotSlash,
    getRouteToRoot,
} from '../../../core/services/file.service';
import { Options } from '../../../core/models/options.model';
import { FileReport } from '../../models/report/file-report.model';
import { AstFolder } from '../../models/ast/ast-folder.model';

/**
 * Service generating files reports
 */
export class AstFilesReportService {
    private fileReports: FileReport[] = [];     // The array of method reports
    private relativeRootReports = '';               // The route between the pos of the current TsFile and the root of the analysis
    template: HandlebarsTemplateDelegate;           // The HandleBar template used to generate the report
    astFolder: AstFolder = undefined;                   // The AstFile relative to this service

    constructor(astFolder: AstFolder) {
        this.astFolder = astFolder;
    }

    /**
     * Returns the array of files with their analysis
     */
    getFilesArray(): FileReport[] {
        let report: FileReport[] = [];
        for (const astFile of this.astFolder.astFiles) {
            const astFileReport: FileReport = {
                code: astFile.displayedCode?.text,
                cognitiveColor: astFile.cognitiveLevel,
                cpxIndex: astFile.cpxIndex,
                cyclomaticColor: astFile.cyclomaticLevel,
                cyclomaticValue: astFile.cyclomaticCpx,
                name: astFile.name,
            };
            report.push(astFileReport);
        }
        return report;
    }

    /**
     * Generates the files report
     */
    generateReport(): void {
        this.fileReports = this.getFilesArray();
        this.relativeRootReports = getRouteToRoot(this.astFolder?.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("divCode", 'div-code');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/handlebars/files-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }

    /**
     * Creates the file of the report
     */
    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            files: this.fileReports,
            relativeRootReports: getPathWithDotSlash(this.relativeRootReports),
            stats: this.astFolder.stats,
            thresholds: Options.getThresholds()
        });
        const RELATIVE_PATH = this.astFolder?.relativePath ? `${deleteLastSlash(constructLink(this.astFolder?.relativePath))}/` : '';
        const OUT_DIR = constructLink(Options.pathOutDir);
        let pathReport = `${deleteLastSlash(OUT_DIR)}/${RELATIVE_PATH}files-report.html`;
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    }

    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     */
    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/json-ast-to-reports/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
