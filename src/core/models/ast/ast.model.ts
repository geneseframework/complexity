import { MetricInterface } from '../../interfaces/json-report/metric.interface';
import { AstFolder } from './ast-folder.model';
import { Evaluate } from '../../../html-generation/interfaces/evaluate.interface';

export class AstModel {
// export class AstModel implements Evaluate {

    astFolder: AstFolder = undefined;
    metrics?: MetricInterface[] = [];

}
