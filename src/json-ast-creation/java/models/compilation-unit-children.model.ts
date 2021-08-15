import { Infos } from './infos.model';
import { OrdinaryCompilationUnit } from './ordinary-compilation-unit.model';

export class CompilationUnitChildren {
    ordinaryCompilationUnit?: OrdinaryCompilationUnit[] = [new OrdinaryCompilationUnit()];
    eof?: Infos[] = [new Infos()];
}
