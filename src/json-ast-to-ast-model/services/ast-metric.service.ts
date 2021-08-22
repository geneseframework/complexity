import { JsonAstFolderInterface } from '../../core/interfaces/json-ast/json-ast-folder.interface';
import { AstFolder } from '../models/ast-folder.model';
import { JsonAstFileInterface } from '../../core/interfaces/json-ast/json-ast-file.interface';
import { AstFileService } from './ast-file.service';
import * as chalk from 'chalk';
import { MetricInterface } from '../../core/interfaces/json-report/metric.interface';
import { AstMetric } from '../models/ast-metric.model';

export class AstMetricService {

    static generate(jsonAstFolder: JsonAstFolderInterface, metric: MetricInterface): AstMetric {
        const astFolder = new AstMetric(jsonAstFolder, metric);
        for (const jsonAstFile of jsonAstFolder.astFiles) {
            astFolder.astFiles.push(AstFileService.generate(jsonAstFile));
        }
        // console.log(chalk.cyanBright('AST METRICCCC = '), astFolder);
        return astFolder;
    }
}
