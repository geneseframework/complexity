/**
 * List of options for complexities specific to some framework
 */
export type Framework = 'angular' | 'react';

/**
 * Checks if a string is the name of a Framework
 * @param name
 */
export function isFramework(name: string): name is Framework {
    return ['angular', 'react'].includes(name);
}
