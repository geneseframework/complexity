import { Node } from 'ts-morph';


export function isJsx(node: Node): boolean {
    return node?.getKindName()?.slice(0, 3) === 'Jsx';
}
