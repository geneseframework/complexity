"use strict";
exports.__esModule = true;
exports.deleteLastSlash = exports.constructLink = exports.antislash = exports.getOS = exports.createFile = exports.windowsPath = exports.platformPath = exports.copyFile = exports.createOutDir = exports.createRelativeDir = exports.getLanguageExtensions = exports.getFilenameWithoutExtension = exports.getFileExtension = exports.getRouteToRoot = exports.getPathWithSlash = exports.getPathWithDotSlash = exports.getArrayOfPathsWithDotSlash = exports.getAllFiles = exports.getFilename = void 0;
var fs = require("fs-extra");
var os_enum_1 = require("../../json-ast-to-reports/enums/os.enum");
var options_model_1 = require("../models/options.model");
/**
 * Tools about files or folders
 */
/**
 * Returns the name of the file at a given path
 * @param pathFile      // The path of the file
 */
function getFilename(pathFile) {
    if (pathFile === void 0) { pathFile = ''; }
    var splittedPath = pathFile.split('/');
    return splittedPath[splittedPath.length - 1];
}
exports.getFilename = getFilename;
/**
 * Returns the array of files included in a given folder and its subfolders
 * The files are returned as strings
 * @param dirPath           // The path of the folder
 * @param arrayOfFiles      // Recursion parameter
 */
function getAllFiles(dirPath, arrayOfFiles) {
    var files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        }
        else {
            arrayOfFiles.push(dirPath + "/" + file);
        }
    });
    return arrayOfFiles;
}
exports.getAllFiles = getAllFiles;
/**
 * Returns an array of paths with a ./ at the beginning
 * @param paths         // The array of paths
 */
function getArrayOfPathsWithDotSlash(paths) {
    if (!Array.isArray(paths)) {
        return undefined;
    }
    var pathsWithDotSlash = [];
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var path = paths_1[_i];
        pathsWithDotSlash.push(getPathWithDotSlash(path));
    }
    return pathsWithDotSlash;
}
exports.getArrayOfPathsWithDotSlash = getArrayOfPathsWithDotSlash;
/**
 * Returns a path with a ./ at the beginning
 * @param path      // The path to analyse
 */
function getPathWithDotSlash(path) {
    var pathWithDotSlash = path;
    if ((path === null || path === void 0 ? void 0 : path.slice(0, 1)) === '/') {
        pathWithDotSlash = "." + pathWithDotSlash;
    }
    else if ((path === null || path === void 0 ? void 0 : path.slice(0, 2)) !== './') {
        pathWithDotSlash = "./" + path;
    }
    return pathWithDotSlash;
}
exports.getPathWithDotSlash = getPathWithDotSlash;
/**
 * Returns a path with a ./ at the beginning
 * @param path      // The path to analyse
 */
function getPathWithSlash(path) {
    return (path === null || path === void 0 ? void 0 : path.slice(-1)) !== '/' ? path + "/" : path;
}
exports.getPathWithSlash = getPathWithSlash;
/**
 * Returns the path between a subfolder and its root
 * For example, if relativePath = 'my/relative/path', it will return '../../..
 * @param relativePath      // The path to analyse
 */
function getRouteToRoot(relativePath) {
    if (!relativePath) {
        return '';
    }
    var relativeRoot = '/..';
    for (var i = 0; i < relativePath.length; i++) {
        relativeRoot =
            relativePath.charAt(i) === constructLink("/") &&
                i !== relativePath.length - 1
                ? constructLink("/") + (".." + relativeRoot)
                : relativeRoot;
    }
    return relativeRoot.slice(1);
}
exports.getRouteToRoot = getRouteToRoot;
/**
 * Returns the extension of a file
 * @param filename      // The name of the file
 */
function getFileExtension(filename) {
    return filename ? filename.split('.').pop() : '';
}
exports.getFileExtension = getFileExtension;
/**
 * Returns the filename without its extension
 * @param filename      // The name of the file
 */
