import { KindToNodeMappings, Node, Project, SourceFile, SyntaxKind } from 'ts-morph';
import { RefactorProposal } from '../models/refactor-proposal.model';

export class ProjectService {
    public project: Project;
    public refactorProposals: RefactorProposal[] = [];

    constructor(tsConfigFilePath: string) {
        this.project = new Project({ tsConfigFilePath });
    }


    /**
     * Add new refactor proposals to the list, and replace the existing ones
     * @param refactorProposals
     */
    addToRefactorProposals(refactorProposals: RefactorProposal[]): void {
        refactorProposals.forEach(proposal => {
            const index = this.refactorProposals.findIndex(r => r.id === proposal.id);
            if (index !== -1) {
                this.refactorProposals[index] = proposal;
            } else {
                this.refactorProposals.push(proposal);
            }
        })
    }

    /**
     * Get systems of a given Syntax Kind
     * @param kind the kind
     * @returns {Node[]}
     */
    getNodesOfKinds<T extends SyntaxKind>(kind: T): Node[] {
        const SYSTEMS: KindToNodeMappings[T][] = [];
        this.project.getSourceFiles().forEach((sf: SourceFile) => {
            const FILE_SYSTEMS = sf.getDescendantsOfKind(kind);
            SYSTEMS.push(...FILE_SYSTEMS);
        });
        return SYSTEMS;
    }
}
