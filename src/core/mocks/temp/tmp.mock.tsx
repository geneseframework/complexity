function methodWithoutTyping(z = 3) {
    let a;
    let b: number;
    let c = 3;
    let d = new Zzz();
    let e = Zzz.fct();
    let f = {a: 1}
}

class Zzz {
    a: string;

    static fct(): string {
        return 'd'
    }
}
