import { JsonReportInterface } from '../core/interfaces/json-report/json-report.interface';
import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import * as eol from 'eol';
import { Options } from '../core/models/options.model';
import * as Handlebars from 'handlebars';
import { ReportMetric } from './models/report-metric.model';
import { HtmlReport } from './models/html-report.model';
import { RowSnippet } from './models/row-snippet.model';
import { flat } from '../core/utils/arrays.util';

export class ReportService {

    static async start(jsonReport: JsonReportInterface): Promise<any> {
        // console.log(chalk.greenBright('JSON REPORTTTTT '), jsonReport.reportMetrics[0].reportSnippets);
        this.createStyleFiles();
        const htmlReport = new HtmlReport();
        htmlReport.metricNames =jsonReport.reportMetrics.map(r => r.metricName);
        this.generateRowSnippets(jsonReport.reportMetrics, htmlReport);
        const template: HandlebarsTemplateDelegate = this.setTemplate();
        this.writeReport(htmlReport, template);
        return htmlReport;
    }

    /**
     * Generates the file's report
     */
    private static generateRowSnippets(reportMetrics: ReportMetric[], htmlReport: HtmlReport): void {
        const fileNames: string[] = flat(reportMetrics.map(r => r.reportSnippets.map(r => r.name)));
        for (const fileName of fileNames) {
            this.generateRowSnippet(fileName, reportMetrics, htmlReport);
        }
    }

    /**
     * Generates the file's report
     */
    private static generateRowSnippet(fileName: string, reportMetrics: ReportMetric[], htmlReport: HtmlReport): void {
        const rowSnippet = new RowSnippet(fileName);
        // const scores =
        htmlReport.rowSnippets.push(rowSnippet);
    }

    /**
     * Generates the file's report
     */
    private static setTemplate(): HandlebarsTemplateDelegate {
        this.registerPartial("rowSnippet", 'row-snippet');
        this.registerPartial("divCode", 'div-code');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathCommand}/report/templates/handlebars/report.handlebars`, 'utf-8'));
        return Handlebars.compile(reportTemplate);
    }

    /**
     * Creates the file of the report
     */
    private static writeReport(htmlReport: HtmlReport, template: HandlebarsTemplateDelegate) {
        console.log(chalk.cyanBright('HTML REPORTTTT'), htmlReport);
        const content = template(htmlReport);
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
        const pathReport = `${Options.pathCommand}/report/report.html`;
        // let pathReport = `${deleteLastSlash(OUT_DIR)}/${deleteLastSlash(
        //     RELATIVE_PATH
        // )}/${filenameWithoutExtension}.html`;
        //
        //
        fs.writeFileSync(pathReport, content, { encoding: 'utf-8' });
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
