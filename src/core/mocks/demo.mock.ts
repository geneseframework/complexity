import { CallbacksMock } from './mocks-subfolder/callbacks.mock';

export class DebugMock {


    ifAlone(a) {
        if (a) {
            return 'b';
        }
    }


    twoIfs(a, b) {
        if (a) {
            return 'b';
        }
        if (b) {
            return 'c';
        }
    }


    ifNestedIf(a, b) {
        if (a) {
            if (b) {
                return 'c';
            }
            return 'b';
        }
    }


    ifIfIf(a, b, c) {
        if (a) {
            if (b) {
                if (c) {
                    return 'd';
                }
                return 'c';
            }
            return 'b';
        }
    }


    switchCase(a) {
        switch (a) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 3:
                return 'three';
            default:
                return 'other';
        }
    }

    methodWithoutTyping(z) {
        let a;
        let b: number;
        return b;
    }

    recursion(a) {
        this.recursion(a);
    }


    methodWithCallback(a, callback) {
        callback(a);
    }

    hyperComplex<T>(object: Object, path: string | string[] = '', value: any): CallbacksMock<T> {
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1).reduce((acc: Object, curr: any, index: number) => {
            const arg = Math.round(index) % 3;
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new CallbacksMock<T>(object);
    }


}
