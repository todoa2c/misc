// 5リットルと3リットルのバケツ1つずつを使って4リットルの水を測る方法
// 水は十分にある

function newop(ops, op) {
    var c = [];
    for (var i = 0; i < ops.length; i++) {
        c[i] = ops[i];
    }
    c.push(op);
    return c;
}

Array.prototype.last = function() {
    if (this.length === 0) {
        return "";
    }
    return this[this.length - 1];
};

// バケツの状態および操作履歴
// 順に、5リットルバケツの水の量、3リットルバケツの水の量、操作履歴
var initialBacket = [0, 0, []];

// 5リットルバケツを満タンにする
var fill5 = function(backet) {
    if (backet[0] === 5 || backet[2].last() === "dispose5") {
        throw "error";
    }
    return [5, backet[1], newop(backet[2], "fill5")];
};

// 3リットルバケツを満タンにする
var fill3 = function(backet) {
    if (backet[1] === 3 || backet[2].last() === "dispose3") {
        throw "error";
    }
    return [backet[0], 3, newop(backet[2], "fill3")];
};

// 5リットルバケツを空にする
var dispose5 = function(backet) {
    if (backet[0] === 0 || backet[2].last() === "fill5") {
        throw "error";
    }
    return [0, backet[1], newop(backet[2], "dispose5")];
};

// 3リットルバケツを空にする
var dispose3 = function(backet) {
    if (backet[1] === 0 || backet[2].last() === "fill3") {
        throw "error";
    }
    return [backet[0], 0, newop(backet[2], "dispose3")];
};


// 5リットルバケツの水を3リットルに移す
var move5to3 = function(backet) {
    if (backet[1] >= 3 || backet[0] === 0) {
        throw "error";
    }
    var capacity = 3 - backet[1];
    if (backet[0] < capacity) {
        return [0, backet[0] + backet[1], newop(backet[2], "move5to3")];
    } else {
        return [backet[0] - capacity, backet[1] + capacity, newop(backet[2], "move5to3")];
    }
};

// 3リットルバケツの水を5リットルに移す
var move3to5 = function(backet) {
    if (backet[0] >= 5 || backet[1] === 0) {
        throw "error";
    }

    var capacity = 5 - backet[0];
    if (backet[1] < capacity) {
        return [backet[0] + backet[1], 0, newop(backet[2], "move3to5")];
    } else {
        return [backet[0] + capacity, backet[1] - capacity, newop(backet[2], "move3to5")];
    }
};

// 操作リスト
var operations = [
    fill5, fill3, dispose5, dispose3, move5to3, move3to5
];

var main = function() {

    // 幅優先探索のためのキュー
    var queue = [];
    queue.push(initialBacket);
    
    var count = 0;
    while (queue.length > 0) {
        count += 1;
        var backet = queue.shift();
        for (var i = 0; i < operations.length; i++) {
            try {
                var result = operations[i](backet);
                if (result[0] === 4) {
                    console.log("success! count = " + count);
                    var operation = result[2];
                    for (var j = 0; j < operation.length; j++) {
                        console.log(operation[j]);
                    }
                    return result[2];
                } else {
                    queue.push(result);
                }
            } catch (e) {
                if (e !== "error") {
                    throw e;
                }
            }
        }
    }
    console.log("no answer found.");
};

