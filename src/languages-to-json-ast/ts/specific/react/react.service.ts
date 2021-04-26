import * as chalk from 'chalk';
import { AstNodeInterface } from '../../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../../../../core/enum/syntax-kind.enum';
import { firstSon, secondSon } from '../../../../core/utils/ast.util';

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
            const son: AstNodeInterface = firstSon(keyWord);
            const grandSon: AstNodeInterface = firstSon(son);
            if (son.kind === 'VariableDeclarationList'
                && grandSon.kind === 'VariableDeclaration'
                && this.hasArrowFunctionChild(grandSon)
            ) {
                arrowFunctions.push(keyWord);
            }
        }
        return arrowFunctions;
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
        const block: AstNodeInterface = secondSon(secondSon(firstSon(firstSon(reactComponent))));
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
