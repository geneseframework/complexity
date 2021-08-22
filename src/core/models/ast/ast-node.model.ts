import { JsonAstNodeInterface } from '../../interfaces/json-ast/json-ast-node.interface';
import { AstNodeService } from '../../../json-ast-to-ast-model/services/ast-node.service';
import { Interval } from '../../../json-ast-to-ast-model/types/interval.type';

export class AstNode {

    children: AstNode[] = [];
    jsonAstNode: JsonAstNodeInterface = undefined;

    constructor(jsonAstNode: JsonAstNodeInterface) {
        this.jsonAstNode = jsonAstNode;
        this.setChildren();
    }

    get end(): number {
        return this.jsonAstNode.end;
    }

    get interval(): Interval {
        return [this.jsonAstNode.pos, this.jsonAstNode.end];
    }

    get kind(): string {
        return this.jsonAstNode.kind;
    }

    get name(): string {
        return this.jsonAstNode.name;
    }

    get descendants(): AstNode[] {
        const nodes: AstNode[] = [];
        for (const child of this.children) {
            nodes.push(child);
            nodes.push(...child.descendants);

        }
        return nodes;
    }

    get pos(): number {
        return this.jsonAstNode.pos;
    }

    get start(): number {
        return this.jsonAstNode.start;
    }

    get type(): string {
        return this.jsonAstNode.type;
    }

    private setChildren(): void {
        const children: JsonAstNodeInterface[] = this.jsonAstNode.children ?? [];
        for (const child of children) {
            this.children.push(AstNodeService.generate(child));
        }
    }

}
