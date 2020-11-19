
export class DebugMock  {

    method(a: string) {
        const b: number[] = [1, 2];
        const d = b.reduce(() => {
                    return;
                }, undefined)
        return a.slice(0);
    }

}
