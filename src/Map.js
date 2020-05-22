function Map(chosenMap) {
    let rows = chosenMap.split("\n");

    let mapArr = []

    let startX = -1, startY = -1, destX = -1, destY = -1;

    let rowInx = 0;
    rows.forEach(function(val) {
        if(!val || val=="") return;
        let row = val.replace(/\s\s+/g, " ");        
        if(!row || row=="") return;
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
        if(rowArr.length == 0) return;
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
    if(!this.isWithinBounds(x,y)) return false
    var cost = this.getCoordCost(x,y);
    if(cost == 8) return false;
    return true;
}

Map.prototype.isWithinBounds = function(x, y) {
    if(x < 0) return false;
    if(x >= this.getWidth()) return false;
    if(y < 0) return false;
    if(y >= this.getHeight()) return false;
    return true;
}


export default Map