import * as chalk from 'chalk';
import { AstNodeInterface } from '../../../../core/interfaces/json-ast/ast-node.interface';
import { SyntaxKind } from '../../../../core/enum/syntax-kind.enum';
import {
    arrowFunctionBlock,
    getFirstChild,
    getFirstChildByKind,
    getFirstDescendantByKind
} from '../../../../core/utils/ast.util';
import { ArrowFunctionWithIndex } from './react-component.type';
import { GroupedExtracts } from './grouped-extracts.type';
import { isReactHook } from './hooks.enum';

export class ReactService {

    static extractHooksAndArrowFunctions(fileAstNode: AstNodeInterface): void {
        try {
            const reactComponents: ArrowFunctionWithIndex[] = this.getArrowFunctionsWithIndexes(fileAstNode);
            const extractedArrowFunctions: ArrowFunctionWithIndex[] = this.extractHooksAndArrowFunctionsFromReactComponents(reactComponents);
            this.insertExtractsIntoFileAstNode(fileAstNode, extractedArrowFunctions);
        } catch (err) {
            console.log(chalk.redBright(`Error extracting arrow functions from react components from ${fileAstNode?.name}`));
        }
    }


    private static extractHooksAndArrowFunctionsFromReactComponents(reactComponents: ArrowFunctionWithIndex[]): ArrowFunctionWithIndex[] {
        const extractedArrowFunctions: ArrowFunctionWithIndex[] = [];
        for (const reactComponent of reactComponents) {
            extractedArrowFunctions.push(...this.extractArrowFunctionsFromReactComponent(reactComponent));
            extractedArrowFunctions.push(...this.extractHooksFromReactComponent(reactComponent));
        }
        return extractedArrowFunctions;
    }


    private static getArrowFunctionsWithIndexes(astNodeInterface: AstNodeInterface): ArrowFunctionWithIndex[] {
        try {
            const arrowFunctionWithIndexes: ArrowFunctionWithIndex[] = [];
            let i = 0;
            const children: AstNodeInterface[] = astNodeInterface.children ?? [];
            for (const child of children) {
                if (child.kind === SyntaxKind.VariableStatement) {
                    const son: AstNodeInterface = getFirstChild(child);
                    const grandSon: AstNodeInterface = getFirstChild(son);
                    if (son.kind === 'VariableDeclarationList'
                        && grandSon.kind === 'VariableDeclaration'
                        && this.hasArrowFunctionChild(grandSon)
                    ) {
                        arrowFunctionWithIndexes.push(new ArrowFunctionWithIndex(child, i));
                    }
                }
                i++;
            }
            return arrowFunctionWithIndexes;
        } catch (err) {
            console.log(chalk.redBright(`Error getting react components from ${astNodeInterface?.name}`));
        }
    }


    private static hasArrowFunctionChild(astNodeInterface: AstNodeInterface): boolean {
        return !!getFirstChildByKind(astNodeInterface, SyntaxKind.ArrowFunction);
    }


    private static extractArrowFunctionsFromReactComponent(reactComponent: ArrowFunctionWithIndex): ArrowFunctionWithIndex[] {
        const newFileAstNodeChildren: ArrowFunctionWithIndex[] = [];
        const block: AstNodeInterface = arrowFunctionBlock(reactComponent.arrowFunction);
        if (!block) {
            return [];
        }
        const arrowFunctionsWithIndexes: ArrowFunctionWithIndex[] = this.getArrowFunctionsWithIndexes(block);
        for (const arrowFunctionsWithIndex of arrowFunctionsWithIndexes) {
            let blockChildIndex: number = block.children.findIndex(a => a === arrowFunctionsWithIndex.arrowFunction);
            const extract = new ArrowFunctionWithIndex(block.children[blockChildIndex], reactComponent.index);
            newFileAstNodeChildren.push(extract);
            block.children.splice(blockChildIndex, 1);
        }
        return newFileAstNodeChildren;
    }


    private static insertExtractsIntoFileAstNode(fileAstNode: AstNodeInterface, extracts: ArrowFunctionWithIndex[]): void {
        const extractsGroupedByReactComponent: GroupedExtracts[] = this.getExtractsGroupedByReactComponent(extracts);
        const groupsInReverseOrder: GroupedExtracts[] = [...extractsGroupedByReactComponent].reverse();
        for (const group of groupsInReverseOrder) {
            this.insertGroupedExtractsIntoFileAstNode(fileAstNode, group);
        }
    }


    private static getExtractsGroupedByReactComponent(extracts: ArrowFunctionWithIndex[]): GroupedExtracts[] {
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


    private static extractHooksFromReactComponent(reactComponent: ArrowFunctionWithIndex): ArrowFunctionWithIndex[] {
        const newFileAstNodeChildren: ArrowFunctionWithIndex[] = [];
        const block: AstNodeInterface = arrowFunctionBlock(reactComponent.arrowFunction);
        const hooksWithCallbacks: AstNodeInterface[] = this.getHooksWithCallbacks(block);
        for (const hookWithCallback of hooksWithCallbacks) {
            let blockChildIndex: number = block.children.findIndex(a => a === hookWithCallback);
            const extract = new ArrowFunctionWithIndex(block.children[blockChildIndex], reactComponent.index);
            newFileAstNodeChildren.push(extract);
            block.children.splice(blockChildIndex, 1);
        }
        return newFileAstNodeChildren;
    }


    private static getHooksWithCallbacks(block: AstNodeInterface): AstNodeInterface[] {
        const hooksWithCallBacks: AstNodeInterface[] = [];
        const statements: AstNodeInterface[] = block?.children?.filter(c => c.kind.includes('Statement') || c.kind === SyntaxKind.Keyword) ?? [];
        for (const statement of statements) {
            const callExpression: AstNodeInterface = getFirstDescendantByKind(statement, SyntaxKind.CallExpression);
            const identifier: AstNodeInterface = getFirstChildByKind(callExpression, SyntaxKind.Identifier);
            if (identifier?.type === 'function' && isReactHook(identifier?.name)) {
                hooksWithCallBacks.push(statement);
            }
        }
        return hooksWithCallBacks;
    }
}
