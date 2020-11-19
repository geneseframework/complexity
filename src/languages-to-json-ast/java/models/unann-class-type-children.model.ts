import { Infos } from './infos.model';
import { TypeArguments } from './type-arguments.model';

export class UnannClassTypeChildren {
    Identifier?: Infos[] = [new Infos()];
    typeArguments?: TypeArguments[] = [new TypeArguments()];
}
