import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import * as chalk from 'chalk';
import { ReportFile } from '../../core/models/report/report-file.model';

export class EvaluationService {

    static start(astFileNode: JsonAstNodeInterface, reportFile: ReportFile): void{
        console.log(chalk.magentaBright('EVALLLLL'), reportFile.fileName);
    }
}
