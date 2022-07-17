import { JsonAst } from '../models/ast/json-ast.model';
import { AstFolder } from '../models/ast/ast-folder.model';
import { AstFile } from '../models/ast/ast-file.model';
import { AstNode } from '../models/ast/ast-node.model';
import { SyntaxKind } from '../../core/enum/syntax-kind.enum';
import { AstMethod } from '../models/ast/ast-method.model';
import { CodeService } from './code.service';
import { AstNodeService } from './ast/ast-node.service';
import { Ast } from './ast/ast.service';
import { AssignedFunctionsService } from './ast/assigned-functions.service';
import { OutsideCodeService } from './ast/outside-code.service';
import { AstFileService } from './ast/ast-file.service';
import { AstFolderService } from './ast/ast-folder.service';

/**
 * - AstFolders generation from Abstract Syntax Tree of a folder
 */
export class InitService {


    astNodeService: AstNodeService = new AstNodeService();      // The service managing AstNodes


    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax Tree (AST) of the folder
     * @param jsonAst
     */
    generateAllFromJsonAst(jsonAst: JsonAst): JsonAst {
        const newJsonAst = new JsonAst();
        const astFolder = new AstFolder();
        astFolder.path = this.getPathFromJsonAstFolder(jsonAst.astFolder);
        astFolder.astFiles = this.generateAstFiles(jsonAst.astFolder, astFolder);
        astFolder.numberOfLinesOfCode = new AstFolderService().getNumberOfLinesOfCode(astFolder);
        if (Array.isArray(jsonAst.astFolder?.children)) {
            for (const child of jsonAst.astFolder?.children) {
                const newChild = this.generateChildrenAstFolder(child, astFolder);
                newChild.parent = jsonAst.astFolder;
                astFolder.children.push(newChild);
            }
        }
        // console.log('BEFORE CALC')
        // astFolder.numberOfLinesOfCodeWithSubfolders = new AstFolderService().setNumberOfLinesOfCodeWithSubfolders(astFolder);
        // astFolder.numberOfLinesOfCodeWithSubfolders = new AstFolderService().getNumberOfLinesOfCodeWithSubfolders(astFolder);
        newJsonAst.astFolder = astFolder;
        return newJsonAst;
    }


    /**
     * Generates the children of a given AstFolder with the property "children" of the JsonAst object
     * @param astFolderFromJsonAst      // An element of the "children" property of the JsonAst (this property is an array). The first direct ancestor of this property which is not called "children" is the astFolder property at the root of the Json object
     * @param parentAstFolder           // The parent AstFolder
     */
    private generateChildrenAstFolder(astFolderFromJsonAst: any, parentAstFolder: AstFolder): AstFolder {
        const newAstFolder = new AstFolder();
        newAstFolder.path = this.getPathFromJsonAstFolder(astFolderFromJsonAst);
        newAstFolder.parent = parentAstFolder;
        newAstFolder.astFiles = this.generateAstFiles(astFolderFromJsonAst, newAstFolder);
        newAstFolder.numberOfLinesOfCode = new AstFolderService().getNumberOfLinesOfCode(newAstFolder);
        for (const childFolderFromJsonAst of astFolderFromJsonAst.children ?? []) {
            newAstFolder.children.push(this.generateChildrenAstFolder(childFolderFromJsonAst, newAstFolder));
        }
        return newAstFolder;
    }


    /**
     * Generates the AstFiles corresponding to a property "astFiles" in the JsonAst object
     * @param astFolderFromJsonAst      // The father of the astFiles property in the JsonAst object
     * @param astFolder                 // The AstFolder containing the astFiles
     */
    private generateAstFiles(astFolderFromJsonAst: any, astFolder: AstFolder): AstFile[] {
        const astFiles: AstFile[] = [];
        for (const astFileFromJsonAst of astFolderFromJsonAst.astFiles) {
            astFiles.push(this.generateAstFile(astFileFromJsonAst, astFolder));
        }
        return astFiles;
    }


