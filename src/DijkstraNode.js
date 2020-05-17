function Node(x, y) {
    this.x = x;
    this.y = y;
    
    this.parent = null;
    this.distance = Infinity;
    this.selected = false;
}

Node.prototype.equals = function (other) {
    if (this.constructor !== other.constructor) return false;
    return this.x == other.x && this.y == other.y;
}

Node.prototype.clone = function() {
    var clone = new Node(this.x, this.y);
    clone.parent = this.parent;
    clone.distance = this.distance;
    clone.selected = this.selected;

    return clone;
}

export default Node