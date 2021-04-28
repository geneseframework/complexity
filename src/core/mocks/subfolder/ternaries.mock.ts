export class TernariesMock {


    ternary(a) {
        return a ? 5 : 3;
    }


    nestedTernaries(a, b) {
        return a ? 1 : b ? 0 : 2;
    }


    ifWithTernary(a, b) {
        if (a) {
            return 1;
        } else {
            return b ? 0 : 2;
        }
    }


    NoTernary(a, b) {
        if (a) {
            return 1;
        } else if (b) {
            return 0;
        } else {
            return 2;
        }
    }


    ternaries(a) {
        return  a > 10 ? 5 : ((a <5) ? 3 : 2);
    }

}
