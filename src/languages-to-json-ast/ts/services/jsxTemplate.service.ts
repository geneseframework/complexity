import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { isJsx } from '../utils/ast.util';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';

export class JsxTemplateService {

    static addTemplateRootNodes(astFolder: AstFolderInterface): void {
        this.addJsxRootNodesOnFiles(astFolder.astFiles);
        const children: AstFolderInterface[] = astFolder.children ?? [];
        for (let child of children) {
            this.addTemplateRootNodes(child);
        }
    }


    private static addJsxRootNodesOnFiles(astFiles: AstFileInterface[]): void {
        for (let astFile of astFiles) {
            this.addJsxRootNodesOnNode(astFile.astNode, undefined);
        }
    }


    private static addJsxRootNodesOnNode(astNode: AstNodeInterface, parentAstNode: AstNodeInterface): void {
        if (this.isJsxElement(astNode)) {
            this.insertTemplateRootNode(astNode, parentAstNode);
        } else {
            const children: AstNodeInterface[] = astNode.children ?? [];
            for (let childNode of children) {
                this.addJsxRootNodesOnNode(childNode, astNode);
            }
        }
    }


    private static isJsxElement(astNode: AstNodeInterface): boolean {
        return astNode?.kind?.slice(0, 3) === 'Jsx';
    }


    private static insertTemplateRootNode(astNode: AstNodeInterface, parentAstNode: AstNodeInterface): void {
        const templateRootNode: AstNodeInterface = {
            end: astNode.end,
            kind: SyntaxKind.TemplateRoot,
            pos: astNode.pos,
            start: astNode.start,
            children: [astNode],
        };
        const actualJsxElementChildIndex: number = parentAstNode.children.findIndex(c => c === astNode);
        parentAstNode.children.splice(actualJsxElementChildIndex, 1, templateRootNode);
    }
}
