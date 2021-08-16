import { JsonAstNodeInterface } from './json-ast-node.interface';

export interface JsonAstFileInterface {

    astNode: JsonAstNodeInterface;
    name: string;
    text: string;

}
