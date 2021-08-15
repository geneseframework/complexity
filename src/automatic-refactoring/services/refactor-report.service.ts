import * as eol from 'eol';
import * as fs from 'fs-extra';
import * as Handlebars from 'handlebars';

import { Options } from '../../core/models/options.model';
import { constructLink, deleteLastSlash, getRouteToRoot } from '../../core/utils/file-system.util';
import { AstFolder } from '../../html-generation/models/ast/ast-folder.model';
import { RefactorProposal } from '../models/refactor-proposal.model';

/**
 * Service generating files reports
 */
export class RefactorReportService {
    private template: HandlebarsTemplateDelegate;

    constructor(public systems: RefactorProposal[], private astFolder: AstFolder) {}

    get refactorProposals(): RefactorProposal[] {
        return this.systems;
    }

    /**
     * Register partials and compile template
     * @returns {void}
     */
    generateRefactorReport(): void {
        this.registerPartial('refactorProposals', 'refactor-proposals');
        this.registerPartial('refactorComparaison', 'refactor-comparaison');
        this.registerPartial('methodCode', 'method-script');

        const TEMPLATE_PATH = `${Options.pathGeneseNodeJs}/automatic-refactoring/templates/handlebars/refactor-proposals.handlebars`;
        const REPORT_TEMPLATE = this.getFileFromPath(TEMPLATE_PATH);
        this.template = Handlebars.compile(REPORT_TEMPLATE);
        this.writeRefactorReport();
    }

    /**
     * Generate refactor report HTML
     * @returns {void}
     */
    private writeRefactorReport(): void {
        const RELATIVE_ROOT = getRouteToRoot(this.astFolder?.relativePath);
        const TEMPLATE = this.template({ proposals: this.refactorProposals, relativeRoot: RELATIVE_ROOT });
        const RELATIVE_PATH = constructLink(this.astFolder?.relativePath);
        const OUT_DIR = constructLink(Options.pathOutDir);
        const PATH_REPORT = `${deleteLastSlash(OUT_DIR)}/${deleteLastSlash(RELATIVE_PATH)}/refactor-report.html`;
        fs.outputFileSync(PATH_REPORT, TEMPLATE, { encoding: 'utf-8' });
    }

    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     * @returns {void}
     */
    private registerPartial(partialName: string, filename: string): void {
        const PARTIAL_PATH = `${Options.pathGeneseNodeJs}/automatic-refactoring/templates/handlebars/${filename}.handlebars`;
        const PARTIAL = this.getFileFromPath(PARTIAL_PATH);
        Handlebars.registerPartial(partialName, PARTIAL);
    }

    /**
     * read file, normalize content and return it
     * @param path the file path
     * @returns {string}
     */
    private getFileFromPath(path: string): string {
        const FILE_CONTENT = fs.readFileSync(path, 'utf-8');
        return eol.auto(FILE_CONTENT);
    }
}
