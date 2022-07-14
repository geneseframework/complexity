import * as fs from 'fs-extra';
import { AstFileGenerationJavaService } from './java/services/ast-file-generation-java.service';
import { getFileExtension, platformPath } from '../core/services/file.service';
import { Options } from '../core/models/options.model';
import { AstFolderInterface } from '../core/interfaces/ast/ast-folder.interface';
import { JsonAstInterface } from '../core/interfaces/ast/json-ast.interface';
import { DEV_MOCK, LIMIT_GENERATIONS } from './globals.const';
import { Language } from '../core/enum/language.enum';
import { AstFileGenerationService } from './ts/services/ast-file-generation.service';
import { hasCorrectExtension, isJsOrTsLanguage } from '../core/utils/languages.util';

/**
 * - AstFolders generation from Abstract Syntax Tree (AST) of its files (including files in subfolders)
 * - Conversion in JsonAst format
 */
export class InitGenerationService {

    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param  {string} path    // The path of the folder
     * @param  {Language} language
     * @returns JsonAstInterface
     */
    generateAll(path: string, language: Language): JsonAstInterface {
        if (!path) {
            console.log('ERROR: no path.');
            return undefined;
        }
        return {
            astFolder: this.generateAstFolder(path, language)
        };
    }


    /**
     * Generates the AstFolder for the given source code
     * @param sourceCode
     * @returns {{astFolder: {path: string, astFiles: AstFileInterface[]}}}
     */
    generateAstFolderFromString(sourceCode: string): JsonAstInterface {
        sourceCode = `${sourceCode}\n`
        const astFileGenerationService = new AstFileGenerationService();
        return {
            astFolder: {
                path: '',
                astFiles: [
                    astFileGenerationService.generateFromString(sourceCode)
                ]
            }
        }
    }


    /**
     * Generates the AstFolder corresponding to a given path and to its potential AstFolder parent
     * @param  {string} path              // The path of the AstFolder
     * @param  {Language} language
     * @returns AstFolderInterface
     */
    private generateAstFolder(path: string, language: Language): AstFolderInterface {
        let astFolder: AstFolderInterface = {
            path: platformPath(path),
            astFiles: []
        };
        let initService;
        if (isJsOrTsLanguage(language)) {
            initService = new AstFileGenerationService();
        } else if (language === Language.JAVA) {
            initService = new AstFileGenerationJavaService();
        } else {
            console.warn('No language found', language)
            initService = new AstFileGenerationService();
        }
        const filesOrDirs = fs.readdirSync(path);
        let currentFile = undefined;
        try {
            filesOrDirs.forEach((elementName: string) => {
                const pathElement = path + elementName;
                currentFile = pathElement;
                if (!Options.isIgnored(pathElement)) {
                    if (fs.statSync(pathElement).isDirectory() && !LIMIT_GENERATIONS) {
                        astFolder.children = astFolder.children ?? [];
                        astFolder.children.push(this.generateAstFolder(`${pathElement}/`, language));
                    } else if (this.isFileToGenerate(pathElement, language)) {
                        astFolder.astFiles.push(initService.generate(pathElement, astFolder));
                    }
                }
            });
        } catch (e) {
            const [err, lines] = e.message.split('!!!');
            if (lines) {
                console.log(`Error in file: ${currentFile}\nAt line ${lines}`);
            }
            const error = new Error(err);
            error.stack = e.stack;
            throw error;
        }
        return astFolder;
    }


    /**
     * Returns true if a path corresponds to a file to generate in JsonAst
     * @param  {string} path  // The path of the file
     * @param  {Language} language
     * @returns boolean
     */
    private isFileToGenerate(path: string, language: Language): boolean {
        return (hasCorrectExtension(getFileExtension(path), language) && !LIMIT_GENERATIONS) || path === DEV_MOCK;
    }
}
