#!/usr/bin/env node

import { Options } from './core/models/options.model';
import { createOutDir, requireJson } from './core/utils/file-system.util';
import * as chalk from 'chalk';
import { Language } from './core/enum/language.enum';
import { JsonAstCreationService } from './json-ast-creation/json-ast-creation.service';
import { Framework } from './core/types/framework.type';
import { HtmlGenerationService } from './html-generation/html-generation.service';
import { JsonReportCreationService } from './json-report-creation/json-report-creation.service';
import { JsonAstInterface } from './core/interfaces/ast/json-ast.interface';
import { JsonReportInterface } from './json-report-creation/interfaces/json-report.interface';

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
    const jsonAst: JsonAstInterface = Options.generateJsonAst ? JsonAstCreationService.start(Options.pathFolderToAnalyze, LANGUAGE as Language) : require(Options.jsonAstPath);
    console.log(chalk.magentaBright('JSON ASTTTT'), jsonAst);
    console.log(chalk.yellowBright('Json Report generation...'), Options.generateJsonReport);
    const jsonReport: JsonReportInterface = Options.generateJsonReport ? await JsonReportCreationService.start(jsonAst) : require(Options.jsonReportPath);
    console.log(chalk.yellowBright('HTML report generation...'));
    const reportResult = HtmlGenerationService.start(Options.pathCommand, ENABLE_MARKDOWN_REPORT, ENABLE_CONSOLE_REPORT);
    return logResults(reportResult);
}

function logResults(reportResult: any[]): number {
    if (reportResult?.length > 0) {
        console.log();
        if (typeof reportResult === 'object') {
            console.table(reportResult, ['filename', 'methodName', 'cpxIndex']);
        } else {
            const stats: any = HtmlGenerationService.astFolder['_stats'];
            console.log(chalk.blueBright('Files : '), stats.numberOfFiles);
            console.log(chalk.blueBright('Methods : '), stats.numberOfMethods);
            console.log(chalk.blueBright('Comprehension Complexity : '), stats.totalCognitiveComplexity);
            console.log(chalk.blueBright('Cyclomatic Complexity : '), stats.totalCyclomaticComplexity);
            console.log(reportResult);
        }
        if (ENABLE_CONSOLE_REPORT) {
            return 1;
        }
    }
    return 0;
}
