import { AstNodeInterface } from '../../core/interfaces/json-ast/ast-node.interface';
import * as chalk from 'chalk';
import { ReportFile } from '../../core/models/report/report-file.model';

export class EvaluationService {

    static start(astFileNode: AstNodeInterface, reportFile: ReportFile): void{
        console.log(chalk.magentaBright('EVALLLLL'), reportFile.fileName);
    }
}
