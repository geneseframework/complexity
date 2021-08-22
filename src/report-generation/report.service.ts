import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';
import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import { MethodReport } from '../html-generation/models/report/method-report.model';
import {
    constructLink, copyFile, createRelativeDir, deleteLastSlash,
    getFilenameWithoutExtension,
    getPathWithDotSlash,
    getRouteToRoot
} from '../core/utils/file-system.util';
import * as eol from 'eol';
import { Options } from '../core/models/options.model';
import * as Handlebars from 'handlebars';
import { ReportMetric } from './models/report-metric.model';

export class ReportService {

    static async start(jsonReport: JsonReportInterface): Promise<any> {
        console.log(chalk.greenBright('JSON REPORTTTTT '), jsonReport.reportMetrics[0].reportSnippets);
        this.createStyleFiles();
        let report: MethodReport[] = [];
        for (const reportMetric of jsonReport.reportMetrics) {
            this.generateMetricReport(reportMetric);
            // const methodReport: MethodReport = {
            //     code: reportMetric.displayedCode?.text,
            //     cognitiveColor: reportMetric.cognitiveLevel,
            //     cpxIndex: reportMetric.cpxIndex,
            //     cyclomaticColor: reportMetric.cyclomaticLevel,
            //     cyclomaticValue: reportMetric.cyclomaticCpx,
            //     name: reportMetric.name,
            // };
            // report.push(methodReport);
        }
        return report;
    }

    /**
     * Generates the file's report
     */
    private static generateMetricReport(reportMetric: ReportMetric): void {
        // this.methodReports = this.getMethodsArray();
        // this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        // this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("divCode", 'div-code');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathCommand}/report/templates/handlebars/report.handlebars`, 'utf-8'));
        const template: HandlebarsTemplateDelegate<any> = Handlebars.compile(reportTemplate);
        this.writeReport(template);
    }

    /**
     * Creates the file of the report
     */
    private static writeReport(template: HandlebarsTemplateDelegate<any>) {
        // const content = template({});
        // const template = this.template({
        //     colors: Options.colors,
        //     methods: this.methodReports,
        //     relativeRootReports: getPathWithDotSlash(this.relativeRootReports),
        //     stats: this.astFile.stats,
        //     thresholds: Options.getThresholds()
        // });
        // const filenameWithoutExtension = getFilenameWithoutExtension(
        //     this.astFile.name
        // );
        // const RELATIVE_PATH = constructLink(
        //     this.astFile.astFolder?.relativePath
        // );
        // const OUT_DIR = constructLink(Options.pathOutDir);
        const pathReport = `${Options.pathCommand}/dist/report.html`;
        // let pathReport = `${deleteLastSlash(OUT_DIR)}/${deleteLastSlash(
        //     RELATIVE_PATH
        // )}/${filenameWithoutExtension}.html`;
        //
        //
        // console.log(chalk.blueBright('CONTENTTTT'), content);
        console.log(chalk.blueBright('PATH REPORTTTT'), pathReport);
        // fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    }

    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     */
    private static registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathCommand}/report/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }

    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
    private static createStyleFiles(): void {
        // createRelativeDir('reports-styles');
        // copyFile(`${Options.pathCommand}/src/report/templates/styles/report.css`, `${Options.pathOutDir}/reports-styles/report.css`);
        // copyFile(`${Options.pathCommand}/src/report/templates/styles/styles.css`, `${Options.pathOutDir}/reports-styles/styles.css`);
        // copyFile(`${Options.pathCommand}/src/report/templates/styles/prettify.css`, `${Options.pathOutDir}/reports-styles/prettify.css`);
        // copyFile(`${Options.pathCommand}/src/report/templates/styles/prism.css`, `${Options.pathOutDir}/reports-styles/prism.css`);
        // copyFile(`${Options.pathCommand}/src/report/templates/styles/prism.js`, `${Options.pathOutDir}/reports-styles/prism.js`);
        // copyFile(`${Options.pathCommand}/src/core/chartjs/Chart.js`, `${Options.pathOutDir}/reports-styles/Chart.js`);
    }
}
