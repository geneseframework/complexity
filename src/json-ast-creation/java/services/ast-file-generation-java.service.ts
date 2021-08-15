import { getFilename } from '../../../core/services/file.service';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { parse } from 'java-parser';
import * as fs from 'fs-extra';
import { cstToAst } from '../cst-to-ast';

/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
export class AstFileGenerationJavaService {

    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param  {string} path
     * @param  {AstFolderInterface} astFolder
     * @returns AstFileInterface
     */
    generate(path: string, astFolder: AstFolderInterface): AstFileInterface {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        const fileContent = fs.readFileSync(path, 'utf8');
        const cst = parse(fileContent)
        let classDeclaration = cst.children.ordinaryCompilationUnit[0].children?.typeDeclaration?.[0]?.children?.classDeclaration?.[0];
        let interfaceDeclaration = cst.children.ordinaryCompilationUnit[0].children?.typeDeclaration?.[0]?.children?.interfaceDeclaration?.[0];
        let ast: any = [];
        if(classDeclaration) {
            ast = cstToAst(classDeclaration);
        } else if(interfaceDeclaration) {
            ast = cstToAst(interfaceDeclaration);
        }
        return {
            name: getFilename(path),
            text: fileContent,
            astNode: {
                kind: 'SourceFile',
                start: 0,
                pos: 0,
                end: fileContent.length,
                children: [
                    ast,
                    {
                        "end": fileContent.length,
                        "kind": "EndOfFileToken",
                        "pos": fileContent.length,
                        "start": fileContent.length
                    }
                ]
            }
        };
    }
}
