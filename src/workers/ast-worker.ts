import { LanguageToJsonAst } from '../languages-to-json-ast/language-to-json-ast';
import { Options } from '../core/models/options.model';
import * as chalk from 'chalk';

const { workerData, parentPort } = require('worker_threads')
// const { parentPort, workerData } = require('worker_threads')

// parentPort.postMessage({hello: workerData});
//
async function run() {
    Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs);
    // console.log(chalk.blueBright('WILL LAUNCH LANGUAGE TO AST ???'), workerData, Options);
    // console.log(chalk.blueBright('WILL LAUNCH LANGUAGE TO AST 2'));
    LanguageToJsonAst.start(Options.pathFolderToAnalyze, workerData.language)
    // console.log(chalk.greenBright('AFTER LAANGUAGE TO ASTTTTTT'));
    // workerData.postMessage('End of Worker data process')
    parentPort.postMessage('End of main process')
}

run()
