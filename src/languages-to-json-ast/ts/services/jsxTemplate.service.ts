import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { isJsx } from '../utils/ast.util';

export class JsxTemplateService {

    static addTemplateRootNodes(astFolder: AstFolderInterface): void {
        console.log('ASTFOLDER', astFolder.path);
        console.log('ASTFILESSS start');
        this.addJsxRootNodesOnFolder(astFolder);
        console.log('ASTFILESSS END');

    }


    private static addJsxRootNodesOnFolder(astFolder: AstFolderInterface): void {
        this.addJsxRootNodesOnFiles(astFolder.astFiles);
        const children: AstFolderInterface[] = astFolder.children ?? [];
        console.log('CHILDRENNN', children?.map(c => c?.path))
        for (let child of children) {
            this.addJsxRootNodesOnFolder(child);
        }
    }


    private static addJsxRootNodesOnFiles(astFiles: AstFileInterface[]): void {
        for (let astFile of astFiles) {
            this.addJsxRootNodesOnNode(astFile.astNode);
        }
    }


    private static addJsxRootNodesOnNode(astNode: AstNodeInterface): void {
        console.log('ADD JSX ROOOOT NODEEEE', astNode.kind);
        if (this.isJsxElement(astNode)) {
            this.insertTemplateRootNode(astNode);
        } else {
            const children: AstNodeInterface[] = astNode.children ?? [];
            for (let childNode of children) {
                this.addJsxRootNodesOnNode(childNode);
            }
        }
    }


    private static isJsxElement(astNode: AstNodeInterface): boolean {
        return astNode?.kind?.slice(0, 3) === 'Jsx';
    }


    private static insertTemplateRootNode(astNode: AstNodeInterface): void {
        console.log('INSESRT TPL NODEEEE', astNode.kind);
    }
}
