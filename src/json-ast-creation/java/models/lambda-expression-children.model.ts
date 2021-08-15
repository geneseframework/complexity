import { Infos } from './infos.model';
import { LambdaBody } from './lambda-body.model';
import { LambdaParameters } from './lambda-parameters.model';

export class LambdaExpressionChildren {
    lambdaParameters?: LambdaParameters[] = [new LambdaParameters()];
    Arrow?: Infos[] = [new Infos()];
    lambdaBody?: LambdaBody[] = [new LambdaBody()];
}
