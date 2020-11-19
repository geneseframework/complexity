import { BasicForStatement } from './basic-for-statement.model';
import { EnhancedForStatement } from './enhanced-for-statement';

export class ForStatementChildren {
    basicForStatement?: BasicForStatement[] = [new BasicForStatement()];
    enhancedForStatement?: EnhancedForStatement[] = [new EnhancedForStatement()]
}
