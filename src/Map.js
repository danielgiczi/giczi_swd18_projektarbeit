var map1 = [
    [-2, -1, -1, -1, -1, -4,-2,-1, -4],
    [-1, 0, -3, -5, -1, -3,-3,-1, -3],
    [0, 0, -5, -5, -1, 0,-3,-5, -4],
    [0, -1, -5, -2, -1, -1,0,0, -5],
    [-1, -1, -4, -1, -1, -3,0,-1, -3],
    [-2, -1, -1, -1, -2, -3,-3, -2, -1],
    [-1, -1, -1, -1, -2, -3,-4, -4, -2],
    [0, -1, 0, -1, -1, -2,-3, -4, -1],
    [0, 0, 0, -1, -1, -2,-3, -3, -1],
    [-1, -1, -1, -1, -1, -1,-2, -1, -1]
];

function Map() {
    this.rawInput = map1;
}

Map.prototype.getCoordCost = function(x, y) {
    return map[x][y];
}

Map.prototype.getWidth = function() {
    return this.rawInput[0].length;
}

Map.prototype.getHeight = function() {
    return this.rawInput.length;
}

Map.prototype.forEach = function(cb) {
    this.rawInput.forEach(function(val,inx) {
        cb(val,inx);
    })
}

export default Map