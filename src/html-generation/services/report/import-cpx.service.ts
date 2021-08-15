// This file was added in a parallel project in the aim to import / export reports to a CSV file
// TODO: Adapt this file in the aim to provide CSV reports to the user

// import * as chalk from 'chalk';
// import { SolutionsEntityService } from './solutions-entity.service';
// import { CONFIG } from '../const/config';
// import { SolutionEntity } from '../entities/solution.entity';
// import { CsvImportRow } from '../../models/report/csv-import-row.model';
// import { removeExtension } from '../utils/file-system.util';
// import { sum } from '../../../shared/utils/arrays.util';
//
// const csv = require('csv-parser')
// const fs = require('fs')
//
// export class ImportCpxService {
//
//     static async start(): Promise<void> {
//         console.log(chalk.greenBright('Starts cpx dataset import'));
//         const csvImportRows: CsvImportRow[] = await this.getCsv();
//         const solutionEntities: SolutionEntity[] = await SolutionsEntityService.findAllSolutions();
//         await this.setCpxToSolutions(solutionEntities, csvImportRows);
//         console.log(chalk.greenBright('Cpx imported from dataset'));
//     }
//
//     private static async getCsv(): Promise<CsvImportRow[]> {
//         const results = [];
//         const csvPath: string = `${CONFIG.root}/genese/complexity/reports/cpx-report.csv`;
//         return new Promise((resolve, reject) => {
//             fs.createReadStream(csvPath)
//                 .pipe(csv())
//                 .on('data', (data) => results.push(data))
//                 .on('end', () => {
//                     resolve(results);
//                 })
//                 .on('error', reject);
//             });
//     }
//
//     private static async setCpxToSolutions(solutionEntities: SolutionEntity[], csvImportRows: CsvImportRow[]): Promise<void> {
//         for (const solutionEntity of solutionEntities) {
//             await this.setCpxToSolution(solutionEntity, csvImportRows);
//         }
//     }
//
//     private static async setCpxToSolution(solutionEntity: SolutionEntity, csvImportRows: CsvImportRow[]): Promise<void> {
//         const rowsFile: CsvImportRow[] = csvImportRows.filter(c => removeExtension(c.file) === solutionEntity.id.toString());
//         solutionEntity.cpx = this.getFileCpx(rowsFile);
//         await solutionEntity.save();
//     }
//
//     private static getFileCpx(rows: CsvImportRow[]): number {
//         return +sum(rows.map(r => +r.cpx)).toFixed(1);
//     }
//
// }
