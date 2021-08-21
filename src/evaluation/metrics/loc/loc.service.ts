import * as chalk from 'chalk';
import { AbstractMetricService } from './abstract-metric.service';
import { AstFolder } from '../../../core/models/ast/ast-folder.model';
import { ReportModel } from '../../../core/models/report/report.model';

export class LocService extends AbstractMetricService {

    evaluate(astFolder: AstFolder, reportModel: ReportModel): void {
        console.log(chalk.blueBright('LOC SERVICE'),  astFolder);
    }
}
