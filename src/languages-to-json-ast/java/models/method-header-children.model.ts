import { Result } from './result.model';
import { MethodDeclarator } from './method-declarator.model';
import { Throws } from './throws.model';

export class MethodHeaderChildren {
    result?: Result[] = [new Result()];
    methodDeclarator?: MethodDeclarator[] = [new MethodDeclarator()];
    throws?: Throws[] = [new Throws()];
}
