import { JsonAstInterface } from '../../core/interfaces/json-ast/json-ast.interface';
import { AstModel } from '../models/ast.model';
import { AstMetricService } from './ast-metric.service';
import { Metric } from '../../core/models/metric.model';

export class AstModelService {

    static generate(jsonAst: JsonAstInterface): AstModel {
        const astModel = new AstModel();
        for (const metric of jsonAst.metrics) {
            const astMetric = new Metric(metric);
            astModel.astMetrics.push(AstMetricService.generate(jsonAst.astFolder, astMetric))
        }
        // console.log(chalk.greenBright('AST MODELLLL = '), astModel);
        return astModel;
    }
}
