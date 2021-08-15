import { getFilename } from '../../../core/utils/file-system.util';
import { AstFileInterface } from '../../../core/interfaces/ast/ast-file.interface';
import { AstFolderInterface } from '../../../core/interfaces/ast/ast-folder.interface';
import { AstNodeInterface } from '../../../core/interfaces/ast/ast-node.interface';
import { DefinitionInfo, Identifier, Node, SourceFile } from 'ts-morph';
import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { CpxFactorsInterface } from '../../../core/interfaces/cpx-factors.interface';
import { project, WEIGHTED_METHODS, WEIGHTS } from '../../globals.const';
import { Ts } from './ts.service';
import { randomString } from '../../../core/utils/other-tools.util';
import { Options } from '../../../core/models/options.model';
import { ReactService } from '../specific/react/react.service';
import { isJsx } from '../utils/ast.util';

/**
 * - AstFiles generation from their Abstract Syntax Tree (AST)
 */
export class AstFileGenerationService {

    /**
     * Generate the AstFile corresponding to a given source code
     * @param sourceCode
     * @returns {{astNode: AstNodeInterface, name: string, text: string}}
     */
    generateFromString(sourceCode: string): AstFileInterface {
        const randomName = randomString(10);
        const sourceFile = project.createSourceFile(`./${randomName}.ts`, sourceCode);
        return {
            name: `${randomName}.ts`,
            text: sourceFile.getFullText(),
            astNode: this.createAstNodeChildren(sourceFile)
        };
    }


    /**
     * Generates the AstFile corresponding to a given path and a given AstFolder
     * @param path          // The path of the file
     * @param astFolder     // The AstFolder containing the AstFile
     */
    generate(path: string, astFolder: AstFolderInterface): AstFileInterface {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        const sourceFile: SourceFile = project.getSourceFileOrThrow(path);
        const astFileInterface: AstFileInterface = {
            name: getFilename(path),
            text: sourceFile.getFullText(),
            astNode: this.createAstNodeChildren(sourceFile)
        };
        if (Options.framework === 'react') {
            ReactService.extractHooksAndArrowFunctions(astFileInterface.astNode);
        }
        return astFileInterface;
    }


    /**
     * Returns the Node children of a given Node
     * @param node      // The Node to analyze
     */
    private createAstNodeChildren(node: Node): AstNodeInterface {
        let astNode: AstNodeInterface = {
            end: node.getEnd(),
            kind: Ts.getKindAlias(node),
            name: Ts.getName(node),
            pos: node.getPos(),
            start: node.getStart()
        };
        astNode = this.addTypeAndCpxFactors(node, astNode);
        if (!isJsx(node)) {
            node.forEachChild((childNode: Node) => {
                if (!astNode.children) {
                    astNode.children = [];
                }
                astNode.children.push(this.createAstNodeChildren(childNode));
            });
        }
        return astNode;
    }


    /**
     * Adds the type to identifiers or parameters and calculates the CpxFactors of identifiers
     * @param node          // The Node to analyze
     * @param astNode       // The AstNode which will be updated with its type and CpxFactors
     */
    private addTypeAndCpxFactors(node: Node, astNode: AstNodeInterface): AstNodeInterface {
        if (Ts.isFunctionCall(node)) {
            astNode.type = 'function';
            if (WEIGHTED_METHODS.includes(astNode.name)) {
                const cpxFactors: CpxFactorsInterface = this.getUsageCpxFactors(node);
                if (cpxFactors) {
                    astNode.cpxFactors = cpxFactors;
                }
            }
        }
        if (Ts.isFunctionNode(node)) {
            astNode.type = Ts.getFunctionType(node);
        }
        if (Ts.isParameter(node)) {
            astNode.type = Ts.getParameterType(node);
        }
        if (Ts.isVarStatement(node)) {
            astNode.type = Ts.getVarStatementType(node);
        }
        return astNode;
    }


    /**
     * Returns the CpxFactors of a given Node (Identifier)
     * @param node      // The Node to analyze
     */
    private getUsageCpxFactors(node: Node): CpxFactorsInterface {
        try {
            if (node.getKindName() !== SyntaxKind.Identifier) {
                return undefined;
            }
            const identifier = node as Identifier;
            const definition = identifier.getDefinitions()?.[0];
            return this.useWeight(definition, Ts.getName(node));
        } catch (err) {
            return undefined;  // Impossible to find sourceFile

        }
    }


    /**
     * Returns the cpxFActors relative to method usage.
     * @param definition        // The DefinitionInfo of the Node corresponding to a method
     * @param nodeName          // The name of the Node (redundant, but avoids new calculation of this value)
     */
    useWeight(definition: DefinitionInfo, nodeName: string): CpxFactorsInterface {
        if (!definition) {
            return undefined;
        }
        const lib = this.library(definition);
        const method = lib ? Object.keys(WEIGHTS[lib]).find(e => e === nodeName) : undefined;
        return method ?
            {
                use: {
                    method: WEIGHTS[lib][method]
                }
            }
            : undefined;
    }


    // TODO: implement this method for libraries different than TypeScript itself
    /**
     * Returns the library corresponding to the DefinitionInfo of a method's Node.
     * @param definition
     */
    library(definition: DefinitionInfo): string {
        const path = definition.getSourceFile().getFilePath();
        return path.match(/typescript\/lib/) ? 'typescript' : undefined;
    }

}
