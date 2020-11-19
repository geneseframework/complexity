export class ArraysMock {

    elementAccessExpression(a) {
        return a[0];
    }


    arrayLiteralExpression(b) {
        return [b];
    }


    aggregateElementAccess(a, b, c) {
        return c[a][b];
    }


    aggregateElementAccessX2(a, b, c, d) {
        return c[a][b][d];
    }


    aggregateArrayLiteral(a, b) {
        return [a][b];
    }


    nestingElementAccessElementAccess(a, b, c) {
        return a[b[c]];
    }


    nestingElementAccessElementAccessX2(a, b, c, d) {
        return a[b[c[d]]];
    }


    nestingTernaryElementAccess(a, b, c, d) {
        return a[b ? c : d];
    }

}
