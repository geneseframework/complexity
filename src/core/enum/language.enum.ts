export enum Language {
    JAVA = 'java',
    PHP = 'php',
    TS = 'ts',
    TYPESCRIPT = 'typescript',
    JS = 'js',
    TSX = 'tsx',
    JSX = 'jsx'
}


export function isLanguage(extension: string): extension is Language {
    return Object.values(Language).includes(extension as Language);
}
