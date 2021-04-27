export class JsMock {

    jsMethod(a) {
        if (a > 0) {
            return 'a';
        }
        Array.prototype.slice.call(arguments)
    }

}

