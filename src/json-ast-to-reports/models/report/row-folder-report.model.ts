import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';

/**
* Defines the model of a row in the arrays of folders reports
*/
export class RowFolderReport {

    complexitiesByStatus?: ComplexitiesByStatus;    // The complexities of the folder analysed in the row (spread by status)
    linkFilesOfSubfolder?: string                   // The link to the report with all files of each subfolder
    numberOfFiles ?= 0;                             // The number of files of the folder analysed in the row (and its subfolders)
    numberOfMethods ?= 0;                           // The number of methods of the folder analysed in the row (and its subfolders)
    path ?= '';                                     // The path  of the folder analysed in the row
    routeFromCurrentFolder ?= '';                   // The route between the current folder and the subfolder analysed in the row

}
