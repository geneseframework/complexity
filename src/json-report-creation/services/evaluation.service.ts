import { AstNodeInterface } from '../../core/interfaces/ast/ast-node.interface';
import { ReportFile } from '../models/report-file.model';
import * as chalk from 'chalk';

export class EvaluationService {

    static start(astFileNode: AstNodeInterface, reportFile: ReportFile): void{
        console.log(chalk.magentaBright('EVALLLLL'), reportFile.name);
    }
}
