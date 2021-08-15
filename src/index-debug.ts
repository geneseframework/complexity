#!/usr/bin/env node

import { Options } from './core/models/options.model';
import { createOutDir } from './core/services/file.service';
import * as chalk from 'chalk';
import { Language } from './core/enum/language.enum';
import { StartJsonAstCreationService } from './json-ast-creation/start-json-ast-creation.service';
import { Framework } from './core/types/framework.type';
import { StartHtmlGenerationService } from './html-generation/start-html-generation.service';
import { StartJsonReportCreationService } from './json-report-creation/start-json-report-creation.service';

const ARGS: string[] = process.argv.slice(2);
const LANGUAGE = ARGS[1] ?? 'ts';
const ENABLE_MARKDOWN_REPORT = ARGS[2] === 'true';
const ENABLE_CONSOLE_REPORT = ARGS[3] === 'true';
let FRAMEWORK = ARGS[5] ?? undefined;

export async function startDebug(): Promise<number> {
    const pathToAnalyse = `${process.cwd()}/src/core/mocks`;
    FRAMEWORK = 'react';
    Options.setOptions(process.cwd(), pathToAnalyse, __dirname);
    if (!ENABLE_CONSOLE_REPORT) {
        createOutDir();
    }
    console.log(chalk.yellowBright('Json AST generation...'));
    Options.setOptions(process.cwd(), pathToAnalyse, __dirname, FRAMEWORK as Framework);
    StartJsonAstCreationService.start(Options.pathFolderToAnalyze, LANGUAGE as Language)
    console.log(chalk.yellowBright('Json Report generation...'));
    await StartJsonReportCreationService.start();
    console.log(chalk.yellowBright('HTML report generation...'));
    // const reportResult = StartHtmlGenerationService.start(Options.pathCommand, ENABLE_MARKDOWN_REPORT, ENABLE_CONSOLE_REPORT);
    // if (reportResult?.length > 0) {
    //     console.log();
    //     if (typeof reportResult === 'object') {
    //         console.table(reportResult, ['filename', 'methodName', 'cpxIndex']);
    //     } else {
    //         const stats: any = StartHtmlGenerationService.astFolder['_stats'];
    //         console.log(chalk.blueBright('Files : '), stats.numberOfFiles);
    //         console.log(chalk.blueBright('Methods : '), stats.numberOfMethods);
    //         console.log(chalk.blueBright('Comprehension Complexity : '), stats.totalCognitiveComplexity);
    //         console.log(chalk.blueBright('Cyclomatic Complexity : '), stats.totalCyclomaticComplexity);
    //         console.log(reportResult);
    //     }
    //     if (ENABLE_CONSOLE_REPORT) {
    //         return 1;
    //     }
    // }
    return 0;
}
