import * as chalk from 'chalk';
import { AstNodeInterface } from '../../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../../../../core/enum/syntax-kind.enum';
import { firstSon, firstSonOfKind, secondSon } from '../../../../core/utils/ast.util';
import { ReactComponent } from './react-component.type';

export class ReactService {

    static extractHooksAndArrowFunctions(fileAstNode: AstNodeInterface): void {
        try {
            // console.log(chalk.magentaBright('FILE AST NODEEEEEE'), fileAstNode);
            const reactComponents: ReactComponent[] = this.getReactComponents(fileAstNode);
            // console.log(chalk.magentaBright('GET ARRR FN'), reactComponents);
            const extractedArrowFunctions: ReactComponent[] = this.extractArrowFunctionsFromReactComponents(reactComponents);
            this.insertExtractsIntoFileAstNode(fileAstNode, extractedArrowFunctions);
        } catch (err) {
            console.log(chalk.redBright(`Error extracting arrow functions from react components from ${fileAstNode?.name}`));
            // console.log(chalk.redBright('Error extracting arrow functions from react components'), err);
        }
    }


    private static getReactComponents(astNodeInterface: AstNodeInterface): ReactComponent[] {
        try {
            const reactComponents: ReactComponent[] = [];
            const keyWords: AstNodeInterface[] = astNodeInterface.children.filter(c => c.kind === 'Keyword');
            for (let i = 0; i < keyWords.length; i++) {
                const son: AstNodeInterface = firstSon(keyWords[i]);
                const grandSon: AstNodeInterface = firstSon(son);
                if (son.kind === 'VariableDeclarationList'
                    && grandSon.kind === 'VariableDeclaration'
                    && this.hasArrowFunctionChild(grandSon)
                ) {
                    reactComponents.push([keyWords[i], i]);
                }
            }
            return reactComponents;
        } catch (err) {
            console.log(chalk.redBright(`Error getting react components from ${astNodeInterface?.name}`));
            // console.log(chalk.redBright('Error getting react components'), err);
        }
    }


    private static hasArrowFunctionChild(astNodeInterface: AstNodeInterface): boolean {
        return astNodeInterface.children.map(c => c.kind).includes(SyntaxKind.ArrowFunction);
    }


    private static extractArrowFunctionsFromReactComponents(reactComponents: ReactComponent[]): ReactComponent[] {
        const newFileAstNodeChildren: ReactComponent[] = [];
        for (const reactComponent of reactComponents) {
            newFileAstNodeChildren.push(...this.extractArrowFunctionsFromReactComponent(reactComponent));
        }
        return newFileAstNodeChildren;
    }


    private static extractArrowFunctionsFromReactComponent(reactComponent: ReactComponent): ReactComponent[] {
        const newFileAstNodeChildren: ReactComponent[] = [];
        console.log(chalk.greenBright('CPTTTTTTTTTT'), firstSonOfKind(secondSon(firstSon(firstSon(reactComponent[0]))), SyntaxKind.Block));
        const block: AstNodeInterface = firstSonOfKind(secondSon(firstSon(firstSon(reactComponent[0]))), SyntaxKind.Block);
        const reactComponents: ReactComponent[] = this.getReactComponents(block);
        console.log(chalk.greenBright('ARROWWWWS'), reactComponents);
        for (const reactCpt of reactComponents) {
            let blockChildIndex: number = block.children.findIndex(a => a === reactCpt[0]);
            newFileAstNodeChildren.push([block.children[blockChildIndex], reactComponent[1]]);
            block.children.splice(blockChildIndex, 1);
        }
        console.log(chalk.cyanBright('BLOCKKKKK'), block);
        return newFileAstNodeChildren;
    }


    private static insertExtractsIntoFileAstNode(fileAstNode: AstNodeInterface, extracts: ReactComponent[]): void {
        const extractsInReverseOrder: ReactComponent[] = extracts.slice().reverse();
        for (const extract of extractsInReverseOrder) {
            fileAstNode.children.splice(extract[1], 0, extract[0]);
        }
    }
}
