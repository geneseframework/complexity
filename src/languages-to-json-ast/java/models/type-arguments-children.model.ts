import { Infos } from './infos.model';
import { TypeArgumentList } from './type-argument-list.model';

export class TypeArgumentsChildren {
    Less: Infos[] = [new Infos()];
    typeArgumentList?: TypeArgumentList[] = [new TypeArgumentList()];
    Greater?: Infos[] = [new Infos()];
}