function getFilenameWithoutExtension(path) {
    if (!path) {
        return '';
    }
    var filename = path.substring(path.lastIndexOf('/') + 1);
    var extensionLength = getFileExtension(filename).length;
    return filename.slice(0, -(extensionLength + 1));
}
exports.getFilenameWithoutExtension = getFilenameWithoutExtension;
function getLanguageExtensions(language) {
    switch (language) {
        case 'java':
            return ['java'];
        case 'json':
            return ['json'];
        case 'php':
            return ['php'];
        case 'typescript':
        case 'ts':
            return ['ts'];
        default:
            return ['json'];
    }
}
exports.getLanguageExtensions = getLanguageExtensions;
/**
 * Creates a subFolder of the outDir folder
 * @param relativePath      // The relative path of the subfolder compared to the outDir path
 */
function createRelativeDir(relativePath) {
    var path = options_model_1.Options.pathOutDir + "/" + relativePath;
    if (fs.existsSync(path)) {
        fs.emptyDirSync(path);
    }
    else {
        fs.mkdirsSync(path);
    }
}
exports.createRelativeDir = createRelativeDir;
/**
 * Creates the outDir folder
 */
function createOutDir() {
    if (fs.existsSync(options_model_1.Options.pathOutDir)) {
        fs.emptyDirSync(options_model_1.Options.pathOutDir);
    }
    else {
        fs.mkdirsSync(options_model_1.Options.pathOutDir);
    }
}
exports.createOutDir = createOutDir;
/**
 * Copy a file from a path to another one
 * @param originPath        // The origin's path
 * @param targetPath        // The target's path
 */
function copyFile(originPath, targetPath) {
    fs.copyFileSync(constructLink(originPath), constructLink(targetPath));
}
exports.copyFile = copyFile;
function platformPath(path) {
    return options_model_1.WINDOWS ? windowsPath(path) : path;
}
exports.platformPath = platformPath;
function windowsPath(path) {
    return path.replace(/\//g, '\\').replace(/\\/g, '\\\\');
}
exports.windowsPath = windowsPath;
/**
 * Copy a file from a path to another one
 * @param path
 * @param content
 */
function createFile(path, content) {
    fs.writeFileSync(path, content, { encoding: "utf-8" });
}
exports.createFile = createFile;
/**
 * Get the current OS
 * @returns {OS}
 */
function getOS() {
    var platform = process.platform;
    var macosPlatforms = ["MACINTOSH", "MACINTEL", "MACPPC", "MAC68K"];
    var windowsPlatforms = ["WIN32", "WIN64", "WINDOWS", "WINCE"];
    var os = null;
    if (macosPlatforms.indexOf(platform.toUpperCase()) !== -1) {
        os = os_enum_1.OS.MACOS;
    }
    else if (windowsPlatforms.indexOf(platform.toUpperCase()) !== -1) {
        os = os_enum_1.OS.WINDOWS;
    }
    else if (!os && /Linux/.test(platform)) {
        os = os_enum_1.OS.LINUX;
    }
    return os;
}
exports.getOS = getOS;
/**
 * Replace a slash by an antislash
 * @param text
 * @returns {string}
 */
function antislash(text) {
    return text.split("/").join("\\");
}
exports.antislash = antislash;
/**
 * Check if the OS is windows transform the link with antislash
 * Else, returns the normal link
 * @param link
 * @returns {string}
 */
function constructLink(link) {
    return getOS() === os_enum_1.OS.WINDOWS ? antislash(link) : link;
}
exports.constructLink = constructLink;
/**
 * Delete the last slash in a string
 * @param text
 * @returns {string}
 */
function deleteLastSlash(text) {
    var TEXT_REWORK = (text && constructLink(text)) || "";
    return TEXT_REWORK &&
        TEXT_REWORK[TEXT_REWORK.length - 1] === constructLink("/")
        ? TEXT_REWORK.slice(0, TEXT_REWORK.length - 1)
        : TEXT_REWORK;
}
exports.deleteLastSlash = deleteLastSlash;
