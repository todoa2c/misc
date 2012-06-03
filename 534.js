function newop(ops, op) {
    var c = [];
    for (var i = 0; i < ops.length; i++) {
        c[i] = ops[i];
    }
    c.push(op);
    return c;
}

var initialBacket = [0, 0, []];

var fill5 = function(backet) {
    return [5, backet[1], newop(backet[2], "fill5")];
};

var fill3 = function(backet) {
    return [backet[0], 3, newop(backet[2], "fill3")];
};

var dispose5 = function(backet) {
    return [0, backet[1], newop(backet[2], "dispose5")];
};

var dispose3 = function(backet) {
    return [backet[0], 0, newop(backet[2], "dispose3")];
};


var move5to3 = function(backet) {
    if (backet[1] >= 3 || backet[0] == 0) {
        throw "error";
    }
    var capacity = 3 - backet[1];
    if (backet[0] < capacity) {
        return [0, backet[0] + backet[1], newop(backet[2], "move5to3")];
    } else {
        return [backet[0] - capacity, backet[1] + capacity, newop(backet[2], "move5to3")];
    }
};

var move3to5 = function(backet) {
    if (backet[0] >= 5 || backet[1] == 0) {
        throw "error";
    }

    var capacity = 5 - backet[0];
    if (backet[1] < capacity) {
        return [backet[0] + backet[1], 0, newop("move3to5")];
    } else {
        return [backet[0] + capacity, backet[1] - capacity, newop("move3to5")];
    }
};

var operations = [
    fill5, fill3, dispose5, dispose3, move5to3, move3to5
];

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
                return;
            } else {
                queue.push(result);
            }
        } catch (e) {
            if (e !== "error") throw e;
        }
    }
}

