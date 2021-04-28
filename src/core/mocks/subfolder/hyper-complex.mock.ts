import { CallbacksMock } from './callbacks.mock';


export class HyperComplexMock {


    hyperComplex<T>(object: Object, path: string | string[] = '', value: any): CallbacksMock<T> {
        path = path.toString().match(/[^.[\]]+/g);
        path.slice(0, -1).reduce((acc: any, curr: any, index: number) => {
            const arg = Math.round(index) % 3;
            acc(0);
            return Object(acc[curr]) === acc[curr + arg][0];
        }, object)[path[path.length - 1]] = value;
        return new CallbacksMock<T>(object);
    }


    ifIf(data) {
        if (data === 'a') {
            data = 'b';
            if (data === 'v') {
                data = 'c';
            }
        }
    }


    reducer(acc: Object, curr: any, index: number, path: number) {
        return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    }
}
