import { MethodReport } from '../../models/report/method-report.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { CsvExportRow } from '../../models/report/csv-export-row.model';
import { CSV_EXPORT } from '../../global/csv-export.global';
import { constructLink, deleteLastSlash } from '../../../core/services/file.service';
import { Options } from '../../../core/models/options.model';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

export class ExportService {

    static async exportReport(): Promise<void> {
        const OUT_DIR = constructLink(Options.pathOutDir);
        let csvPath = `${deleteLastSlash(OUT_DIR)}/cpx-report.csv`;
        const csvWriter = createCsvWriter({
            path: csvPath,
            header: [
                {id: 'folderPath', title: 'folder'},
                {id: 'fileName', title: 'file'},
                {id: 'functionName', title: 'func'},
                {id: 'cpx', title: 'cpx'},
            ]
        });
        await csvWriter.writeRecords(CSV_EXPORT);
    }


    static addRows(methodReports: MethodReport[], astFile: AstFile): void {
        for (const methodReport of methodReports) {
            this.addRow(methodReport, astFile);
        }
    }


    private static addRow(methodReport: MethodReport, astFile: AstFile): void {
        const csvExportRow = new CsvExportRow();
        csvExportRow.cpx = methodReport.cpxIndex?.toString();
        csvExportRow.fileName = astFile.name;
        csvExportRow.folderPath = astFile.astFolder.relativePath;
        csvExportRow.functionName = methodReport.name;
        CSV_EXPORT.push(csvExportRow);
    }
}
