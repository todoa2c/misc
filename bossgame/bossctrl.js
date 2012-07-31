function BossCtrl($scope) {
    var matrix = [];
    for (var i = 0; i < 6; i++) {
        matrix[i] = [];
        for (var j = 0; j < 6; j++) {
            matrix[i][j] = false;
        }
    }

    var hideEdge = function() { 
        for (var i = 0; i < 6; i++) {
            matrix[i][0] = null;
            matrix[0][i] = null;
            matrix[i][5] = null;
            matrix[5][i] = null;
        }
    };
    hideEdge();
    matrix[2][2] = true;
    matrix[2][3] = true;
    matrix[3][2] = true;
    matrix[3][3] = true;
    $scope.matrix = matrix;
    $scope.count = 0;
    $scope.indexState = 'hidden';

    var isFinished = function(matrix) {
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                if (matrix[i][j]) {
                    return false;
                }
            }
        }
        return true;
    };

    $scope.finished = function() {
        if (isFinished(matrix)) {
           return "Finished!";
        } else {
            return "";
        }
    };

    var invert = function(matrix, row, col) {
         matrix[row][col] = !matrix[row][col];
         matrix[row - 1][col] = !matrix[row - 1][col];
         matrix[row][col - 1] = !matrix[row][col - 1];
         matrix[row + 1][col] = !matrix[row + 1][col];
         matrix[row][col + 1] = !matrix[row][col + 1];
    };

    $scope.toggle = function(cell) {
         var col = cell.$index;
         var row = cell.$parent.$index;
         invert(matrix, row, col);
         hideEdge();
         $scope.count++;
         console.log('clicked row: ' + row + ', col: ' + col);
    };

    var sortByOrder = function(a, b) {
        return a - b;
    };

    $scope.solve = function() {
        var start = new Date();
        var solvedList = [];
        for (var pattern = 0; pattern < 65536; pattern++) {
            var copy = angular.copy(matrix);
            var patList = [];
            var p = pattern;
            for (var i = 0; i < 16; i++) {
                if (p & 0x1) {
                    patList.push(i);
                }
                p = p >> 1;
            }
            var result = trySolve(copy, patList);
            if (result) {
                solvedList[patList.length] = patList;
            }
        }

        for (var minPattern = 0; minPattern < solvedList.length; minPattern++) {
            if (solvedList[minPattern]) {
                $scope.pattern = solvedList[minPattern].sort(sortByOrder);
                $scope.indexState = 'show';
                break;
            }
        }
        var stop = new Date();
        console.log('time = ' + (stop.getTime() - start.getTime()) + ' [ms]');
    };

    var hasDuplicatedPattern = function(patList) {
        var map = {};
        for (var i = 0; i < patList.length; i++) {
            if (patList[i] in map) {
                return true;
            }
            map[patList[i]] = patList[i];
        }
        return false;
    };

    var trySolve = function(matrix, patList) {
        for (var i = 0; i < patList.length; i++) {
            var pat = patList[i];
            var row = Math.floor(pat / 4) + 1;
            var col = (pat % 4) + 1;
            invert(matrix, row, col);
        }
        return isFinished(matrix);
    };
}

