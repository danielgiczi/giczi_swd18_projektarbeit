function Node(x, y) {
    this.x = x;
    this.y = y;
    
    this.parent = null;
    this.distance = Infinity;
    this.adjacents = [];
    this.selected = false;
    this.weight = 0;
}

Node.prototype.equals = function (other) {
    if (this.constructor !== other.constructor) return false;
    return this.x == other.x && this.y == other.y;
}

Node.prototype.key = function() {
    return this.x + "|" + this.y;
}

export default Node