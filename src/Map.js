//Map Werte:
// 0,-1,-2,-3,-4,-5 für Gewichte
// 8 für unendlich (Wand)
// S für Start
// D für Destination

var map1 = `
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 S 0 0 0 0 0 D 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
`;

var map2 = `
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 S 0 0 8 0 0 D 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
`;

var map3 = `
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 S 0 0 8 0 0 D 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 8 8 8 0 0
    0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0
`;

var map4 = `
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 S 0 0 8 0 0 D 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
    0 0 0 0 0 8 0 0 0 0 0
`;

var mapTest = `
    S 0 0 8 D
    0 0 0 0 0
`;

function Map() {
    let chosenMap = map3;
    let rows = chosenMap.split("\n");

    let mapArr = []

    let startX = -1, startY = -1, destX = -1, destY = -1;

    let rowInx = 0;
    rows.forEach(function(val) {
        if(!val || val=="") return;
        let row = val.replace(/\s\s+/g, " ");
        
        let chars = row.split(" ")

        let rowArr = [];
        let colInx = 0;
        chars.forEach(function(char) {
            if(!char || char == "") return;
            let weight;
            if(char == "S") {
                weight = 0;
                startX = colInx;
                startY = rowInx;
            }
            else if(char == "D") {
                weight = 0;
                destX = colInx;
                destY = rowInx;
            }
            else {
                weight = parseInt(char, 10)
            }
            rowArr.push(weight);
            colInx++;
        })
        mapArr.push(rowArr)
        rowInx++;
    })

    this.rawInput = mapArr;

    if(startX == -1 || startY == -1) {
        throw "invalid start " + startX + " " + startY
    }

    this.startX = startX;
    this.startY = startY;

    if(destX == -1 || destY == -1) {
        throw "invalid dest " + destX + " " + destY
    }

    this.destX = destX;
    this.destY = destY;
}

Map.prototype.getCoordCost = function(x, y) {
    return Math.abs(this.rawInput[y][x]);
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

Map.prototype.isValidCoord = function(x, y) {
    if(x < 0) return false;
    if(x >= this.getWidth()) return false;
    if(y < 0) return false;
    if(y >= this.getHeight()) return false;
    var cost = this.getCoordCost(x,y);
    if(cost == 8) return false;
    return true;
}

export default Map