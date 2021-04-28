
function functionWithoutTyping(z) {
    let a;
    let b: number;
    let c = 3;
    let d = 'a';
    let e = false;
    let f = new ClassWithUntypedMethods();
    let g = {a: 1};
    let h = ClassWithUntypedMethods.getValue();
}

// TODO: detect classes with untyped properties
class ClassWithUntypedProperties {

    a;
    b: number;
    c = 3;
    d = 'a';
    e = false;
    f = new ClassWithUntypedMethods();

}


class ClassWithUntypedMethods {

    methodWithoutTyping(z) {
        let a;
        let b: number;
    }


    static getValue(): string {
        return 'v';
    }

}
