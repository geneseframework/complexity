import { Transformer } from './transformer.model';

export class RefactorProposal {
    title?: string = '';
    oldCode?: string = '';
    newCode?: string = '';
    id: string = '';
    usedTransformer?: Transformer;
    oldComplexity: number = 0;
    newComplexity: number = 0;
}
