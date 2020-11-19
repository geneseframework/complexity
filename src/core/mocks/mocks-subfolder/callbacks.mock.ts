// @ts-ignore
export class CallbacksMock<T> {


    constructor(object) {
        console.log(object);
    }

    recursion(a) {
        this.recursion(a);
    }


    methodWithCallback<T>(a: T, callback): T {
        return callback(a);
    }


    caller(a) {
        this.methodWithCallback(a, (b) => {
            if (a < 2) {
                console.log(b)
            }
        })
    }


    callerFunction(a) {
        this.methodWithCallback(a, function (b) {
            if (b < 6) {
                console.log('b', b)
            }
        })
    }

}
