import { Infos } from './infos.model';
import { UnannType } from './unann-type.model';

export class ResultChildren {
    Void?: Infos[] = [new Infos()];
    unannType?: UnannType[] = [new UnannType()];
}
