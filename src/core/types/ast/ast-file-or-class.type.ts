import { AstFile } from '../../../json-ast-to-ast-model/models/ast-file.model';
import { AstClass } from '../../../json-ast-to-ast-model/models/ast-class.model';

export type AstFileOrClass = AstFile | AstClass;

export function isAstClass(value: any): value is AstClass {
    return value instanceof AstClass;
}

export function isAstFile(value: any): value is AstFile {
    return value instanceof AstFile;
}
