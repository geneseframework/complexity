#!/usr/bin/env node

import {Worker} from 'worker_threads';
import { Options } from '../core/models/options.model';
import { createOutDir, deleteFile } from '../core/services/file.service';
import { AstFolder } from '../html-generation/models/ast/ast-folder.model';
import { Language } from '../core/enum/language.enum';

const ora = require('ora');
const path = require('path');

const spinner = ora();

const ARGS: string[] = process.argv.slice(2);
const PATH_TO_ANALYSE = ARGS[0] ?? '.';
const LANGUAGE = ARGS[1] ?? 'ts';
const ENABLE_MARKDOWN_REPORT = ARGS[2] === 'true';
const ENABLE_CONSOLE_REPORT = ARGS[3] === 'true';
const ENABLE_REFACTORING = ARGS[4] === 'true';

let pathToAnalyse: string;
if (path.isAbsolute(PATH_TO_ANALYSE)) {
    pathToAnalyse = PATH_TO_ANALYSE;
} else {
    pathToAnalyse = `${process.cwd()}/${PATH_TO_ANALYSE}`.split('/').filter(e => e !== '.').join('/');
}


start()
    .then(exitCode => {
        process.exit(exitCode)
    })
    .catch(err => {
        spinner.fail();
        console.log(err);
    })

async function start(): Promise<number> {
    // Options.setOptions(process.cwd(), pathToAnalyse, __dirname);
    if (!ENABLE_CONSOLE_REPORT) {
        createOutDir();
    }

    spinner.start('AST generation');
    await useWorker(
        `${__dirname}/workers/ast-worker.js`,
        {
            pathCommand: process.cwd(),
            modifiedPath: pathToAnalyse,
            pathGeneseNodeJs: __dirname,
            language: LANGUAGE
        });
    spinner.succeed();

    spinner.start('Report generation');
    const reportResult: { message: any; astFolder: AstFolder } = await useWorker(
        `${__dirname}/workers/report-worker.js`,
        {
            pathCommand: process.cwd(),
            modifiedPath: pathToAnalyse,
            pathGeneseNodeJs: __dirname,
            markdown: ENABLE_MARKDOWN_REPORT,
            consoleMode: ENABLE_CONSOLE_REPORT,
        });
    spinner.succeed();

    if (LANGUAGE === Language.TS && !ENABLE_CONSOLE_REPORT && ENABLE_REFACTORING) {
        spinner.start('Refactoring generation');
        await useWorker(
            `${__dirname}/workers/refactoring-worker.js`,
            {
                pathCommand: Options.pathCommand,
                modifiedPath: pathToAnalyse,
                pathGeneseNodeJs: __dirname,
                astFolder: reportResult.astFolder
            });
        spinner.succeed();
    }

    deleteFile('./ast.json');

    if (reportResult.message && reportResult.message.length > 0) {
        console.log();
        if (typeof reportResult.message === 'object') {
            console.table(reportResult.message, ['filename', 'methodName', 'cpxIndex']);
        } else {
            console.log(reportResult.message);
        }
        if (ENABLE_CONSOLE_REPORT) {
            return 1;
        }
    }
    return 0;
}

function useWorker(filepath, data): any {
    return new Promise((resolve, reject) => {
        const worker = new Worker(filepath, {workerData: data});

        worker.on('message', message => {
            resolve(message);
        });

        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}
