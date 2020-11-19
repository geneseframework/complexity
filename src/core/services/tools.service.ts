import { TConstructor } from '../interfaces/t-constructor.interface';


/**
 * Sets in capitals the first letter of a text
 * @param text
 */
export function capitalize(text: string): string {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

// TODO: Remove in release version
export let duration = {};
export function incrementIdentifierDuration(dt: number, v: string) {
    duration[v] = duration[v] ? duration[v] + dt : dt;
}


/**
 * Returns the result of a fraction in percentage with 2 decimals
 * @param numerator         // The numerator of the fraction
 * @param denominator       // The denominator of the fraction
 */
export function percent(numerator: number, denominator: number): number {
    if (!denominator) {
        return 0;
    }
    return  Math.round(numerator * 1000 / denominator) / 10;
}


/**
 * Adds two objects with properties which have numeric values
 * Returns the result of the addition with the same type (if given) of the two objects
 * @param first             // The first object
 * @param second            // The second object
 * @param tConstructor      // The class of the objects
 */
export function addObjects<T>(first: T, second: T, tConstructor?: TConstructor<T>): T {
    if (!(typeof first === 'object') || !(typeof second === 'object')) {
        return first;
    }
    const t = tConstructor ? new tConstructor() : {};
    for (const key of Object.keys(first)) {
        if (!second[key]) {
            t[key] = first[key];
        }
        if (typeof first[key] === 'number') {
            t[key] = (typeof second[key] === 'number') ? first[key] + second[key] : first[key];
        } else if (typeof first[key] === 'object' && typeof second[key] === 'object') {
            t[key] = addObjects(first[key], second[key]);
        } else {
            t[key] = undefined;
        }
    }
    return t as T;
}


/**
 * Checks if a key is the last one of a given object
 * @param key       // The key of the object
 * @param obj       // The object
 */
export function isLastKey(key: string, obj: object): boolean {
    return (key === Object.keys(obj).slice(-1)[0]);
}


/**
 * Checks if a number is the last index of a given array
 * @param i         // The index
 * @param arr       // The array
 */
export function isLastIndex(i: number, arr: any[]): boolean {
    return (i === arr.length - 1);
}

export function randomString(length): string {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
