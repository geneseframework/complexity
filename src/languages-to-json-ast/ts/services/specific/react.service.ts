import { AstMethod } from '../../../../json-ast-to-reports/models/ast/ast-method.model';
import * as chalk from 'chalk';
import { AstNode } from '../../../../json-ast-to-reports/models/ast/ast-node.model';
import { CodeLine } from '../../../../json-ast-to-reports/models/code/code-line.model';
import { AstNodeInterface } from '../../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../../../../core/enum/syntax-kind.enum';

export class ReactService {

    static extractHooksAndArrowFunctions(fileAstNode: AstNodeInterface): void {
        console.log(chalk.yellowBright('REACTTTTT FILE NODEEEEE'), fileAstNode.children[0].children);
        const reactComponents: AstNodeInterface[] = this.getArrowFunctions(fileAstNode);
        console.log(chalk.magentaBright('GET ARRR FN'), reactComponents);
        this.extractArrowFunctionsFromReactComponents(fileAstNode, reactComponents);
    }


    private static getArrowFunctions(astNodeInterface: AstNodeInterface): AstNodeInterface[] {
        const arrowFunctions: AstNodeInterface[] = [];
        const keyWords: AstNodeInterface[] = astNodeInterface.children.filter(c => c.kind === 'Keyword');
        for (const keyWord of keyWords) {
            const firstSon: AstNodeInterface = this.firstSon(keyWord);
            const grandSon: AstNodeInterface = this.firstSon(firstSon);
            if (firstSon.kind === 'VariableDeclarationList'
                && grandSon.kind === 'VariableDeclaration'
                && this.hasArrowFunctionChild(grandSon)
            ) {
                arrowFunctions.push(keyWord);
            }
        }
        return arrowFunctions;
    }


    private static firstSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
        return astNodeInterface?.children?.[0];
    }


    private static secondSon(astNodeInterface: AstNodeInterface): AstNodeInterface {
        return astNodeInterface?.children?.[1];
    }


    private static hasArrowFunctionChild(astNodeInterface: AstNodeInterface): boolean {
        return astNodeInterface.children.map(c => c.kind).includes(SyntaxKind.ArrowFunction);
    }


    private static extractArrowFunctionsFromReactComponents(fileAstNode: AstNodeInterface, reactComponents: AstNodeInterface[]): void {
        for (const reactComponent of reactComponents) {
            this.extractArrowFunctionsFromReactComponent(fileAstNode, reactComponent);
        }
    }


    private static extractArrowFunctionsFromReactComponent(fileAstNode: AstNodeInterface, reactComponent: AstNodeInterface): void {
        // console.log(chalk.blueBright('REACT CPTTTTT'), reactComponent);
        const block: AstNodeInterface = this.secondSon(this.secondSon(this.firstSon(this.firstSon(reactComponent))));
        const nestedArrowFunctions: AstNodeInterface[] = this.getArrowFunctions(block);
        console.log(chalk.greenBright('ARROWWWWS'), nestedArrowFunctions);
        for (const arrowFunction of nestedArrowFunctions) {
            let blockChildIndex: number = block.children.findIndex(a => a === arrowFunction);
            fileAstNode.children.push(block.children[blockChildIndex]);
            block.children.splice(blockChildIndex, 1);
        }
        console.log(chalk.cyanBright('BLOCKKKKK'), block);
    }
}
