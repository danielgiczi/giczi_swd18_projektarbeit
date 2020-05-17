import Node from "./AStarNode"

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

    this.stop;
}

//Page 108 AI Programmin wisdom Manhattan Distance
AStarAlgorithm.prototype.getCostFromStartToNode = function (node) {
    return Math.abs(this.G.x - node.x) + Math.abs(this.G.y - node.y);
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

AStarAlgorithm.prototype.work = function () {
    if(this.stop) return this.stop;
    
    if(this.OpenList.length == 0) {
        console.log("no path can be found");
        this.stop = { finished: true, found: false};
        return this.stop;
    }

    this.OpenList  = this.OpenList.sort((node1,node2) => parseFloat(node1.f) -  parseFloat(node2.f));
    var B = this.OpenList.shift();
    if (B.equals(this.G)) {
        this.goalReached(B);
        return this.stop;
    }

    this.ClosedList.push(B);

    var connectedNodes = this.getConnectedNodes(B);
    connectedNodes = connectedNodes.sort((node1,node2) => node1.f > node2.f);

    var self = this
    for(var childIndex = 0; childIndex < connectedNodes.length; childIndex++)
    {
        var C = connectedNodes[childIndex];
        self.calculateCostsForNode(C);
        //self.probePosition(B.x, B.y, C.x, C.y);

        let result = {};

        var openListContains = arrayContainsNode(self.OpenList, C)
        var closedListContains = arrayContainsNode(self.ClosedList, C)

        if(!openListContains.contains && !closedListContains.contains) {
            self.probePosition(B.x, B.y, C.x, C.y);
        }

        if (C.equals(self.G)) {
            self.goalReached(C);
            break;
        }
        else if(openListContains.contains) {  
            if(C.f >= openListContains.node.f) {
                //console.log("skip");
                continue;
            }
        }
        else if(closedListContains.contains){
            if(C.f >= closedListContains.node.f) {
                //console.log("skip");
                continue;
            }
            else{
                self.OpenList.push(C);
            }
        }
        else{
            self.OpenList.push(C);
        }
    }

    return { finished: false, found: false};
}

AStarAlgorithm.prototype.goalReached = function(goal) {
    this.stop = { finished: true, found: true};
    var node = goal;
    var nextNode = node.parent;
    while(!!node.parent) {
        this.drawCalculated(node.x, node.y, nextNode.x, nextNode.y);
        node = nextNode;
        nextNode = node.parent;
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