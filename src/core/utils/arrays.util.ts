/**
 * Returns a flatten array from a given array
 * @param array     // The array to flat
 */
export function flat(array) {
    if (!array || array.length === 0) {
        return [];
    }
    else if (Array.isArray(array[0])) {
        return flat(array[0]).concat(flat(array.slice(1)));
    }
    else {
        return [array[0]].concat(flat(array.slice(1)));
    }
}
