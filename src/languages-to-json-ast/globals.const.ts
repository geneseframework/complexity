import { KindAlias } from './ts/models/kind-alias';
import { WeightsService } from './ts/libraries-weights/weights.service';
import { Project } from 'ts-morph';

/**
 * Merge different node's kind names in a more generic one. It simplifies the JsonAst format
 */
export const KindAliases: KindAlias[] = [
    {
        name: 'Keyword',
        aliases: ['AnyKeyword', 'CaseClause', 'DefaultClause', 'FalseKeyword', 'NewExpression', 'ReturnStatement', 'StringKeyword', 'TrueKeyword', 'VoidKeyword']
        // aliases: ['AnyKeyword', 'CaseClause', 'DefaultClause', 'FalseKeyword', 'NewExpression', 'ReturnStatement', 'StringKeyword', 'TrueKeyword', 'VariableStatement', 'VoidKeyword']
    },
    {
        name: 'Literal',
        aliases: ['FirstLiteralToken', 'NumericLiteral', 'StringLiteral']
    }
];

/**
 * For debug : limits the analyse to only one file
 */
export const LIMIT_GENERATIONS = false;

/**
 * For debug : the file to analyse when LIMIT_GENERATIONS is true
 */
export const DEV_MOCK = '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.ts';

/**
 * The custom weights included in the libraries-weights Json files
 */
export const WEIGHTS = WeightsService.merge();


/**
 * The names of the methods included in the libraries-weights Json files
 */
export const WEIGHTED_METHODS = WeightsService.weightedMethods();

/**
 * The project to analyse
 */
export let project  = new Project();
