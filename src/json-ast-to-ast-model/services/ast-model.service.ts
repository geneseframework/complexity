import { JsonAstInterface } from '../../core/interfaces/json-ast/json-ast.interface';
import { AstModel } from '../models/ast.model';
import { AstFolderService } from './ast-folder.service';
import * as chalk from 'chalk';
import { AstMetricService } from './ast-metric.service';
import { AstMetric } from '../models/ast-metric.model';
import { Metric } from '../../core/models/report/metric.model';

export class AstModelService {

    static generate(jsonAst: JsonAstInterface): AstModel {
        const astModel = new AstModel();
        for (const metric of jsonAst.metrics) {
            const astMetric = new Metric(metric);
            astModel.astMetrics.push(AstMetricService.generate(jsonAst.astFolder, astMetric))
        }
        // astModel.astFolder = AstFolderService.generate(jsonAst.astFolder);
        // console.log(chalk.greenBright('AST MODELLLL = '), astModel);
        return astModel;
    }
}
