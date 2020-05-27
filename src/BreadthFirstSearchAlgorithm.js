import Node from "./BreadthFirstSearchNode"

function BreadthFirstSearchAlgorithm(startX, startY, goalX, goalY, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);
    this.map = map;
}

BreadthFirstSearchAlgorithm.prototype.run = function () {
    this.queue = [];
    this.queue.push(this.P);
    this.probes = [];
    this.paths =[];
    this.visited = [];

    loop:
    while(true) {
        if(this.queue.length == 0) {
            break;
        }

        var B = this.queue.shift();

        var adjacentNodes = this.getUnivisitedAdjacentNodes(B);
        this.visited.push(B);

        for(var adjacentNodeIndex = 0; adjacentNodeIndex < adjacentNodes.length; adjacentNodeIndex++)
        {
            var C = adjacentNodes[adjacentNodeIndex];
            this.probes.push({x: C.x, y:C.y})

            if(C.equals(this.G)) {
                var node = C;
                var nextNode = node.parent;
                while(!!node.parent) {
                    this.paths.push({x: node.x, y:node.y})
                    node = nextNode;
                    nextNode = node.parent;
                }
                this.paths.push({x: node.x, y:node.y})
                break loop;
            }

            this.visited.push(C);
            this.queue.push(C);
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