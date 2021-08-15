import { StartHtmlGenerationService } from '../html-generation/start-html-generation.service';
import { Options } from '../core/models/options.model';

const { parentPort, workerData } = require('worker_threads')


function run() {
    Options.setOptions(workerData.pathCommand, workerData.modifiedPath, workerData.pathGeneseNodeJs, workerData.framework);
    const result = StartHtmlGenerationService.start(Options.pathCommand, workerData.markdown, workerData.consoleMode)
    parentPort.postMessage({message: result, astFolder: StartHtmlGenerationService.astFolder})
}

run()
