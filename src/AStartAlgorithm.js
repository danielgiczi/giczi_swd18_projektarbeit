import Node from "./Node"

function AStarAlgorithm(startX, startY, goalX, goalY, probePosition, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);
    this.probePosition = probePosition;
    this.map = map;

    this.calculateCostsForNode(this.P);

    this.OpenList = [this.P];
    this.ClosedList = [];
    this.B = {};
    this.C = {};
}

//Page 108 AI Programmin wisdom Manhattan Distance
AStarAlgorithm.prototype.getCostFromStartToNode = function (node) {
    return Math.abs(node.x - this.G.x) + Math.abs(node.y - this.G.y);
}

AStarAlgorithm.prototype.getEstimatedCostFromStartToNode = function (node) {
    /*
    var cost = 0;
    var currX = this.P.x;
    while(currX != node.x) {
        if(node.x > currX) {
            currX++;
        }
        else if(node.x < currX) {
            currX--;
        }
        cost += this.map.getCoordCost(currX, node.y) + 1;
    }

    var currY = this.P.y;
    while(currY != node.y) {
        if(node.y > currY) {
            currY++;
        }
        else if(node.y < currY) {
            currY--;
        }
        cost += this.map.getCoordCost(currX, currY) + 1;
    }

    return cost;*/

    if(!node.parent) {
        return 0;
    }

    return node.parent.g + this.map.getCoordCost(node.x, node.y) + 1;
}

AStarAlgorithm.prototype.calculateCostsForNode = function (node) {
    node.g = this.getEstimatedCostFromStartToNode(node);
    node.h = this.getCostFromStartToNode(node);
    node.f = node.g + node.h;
}

AStarAlgorithm.prototype.work = function () {
    var B = this.getBestNodeInOpenList();
    if (B.equals(this.G)) {
        console.log("goal has been found");
        return;
    }
    if(this.OpenList.length == 0) {
        console.log("no path can be found");
        return;
    }

    var connectedNodes = this.getConnectedNodes(B);
    connectedNodes = connectedNodes.sort((node1,node2) => node1.f > node2.f);

    var self = this
    connectedNodes.forEach(function(C){
        self.calculateCostsForNode(C);
        self.probePosition(B.x, B.y, C.x, C.y);

        if(arrayContainsNode(self.OpenList, C)) {  
            B.children.push(C);
            if(C.g < B.g) {

            }
        }
        else if(arrayContainsNode(self.ClosedList, C)){
            B.children.push(C);

        }
        else{
            self.OpenList.push(C);
        }
    })
}

function arrayContainsNode(array, node) {
    var contains = false;
    array.forEach(function(arrayNode) {
        if(node.equals(arrayNode)) {
            contains = true;
            return false;
        }
    })
    return contains;
}


AStarAlgorithm.prototype.getBestNodeInOpenList = function () {
    var bestNode = this.OpenList[0];
    this.OpenList.forEach(function(node) {
        if(node.f < bestNode.f) {
            bestNode = node;
        }
    });
    var copy = bestNode.clone();
    return copy;
}

AStarAlgorithm.prototype.getConnectedNodes = function (parent) {

    var nodes = [];

    //above
    if(this.map.isValidCoord(parent.x, parent.y -1)){
        var node =new Node(parent.x,parent.y-1)
        node.parent = parent
        nodes.push(node);
    }

    //below
    if(this.map.isValidCoord(parent.x, parent.y + 1)){
        var node = new Node(parent.x,parent.y + 1)
        node.parent = parent
        nodes.push(node);
    }

    //left
    if(this.map.isValidCoord(parent.x - 1, parent.y)){
        var node =new Node(parent.x - 1,parent.y);
        node.parent = parent
        nodes.push(node);
    }

    //right
    if(this.map.isValidCoord(parent.x + 1, parent.y)){
        var node = new Node(parent.x + 1,parent.y);
        node.parent = parent
        nodes.push(node);
    }

    return nodes;
}

export default AStarAlgorithm;