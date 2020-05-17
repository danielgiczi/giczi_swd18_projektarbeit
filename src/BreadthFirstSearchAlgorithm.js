import Node from "./BreadthFirstSearchNode"

function BreadthFirstSearchAlgorithm(startX, startY, goalX, goalY, probePosition, drawCalculated, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);

    this.probePosition = probePosition;
    this.drawCalculated = drawCalculated;
    this.map = map;

    this.visited = [];
    this.queue = [];

    this.queue.push(this.P);

    this.stop = null;
}

BreadthFirstSearchAlgorithm.prototype.work = function () {
    if(this.stop) return this.stop;

    if(this.queue.length == 0) {
        console.log("no path found");
        this.stop = { finished: true, found: false};
        return this.stop;
    }

    var B = this.queue.shift();

    if(B.equals(this.G)) {
        this.goalReached(B);
        return this.stop;
    }

    var adjacentNodes = this.getUnivisitedAdjacentNodes(B);
    this.visited.push(B);

    for(var adjacentNodeIndex = 0; adjacentNodeIndex < adjacentNodes.length; adjacentNodeIndex++)
    {
        var C = adjacentNodes[adjacentNodeIndex];
        this.visited.push(C);
        this.queue.push(C);
        this.probePosition(B.x, B.y, C.x, C.y);
    }

    return { found:false, finished: false}
}

BreadthFirstSearchAlgorithm.prototype.isNodeUnivisited = function(node) {
    let found = this.visited.find(x => x.equals(node));
    if(!found) return true;
}

BreadthFirstSearchAlgorithm.prototype.isValidAdjacent = function(x, y) {
    return this.map.isValidCoord(x, y) && this.isNodeUnivisited(new Node(x,y));
}

BreadthFirstSearchAlgorithm.prototype.getUnivisitedAdjacentNodes = function (parent) {
    var nodes = [];

    //above
    if(this.isValidAdjacent(parent.x, parent.y -1)){
        var node = new Node(parent.x,parent.y-1)
        node.parent = parent;
        nodes.push(node);
    }

    //below
    if(this.isValidAdjacent(parent.x, parent.y + 1)){
        var node = new Node(parent.x,parent.y + 1)
        node.parent = parent;
        nodes.push(node);
    }

    //left
    if(this.isValidAdjacent(parent.x - 1, parent.y)){
        var node =new Node(parent.x - 1,parent.y);
        node.parent = parent;
        nodes.push(node);
    }

    //right
    if(this.isValidAdjacent(parent.x + 1, parent.y)){
        var node = new Node(parent.x + 1,parent.y);
        node.parent = parent;
        nodes.push(node);
    }

    return nodes;
}

BreadthFirstSearchAlgorithm.prototype.goalReached = function(goal) {
    this.stop = { finished: true, found: true};
    var node = goal;
    var nextNode = node.parent;
    while(!!node.parent) {
        this.drawCalculated(node.x, node.y, nextNode.x, nextNode.y);
        node = nextNode;
        nextNode = node.parent;
    }
}

export default BreadthFirstSearchAlgorithm;