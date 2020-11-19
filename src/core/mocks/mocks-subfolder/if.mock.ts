export class IfMock {

    constructor() {
    }


    // @ts-ignore
    ifAlone(a) {
        if (a) {
            return 'b';
        }
    }


    ifElse(a) {
        if (a) {
            return 'b';
        } else {
            return 'c';
        }
    }


    // @ts-ignore
    ifIfNested(a, b) {
        if (a) {
            return 'b';
            if (b) {
                return 'c';
            }
        }
    }


    ifElseIfElse(a, b) {
        if (a) {
            return 'b';
        } else if (b) {
            return 'c';
        } else {
            return 'c';
        }
    }


    // @ts-ignore
    ifElseIfIfElse(a, b, c) {
        if (a) {
            return 1;
        } else if (b) {
            if (c) {
                return 0;
            }
        } else {
            return 2;
        }
    }


    // @ts-ignore
    ifElseIfInside(a, b) {
        if (a) {
            return 'b';
        } else {
            if (b) {
                return 'c';
            }
        }
    }


    // @ts-ignore
    ifNestedIf(a) {
        if (a) {
            return 'b';
            if (a === 'v') {
                return 'c';
            }
        }
    }



    // @ts-ignore
    ifIfElseInside(a) {
        if (a) {
            return 'b';
            if (a === 'v') {
                return 'c';
            } else {
                return 'f';
            }
        }
    }


    ifAnd(a, b) {
        if (a && b) {
            console.log(a);
        }
    }


    ifOr(a, b) {
        if (a || b) {
            console.log(a);
        }
    }


    ifAndAnd(a, b, c) {
        if (a && b && c) {
            console.log(a);
        }
    }


    ifAndOr(a, b, c) {
        if (a && b || c) {
            console.log(a);
        }
    }


    ifAndAndOrAnd(a, b, c, d, e, f) {
        if (a && b && c || d && e && f) {
            console.log(a);
        }
    }


    ifAndAndOrAndAndOrOr(a, b, c, d, e, f) {
        if (a && b && c || d && e && f || a || b) {
            console.log(a);
        }
    }


    ifIfIf(a: number) {
        if (a > 2) {
            if (a > 3) {
                if (a > 4) {
                    console.log('a > 4');
                }
            }
        }
    }


    ifIfIfElse(a: number) {
        if (a > 2) {
            if (a > 3) {
                if (a > 4) {
                    console.log('a > 4');
                } else {
                    console.log('a <= 4');
                }
            }
        }
    }

}
