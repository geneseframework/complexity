"use strict";
exports.__esModule = true;
exports.randomString = exports.isLastIndex = exports.isLastKey = exports.addObjects = exports.percent = exports.incrementIdentifierDuration = exports.duration = exports.capitalize = void 0;
/**
 * Sets in capitals the first letter of a text
 * @param text
 */
function capitalize(text) {
    return "" + text.charAt(0).toUpperCase() + text.slice(1);
}
exports.capitalize = capitalize;
// TODO: Remove in release version
exports.duration = {};
function incrementIdentifierDuration(dt, v) {
    exports.duration[v] = exports.duration[v] ? exports.duration[v] + dt : dt;
}
exports.incrementIdentifierDuration = incrementIdentifierDuration;
/**
 * Returns the result of a fraction in percentage with 2 decimals
 * @param numerator         // The numerator of the fraction
 * @param denominator       // The denominator of the fraction
 */
function percent(numerator, denominator) {
    if (!denominator) {
        return 0;
    }
    return Math.round(numerator * 1000 / denominator) / 10;
}
exports.percent = percent;
/**
 * Adds two objects with properties which have numeric values
 * Returns the result of the addition with the same type (if given) of the two objects
 * @param first             // The first object
 * @param second            // The second object
 * @param tConstructor      // The class of the objects
 */
function addObjects(first, second, tConstructor) {
    if (!(typeof first === 'object') || !(typeof second === 'object')) {
        return first;
    }
    var t = tConstructor ? new tConstructor() : {};
    for (var _i = 0, _a = Object.keys(first); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!second[key]) {
            t[key] = first[key];
        }
        if (typeof first[key] === 'number') {
            t[key] = (typeof second[key] === 'number') ? first[key] + second[key] : first[key];
        }
        else if (typeof first[key] === 'object' && typeof second[key] === 'object') {
            t[key] = addObjects(first[key], second[key]);
        }
        else {
            t[key] = undefined;
        }
    }
    return t;
}
exports.addObjects = addObjects;
/**
 * Checks if a key is the last one of a given object
 * @param key       // The key of the object
 * @param obj       // The object
 */
function isLastKey(key, obj) {
    return (key === Object.keys(obj).slice(-1)[0]);
}
exports.isLastKey = isLastKey;
/**
 * Checks if a number is the last index of a given array
 * @param i         // The index
 * @param arr       // The array
 */
function isLastIndex(i, arr) {
    return (i === arr.length - 1);
}
exports.isLastIndex = isLastIndex;
function randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.randomString = randomString;
