import Node from "./Node"

function AStarAlgorithm(startX, startY, goalX, goalY, probePosition, drawCalculated, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);
    this.probePosition = probePosition;
    this.drawCalculated = drawCalculated;
    this.map = map;

    this.calculateCostsForNode(this.P);

    this.OpenList = [this.P];
    this.ClosedList = [];
    this.B = {};
    this.C = {};

    this.stop = false;
}

//Page 108 AI Programmin wisdom Manhattan Distance
AStarAlgorithm.prototype.getCostFromStartToNode = function (node) {
    return Math.abs(node.x - this.G.x) + Math.abs(node.y - this.G.y);
}

AStarAlgorithm.prototype.getEstimatedCostFromStartToNode = function (node) {
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

AStarAlgorithm.prototype.work = function () {
    if(this.stop) return;
    
    if(this.OpenList.length == 0) {
        console.log("no path can be found");
        this.stop = true;
        return;
    }

    this.OpenList  = this.OpenList.sort((node1,node2) => node1.f > node2.f);
    var B = this.OpenList.shift();
    if (B.equals(this.G)) {
        this.goalReached();
        return;
    }

    this.ClosedList.push(B);

    var connectedNodes = this.getConnectedNodes(B);
    connectedNodes = connectedNodes.sort((node1,node2) => node1.f > node2.f);

    var self = this
    connectedNodes.forEach(function(C){
        self.calculateCostsForNode(C);
        self.probePosition(B.x, B.y, C.x, C.y);

        let result = {};

        var openListContains = arrayContainsNode(self.OpenList, C)
        var closedListContains = arrayContainsNode(self.ClosedList, C)

        if (C.equals(self.G)) {
            self.goalReached();
            return false;
        }
        else if(openListContains.contains) {  
            if(C.f < openListContains.node.f + 1) {
                console.log("skip");
                return;
            }
        }
        else if(closedListContains.contains){
            B.children.push(C);
            if(C.f < closedListContains.node.f + 1) {
                console.log("skip");
                return;
            }
            else{
                self.OpenList.push(C);
            }
        }
        else{
            self.OpenList.push(C);
        }
    })
}

AStarAlgorithm.prototype.goalReached = function() {
    this.stop = true;
    console.log("reached the goal");

    if(!this.P.next) {
        console.log("error determining path");
        return;
    }


    var node = this.P;
    var nextNode = this.P.next;
    while(!!node.next) {
        this.drawCalculated(node.x, node.y, nextNode.x, nextNode.y);
        node = nextNode;
        nextNode = node.next;
    }
}

function arrayContainsNode(array, node) {
    var result = {}
    result.contains = false;
    array.forEach(function(arrayNode) {
        if(node.equals(arrayNode)) {
            result.contains = true;
            result.node = node
            return false;
        }
    })
    return result;
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