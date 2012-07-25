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
    }

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
        var pattern = 0;
        var start = new Date();
        while(true) {
            var patList = [];
            var temp = pattern;
            while (temp >= 16) {
                var mod = temp % 16;
                patList.push(mod);
                temp = ((temp - mod) / 16) - 1;
            }
            patList.push(temp);

            if (!hasDuplicatedPattern(patList)) {
                var copy = angular.copy(matrix);
                var result = trySolve(copy, patList);
                if (result) {
                    console.log(pattern + ' : ' + JSON.stringify(patList) + ' => ' + result);
                    $scope.pattern = [];
                    for (var i = 0; i < patList.length; i++) {
                        $scope.pattern = patList.sort(sortByOrder);
                    }
                    var stop = new Date();
                    console.log('time = ' + (stop.getTime() - start.getTime()) + ' [ms]');
                    $scope.indexState = 'show';
                    break;
                }
            } else {
                //console.log('DUPLICATED: ' + pattern + ' : ' + JSON.stringify(patList));
            }
            pattern++;
        }
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

