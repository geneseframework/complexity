import { GeneseMapper } from 'genese-mapper';
import { CompilationUnit } from '../models/compilation-unit.model';

export class GeneseMapperService{
    
    /**
     * @param  {} node
     * @returns CompilationUnit
     */
    static getMappedCompilationUnit(node): CompilationUnit {

        const nodeGeneseMapper = new GeneseMapper(CompilationUnit);
        const mappedCompilationUnit: CompilationUnit = nodeGeneseMapper.map(node);

        return mappedCompilationUnit;
    }
}