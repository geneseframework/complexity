import { JsonAstFolderInterface } from '../../core/interfaces/json-ast/json-ast-folder.interface';
import { ReportFolder } from '../../core/models/report/report-folder.model';
import * as chalk from 'chalk';
import { JsonAstFileInterface } from '../../core/interfaces/json-ast/json-ast-file.interface';
import { ReportFile } from '../../core/models/report/report-file.model';
import { EvaluationService } from './evaluation.service';

export class ReportFolderService {

    static start(astFolder: JsonAstFolderInterface): ReportFolder {
        const reportFolder = new ReportFolder(astFolder.path);
        this.addSubfolders(astFolder, reportFolder);
        this.addReportFiles(astFolder.astFiles, reportFolder);
        console.log(chalk.blueBright('AST FOLDERRR CHLDRNNNN'), reportFolder.children);
        return reportFolder;
    }

    private static addSubfolders(astFolder: JsonAstFolderInterface, reportFolder: ReportFolder): void {
        if (astFolder?.children?.length > 0) {
            for (const child of astFolder.children) {
                const childReportFolder = new ReportFolder(child.path);
                this.addSubfolders(child, childReportFolder);
                reportFolder.children.push(childReportFolder);
            }
        }
    }

    private static addReportFiles(astFiles: JsonAstFileInterface[], reportFolder: ReportFolder): void {
        for (const astFile of astFiles) {
            this.addReportFile(astFile, reportFolder);
        }
    }

    private static addReportFile(astFile: JsonAstFileInterface, reportFolder: ReportFolder): void {
        const reportFile = new ReportFile(astFile.name, astFile.text, astFile.text);
        EvaluationService.start(astFile.astNode, reportFile);
        reportFolder.files.push(reportFile);
    }

}
