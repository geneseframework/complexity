export type Interval = [start: number, end: number];

export function isInInterval(value: number, interval: Interval): boolean {
    return value >= interval?.[0] && value <= interval?.[1];
}
