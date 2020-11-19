"use strict";
exports.__esModule = true;
exports.project = exports.WEIGHTED_METHODS = exports.WEIGHTS = exports.DEV_MOCK = exports.LIMIT_GENERATIONS = exports.KindAliases = void 0;
var weights_service_1 = require("./ts/libraries-weights/weights.service");
var ts_morph_1 = require("ts-morph");
/**
 * Merge different node's kind names in a more generic one. It simplifies the JsonAst format
 */
exports.KindAliases = [
    {
        name: 'Keyword',
        aliases: ['AnyKeyword', 'CaseClause', 'DefaultClause', 'FalseKeyword', 'NewExpression', 'ReturnStatement', 'StringKeyword', 'TrueKeyword', 'VariableStatement', 'VoidKeyword']
    },
    {
        name: 'Literal',
        aliases: ['FirstLiteralToken', 'NumericLiteral', 'StringLiteral']
    }
];
/**
 * For debug : limits the analyse to only one file
 */
exports.LIMIT_GENERATIONS = false;
/**
 * For debug : the file to analyse when LIMIT_GENERATIONS is true
 */
exports.DEV_MOCK = '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks/debug.mock.ts';
/**
 * The custom weights included in the libraries-weights Json files
 */
exports.WEIGHTS = weights_service_1.WeightsService.merge();
/**
 * The names of the methods included in the libraries-weights Json files
 */
exports.WEIGHTED_METHODS = weights_service_1.WeightsService.weightedMethods();
/**
 * The project to analyse
 */
exports.project = new ts_morph_1.Project();
