import * as chalk from 'chalk';
import { AstNodeInterface } from '../../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../../../../core/enum/syntax-kind.enum';
import { firstSon, secondSon } from '../../../../core/utils/ast.util';
import { ReactComponent } from './react-component.type';

export class ReactService {

    static extractHooksAndArrowFunctions(fileAstNode: AstNodeInterface): void {
        const reactComponents: ReactComponent[] = this.getReactComponents(fileAstNode);
        console.log(chalk.magentaBright('GET ARRR FN'), reactComponents);
        this.extractArrowFunctionsFromReactComponents(fileAstNode, reactComponents);
    }


    private static getReactComponents(astNodeInterface: AstNodeInterface): ReactComponent[] {
        const arrowFunctions: [arrowFunction: AstNodeInterface, index: number][] = [];
        const keyWords: AstNodeInterface[] = astNodeInterface.children.filter(c => c.kind === 'Keyword');
        for (let i = 0; i < keyWords.length; i++) {
            const son: AstNodeInterface = firstSon(keyWords[i]);
            const grandSon: AstNodeInterface = firstSon(son);
            if (son.kind === 'VariableDeclarationList'
                && grandSon.kind === 'VariableDeclaration'
                && this.hasArrowFunctionChild(grandSon)
            ) {
                arrowFunctions.push([keyWords[i], i]);
            }
        }
        return arrowFunctions;
    }


    private static hasArrowFunctionChild(astNodeInterface: AstNodeInterface): boolean {
        return astNodeInterface.children.map(c => c.kind).includes(SyntaxKind.ArrowFunction);
    }


    private static extractArrowFunctionsFromReactComponents(fileAstNode: AstNodeInterface, reactComponents: ReactComponent[]): void {
        for (const reactComponent of reactComponents) {
            this.extractArrowFunctionsFromReactComponent(fileAstNode, reactComponent);
        }
    }


    private static extractArrowFunctionsFromReactComponent(fileAstNode: AstNodeInterface, reactComponent: ReactComponent): void {
        const block: AstNodeInterface = secondSon(secondSon(firstSon(firstSon(reactComponent[0]))));
        const reactComponents: ReactComponent[] = this.getReactComponents(block);
        console.log(chalk.greenBright('ARROWWWWS'), reactComponents);
        for (const reactCpt of reactComponents) {
            let blockChildIndex: number = block.children.findIndex(a => a === reactCpt[0]);
            fileAstNode.children.push(block.children[blockChildIndex]);
            block.children.splice(blockChildIndex, 1);
        }
        console.log(chalk.cyanBright('BLOCKKKKK'), block);
    }
}
