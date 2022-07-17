#!/usr/bin/env node

import { Options } from './core/models/options.model';
import { createOutDir } from './core/services/file.service';
import * as chalk from 'chalk';
import { JsonAstToReports } from './json-ast-to-reports/json-ast-to-reports';
import { Language } from './core/enum/language.enum';
import { LanguageToJsonAst } from './languages-to-json-ast/language-to-json-ast';
import { Framework } from './core/types/framework.type';

const ARGS: string[] = process.argv.slice(2);
const LANGUAGE = ARGS[1] ?? 'ts';
const ENABLE_MARKDOWN_REPORT = ARGS[2] === 'true';
const ENABLE_CONSOLE_REPORT = ARGS[3] === 'true';
let FRAMEWORK = ARGS[5] ?? undefined;

export async function startDebug(): Promise<number> {
    const pathToAnalyse = `${process.cwd()}/src/core/mocks`;
    // FRAMEWORK = 'react';
    Options.setOptions(process.cwd(), pathToAnalyse, __dirname);
    if (!ENABLE_CONSOLE_REPORT) {
        createOutDir();
    }
    console.log(chalk.yellowBright('AST generation...'));
    Options.setOptions(process.cwd(), pathToAnalyse, __dirname, FRAMEWORK as Framework);
    LanguageToJsonAst.start(Options.pathFolderToAnalyze, LANGUAGE as Language)
    console.log(chalk.yellowBright('Report generation...'));
    const reportResult = JsonAstToReports.start(Options.pathCommand, ENABLE_MARKDOWN_REPORT, ENABLE_CONSOLE_REPORT, undefined);
    // await ExportService.exportReport();
    if (reportResult?.length > 0) {
        console.log();
        if (typeof reportResult === 'object') {
            console.table(reportResult, ['filename', 'methodName', 'cpxIndex']);
        } else {
            const stats: any = JsonAstToReports.astFolder['_stats'];
            console.log(chalk.blueBright('Files : '), stats.numberOfFiles);
            console.log(chalk.blueBright('Methods : '), stats.numberOfMethods);
            console.log(chalk.blueBright('Cognitive Complexity : '), stats.totalCognitiveComplexity);
            console.log(chalk.blueBright('Cyclomatic Complexity : '), stats.totalCyclomaticComplexity);
            console.log(reportResult);
        }
        if (ENABLE_CONSOLE_REPORT) {
            return 1;
        }
    }
    return 0;
}
