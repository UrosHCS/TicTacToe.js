



// a is a 2d array 3x3

function indexOfZero (a, x) {
    var indexOfZeroInRcd = -3; // Broj -3 je prilicno proizvoljan broj...
    var rcdArr = getRCDArray(a, x);
    for (var i = 0; i < 3; i++) {
        if (rcdArr[i] === 0) {
            indexOfZeroInRcd = i;
            if (x >= 0 && x <= 2) return [x, indexOfZeroInRcd];
            if (x >= 3 && x <= 5) return [indexOfZeroInRcd, x - 3];
            if (x === 6) return [indexOfZeroInRcd, indexOfZeroInRcd];
            if (x === 7) return [2 - indexOfZeroInRcd, indexOfZeroInRcd];
            break;
        }
    }
    if (indexOfZeroInRcd === -3) return [-3, -3];

    return [42, 42];
}

function arraySum (a, x) {
    var arrForSum = getRCDArray(a, x);
    var sum = 0;
    for (var i = 0; i < 3; i++) {
        sum = sum + arrForSum[i];
    }
    return sum;

}

//this method explains the meaning of x
function getRCDArray(a, x) {
    if (x >= 0 && x <= 2) return rowArray(a, x);
    if (x >= 3 && x <= 5) return columnArray(a, x - 3);
    if (x >= 6 && x <= 7) return diagArray(a, x - 6);
    return [];
}

function rowArray(a, r) {
    return a[r];
}

function columnArray(a, c) {
    var column = [];
    for (var i = 0; i < a.length; i++) {
        column[i] = a[i][c];
    }
    return column;
}

//ako je bin = 0 uzmi diagonalu gorelevo-doledesno, a ako je bin = 1 uzmi diagonalu goredesno-dolelevo
function diagArray(a, bin) {
    var column = [];
    if (bin === 0) {
        for (var i = 0; i < a.length; i++) {
            column[i] = a[i][i];
        }

    }
    if (bin === 1) {
        for (var i = 0; i < a.length; i++) {
            column[i] = a[2 - i][i];
        }
    }
    return column;
}