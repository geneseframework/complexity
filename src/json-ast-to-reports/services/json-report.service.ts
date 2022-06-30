import { AstFolder } from '../models/ast/ast-folder.model';
import { constructLink, deleteLastSlash } from '../../core/services/file.service';
import { Options } from '../../core/models/options.model';
import * as fs from 'fs-extra';
import { AstFile } from '../models/ast/ast-file.model';
import { AstMethod } from '../models/ast/ast-method.model';
import { AstNode } from '../models/ast/ast-node.model';
import { clone } from '../../core/utils/arrays.util';
import { JsonService } from '../../languages-to-json-ast/json.service';


export class JsonReportService {

    static createJsonFileReport(astFolder: AstFolder): void {
        // console.log('REPORT START', astFolder)
        const pathOutDir = constructLink(Options.pathOutDir);
        const pathJsonFileReport = `${pathOutDir}/report.json`;
        const cleanedReport: object = this.cleanReport(astFolder);
        try {
            // console.log('METODSSSS', astFolder.astFiles[0].astMethods[0])
            // console.log('METODSSSS', astFolder.astFiles[0].astMethods[0].astNode)
            // console.log('REPORT END', astFolder)
            console.log('REPORT END cleanedReport', cleanedReport)
            console.log('path', pathJsonFileReport)
            const content: string = JsonService.prettifyJson(cleanedReport);
            fs.writeFileSync(pathJsonFileReport, content, { encoding: "utf-8" });
        } catch (err) {
            console.log(err);
        }
    }

    private static cleanReport(astFolder: AstFolder): object {
        const cleanedReport = this.cloneWithExclusions(astFolder, ['_astFiles', '_children', '_astFolderService', '_parent']);
        // cleanedReport['_astFiles'] = this.cleanAstFiles(astFolder.astFiles);
        // delete astFolder['_astFolderService'];
        // delete astFolder['_parent'];
        return cleanedReport;
    }

    private static cleanAstFiles(astFiles: AstFile[]): object[] {
        const cleanedAstFiles: object[] = [];
        for (const astFile of astFiles) {
            cleanedAstFiles.push(this.cleanAstFile(astFile));
        }
        return cleanedAstFiles;
    }

    private static cleanAstFile(astFile: AstFile): object {
        const cleanedReport = this.cloneWithExclusions(astFile, ['_astFolder', '_astNode', '_astMethods']);
        // delete astFile['_astFolder'];
        cleanedReport['_astNode'] = this.cleanAstNode(astFile['_astNode']);
        // cleanedReport['_astMethods'] = this.cleanAstMethods(astFile['_astMethods']);
        return cleanedReport;
    }

    private static cleanAstMethods(astMethods: AstMethod[]): object {
        const cleanedAstMethods: object[] = [];
        for (const astMethod of astMethods) {
            cleanedAstMethods.push(this.cleanAstMethod(astMethod));
        }
        return cleanedAstMethods;
    }

    private static cleanAstMethod(astMethod: AstMethod): object {
        this.cleanAstNode(astMethod['_astNode']);
        return {}
    }

    private static cleanAstNode(astNode: AstNode): object {
        const cleanedAstNode = this.cloneWithExclusions(astNode, ['_parent', '_astNodeService', '_astFile', '_astMethod']);
        // delete astNode['_parent'];
        // delete astNode['_astNodeService'];
        // delete astNode['_astFile'];
        // delete astNode['_astMethod'];
        cleanedAstNode['_children'] = [];
        for (const child of astNode.children) {
            cleanedAstNode['_children'].push(this.cleanAstNode(child));
        }
        return cleanedAstNode;
    }

    private static cloneWithExclusions(obj: object, propertiesToExclude: string[]): object {
        const clonedObject: object = {};
        for (const key of Object.keys(obj)) {
            console.log('KEY', key)
            if (!propertiesToExclude.includes(key)) {
                clonedObject[key] = obj[key];
                console.log('Not excluded')
            }
        }
        return clonedObject;
    }
}
