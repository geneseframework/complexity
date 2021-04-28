export class BinariesMock {

    binary(a, b) {
        if (a && b) {
            console.log('b');
        }
    }


    sameLogicDoor(a, b, c) {
        if (a && b && c) {
            console.log('b');
        }
    }


    differentLogicDoor(a, b, c) {
        if (a && b || c) {
            console.log('b');
        }
    }


    differentLogicDoorWithBrackets(a, b, c) {
        if ((a && b) || c) {
            console.log('b');
        }
    }


    orBetweenTwoBinaries(a, b, c, d) {
        if ((a && b) || (c && d)) {
            console.log('b');
        }
    }


    differentLogicDoorBetweenBinaries(a, b, c, d) {
        if ((a && b) || (c && d) && a) {
            console.log('b');
        }
    }


    forIfAndAndOrAndAndOrOr(a, b, c, d, e, f) {
        for (let i = 0; i < 10; i++) {
            if (b && c || d && f || a) {
                console.log(e);
            }
        }
    }


    forForIfAndAndOrAndAndOrOr(a, b, c, d, e, f) {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (b && c || d && f || a) {
                    console.log(e);
                }
            }
        }
        if (a > b) {
            console.log(b);
        }
    }

}
