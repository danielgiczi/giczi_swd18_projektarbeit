function Node(x, y) {
    this.x = x;
    this.y = y;
    this.parent = null;
}

Node.prototype.equals = function (other) {
    if (this.constructor !== other.constructor) return false;
    return this.x == other.x && this.y == other.y;
}

export default Node