import Node from "./DepthFirstSearchNode"

function DepthFirstSearchAlgorithm(startX, startY, goalX, goalY, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);
    this.map = map;
}

DepthFirstSearchAlgorithm.prototype.run = function () {
    this.visited = [];
    this.stack = [];
    this.stack.push(this.P);
    this.probes = [];
    this.paths =[];

    loop:
    while(true) {
        if(this.stack.length == 0) {
            break;
        }

        var B = this.stack.pop();

        var adjacentNodes = this.getUnivisitedAdjacentNodes(B);
        this.visited.push(B);

        for(var adjacentNodeIndex = 0; adjacentNodeIndex < adjacentNodes.length; adjacentNodeIndex++)
        {
            var C = adjacentNodes[adjacentNodeIndex];

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

            this.probes.push({x: C.x, y: C.y})
            this.visited.push(C);
            this.stack.push(C);
        }
    }

    return {
        found: this.paths.length > 0,
        paths: this.paths,
        probes: this.probes
    }
}

DepthFirstSearchAlgorithm.prototype.isNodeUnivisited = function(node) {
    let found = this.visited.find(x => x.equals(node));
    if(!found) return true;
}

DepthFirstSearchAlgorithm.prototype.isValidAdjacent = function(x, y) {
    return this.map.isValidCoord(x, y) && this.isNodeUnivisited(new Node(x,y));
}

DepthFirstSearchAlgorithm.prototype.getUnivisitedAdjacentNodes = function (parent) {
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

export default DepthFirstSearchAlgorithm;