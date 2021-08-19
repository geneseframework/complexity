import { AstNode } from './ast-node.model';
import { AstNodeService } from '../../../json-ast-to-ast-model/services/ast-node.service';
import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';
import { AstCode } from './ast-code.model';
import { Interval } from '../../../json-ast-to-ast-model/types/interval.type';
import { AstArrowFunction } from './ast-arrow-function.model';
import { AstClass } from './ast-class.model';
import { AstFunction } from './ast-function.model';

export abstract class AstAbstract {

    astArrowFunctions: AstArrowFunction[] = [];
    astClasses: AstClass[] = [];
    astCode: AstCode = undefined;
    astFunctions: AstFunction[] = [];
    astNode: AstNode = undefined;
    jsonAstNode: JsonAstNodeInterface = undefined;
    name = undefined;
    text = '';
    textOutsideClassesAndFunctions = '';

    protected constructor(jsonAstNode: JsonAstNodeInterface) {
        this.jsonAstNode = jsonAstNode;
        this.setAstNode();
    }

    get astAbstracts(): AstAbstract[] {
        return this.astArrowFunctions.concat(this.astFunctions).concat(this.astClasses);
    }

    get interval(): Interval {
        return this.astNode.interval;
    }

    get length(): number {
        return this.jsonAstNode.end - this.jsonAstNode.pos ?? 0;
    }

    // get name(): string {
    //     return this.jsonAstNode.name;
    // }

    // get text(): string {
    //     return this.astNode.code;
    // }

    private setAstNode(): void {
        this.astNode = AstNodeService.generate(this.jsonAstNode);
    }
}
