import Node from "./DijkstraNode"

function DijkstraAlgorithm(startX, startY, goalX, goalY, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);

    this.map = map;

    this.UnexploredList = [];
    for (let x = 0; x < this.map.getWidth(); x++) {
        for (let y = 0; y < this.map.getHeight(); y++) {
            if (!this.map.isValidCoord(x, y)) {
                continue;
            }

            var newNode = new Node(x, y)
            if (this.P.equals(newNode)) {
                newNode.distance = 0;
            }
            this.UnexploredList.push(newNode);
        }
    }

    this.probes = [];
    this.paths = [];
}

DijkstraAlgorithm.prototype.run = function () {

    while (true) {
        if (this.UnexploredList.length == 0) {
            console.log("no path found");
            break;
        }

        this.UnexploredList = this.UnexploredList.sort((node1, node2) => parseFloat(node1.distance) - parseFloat(node2.distance));
        var B = this.UnexploredList.shift();

        if (B.equals(this.G)) {
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

        var adjacentNodes = this.getAdjacentNodes(B);

        for (var adjacentNodeIndex = 0; adjacentNodeIndex < adjacentNodes.length; adjacentNodeIndex++) {
            var C = adjacentNodes[adjacentNodeIndex];

            this.probes.push({x: C.x, y:C.y})

            let distance = B.distance + this.map.getCoordCost(C.x, C.y) + 1;

            if (distance < C.distance) {
                let CinList = this.findInUnexploredList(C);
                CinList.distance = distance;
                CinList.parent = B;
            }
        }
    }

    return {
        found: this.paths.length > 0,
        paths: this.paths,
        probes: this.probes
    }
}

DijkstraAlgorithm.prototype.findInUnexploredList = function (node) {
    return this.UnexploredList.find(x => x.equals(node));
}

DijkstraAlgorithm.prototype.isValidAdjacent = function (x, y) {
    return this.map.isValidCoord(x, y) && !!this.findInUnexploredList(new Node(x, y));
}

DijkstraAlgorithm.prototype.getAdjacentNodes = function (parent) {
    var nodes = [];

    //above
    if (this.isValidAdjacent(parent.x, parent.y - 1)) {
        var node = new Node(parent.x, parent.y - 1)
        nodes.push(node);
    }

    //below
    if (this.isValidAdjacent(parent.x, parent.y + 1)) {
        var node = new Node(parent.x, parent.y + 1)
        nodes.push(node);
    }

    //left
    if (this.isValidAdjacent(parent.x - 1, parent.y)) {
        var node = new Node(parent.x - 1, parent.y);
        nodes.push(node);
    }

    //right
    if (this.isValidAdjacent(parent.x + 1, parent.y)) {
        var node = new Node(parent.x + 1, parent.y);
        nodes.push(node);
    }

    return nodes;
}

DijkstraAlgorithm.prototype.goalReached = function (goal) {
    this.stop = { finished: true, found: true };
    var node = goal;
    var nextNode = node.parent;
    while (!!node.parent) {
        this.drawCalculated(node.x, node.y, nextNode.x, nextNode.y);
        node = nextNode;
        nextNode = node.parent;
    }
}

export default DijkstraAlgorithm;