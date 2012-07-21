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

    $scope.finished = function() {
        for (var i = 1; i < 5; i++) {
            for (var j = 1; j < 5; j++) {
                if (matrix[i][j]) {
                    return "";
                }
            }
        }
        return "Finished!";
    }

    $scope.toggle = function(cell) {
         var col = cell.$index;
         var row = cell.$parent.$index;
         matrix[row][col] = !matrix[row][col];
         matrix[row - 1][col] = !matrix[row - 1][col];
         matrix[row][col - 1] = !matrix[row][col - 1];
         matrix[row + 1][col] = !matrix[row + 1][col];
         matrix[row][col + 1] = !matrix[row][col + 1];
         hideEdge();
         $scope.count++;
         console.log('clicked row: ' + row + ', col: ' + col);
    }
}

