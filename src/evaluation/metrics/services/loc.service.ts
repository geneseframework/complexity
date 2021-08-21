import * as chalk from 'chalk';
import { AbstractMetricService } from './abstract-metric.service';
import { AstModel } from '../../../core/models/ast/ast.model';

export class LocService extends AbstractMetricService {

    evaluate(astModel: AstModel): void {
        console.log(chalk.blueBright('LOC SERVICE'),  astModel);
    }
}