    /**
     * Generates the AstFile corresponding to an element of the array astFiles in the JsonAst object
     * @param astFileFromJsonAst        // The element in the astFiles array in the JsonAst object
     * @param astFolder                 // The astFolder containing the AstFile
     */
    private generateAstFile(astFileFromJsonAst: any, astFolder: AstFolder): AstFile {
        if (!astFileFromJsonAst?.astNode) {
            console.warn(astFileFromJsonAst.name ? `No AstNode for this file : ${astFileFromJsonAst.name}` : `AstFile without AstNode`);
            return undefined;
        }
        const newAstFile = new AstFile();
        newAstFile.name = astFileFromJsonAst.name;
        newAstFile.astFolder = astFolder;
        newAstFile.end = astFileFromJsonAst.astNode?.end;
        newAstFile.code = CodeService.getCode(astFileFromJsonAst.text);
        newAstFile.numberOfLinesOfCode = new AstFileService().getNumberOfLinesOfCode(newAstFile);
        newAstFile.astNode = this.getFileAstNode(astFileFromJsonAst.astNode, newAstFile);
        newAstFile.astNodes = this.astNodeService.flatMapAstNodes(newAstFile.astNode, [newAstFile.astNode]);
        newAstFile.astMethods = newAstFile.astNodes
            .filter(e => {
                return Ast.isFunctionOrMethod(e)
            })
            .map(e => e.astMethod);
        const functionsAssignedToVars: AstMethod[] = AssignedFunctionsService.getArrowFunctions(newAstFile.astNode);
        newAstFile.astMethods = newAstFile.astMethods.concat(functionsAssignedToVars);
        newAstFile.astOutsideNodes = OutsideCodeService.getOutsideNodes(newAstFile.astNode);
        return newAstFile;
    }


    /**
     * Generates the AstNode of a given AstFile with the astNode property in the JsonAst object
     * @param astNodeFromJsonAst        // The astNode property in the JsonAst object
     * @param astFile                   // The AstFile corresponding to the returned astNode
     */
    private getFileAstNode(astNodeFromJsonAst: any, astFile: AstFile): AstNode {
        const newAstNode = new AstNode();
        newAstNode.pos = 0;
        newAstNode.end = astNodeFromJsonAst.end;
        newAstNode.kind = SyntaxKind.SourceFile;
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.astFile = astFile;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        return newAstNode;
    }


    /**
     * Generates the AstNodes which are the children of a given AstNode with the "children" property in the JsonAst object
     * @param astNodesFromJsonAst       // The astNode property in the JsonAst object which have some children
     * @param astParentNode             // The AstNode which contains the returned AstNode children
     */
    private generateAstNodes(astNodesFromJsonAst: any[], astParentNode: AstNode): AstNode[] {
        if (!Array.isArray(astNodesFromJsonAst)) {
            return [];
        }
        const newAstNodes: AstNode[] = [];
        for (const astNodeFromJsonAst of astNodesFromJsonAst) {
            newAstNodes.push(this.generateAstNode(astNodeFromJsonAst, astParentNode));
        }
        return newAstNodes;
    }


    /**
     * Generates the AstNode corresponding to an astNode property in the JsonAst object
     * @param astNodeFromJsonAst        // The astNode property in the JsonAst object
     * @param astParentNode             // The AstNode parent of the AstNode to return
     */
    private generateAstNode(astNodeFromJsonAst: any, astParentNode: AstNode): AstNode {
        const newAstNode = new AstNode();
        newAstNode.astFile = astParentNode.astFile;
        newAstNode.cpxFactorsFromJsonAST = astNodeFromJsonAst.cpxFactors;
        newAstNode.end = astNodeFromJsonAst.end;
        newAstNode.kind = astNodeFromJsonAst.kind;
        newAstNode.name = astNodeFromJsonAst.name;
        newAstNode.parent = astParentNode;
        newAstNode.pos = astNodeFromJsonAst.pos;
        newAstNode.start = astNodeFromJsonAst.start;
        newAstNode.text = astNodeFromJsonAst.text;
        newAstNode.type = astNodeFromJsonAst.type;
        newAstNode.children = this.generateAstNodes(astNodeFromJsonAst.children, newAstNode);
        if (Ast.isFunctionOrMethod(astNodeFromJsonAst)) {
            if (!newAstNode.name && newAstNode.firstSon?.kind === SyntaxKind.Identifier) {
                newAstNode.name = newAstNode.children[0].name;
            }
            newAstNode.astMethod = this.generateAstMethod(newAstNode);
        } else {
            newAstNode.astMethod = astParentNode?.astMethod;
        }
        return newAstNode;
    }


    /**
     * Generates the AstMethod corresponding to an AstNode with kind corresponding to a FunctionDeclaration or a MethodDeclaration
     * @param astMethodNode     // The AstNode which corresponds to a FunctionDeclaration or a MethodDeclaration
     */
    private generateAstMethod(astMethodNode: AstNode): AstMethod {
        const astMethod = new AstMethod();
        astMethod.astNode = astMethodNode;
        astMethod.astNode.text = this.astNodeService.getCode(astMethodNode);
        astMethod.codeLines = astMethodNode.astFile?.code?.lines?.slice(astMethodNode.linePos - 1, astMethodNode.lineEnd);
        return astMethod;
    }


    /**
     * Returns the path without slash corresponding to the "path" property of the JsonAst object
     * @param jsonAstFolder
     */
    private getPathFromJsonAstFolder(jsonAstFolder: any): string {
        return jsonAstFolder?.path?.slice(-1) === '/' ? jsonAstFolder.path.slice(0, -1) : jsonAstFolder.path;
    }

}
