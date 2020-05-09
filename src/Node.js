function Node(x, y) {
    this.x = x;
    this.y = y;
    
    let f = 0;
    let g = 0;
    let h = 0;

    let parent;
    let next;
    let children = [];
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
    clone.children = [];

    return clone;
}

export default Node