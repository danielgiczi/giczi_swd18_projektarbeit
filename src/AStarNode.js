function Node(x, y) {
    this.x = x;
    this.y = y;
    
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.parent;
}

Node.prototype.equals = function (other) {
    if (this.constructor !== other.constructor) return false;
    return this.x == other.x && this.y == other.y;
}

export default Node