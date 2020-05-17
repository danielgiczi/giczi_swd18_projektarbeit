import Node from "./BreadthFirstSearchNode"

function BreadthFirstSearchAlgorithm(startX, startY, goalX, goalY, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);

    this.map = map;

    this.visited = [];
    this.queue = [];

    this.queue.push(this.P);

    this.stop = null;
    
    this.probes = [];
    this.paths =[];
}

BreadthFirstSearchAlgorithm.prototype.run = function () {

    while(true) {
        if(this.queue.length == 0) {
            console.log("no path found");
            break;
        }

        var B = this.queue.shift();

        if(B.equals(this.G)) {
            var node = B;
            var nextNode = node.parent;
            while(!!node.parent) {
                this.paths.push({x: node.x, y:node.y})
                node = nextNode;
                nextNode = node.parent;
            }
            this.paths.push({x: node.x, y:node.y})

            break;
        }

        var adjacentNodes = this.getUnivisitedAdjacentNodes(B);
        this.visited.push(B);

        for(var adjacentNodeIndex = 0; adjacentNodeIndex < adjacentNodes.length; adjacentNodeIndex++)
        {
            var C = adjacentNodes[adjacentNodeIndex];
            this.visited.push(C);
            this.queue.push(C);
            this.probes.push({x: C.x, y:C.y})
        }
    }

    return {
        found: this.paths.length > 0,
        paths: this.paths,
        probes: this.probes
    }
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

export default BreadthFirstSearchAlgorithm;