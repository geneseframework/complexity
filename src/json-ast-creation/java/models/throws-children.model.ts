import { ExceptionTypeList } from './exception-type-list.model';
import { Infos } from './infos.model';

export class ThrowsChildren {
    Throws?: Infos[] = [new Infos()];
    exceptionTypeList?: ExceptionTypeList[] = [new ExceptionTypeList()];
}
