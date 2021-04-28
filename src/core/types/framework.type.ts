export type Framework = 'angular' | 'react';

export function isFramework(name: string): name is Framework {
    return ['angular', 'react'].includes(name);
}
