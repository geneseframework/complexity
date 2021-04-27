import * as chalk from 'chalk';
import { AstNodeInterface } from '../../../../core/interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../../../../core/enum/syntax-kind.enum';
import { arrowFunctionBlock, firstChild } from '../../../../core/utils/ast.util';
import { ReactComponent } from './react-component.type';
import { GroupedExtracts } from './grouped-extracts.type';

export class ReactService {

    static extractHooksAndArrowFunctions(fileAstNode: AstNodeInterface): void {
        try {
            // console.log(chalk.magentaBright('EXTRRRRRRACT fileAstNode'), fileAstNode);
            const reactComponents: ReactComponent[] = this.getReactComponents(fileAstNode);
            const extractedArrowFunctions: ReactComponent[] = this.extractArrowFunctionsFromReactComponents(reactComponents);
            // console.log(chalk.magentaBright('EXTRRRRRRACTED'), extractedArrowFunctions);
            this.insertExtractsIntoFileAstNode(fileAstNode, extractedArrowFunctions);
        } catch (err) {
            console.log(chalk.redBright(`Error extracting arrow functions from react components from ${fileAstNode?.name}`));
        }
    }


    private static getReactComponents(astNodeInterface: AstNodeInterface): ReactComponent[] {
        try {
            const reactComponents: ReactComponent[] = [];
            let i = 0;
            for (const child of astNodeInterface.children) {
                if (child.kind === SyntaxKind.Keyword) {
                    const son: AstNodeInterface = firstChild(child);
                    const grandSon: AstNodeInterface = firstChild(son);
                    if (son.kind === 'VariableDeclarationList'
                        && grandSon.kind === 'VariableDeclaration'
                        && this.hasArrowFunctionChild(grandSon)
                    ) {
                        reactComponents.push(new ReactComponent(child, i));
                    }
                }
                i++;
            }
            return reactComponents;
        } catch (err) {
            console.log(chalk.redBright(`Error getting react components from ${astNodeInterface?.name}`));
        }
    }


    private static hasArrowFunctionChild(astNodeInterface: AstNodeInterface): boolean {
        return astNodeInterface.children.map(c => c.kind).includes(SyntaxKind.ArrowFunction);
    }


    private static extractArrowFunctionsFromReactComponents(reactComponents: ReactComponent[]): ReactComponent[] {
        const newFileAstNodeChildren: ReactComponent[] = [];
        for (const reactComponent of reactComponents) {
            // console.log(chalk.greenBright('CPTTTTTTTTTT'), reactComponent);
            newFileAstNodeChildren.push(...this.extractArrowFunctionsFromReactComponent(reactComponent));
        }
        return newFileAstNodeChildren;
    }


    private static extractArrowFunctionsFromReactComponent(reactComponent: ReactComponent): ReactComponent[] {
        const newFileAstNodeChildren: ReactComponent[] = [];
        // console.log(chalk.green('ARROW BLOCK CPTTTTTTTTTT'), arrowFunctionBlock(reactComponent.arrowFunction));
        const block: AstNodeInterface = arrowFunctionBlock(reactComponent.arrowFunction);
        const reactComponents: ReactComponent[] = this.getReactComponents(block);
        // console.log(chalk.greenBright('ARROWWWWS'), reactComponents);
        for (const reactCpt of reactComponents) {
            let blockChildIndex: number = block.children.findIndex(a => a === reactCpt.arrowFunction);
            const extract = new ReactComponent(block.children[blockChildIndex], reactComponent.index);
            newFileAstNodeChildren.push(extract);
            block.children.splice(blockChildIndex, 1);
        }
        return newFileAstNodeChildren;
    }


    private static insertExtractsIntoFileAstNode(fileAstNode: AstNodeInterface, extracts: ReactComponent[]): void {
        const extractsGroupedByReactComponent: GroupedExtracts[] = this.getExtractsGroupedByReactComponent(extracts);
        const groupsInReverseOrder: GroupedExtracts[] = [...extractsGroupedByReactComponent].reverse();
        for (const group of groupsInReverseOrder) {
            this.insertGroupedExtractsIntoFileAstNode(fileAstNode, group);
        }
    }


    private static getExtractsGroupedByReactComponent(extracts: ReactComponent[]): GroupedExtracts[] {
        const groups: GroupedExtracts[] = [];
        for (const extract of extracts) {
            const existingGroup: GroupedExtracts = groups.find(g => g.reactComponentIndex === extract.index);
            if (existingGroup) {
                existingGroup.extracts.push(extract);
            } else {
                groups.push({reactComponentIndex: extract.index, extracts: [extract]});
            }
        }
        return groups;
    }


    private static insertGroupedExtractsIntoFileAstNode(fileAstNode: AstNodeInterface, group: GroupedExtracts): void {
        fileAstNode.children.splice(group.reactComponentIndex + 1, 0, ...group.extracts.map(e => e.arrowFunction));
    }
}
