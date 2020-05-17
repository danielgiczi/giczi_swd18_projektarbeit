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

Node.prototype.clone = function() {
    var clone = new Node(this.x, this.y);
    clone.f = this.f;
    clone.g = this.g;
    clone.h = this.h;
    clone.parent = this.parent;
    if(this.next){
        clone.next = this.next.clone();
    }

    return clone;
}

export default Node