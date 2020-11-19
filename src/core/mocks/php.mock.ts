export class PhpMock {

    ifMethod(a: number) {
        if (a > 0) {
            return 'a';
        }

        return 'none';
    }


    recursion(a: number) {
        if (0 <= a) {
            return 0;
        }
        return this.recursion(a - 10);
    }


    methodWithCallback(a: string, callback) {
        return callback(a);
    }

}
