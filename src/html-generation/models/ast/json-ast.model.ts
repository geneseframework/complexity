import { AstFolder } from './ast-folder.model';
import { Logg } from '../../../core/interfaces/logg.interface';
import * as chalk from 'chalk';
import { AstNode } from './ast-node.model';
import { JsonAstInterface } from '../../../core/interfaces/ast/json-ast.interface';
import { MetricInterface } from '../../../json-report-creation/interfaces/metric.interface';

export class JsonAst implements JsonAstInterface, Logg {

    astFolder: AstFolder = undefined;              // The root of the JsonAST : the first AstFolder at the root of the folders to analyse
    metrics: MetricInterface[] = [];




    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Logs the main information about the JsonAst
     * @param message       // An optional message
     */
    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'JSON_AST'));
        console.log(this.astFolder?.path);
        console.log('-----------------------------');
        for (const astFile of this.astFolder?.astFiles ?? []) {
            console.log(chalk.blueBright('astFile'), astFile?.name);
            console.log(chalk.blueBright('astFile astNode'), astFile?.astNode?.kind);
            console.log(chalk.blueBright('astFile children'), astFile?.astNode?.children);
            this.loggChildren(astFile.astNode);
        }
        console.log(chalk.blueBright('children'), this.astFolder?.children);
    }


    /**
     * Logs the main information of an AstNode of the JsonAst
     * @param astNode       // The AstNode to analyse
     * @param indent        // The current indentation in the log
     */
    private loggChildren(astNode: AstNode, indent = ''): void {
        for (const childAstNode of astNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}node`), childAstNode.kind, name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }

}
