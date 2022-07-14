import { Language } from '../enum/language.enum';

export const JsOrTsExtensions: Language[] = [Language.JS, Language.JSX, Language.TS, Language.TSX];

export function isJsOrTsLanguage(language: Language): language is Language {
    return JsOrTsExtensions.includes(language);
}

export function hasCorrectExtension(extension: string, language: Language): extension is Language {
    // console.log('Object.values(Language)', Object.values(Language))
    const extensionLanguage: Language = extension as Language;
    return (isJsOrTsLanguage(extensionLanguage) && isJsOrTsLanguage(language))
        || (extensionLanguage=== Language.JAVA && language === Language.JAVA)
    // return Object.values(Language).includes(extension as Language);
}
