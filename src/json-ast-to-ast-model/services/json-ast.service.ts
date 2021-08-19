import { JsonAstNodeInterface } from '../../core/interfaces/json-ast/json-ast-node.interface';
import * as chalk from 'chalk';

export class JsonAstService {

    static getDescendants(jsonAstNodeInterface: JsonAstNodeInterface): JsonAstNodeInterface[] {
    // static getDescendants(jsonAstNodeInterfaces: JsonAstNodeInterface[])
    // static getDescendants(jsonAstNodeInterfaces: JsonAstNodeInterface | JsonAstNodeInterface[]): JsonAstNodeInterface[] {
        const nodes: JsonAstNodeInterface[] = [];
        const children: JsonAstNodeInterface[] = jsonAstNodeInterface.children ?? [];
        // console.log(chalk.redBright('GET DESCENDANTSSSSSS'), jsonAstNodeInterface);
        for (const child of children) {
            nodes.push(child);
            nodes.push(...this.getDescendants(child));

        }
        return nodes;
    }
}
