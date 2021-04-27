import { AstNodeInterface } from '../interfaces/ast/ast-node.interface';
import { SyntaxKind } from '../enum/syntax-kind.enum';
import { flat } from './arrays.util';
import * as chalk from 'chalk';


export function getFirstChild(astNodeInterface: AstNodeInterface): AstNodeInterface {
    return astNodeInterface?.children?.[0];
}


export function getFirstChildOfKind(astNodeInterface: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    return astNodeInterface?.children?.find(c => c.kind === kind);
}


export function getFirstDescendantOfKind(astNodeInterface: AstNodeInterface, kind: SyntaxKind): AstNodeInterface {
    if (!astNodeInterface?.children) {
        return undefined;
    }
    const child: AstNodeInterface = getFirstChildOfKind(astNodeInterface, kind);
    const zzz = child ?? getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNodeInterface.children, kind);
    console.log(chalk.greenBright('RETURN FIRS TDESCCCC'), zzz);
    return zzz;
}


function getFirstDescendantOfAstNodeInterfaceArrayOfKind(astNodeInterfaces: AstNodeInterface[], kind: SyntaxKind): AstNodeInterface {
    console.log(chalk.blueBright('GET ARRRR'), astNodeInterfaces, kind);
    if (!astNodeInterfaces || astNodeInterfaces.length === 0) {
        return undefined;
    }
    const definedAstNodeInterfaces: AstNodeInterface[] = astNodeInterfaces.filter(a => !!a);
    for (const astNode of definedAstNodeInterfaces) {
        if (astNode.kind === kind) {
            return astNode;
        }
    }
    console.log(chalk.redBright('NOT FOUNDDDD'));
    return getFirstDescendantOfAstNodeInterfaceArrayOfKind(flat(definedAstNodeInterfaces.map(a => a.children)), kind);
}


export function arrowFunctionBlock(arrowFunctionNodeInterface: AstNodeInterface): AstNodeInterface {
    return getFirstChildOfKind(arrowFunctionOfVarStatement(arrowFunctionNodeInterface), SyntaxKind.Block);
}


export function arrowFunctionOfVarStatement(varStatement: AstNodeInterface): AstNodeInterface {
    return getFirstChildOfKind(getFirstChild(getFirstChild(varStatement)), SyntaxKind.ArrowFunction);
}
